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
        `https://6pjh74t9n3.execute-api.ap-southeast-1.amazonaws.com/movie/moviedetail?movId=${movieID}`,
        fetcher
    );
    console.log(data)
    if (!data) return null;
    const { title, backdrop_path, poster_path, overview, genre, youtube_id } = data.movie;
    return (
        <>
            <div className="w-full h-[600px] relative -mt-[72px] -z-10">
                <div className="absolute inset-0 bg-black overplay bg-opacity-60"></div>
                <div
                    className="w-full h-full bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(https://movie-storing.s3.ap-southeast-1.amazonaws.com/${backdrop_path})
                    `,
                    }}></div>
            </div>
            <div className="w-full max-w-[288px] h-[500px] mx-auto -mt-[250px] relative z-10 pb-10">
                <img
                    src={`https://movie-storing.s3.ap-southeast-1.amazonaws.com/${poster_path}`}
                    alt=""
                    className="object-cover w-full h-full rounded-xl"
                />
            </div>
            <h1 className="mb-6 text-4xl font-bold text-center">{title}</h1>
            <div className="flex items-center justify-center mb-10 gap-x-5">
                {genre.length > 0 &&
                    genre.map((item) => (
                        <span
                            className="px-4 py-2 border rounded-lg border-primary text-primary "
                            key={item}>
                            {item}
                        </span>
                    ))}
            </div>
            <p className="italic font-thin mx-auto text-center w-full max-w-[600px] mb-5">
                {overview}
            </p>

            <VideoItem title={title} youtube_id={youtube_id}/>
            
            
        </>
    );
};


const VideoItem = (props) => {
    

    return (
        <div className="flex flex-col items-center justify-center gap-10 mb-12 ">
            <div className="flex flex-col gap-2" >
                <h3 className="text-3xl font-semibold">{props.title} Official Trailer</h3>
                <div className="aspect-video">
                    <iframe
                        width="1166"
                        height="656"
                        src={`https://www.youtube.com/embed/${props.youtube_id}`}
                        title="One Piece Film Red Theme (Lofi Hip Hop Remix)"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={"true"}
                        className="mx-auto"></iframe>
                </div>
            </div>
        </div>
    );
};



export default MovieDetailPage;
