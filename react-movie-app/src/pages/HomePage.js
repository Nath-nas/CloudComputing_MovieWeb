import React, { Fragment, useEffect } from "react";
import MovieList from "../components/movies/MovieList";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const HomePage = () => {

    const {getSession} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        getSession().then(res => {

        }).catch(err => {
            navigate('/')
        })
    }, [])

    return (
        <Fragment>
            <section className="mb-10 movies-layout page-container">
                <h2 className="mb-5 text-2xl font-bold text-white capitalize select-none">
                    Now Playing
                </h2>
                <MovieList type={"now_playing"}></MovieList>
            </section>

            <section className="mb-10 movies-layout page-container">
                <h2 className="mb-5 text-2xl font-bold text-white capitalize select-none">
                    Top Rated Movies
                </h2>
                <MovieList type={"top_rated"}></MovieList>
            </section>

            <section className="mb-10 movies-layout page-container">
                <h2 className="mb-5 text-2xl font-bold text-white capitalize select-none">
                    Trending
                </h2>
                <MovieList type={"popular"}></MovieList>
            </section>
        </Fragment>
    );
};

export default HomePage;
