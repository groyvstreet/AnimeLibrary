import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context";
import CommentsService from "../API/CommentsService";
import {useParams} from "react-router-dom";
import RatingsService from "../API/RatingsService";

const StarItem = ({value, rating, loadAnime}) => {
    const {isAuth, user} = useContext(AuthContext)
    const params = useParams()

    const setRating = () => {
        if (isAuth) {
            const rating = {
                user: user.id,
                anime: params.id,
                number: value,
            }
            const token = localStorage.getItem('token')
            RatingsService.post(rating, token).then(() => loadAnime())
        } else {
            window.location.replace('http://localhost:3000/login')
        }
    }

    return (
        <svg width="32" height="32" viewBox="0 0 32 32">
            <use href="#star" fill={value <= rating ? 'green' : 'gray'} style={{cursor: 'pointer'}} onClick={setRating}></use>
        </svg>
    )
}

export default StarItem
