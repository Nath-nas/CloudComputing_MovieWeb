import React, { Fragment } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";
const Banner = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=744d8cc0b08621bc75b1dbffe80f9214`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <section className="relative banner h-[400px] page-container mb-10">
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BannerItem item={item}></BannerItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

const BannerItem = ({ item: { title, backdrop_path, id } }) => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="absolute inset-0 bg-black overplay bg-opacity-30"></div>
            <img
                className="object-cover w-full h-full rounded-lg"
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                alt=""
            />
            <div className="absolute bottom-5 left-5">
                <h2 className="mb-5 text-3xl font-bold text-white">{title}</h2>
                <div className="flex items-center mb-8 gap-x-3">
                    <span className="px-4 py-1 text-white border border-white rounded-md">
                        Action
                    </span>
                    <span className="px-4 py-1 text-white border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="px-4 py-1 text-white border border-white rounded-md">
                        Drama
                    </span>
                </div>
                <button
                    onClick={() => navigate(`movies/${id}`)}
                    className="px-8 py-2 text-lg font-semibold text-white rounded-md bg-primary">
                    Watch Now
                </button>
            </div>
        </Fragment>
    );
};

export default Banner;
