import React from "react";
import useSWR from "swr";
import { api_key, fetcher } from "../config";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movies/MovieCard";

// import MovieInfo from "../components/movies/MovieInfo";
const MovieDetailPage = () => {
    const { movieID } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${api_key}`,
        fetcher
    );
    if (!data) return null;
    const { title, backdrop_path, poster_path, overview, genres } = data;
    return (
        <>
            <div className="w-full h-[600px] relative -mt-[72px] -z-10">
                <div className="absolute inset-0 bg-black overplay bg-opacity-60"></div>
                <div
                    className="w-full h-full bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})
                    `,
                    }}></div>
            </div>
            <div className="w-full max-w-[288px] h-[500px] mx-auto -mt-[250px] relative z-10 pb-10">
                <img
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt=""
                    className="object-cover w-full h-full rounded-xl"
                />
            </div>
            <h1 className="mb-6 text-4xl font-bold text-center">{title}</h1>
            <div className="flex items-center justify-center mb-10 gap-x-5">
                {genres.length > 0 &&
                    genres.map((item) => (
                        <span
                            className="px-4 py-2 border rounded-lg border-primary text-primary "
                            key={item.id}>
                            {item.name}
                        </span>
                    ))}
            </div>
            <p className="italic font-thin mx-auto text-center w-full max-w-[600px] mb-5">
                {overview}
            </p>

            <CastItem className="mb-10"></CastItem>
            <VideoItem></VideoItem>
            <SimilarItem title={title}></SimilarItem>
        </>
    );
};

const CastItem = () => {
    const { movieID } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${api_key}`,
        fetcher
    );
    if (!data) return null;
    // console.log(data);
    const { cast } = data;

    return (
        <div className="mb-10">
            <h3 className="mb-4 text-4xl font-bold text-center">Cast</h3>
            <div className="flex items-center justify-center gap-x-4 page-container">
                {cast.length > 0 &&
                    cast.slice(0, 6).map((item) => (
                        <div key={item.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                                alt=""
                                className="h-[300px]"
                            />
                            <h3 className="text-center">{item.name}</h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

const VideoItem = () => {
    const { movieID } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${api_key}`,
        fetcher
    );
    if (!data) return null;
    // console.log(data);
    const { results } = data;
    return (
        <div className="flex flex-col items-center justify-center gap-10 mb-12 ">
            {results.length > 0 &&
                results.splice(0, 2).map((item) => (
                    <div className="flex flex-col gap-2" key={item.id}>
                        <h3 className="text-3xl font-semibold">{item.name}</h3>
                        <div className="aspect-video">
                            <iframe
                                width="1166"
                                height="656"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="One Piece Film Red Theme (Lofi Hip Hop Remix)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={"true"}
                                className="mx-auto"></iframe>
                        </div>
                    </div>
                ))}
        </div>
    );
};

const SimilarItem = ({ title }) => {
    const { movieID } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${api_key}`,
        fetcher
    );
    if (!data) return null;
    console.log(data);
    const { results } = data;
    return (
        <div className="page-container">
            <h3 className="mb-5 text-4xl font-bold">Cause You Watch {title}</h3>
            <div className="movie-list">
                <Swiper
                    grabCursor={"true"}
                    spaceBetween={40}
                    slidesPerView={"auto"}>
                    {results.length > 0 &&
                        results.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MovieDetailPage;
