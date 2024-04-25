import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const TvTopRated = () => {

    const { data, loading } = useFetch("/tv/top_rated");

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated Tv Shows</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={"tv"}/>
        </div>
    );
};

export default TvTopRated;
