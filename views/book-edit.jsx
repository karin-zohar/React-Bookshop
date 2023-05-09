const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => {
                navigate('/book')
                showErrorMsg('Book not found.')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        
        if (field === 'amount') {
            setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value } }))
        } else if (field === 'currencyCode') {
            setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, currencyCode: value } }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
                showSuccessMsg('Book Saved')
            })
    }

    const { title, listPrice: { amount, currencyCode }, description, thumbnail, authors } = bookToEdit

    return (
        <section className="book-edit">
            <h2>{bookToEdit.id ? 'Edit' : 'Add'} book</h2>

            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="authors">Authors:</label>
                <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />

                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <label htmlFor="description">Description:</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />

                <label htmlFor="thumbnail">thumbnail:</label>
                <input onChange={handleChange} type="text" name="thumbnail" id="thumbnail" />
                
                <label htmlFor="currencyCode">Currency:</label>
                <select name="currencyCode" id="currency-code" onChange={handleChange} value={currencyCode} >
                    <option value="EUR">EUR</option>
                    <option value="ILS">ILS</option>
                    <option value="USD">USD</option>
                </select>


                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}