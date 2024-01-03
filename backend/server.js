const express = require('express'); //Line 1
const cookieParser =require('cookie-parser');
const jwt =require('jsonwebtoken');
const mysql=require('mysql');
const cors = require('cors');
const multer=require('multer');
const path=require('path');
const { Console } = require('console');



const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/public",express.static('public'))

app.use(cors(
   { 
    origin:["http://localhost:3000"],
    methods:["POST,GET,DELETE,PATCH"],
    Credentials:true,
    
   }
))
const db =mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"test"
})


//usagae of multer

let storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
let maxsize =10*1000*1000
let upload = multer({
    storage:storage,
    limits:{
        fileSize:maxsize
    }
})
let uploadHandler = upload.single('file')

app.post("/upload",(req,res)=>{

    uploadHandler(req,res,function(err){
        if(err instanceof multer.MulterError){
            if(err.code==='LIMIT_FILE_SIZE'){
                return res.json({Message:"file limit exceed"})
            }
      }
        if(!req.file){
            return res.json({Message:"no file"})
        }else{
            //console.log(req.file.filename+"------>hello")
        
            return res.json({Message:"uploaded successfully",filename:req.file.filename})
        }
       
            
    })
  
}
)
app.post("/uploadDetails",(req,res)=>{
     console.log([req.body.productname]);
     console.log([req.file])
     const formdata =req.body;

    uploadHandler(req,res,function(err){
        if(err instanceof multer.MulterError){
            if(err.code==='LIMIT_FILE_SIZE'){
                return res.json({Message:"file limit exceed"})
            }
      }
        if(!req.file){
            return res.json({Message:"no file"})
        }else{
            //console.log(req.file.filename+"------>hello")
            const sql="insert into product ( name, qty, price,image) VALUES (?,?,?,?)";
           
             db.query(sql,[req.body.productname,req.body.productqty,req.body.productprice,req.file.filename],
                (err,data)=>{
                    if(err){
                    return res.json({Message: err})
                    }
                    return res.json({Message:"successfully inserted"})
                })
            
            // filename=[...input,req.file.filename]
          //  console.log("filename");
            //return res.json({Message:"uploaded successfully",filename:req.file.filename})
        }
       
            
    })

    // console.log(filename);

    
  
}
)

// app.post("/uploadDetails",(req,res)=>{
//     console.log(req.body.productname);
//     console.log(req.body.image);
  
// })

const verifyUser =(req,res,next)=>{
    let token = req.body.Token;
    console.log("token->",token)
    if(!token){
        return res.json({Message:"we need token"})
    }else{
        jwt.verify(token,"Secret-Key",(err,decoded)=>{
         if(err){
            return res.json({Message:"Authentication error"})
         }else{
            req.name=decoded.name;
            next();
         }
        })
    }
}

app.post("/verify",verifyUser,(req,res)=>{
    return res.json({Status:"Success",decoded:req.name})
})


app.post("/Login",(req,res)=>{
//res.header('Access-Control-Allow-Orgin',true)
    const sql="select * from testtable where name=? and phonenumber=?";
    console.log([req.body.name,req.body.phonenumber]);
    if(req.body.name!=="admin" && req.body.phonenumber){
    db.query(sql,
        [req.body.name,req.body.phonenumber],
        (err,data)=>{
            if(err) return res.json({Message:err})
            if(data.length>0){
                //const id=data[0].id;
                const name=data[0].name;
                const id_name=data[0].id;
                //const phonenumber=data[0].phonenumber;
                const token = jwt.sign({name},"Secret-Key",{expiresIn:"1d"});
                console.log(token)
                 //localStorage.setItem('Token', token)
                //  res.cookie('Token',token,{
                //      httpOnly:true
                //  })
                 //res.send("cookies sent")
                return res.json({Status:"success",Token:token,id:id_name}) 
            }
            else{
               return res.json({Message:"No records Found"})
            }
        }
        )
    }else{
        return res.json({Status:"Access"})
    }


})


