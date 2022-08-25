import React from "react";

const MovieInfo = ({
    item: {
        title,
        backdrop_path,
        poster_path,
        vote_average,
        vote_count,
        overview,
        release_date,
        genres,
    },
}) => {
    return (
        <div className="flex gap-x-5">
            <div className="w-full max-w-[220px] h-full ml-20 ">
                <img
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt=""
                    className="object-cover w-full h-full rounded-lg -translate-y-2/4"
                />
            </div>
            <div className="flex flex-col mt-2 -translate-y-1/2">
                <h2 className="text-3xl font-bold">{title}</h2>
                <div className="flex items-center mb-5 gap-x-2">
                    <span className="font-semibold">Votage:</span>
                    <span className="text-sm font-thin">
                        {Math.floor(Number(vote_average))}/10 ({vote_count}{" "}
                        votes)
                    </span>
                </div>
                <div className="flex flex-col justify-center mb-10">
                    <span className="text-lg font-semibold">Release Date</span>
                    <span>{release_date}</span>
                </div>
                <div className="flex flex-col mb-4 gap-y-2">
                    <h4 className="text-2xl font-semibold">Genre</h4>
                    <div className="flex items-center gap-x-5">
                        {genres.length > 0 &&
                            genres.map((item) => (
                                <span
                                    className="px-4 py-2 border border-white rounded-lg"
                                    key={item.id}>
                                    {item.name}
                                </span>
                            ))}
                    </div>
                </div>
                <div className="w-full pb-2">
                    <h3 className="text-3xl font-bold ">Overview</h3>
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
