import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

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
                <BookList onSelectBook={onSelectBook} books={books} onRemoveBook={onRemoveBook} />
            </React.Fragment>}

            {selectedBook && <BookDetails onBack={() => setSelectedBook(null)} book={selectedBook} />}
        </section>
    )

}