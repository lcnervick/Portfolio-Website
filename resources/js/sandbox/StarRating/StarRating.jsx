import React from "react";
import './StarRating.css';

export default function StarRating({ rating }) {
	// Ensure the rating is within the 0-5 range
	const clampedRating = Math.min(Math.max(rating, 0), 5);
	const stars = [];
  
	for (let i = 0; i < 5; i++) {
		if (i < Math.floor(clampedRating)) {
			// Fill in the star if it's less than the rating
			stars.push(<span key={i} className="filled-star">&#9733;</span>);
		} else if (i === Math.floor(clampedRating) && clampedRating % 1 !== 0) {
			// Fill in a partially filled star for fractional ratings
			const decimalWidth = `${(clampedRating % 1) * 100}%`;
			stars.push(
				<span key={i} className="partial-star">
					<span className="filled-star" style={{ width: decimalWidth }}>
					&#9733;
					</span>
					<span className="empty-star">
					&#9734;
					</span>
				</span>
			);
		} else {
			// Otherwise, display an empty star
			stars.push(<span key={i} className="empty-star">&#9734;</span>);
		}
	}
  
	return <div className="star-rating">{stars}</div>;
};

