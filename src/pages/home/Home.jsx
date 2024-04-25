import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import MoviesTrending from "./trending/MoviesTrending";
import MoviesTopRated from "./topRated/MoviesTopRated";
import TvTrending from "./tv/TvTrending";
import TvTopRated from "./tv/TvTopRated";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <MoviesTrending />
            <TvTrending />
            <MoviesTopRated />
            <TvTopRated />
        </div>
    );
};

export default Home;
