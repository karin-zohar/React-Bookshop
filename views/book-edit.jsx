const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()
    

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(pararms.bookId)
            .then(setBookToEdit)
            .catch(err => {
                navigate('/book')
                showErrorMsg('Book not found.')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
            })
    }

    const {title, listPrice, description, thumbnail, authors} = bookToEdit

    return (
        <section className="book-edit">
            <h2>{bookToEdit.id ? 'Edit' : 'Add'} book</h2>

            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                
                <label htmlFor="authors">Authors:</label>
                <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />

                <label htmlFor="listPrice">Price:</label>
                <input onChange={handleChange} value={listPrice.amount} type="number" name="listPrice" id="listPrice" />
                
                <label htmlFor="description">Description:</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />
                
                <label htmlFor="thumbnail">thumbnail:</label>
                <input onChange={handleChange} type="text" name="thumbnail" id="thumbnail" />


                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )
    
}