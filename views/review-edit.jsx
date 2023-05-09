const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"


export function ReviewEdit() {
    
    const [reviewToEdit, setReviewToEdit] = useState(bookService.getEmptyReview())
    const navigate = useNavigate()
    const params = useParams()

    function onBack() {
        navigate((`/book/${params.bookId}`))
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.saveReview(params.bookId, reviewToEdit)
        showSuccessMsg('Review saved')
    }

    const { fullname, rating, readAt, txt } = reviewToEdit

    return (
        <section className="review-edit">
            <button onClick={onBack}>X</button>

            <form onSubmit={onSaveReview} className="add-review-form flex flex-column justify-center">

                <label htmlFor="fullname">Full Name:</label>
                <input required onChange={handleChange} value={fullname}
                    type="text" name="fullname" id="fullname" />

                <label htmlFor="rating">Rating:</label>
                <select onChange={handleChange} id="rating" name="rating" value={rating}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="readAt">Read At:</label>
                <input onChange={handleChange} value={readAt} type="date"
                    name="readAt" id="readAt" />

                <label htmlFor="txt">What did you think about this book?</label>
                <textarea onChange={handleChange} value={txt} type="text"
                    name="txt" id="txt" ></textarea>

                <button>Add Review</button>
            </form>
        </section>
    )
}



