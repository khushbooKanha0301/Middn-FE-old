import React from 'react'
import { Rating } from 'react-simple-star-rating'

export const StarRating = (props) => {
    return (
        <Rating size={50} readOnly={true} initialValue={props.ratings} fillIcon={props.customIcon} emptyIcon={props.customEmptyIcon} className="start-rating" />
    )
}