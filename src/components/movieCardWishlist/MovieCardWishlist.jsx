import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import { MdOutlineDeleteForever } from "react-icons/md";

const MovieCardWishlist = ({ data, mediaType, onRemove }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? "https://image.tmdb.org/t/p/w342" + data.poster_path
        : PosterFallback;

    const handleRemove = () => {
        onRemove(data.id);
    };

    return (
        <div className="movieCard">
            <div className="posterBlock"
                onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
            >
                <Img className="posterImg" src={posterUrl} />
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
            <MdOutlineDeleteForever className="deleteBttn" onClick={handleRemove}/>
        </div>
    );
};

export default MovieCardWishlist;
