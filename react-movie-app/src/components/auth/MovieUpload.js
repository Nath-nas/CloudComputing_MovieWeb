import React, { useEffect, useState } from "react";
import axios from "axios";



axios.defaults.maxBodyLength = 60000000;
axios.defaults.maxContentLength = 60000000;
axios.defaults.timeout = 180000;

// configuration for accessing S3
const config = {
    bucketName: 'movie-storing',
    region: 'ap-southeast-1',
    accessKeyId: 'AKIAXIAIX4DZTFJJQW64',
    secretAccessKey: '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'
}

export function MovieUpload() {
    const [newId, setNewId] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [voteAverage, setVoteAverage] = useState("");
    const [movieName, setMovieName] = useState("");
    const [overview, setOverview] = useState("")
    const [youTubeId, setYouTubeId] = useState("");


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

    
    

    const [backdropPath, setbackdropPath] = useState("")
    function upadteBackdropPath(e) {
        console.log(e.target.files[0]);
        let { file } = state;

        file = e.target.files[0];
        
        // convert normal file to base64 file to upload
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                // console.log("File Is", file);
                setbackdropPath(result);
                console.log("file lenght: " + result.length)
            })
            .catch(err => {
                console.log(err);
            });

        

        
    }

    const [posterPath, setposterPath] = useState("")
    function updatePosterPath(e) {
        console.log(e.target.files[0]);
        let { file } = state;

        file = e.target.files[0];
        
        // convert normal file to base64 file to upload
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                // console.log("File Is", file);
                setposterPath(result);
                console.log("file lenght: " + result.length)
            })
            .catch(err => {
                console.log(err);
            });

        

        
    }



    const [up_stat, setUp] = useState("Pending");
    const [progessPercent, setProgess] = useState();
    // posting image function using nodejs server
    async function postImg() {

        // package data for sending
        const backdropData = new FormData();
       
        backdropData.append(newId + "_backdrop_path.jpeg", backdropPath);

        const posterData = new FormData();
        posterData.append(newId + "_poster_path.jpeg", posterPath);
        
        const option = {
            headers: {

            },
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor((loaded / 100) / total);
                setProgess(percent);
                console.log(percent)
            }
        }

        

        // calling upload api
        // Upload image to s3
        axios.post("https://7qnd9h1zea.execute-api.ap-southeast-1.amazonaws.com/files-upload/file-uploads", backdropData).then((res) => {
            console.log(res)
        }).catch((err) => {
            setUp('Error')
            console.log(err);
        })

        axios.post("https://7qnd9h1zea.execute-api.ap-southeast-1.amazonaws.com/files-upload/file-uploads", posterData).then((res) => {
            console.log(res)
        }).catch((err) => {
            setUp('Error')
            console.log(err);
        })

        

        // update movie to dynamoDB
        // build algorithm to generate movie_id
        axios.post('https://6pjh74t9n3.execute-api.ap-southeast-1.amazonaws.com/movie/movieinfo', {
            id: String(newId),
            title: movieName,
            release_date: releaseDate,
            vote_average: voteAverage,
            overview: overview,
            backdrop_path: newId + "_backdrop_path.jpeg",
            poster_path: newId + "_poster_path.jpeg",
            genre: ["Action", "Horror"],
            youtube_id: youTubeId
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })

    }

    
    

    // fix debouncing
    useEffect(() => {

        // get movie from dynamoDB
        axios.get('https://6pjh74t9n3.execute-api.ap-southeast-1.amazonaws.com/movie/getnewid').then(res => {
            console.log(res);
            setNewId(res.data.newId);
        }).catch(err => {
            console.log(err)
        })
    })

    // modify UI below
    return (
        <div>
            <div>
                <span>Movie Id: </span>
                <input style={{color: "black"}} type="text" name="movieName" placeholder="id" value={newId}></input>
            </div>
            <div>
                <span>Movie Name: </span>
                <input style={{color: "black"}} type="text" name="movieName" onChange={e => setMovieName(e.target.value)} placeholder="movie"></input>
            </div>

            <div>
                <span>Overview: </span>
                <input style={{color: "black"}} type="text" name="movieName" onChange={e => setOverview(e.target.value)} placeholder="overview"></input>
            </div>

            <div>
                <span>Youtube Id: </span>
                <input style={{color: "black"}} type="text" name="movieName" onChange={e => setYouTubeId(e.target.value)} placeholder="Youtube Id"></input>
            </div>

            <div>
                <span>Release Date: </span>
                <input style={{color: "black"}} type="text" name="movieName" onChange={e => setReleaseDate(e.target.value)} placeholder="release date"></input>
            </div>

            <div>
                <span>Vote Average: </span>
                <input style={{color: "black"}} type="text" name="movieName" onChange={e => setVoteAverage(e.target.value)} placeholder="vote average"></input>
            </div>

            <div>
                <span>Movie Poster: </span>
                {/* // ***********  JPEG FILE ONLY *********** */}
                <input type="file" onChange={updatePosterPath} ></input>
            </div>

            

            <div>
                <span>Movie Backgrop: </span>
                {/* // ***********  JPEG FILE ONLY *********** */}
                <input type="file" onChange={upadteBackdropPath} ></input>
            </div>
            <button onClick={postImg}> Upload Movie</button>
                
           
            <h1>{up_stat}</h1>
            <h2>{progessPercent}</h2>
        </div>
    )
}