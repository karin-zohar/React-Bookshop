const { Link } = ReactRouterDOM

import { ReviewPreview } from "./review-preview.jsx"

export function ReviewList({ reviews,onRemoveReview , bookId  }) {
    return (
        <ul className="review-list">
            {reviews.map(review =>
                <li key={review.id}>
                    <ReviewPreview review={review} />
                    <section>
                        <button onClick={() => onRemoveReview(bookId ,review.id)} >Remove review</button>
                        <button><Link to={`/review/${review.id}`} >Details</Link ></button>
                    </section>
                </li>
            )}
        </ul>
    )
}