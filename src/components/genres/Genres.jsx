import React, { useState, useEffect } from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";

const Genres = ({ data, url }) => {

    const { genres, loading } = useFetch(`/genre/${url}/list`);
    
    console.log("Genres data:", genres); 

    return (
        <div className="genres">
            {data?.map((g) => {
                if (!genres[g]?.name) return null;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
