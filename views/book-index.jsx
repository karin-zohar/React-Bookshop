const { Link } = ReactRouterDOM
const { useEffect, useState } = React


import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { BookDetails } from "./book-details.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { SearchBookFromGoogle } from "../cmps/search-book-from-google.jsx"


export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    },[filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg(`Book ${bookId} has been removed.`)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSelectBook(book) {
        setSelectedBook(book)
    }

    return (
        <section className="book-index">
            {!selectedBook && <React.Fragment>
                <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <Link to="/book/edit"><button>Add Book</button></Link>
                <SearchBookFromGoogle />
                <BookList onSelectBook={onSelectBook} books={books} onRemoveBook={onRemoveBook} />
            </React.Fragment>}

            {selectedBook && <BookDetails onBack={() => setSelectedBook(null)} book={selectedBook} />}
        </section>
    )

}