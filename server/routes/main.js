const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//  Test Server Request with Routes
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description: "Simple Blog created with NodeJs,Express & MongoDb.",
    };

    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(`Error Fetching From Database. ${error}`);
  }
});

// router.get('',async(req,res)=>{
//     const locals = {
//         title: "NodeJS Blog",
//         description:"Simple Blog created with NodeJs,Express & MongoDb."
//     }

//     try {
//         const data = await Post.find().sort({date:'desc'}); // Sorting the Data by Date in Descending Order.
//         res.render('index',{locals,data});
//     } catch (error) {
//         console.log(`Error Fetching From Database. ${error}`);
//     }
// });

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;

// function insertPostData (){
//     Post.insertMany([
//        {
//         title:"My First Post - Building a Blog",
//         body:"This is my first post on this blog."
//        },
//        {
//         title:"My Second Post - Building a Blog",
//         body:"This is my second post on this blog."
//        },
//        {
//         title:"My Third Post - Building a Blog",
//         body:"This is my Third post on this blog."
//        },
//        {
//         title:"My Fourth Post - Building a Blog",
//         body:"This is my Fourth post on this blog."
//        }
//     ])
// }

// insertPostData();
