import React, { useState } from "react";



export function MovieUpload() {
    const [movieName, setMovieName] = useState();
    const [imgName, setImg] = useState();
    var movie;

    function settingMovieInfor(e) {
        movie = e.target.value
        console.log(e.target.value)
    }

    function settingImg(e) {
        console.log(e.target.files)
    }

    function uploadMovie() {
        setMovieName(movie)
    }


    return (
        <div>
            <div>
                <span>Movie Name: </span>
                <input type="text" name="movieName" onChange={settingMovieInfor} placeholder="movie"></input>
            </div>
            <div>
                <span>Movie Background: </span>
                <input type="file" onChange={settingImg} ></input>
            </div>
            <button onClick={uploadMovie}> Upload Movie</button>
            <h1>{movieName + " - movie"}</h1>
        </div>
    )
}