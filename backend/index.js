const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://ductrong12072002:Ductrong12072002.@cluster0.wt3rt3d.mongodb.net/FullStackECommerceWebsite");

// API Creation 
app.get("/", (req, res) => {
    res.send("Express App Is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint For Images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('book'), (req, res) => {
    res.json({
        success: 1,
        imageURL: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema For Creating Books
const Book = mongoose.model("Book", {
    id: {
        type: Number,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    image: {
        type: String,
        require: true,
    },

    category: {
        type: String,
        require: true,
    },

    newPrice: {
        type: Number,
        require: true,
    },

    oldPrice: {
        type: Number,
        require: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    avilable: {
        type: Boolean,
        default: true,
    },
});

app.post('/addBook', async (req, res) => {
    let books = await Book.find({});
    let id;

    if (books.length > 0) {
        let lastBookArr = books.slice(-1);
        let lastBook = lastBookArr[0];
        id = lastBook.id + 1;
    } else {
        id = 1;
    }

    const book = new Book({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        newPrice: req.body.newPrice,
        oldPrice: req.body.oldPrice,
    });

    console.log(book);
    await book.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API For Deleting Books
app.post('/deleteBook', async (req, res) => {
    await Book.findOneAndDelete({ id: req.body.id });
    console.log("Deleted");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API For Getting All Books
app.get('/getAllBooks', async (req, res) => {
    let books = await Book.find({});
    console.log("All Books Fetched");
    res.send(books);
});

// Creating API For Update Book

// Running
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running On Port " + port);
    } else {
        console.log("Error: " + error);
    }
});