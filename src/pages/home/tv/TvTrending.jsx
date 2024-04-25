import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const TvTrending = () => {

    const { data, loading } = useFetch("/trending/tv/week");

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending Tv Shows</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={"tv"}/>
        </div>
    );
};

export default TvTrending;
