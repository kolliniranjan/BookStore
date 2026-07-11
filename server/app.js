const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const express=require("express");
const cors=require("cors");

const authRoutes=require("./routes/authRoutes");

const app=express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/",(req,res)=>{

res.send("Book Store API Running");

});

module.exports=app;