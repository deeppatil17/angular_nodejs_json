const express=require("express")
const cors=require("cors")
const app=express()
const port=process.env.port || 3000
const fs=require("fs")
const orders=require("./orders.json")

app.use(cors())
app.use(express.json())

app.listen(port,(err)=>{
    console.log(`Server is running on port : ${port}`);
    
})

app.get("/api/v1/orders",(req,res)=>{
    return res.json(orders)
})

app.get("/api/v1/orders/:id",(req,res)=>{
    const idParam=Number(req.params.id);
    const order=orders.find(item=>item.id===idParam)
    return res.json(order)
})

app.post("/api/v1/orders",(req,res)=>{
    const newId=orders[orders.length-1].id+1;
    delete req.body.id;
    const newOrder=Object.assign({id:newId},req.body);
    orders.push(newOrder)

    fs.writeFile("./orders.json",JSON.stringify(orders),(err,data)=>{
        if(err) return res.json(err)
            return res.json({Message:"New Order is created Successfully"})
    })
   
})

app.put("/api/v1/orders/:id",(req,res)=>{
    const existingId=Number(req.params.id)

   const index= orders.findIndex(item=>item.id===existingId)
   orders.splice(index,1,{...req.body})
   
    fs.writeFile("./orders.json",JSON.stringify(orders),(err,data)=>{
        if(err) return res.json(err)
            return res.json({Message:"Order is updated Successfully"})
    })
   
})

app.delete("/api/v1/orders/:id",(req,res)=>{
    const inputId=Number(req.params.id)
   const filteredOrders= orders.filter(item=>item.id!==inputId)
   
   
    fs.writeFile("./orders.json",JSON.stringify(filteredOrders),(err,data)=>{
        if(err) return res.json(err)
            return res.json(filteredOrders)
    })
   
})