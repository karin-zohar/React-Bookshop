import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { LongTxt } from '../cmps/long-txt.jsx'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])


    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in book details:', err);
                navigate('/book')
            })
    }


    function onBack() {
        navigate('/book')
        // navigate(-1)
    }


    function getPriceString(book) {
        return `${utilService.getCurrencySymbol(book.listPrice.currencyCode)} ${book.listPrice.amount}`
    }

    if (!book) return <div>Loading...</div>

    const readingLevel = bookService.getReadingLevel(book)
    const isVintage = bookService.checkVintage(book)
    const priceColor = bookService.checkPriceRange(book)
    const priceString = getPriceString(book)

    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.authors}</h3>
            <h4 style={priceColor}>{priceString}</h4>
            <img src={book.thumbnail} alt={`${book.title} cover`} />
            <ul>
                <li>{book.pageCount}</li>
                <li>{readingLevel}</li>
                <li>{isVintage}</li>
            </ul>
            <h4>Description:</h4>
            <LongTxt txt={book.description} />
            <button onClick={onBack}>Back</button>
        </section>
    )
}