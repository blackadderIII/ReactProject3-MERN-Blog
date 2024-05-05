const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//  Get Home
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

// Get Post:id
router.get("/post/:id/", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// POST
// post - searchTerm
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs,Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, ""); // remove special characters from the search term

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", { locals, data });
  } catch (error) {
    console.log(`Error Fetching From Database. ${error}`);
  }
});

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
