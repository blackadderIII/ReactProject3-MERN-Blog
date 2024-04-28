require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;

app.get('',(req,res)=>{
    res.send("Hello SKOB")
});

// Define an anonymous function that logs a message to the console
// when the app is listening on a specified port
// Use string interpolation to include the value of the PORT variable
// in the log message

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})