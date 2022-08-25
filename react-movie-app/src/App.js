import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import MoviePage from "./pages/MoviePage";
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<744d8cc0b08621bc75b1dbffe80f9214>>&language=en-US&page=1
const App = () => {
    return (
        <Fragment>
            <Routes>
                <Route element={<Main></Main>}>
                    <Route
                        path="/"
                        element={
                            <>
                                <Banner></Banner>
                                <HomePage></HomePage>
                            </>
                        }></Route>
                    <Route
                        path="/movies"
                        element={<MoviePage></MoviePage>}></Route>{" "}
                    <Route
                        path="/movies/:movieID"
                        element={<MovieDetailPage></MovieDetailPage>}></Route>
                </Route>
            </Routes>
        </Fragment>
    );
};

export default App;
