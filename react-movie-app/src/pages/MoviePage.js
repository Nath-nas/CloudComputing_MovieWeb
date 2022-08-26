import React, { useEffect, useState } from "react";
import MovieCard from "../components/movies/MovieCard";
import useSWR from "swr";
import { api_key, fetcher } from "../config";
import { useDebounce } from "../hooks/useDebounce";
//https://api.themoviedb.org/3/search/movie?api_key=${api_key}
const MoviePage = () => {
    const [query, setQuery] = useState("");
    const queryDebounce = useDebounce(query, 500);
    const [nextPage, setNextPage] = useState(1);
    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${nextPage}`
    );
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    useEffect(() => {
        if (queryDebounce) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${queryDebounce}&page=${nextPage}`
            );
        } else {
            setUrl(
                `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${nextPage}`
            );
        }
    }, [queryDebounce, nextPage]);
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;
    if (!data) return null;
    const { page, total_pages } = data;
    const movies = data?.results || [];
    console.log(movies);
    return (
        <div className="flex flex-col items-center justify-center pb-10 page-container">
            <div className="relative flex w-full mb-10">
                <input
                    type="text"
                    className="flex-1 p-4 text-base font-semibold text-white rounded-lg outline-none bg-slate-800"
                    placeholder="Type here to search"
                    onChange={(e) => handleChange(e)}
                />
                <button className="absolute right-0 transition-all top-1 -translate-x-2/4 translate-y-2/4 hover:text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            {loading && (
                <div className="w-10 h-10 border-4 rounded-full border-t-transparent border-primary animate-spin"></div>
            )}
            <div className="grid grid-cols-4 gap-10 mb-10">
                {!loading &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="flex items-center gap-x-5">
                <span
                    className="cursor-pointer"
                    onClick={() => setNextPage(nextPage + 1)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </span>
                {!loading &&
                    new Array(5).fill(null).map((item, index) => (
                        <span
                            className="cursor-pointer"
                            onClick={() => setNextPage(index + 1)}>
                            {index + 1}
                        </span>
                    ))}

                <span
                    className="cursor-pointer"
                    onClick={() => setNextPage(nextPage + 1)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default MoviePage;
