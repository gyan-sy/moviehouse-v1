import React, { useState, useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCardWishlist from "../../components/movieCardWishlist/MovieCardWishlist";
import { fetchDataFromApi } from "../../utils/api";
import "./style.scss";

const Wishlist = () => {
    const [movies, setMovies] = useState(() => {
        const movieWishlist = JSON.parse(localStorage.getItem("movieWishlist")) || [];
        return movieWishlist;
    });

    const [tvShows, setTvShows] = useState(() => {
        const tvWishlist = JSON.parse(localStorage.getItem("tvWishlist")) || [];
        return tvWishlist;
    });

    useEffect(() => {
        // Fetch movie wishlist
        const movieWishlist = JSON.parse(localStorage.getItem("movieWishlist")) || [];
        Promise.all(movieWishlist.map(id => fetchDataFromApi(`/movie/${id}`)))
            .then(data => {
                setMovies(data.reverse());
            })
            .catch(error => {
                console.error("Error fetching movie wishlist:", error);
            });

        // Fetch TV show wishlist
        const tvWishlist = JSON.parse(localStorage.getItem("tvWishlist")) || [];
        Promise.all(tvWishlist.map(id => fetchDataFromApi(`/tv/${id}`)))
            .then(data => {
                setTvShows(data.reverse());
            })
            .catch(error => {
                console.error("Error fetching TV show wishlist:", error);
            });
    }, []);

    const removeFromWishlist = (id, mediaType) => {
        const wishlistKey = mediaType === "movie" ? "movieWishlist" : "tvWishlist";
        
        if (mediaType === "movie") {
            setMovies(prevMovies => {
                const updatedMovies = prevMovies.filter(movie => movie.id !== id);
                localStorage.setItem(wishlistKey, JSON.stringify(updatedMovies.map(movie => movie.id)));
                return updatedMovies;
            });
        } else if (mediaType === "tv") {
            setTvShows(prevTvShows => {
                const updatedTvShows = prevTvShows.filter(tv => tv.id !== id);
                localStorage.setItem(wishlistKey, JSON.stringify(updatedTvShows.map(tv => tv.id)));
                return updatedTvShows;
            });
        }
    };
    
    

    return (
        <div className="wishlistContainer">
            <ContentWrapper>
                <div className="pageTitle">
                    My Wishlist
                </div>

                <div className="movieSection">
                    <h2>Movies</h2>
                    {movies.length === 0 ? (
                        <p>No Movies in your wishlist</p>
                    ) : (
                        <div className="movieList">
                            {movies.map((item, index) => (
                                <MovieCardWishlist
                                    key={index}
                                    data={item}
                                    mediaType="movie"
                                    onRemove={() => removeFromWishlist(item.id,"movie")}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="tvSection">
                    <h2>TV Shows</h2>
                    {tvShows.length === 0 ? (
                        <p>No TV shows in your wishlist</p>
                    ) : (
                        <div className="tvList">
                            {tvShows.map((item, index) => (
                                <MovieCardWishlist
                                    key={index}
                                    data={item}
                                    mediaType="tv"
                                    onRemove={() => removeFromWishlist(item.id,"tv")}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Wishlist;
