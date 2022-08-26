import React from "react";
import "swiper/scss";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
    item: { title, release_date, vote_average, poster_path, id },
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full p-3 overflow-hidden text-white select-none rounded-2xl bg-slate-800 movie-card">
            <img
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt=""
                className="w-full h-[250px] rounded-2xl object-cover mb-4 hover:scale-105 transition-all "
            />
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <div className="flex items-center justify-between mt-auto mb-4">
                    <span className="text-sm font-thin opacity-50 ">
                        {new Date(release_date).getFullYear()}
                    </span>
                    <div className="flex items-center gap-x-2">
                        <i className="text-yellow-500 fa-solid fa-star"></i>
                        <span className="text-sm font-thin opacity-50 ">
                            {vote_average}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/movies/${id}`)}
                    className="w-full py-3 font-semibold rounded-lg bg-primary">
                    Watch Now
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