app.get("/logout",(req,res)=>{
    res.clearCookie('Token')
    return res.json({Message:"Success"})
})
app.post("/Register",(req,res)=>{
    const sqlread="select * from testtable where phonenumber=?";
    db.query(sqlread,[req.body.phonenumber],(err,data)=>{
        if(err){
            return res.json(err)
        }
        if(data.length>0){
            return res.json({Status:"false"})
        }else{
            const sqlinsert="insert into testtable ( name, phonenumber) values(?,?)";
            db.query(sqlinsert,[req.body.name,req.body.phonenumber],(err,data)=>{
                if(err){
                    return res.json(err)
                }
                // const name=req.body.name;
                // const token = jwt.sign({name},"Secret-Key",{expiresIn:"1d"});
                // console.log(token ,"from register api")
                return res.json({Status:"true"})
                // return res.json({Status:"true",Token:token}) 

            })



        }
    })
})

app.get("/productdata",(req,res)=>{
    sql="select * from product"
    db.query(sql,(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})



app.post("/placeorder",(req,res)=>{
    let count =0;
    const products = req.body.products;
    for(let i=0;i<products.length;i++){
        sql=" select * from product where id= ? "
        db.query(sql,[req.body.products[i].id],(err,data)=>{
            if(err){
                return res.json({message:err})
            }
            console.log(data[0].qty,data[0].name)
            if(data[0].qty>=products[i].qty ){
                    
            }else{
                return res.json({message:`${data[0].name} has only  ${data[0].qty} `})
            }
           // console.log("mystery behaiver")
        
        })
    }
   
         for(let j=0;j<products.length;j++){
            sqlsearch="select qty from product where id=?"
            db.query(sqlsearch,[products[j].id],(err,data)=>{
                if(err){
                    return res.json({message:err})
                }
                let difference=data[0].qty-req.body.products[j].qty
                console.log("diff=",difference)
                sqlupdate="UPDATE product SET qty=? WHERE id =?"
                db.query(sqlupdate,[difference,req.body.products[j].id],(err,data)=>{
                    if(err){
                        return res.json({message:err})
                    }
                    console.log(difference)
                })

            })
           
         }

         sql1="INSERT INTO orders(userid,products,total) VALUES (?,?,?)"
         db.query(sql1,[req.body.user,JSON.stringify(products),req.body.total],(err,data)=>{
            if(err){
                return res.json({message:err})
            }
            return res.json({message:"added"})
         })
    

})

app.get(`/orders/:id`,(req,res)=>{
    //const id=localStorage.getItem("UserId");
    console.log();
    const sql="select * from orders where userid=?"
    //console.log(sql)
    db.query(sql,[req.params.id],(err,data)=>{
        // console.log("im in")
        if(err){
            return res.json(err)
        }
        for(let i=0;i<data.length;i++){
            data[i].products=JSON.parse(data[i].products)
            //console.log(sortOrders[i].products)
            //console.log("changes-->",tempOrders)
            }
        return res.json({data})
    })
})
app.get(`/manageorders`,(req,res)=>{

    const sql="select o.id,o.products,o.userid,o.total,t.name,o.timestamp from orders o INNER JOIN testtable t where t.id=o.userid"
    //console.log(sql)
    db.query(sql,(err,data)=>{
        // console.log("im in")
        if(err){
            return res.json(err)
        }
        for(let i=0;i<data.length;i++){
            data[i].products=JSON.parse(data[i].products)
            //console.log(sortOrders[i].products)
            //console.log("changes-->",tempOrders)
            }
        return res.json({data})
    })
})

// app.get("/public/images/:id",(req,res)=>{
//     const id=req.params;
//     console.log(id)
//     res.contentType('json');
//     res.send(`${id}`)
// })
app.delete("/deleteadminproduct/:id",(req,res)=>{
    console.log(req.params)
    const id=req.params
    sql=`delete from product where id=?`
    db.query(sql,[req.params.id],(err,data)=>{
        if(err){
            return res.json({message:err})
        }
        return res.json({message:"success"})
    })
})

app.post(`/editadmindata/:id`,(req,res)=>{
        
      sql=`UPDATE product SET name =?,qty=?,price=? WHERE id=?`
     db.query(sql,[req.body.name,req.body.qty,req.body.price,req.params.id],(err,data)=>{
        console.log(sql)
        if(err){
            return res.json({message:err})
        }
        return res.json({message:"success",data:data})
     })
})



app.listen(8081,()=>{console.log("running")})