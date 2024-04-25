import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const MoviesTrending = () => {

    const { data, loading } = useFetch("/trending/movie/week");

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending Movies</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default MoviesTrending;
