const express = require('express')
const router = express.Router();


//  Test Server Request with Routes
router.get('',(req,res)=>{
    const locals = {
        title: "NodeJS Blog",
        description:"Simple Blog created with NodeJs,Express & MongoDb."

    }
    res.render('index',{locals});
});
router.get('/about',(req,res)=>{
    res.render('about');
});


router.get('/contact',(req,res)=>{
    res.render('contact');
});

module.exports = router;