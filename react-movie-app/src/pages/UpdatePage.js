import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
// import { ConnectCampaigns } from "aws-sdk";

const UpdatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    var state = {
        file: null,
        base64URL: "",
    };

    const [newId, setNewId] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [voteAverage, setVoteAverage] = useState("");
    const [movieName, setMovieName] = useState("");
    const [overview, setOverview] = useState("");
    const [youTubeId, setYouTubeId] = useState("");
    const [backdropPath, setbackdropPath] = useState("");
    const [posterPath, setposterPath] = useState("");

    const { data } = useSWR(
        `https://6pjh74t9n3.execute-api.ap-southeast-1.amazonaws.com/movie/moviedetail?movId=${id}`,
        fetcher
    );

    useEffect(() => {
        const mov = data.movie;
        setNewId(id);
        setReleaseDate(mov.release_date);
        setVoteAverage(mov.vote_average);
        setMovieName(mov.title);
        setOverview(mov.overview);
        setYouTubeId(mov.youtube_id);
        setbackdropPath(mov.backdrop_path);
        setposterPath(mov.poster_path);
    }, []);

    function updateImagePath(e) {
        console.log(e.target.files[0]);
        let { file } = state;

        file = e.target.files[0];

        // convert normal file to base64 file to upload
        getBase64(file)
            .then((result) => {
                file["base64"] = result;
                // console.log("File Is", file);
                setposterPath(result);
                console.log("file lenght: " + result.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateBackdrop(e) {
        console.log(e.target.files[0]);
        let { file } = state;

        file = e.target.files[0];

        // convert normal file to base64 file to upload
        getBase64(file)
            .then((result) => {
                file["base64"] = result;
                // console.log("File Is", file);
                setbackdropPath(result);
                console.log("file lenght: " + result.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getBase64 = (file) => {
        return new Promise((resolve) => {
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

    function generateGenreArray(e) {
        e.preventDefault();
        const genreField = document.querySelectorAll(".genre-field");
        let genres = [];
        genreField.forEach((item) => {
            if (item.checked) {
                genres.push(item.name);
            }
        });
        console.log(genres);
        return genres;
    }

    async function postImg() {
        // package data for sending
        const backdropData = new FormData();

        backdropData.append(newId + "_backdrop_path.jpeg", backdropPath);

        const posterData = new FormData();
        posterData.append(newId + "_poster_path.jpeg", posterPath);

        // calling upload api
        // Upload image to s3
        axios
            .post(
                "https://7qnd9h1zea.execute-api.ap-southeast-1.amazonaws.com/files-upload/file-uploads",
                backdropData
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post(
                "https://7qnd9h1zea.execute-api.ap-southeast-1.amazonaws.com/files-upload/file-uploads",
                posterData
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        // update movie to dynamoDB
        // build algorithm to generate movie_id
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !releaseDate ||
            !movieName ||
            !overview ||
            !youTubeId ||
            !voteAverage ||
            !posterPath ||
            !backdropPath
        ) {
            alert("Missing input!!!");
            return;
        }
        axios
            .patch(
                "https://6pjh74t9n3.execute-api.ap-southeast-1.amazonaws.com/movie/movieinfo",
                {
                    id: String(newId),
                    title: movieName,
                    release_date: releaseDate,
                    vote_average: voteAverage,
                    overview: overview,
                    youtube_id: youTubeId,
                }
            )
            .then((res) => {
                alert("Upload new film successed");
                navigate(`/movies/${id}`);
            })
            .catch((err) => {
                alert("Upload new film failed");
                console.log(err);
            });
    };

    const cancel = (e) => {
        navigate(`/movies/${id}`);
    };

    return (
        <div className="w-full max-w-[600px] mx-auto p-5">
            <h2 className="mb-10 text-4xl font-bold text-center">
                Uploading New Film
            </h2>
            <form
                onSubmit={handleSubmit}
                className="p-4 rounded-lg bg-slate-700">
                <div className="flex flex-col gap-2 mb-5">
                    {newId && (
                        <div>
                            <span className="text-xl font-semibold">
                                ID: {newId}
                            </span>
                        </div>
                    )}
                    <input
                        type="text"
                        className="p-2 border rounded-lg outline-none bg-slate-800 focus:border-primary"
                        placeholder="title"
                        onChange={(e) => setMovieName(e.target.value)}
                        value={movieName}
                    />
                    <input
                        type="text"
                        className="p-2 border rounded-lg outline-none bg-slate-800 focus:border-primary"
                        placeholder="Overview"
                        onChange={(e) => setOverview(e.target.value)}
                        value={overview}
                    />
                    <input
                        type="text"
                        className="p-2 border rounded-lg outline-none bg-slate-800 focus:border-primary"
                        placeholder="YoutubeID"
                        onChange={(e) => setYouTubeId(e.target.value)}
                        value={youTubeId}
                    />
                    <input
                        type="text"
                        className="p-2 border rounded-lg outline-none bg-slate-800 focus:border-primary"
                        placeholder="Release Date"
                        onChange={(e) => setReleaseDate(e.target.value)}
                        value={releaseDate}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded-lg outline-none bg-slate-800 focus:border-primary"
                        placeholder="Vote Average"
                        onChange={(e) => setVoteAverage(e.target.value)}
                        value={voteAverage}
                    />
                    
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-5 font-semibold rounded-lg bg-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => cancel()}
                        className="w-full p-3 mt-5 font-semibold rounded-lg bg-primary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePage;
