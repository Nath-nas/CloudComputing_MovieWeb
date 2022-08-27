import React, { Fragment, useState, useContext, useEffect } from "react";
import MovieList from "../components/movies/MovieList";
import { AccountContext } from "../contexts/AccountContext";

const HomePage = () => {
    return (
        <Fragment>
            <section className="mb-10 movies-layout page-container">
                <h2 className="mb-5 text-2xl font-bold text-white capitalize">
                    Now Playing
                </h2>
                <MovieList type={"now_playing"}></MovieList>
            </section>

            <section className="mb-10 movies-layout page-container">
                <h2 className="mb-5 text-2xl font-bold text-white capitalize">
                    Top Rated Movies
                </h2>
                <MovieList type={"top_rated"}></MovieList>
            </section>

            <section className="mb-10 movies-layout page-container">
                <h2 className="mb-5 text-2xl font-bold text-white capitalize">
                    Trending
                </h2>
                <MovieList type={"popular"}></MovieList>
                
            </section>
           
        </Fragment>
    );
};

export default HomePage;
