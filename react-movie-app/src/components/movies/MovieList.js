import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { api_key, fetcher } from "../../config";
const MovieList = ({ type }) => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${api_key}`,
        fetcher
    );
    const movies = data?.results || [];
    console.log(movies);
    return (
        <div className="movie-list">
            <Swiper
                grabCursor={"true"}
                spaceBetween={40}
                slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
