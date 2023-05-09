import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { LongTxt } from '../cmps/long-txt.jsx'
import { ReviewList } from '../cmps/review-list.jsx'

const { Link } = ReactRouterDOM
const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
        loadNextAndPrevBookId()
    }, [bookId])


    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in book details:', err);
                navigate('/book')
            })
    }

    function loadNextAndPrevBookId() {
        bookService.getNextBookId(bookId, 1)
            .then(setNextBookId)
        bookService.getPrevBookId(bookId, (-1))
            .then(setPrevBookId)
    }

    function onBack() {
        navigate('/book')
    }


    function getPriceString(book) {
        return `${utilService.getCurrencySymbol(book.listPrice.currencyCode)} ${book.listPrice.amount}`
    }

    if (!book) return <div className="loader">Loading...</div>

    const readingLevel = bookService.getReadingLevel(book)
    const isVintage = bookService.checkVintage(book)
    const priceColor = bookService.checkPriceRange(book)
    const priceString = getPriceString(book)

    return (
        <section className="book-details">
            <button onClick={onBack}>Back</button>
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
            <button><Link to={`/book/edit/${book.id}`} >Edit</Link></button>
            <button><Link to={`/book/${book.id}/review`} >Add Review</Link></button>

            {book.reviews && !!book.reviews.length && (
                <React.Fragment>
                    <h3>Reviews:</h3>
                    <ReviewList reviews={book.reviews} />
                </React.Fragment>
            )
            }
            <Link to={`/book/${nextBookId}`}>
                <button>Next book</button>
            </Link>
            <Link to={`/book/${prevBookId}`}>
                <button>Previous book</button>
            </Link>
        </section>
    )
}