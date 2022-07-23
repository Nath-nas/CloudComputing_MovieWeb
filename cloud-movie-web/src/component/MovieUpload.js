import React, { useState } from "react";
import axios from "axios";

axios.defaults.maxBodyLength = Infinity;
axios.defaults.maxContentLength = Infinity;

// configuration for accessing S3
const config = {
    bucketName: 'movie-storing',
    region: 'ap-southeast-1',
    accessKeyId: 'AKIAXIAIX4DZTFJJQW64',
    secretAccessKey: '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'
}

export function MovieUpload() {
    var movie;

    // storing movie information => upload to dynamoDB
    function settingMovieInfor(e) {
        movie = e.target.value
        console.log(e.target.value)
    }


    var state = {
        file: null,
        base64URL: ""
    };

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };

    // configuration for sending base64 file to nodejs server
    const [file64, setFile] = useState();

    function settingImg(e) {
        console.log(e.target.files[0]);
        let { file } = state;

        file = e.target.files[0];
        
        // convert normal file to base64 file to upload
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                // console.log("File Is", file);
                setFile(result);
                console.log("file lenght: " + result.length)
            })
            .catch(err => {
                console.log(err);
            });

        

        
    }

    // posting image function using nodejs server
    async function postImg() {

        // package data for sending
        const formData = new FormData();
        formData.append("filename", "movie-pic.jpeg")
        formData.append("file", file64)
        

        // calling upload api
        axios.post("http://localhost:9600/upload-img", formData)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })

    }

    

    // modify UI below
    return (
        <div>
            <form onSubmit={postImg}>
                <div>
                    <span>Movie Name: </span>
                    <input type="text" name="movieName" onChange={settingMovieInfor} placeholder="movie"></input>
                </div>
                <div>
                    <span>Movie Background: </span>
                    {/* // ***********  JPEG FILE ONLY *********** */}
                    <input type="file" onChange={settingImg} ></input>
                </div>
                <button type="submit" > Upload Movie</button>
                
            </form>
            
            
        </div>
    )
}