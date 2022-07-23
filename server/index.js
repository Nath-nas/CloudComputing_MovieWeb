const AWS = require("aws-sdk");
const express = require("express");
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParse = require("body-parser");



const app = express();
app.use(bodyParse.urlencoded({extended: true}));
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParse.json({limit: '50mb'}));

app.use(cors({
    origin: '*'
}));

const s3 = new AWS.S3();


// posting api for picture
app.post("/upload-img", async (req, res) => {
    const file = req.body.file;
    const filename = req.body.filename;
    console.log(file);
    console.log(filename)

    // eliminate unneccessary part of the file
    var buf = Buffer.from(req.body.file.replace(/^data:image\/\w+;base64,/, ""),'base64')

    // Method for uploading file to S3
    s3.putObject({
        Body: buf,
        Bucket: "movie-storing",
        Key: filename,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg' // *********** ALWAYS JPEG FILE ***********
    }).promise();
    res.send(req.body)
})


app.listen(9600, function() {
    console.log("Listening")
})





