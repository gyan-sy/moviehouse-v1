import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const MoviesTopRated = () => {

    const { data, loading } = useFetch("/movie/top_rated");

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated Movies</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={"movie"}/>
        </div>
    );
};

export default MoviesTopRated;
