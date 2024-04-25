import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
//import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { MdDownloading } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const DetailsBanner = ({ crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    //const _genres = data?.genres?.map((g) => g.id);
    //add at line 74 <Genres data={_genres} url={mediaType}/>

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const handleDownload = (url) => {
        window.open(url, '_blank');
    };

    const addToWishlist = () => {
        let wishlist = JSON.parse(localStorage.getItem(mediaType === "movie" ? "movieWishlist" : "tvWishlist")) || [];
        
        if (!wishlist.includes(id)) {
            wishlist.push(id);
            localStorage.setItem(mediaType === "movie" ? "movieWishlist" : "tvWishlist", JSON.stringify(wishlist));
        }
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={"https://image.tmdb.org/t/p/w1280" + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img
                                                className="posterImg"
                                                src={
                                                    "https://image.tmdb.org/t/p/w342" +
                                                    data.poster_path
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${
                                                data.name || data.title
                                            } (${dayjs(
                                                data?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                    
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>



                                        <div className="row">
                                             <FaRegStar /> Rating : {data.vote_average.toFixed(1)} / 10
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            data.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i+1}>
                                                            {i > 0 && <span> , </span>}
                                                            {d.name}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i+1}>
                                                            {i > 0 && <span> , </span>}
                                                            {d.name}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i+1}>
                                                            {i > 0 && <span> , </span>}
                                                            {d.name}
                                                        </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        <div className="feature-buttons">
                                            {data.poster_path && (
                                                <button
                                                    onClick={() =>
                                                        handleDownload(
                                                            `https://image.tmdb.org/t/p/original${data.poster_path}`
                                                        )
                                                    }
                                                >
                                                    <MdDownloading className="react-icons" />
                                                    <div className="txt"> Postert</div>
                                                </button>
                                            )}
                                            {data.backdrop_path && (
                                                <button
                                                    onClick={() =>
                                                        handleDownload(
                                                            `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                                                        )
                                                    }
                                                >
                                                    <MdDownloading className="react-icons"/>
                                                    <div className="txt"> Background</div>
                                                </button>
                                            )}
                                            <button onClick={addToWishlist}>
                                                <FaRegHeart className="react-icons"/> 
                                                <div className="txt"> Wishlist</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
