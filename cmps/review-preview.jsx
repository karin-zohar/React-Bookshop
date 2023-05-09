export function ReviewPreview({review}) {
    const { fullname, rating, readAt, txt } = review

    function getStarsRatingString() {
        const star = '⭐'
        return star.repeat(rating)
    }

    const ratingString = getStarsRatingString()

    return (
        <article className="review-preview">
            <h4>{fullname}</h4>
            <ul>
                <li>Rating: {ratingString}</li>
                <li>Read At: {readAt}</li>
            </ul>
            <p>{txt}</p>
        </article>
    )
}

