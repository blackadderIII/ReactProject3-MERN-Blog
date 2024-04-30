const express = require('express')
const router = express.Router();


//  Test Server Request with Routes
router.get('',(req,res)=>{
    res.send("Hello SKOB")
});

module.exports = router;