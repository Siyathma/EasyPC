const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

dotenv.config();
// const UserModel

const app = express();
app.use(cors());
app.use(express.json());


// mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

mongoose.connect('mongodb+srv://wedamullasiyathma:VGO2MbNjND0Z2jus@cluster0.cuyzt.mongodb.net/easypc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    tlsAllowInvalidCertificates: true

});
const jwt = require("jsonwebtoken")
const multer = require("multer");
const path = require("path");
const { type } = require("os");


//API Creation    
app.get("/", (req, res) => {
    res.send("Hello World");
})



// //Image Storage Engine

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({ storage: storage });


// //Creating upload endpoint for images
// app.use('/images', express.static('upload/images'))

// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:3001/images/${req.file.filename}`
//     })
// })





// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// Multer configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });
  
  const upload = multer({ storage });

  app.post('/upload',upload.single('product'), (req, res)=>{       //to upload any image, we will use this endpoint
    res.json({
        success:1,
        image_url: req.file.path
    })
})


//Schema for Creating Products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
    });
    console.log(product)
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})


//Creating API for deleting product

app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name:req.body.name
    })
})


// Creating API for getting all products
app.get('/allproducts', async (req, res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched.");
    res.send(products);
})


//Schema creatig for User model
const Users = mongoose.model('Users', {
    name:{
        type: String,
    },
    email:{
        type:String,
        unique: true
    },
    password:{
        type: String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default: Date.now
    }
})


//Creating Endpoint for registering the user

app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, error:"existing user found with the same email address."})
    }
    let cart = {};

    for(let i = 0; i<300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token:token})
})

//Creating Endpoint for Login

app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token:token});
        }
        else{
            res.json({success:false, error:"Invalid Password"});
        }
    }
    else{
        res.json({success:false, error:"Wrong Email ID"});
    }
})

//creating endpoint for new arrival data
app.get('/newcollections', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched.");
    res.send(newcollection);
})

//creating endpoint for popular section
app.get('/popularinlaptops', async(req, res)=>{
    let products = await Product.find({
        category:"laptops"
    });
    let popular_in_laptops = products.slice(0,4);
    console.log("Popular in laptops fetched")
    res.send(popular_in_laptops);
})

//creating middelware to fetch user
const fetchUser = async (req, res, next)=>{
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors: "Please authenticate a using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token."})
        }
    }

}

//creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async(req, res)=>{{
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
}})


app.listen(3001, () => {
    console.log('Server is running on port 3001');
})
