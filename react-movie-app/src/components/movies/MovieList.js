import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { api_key, fetcher } from "../../config";
const MovieList = ({ type }) => {
    const { data } = useSWR(
        `https://6pjh74t9n3.execute-api.ap-southeast-1.amazonaws.com/movie/movieinfo`,
        fetcher
    );
    const movies = data?.movies || [];
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
