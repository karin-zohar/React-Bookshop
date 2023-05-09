import { utilService } from "../services/util.service.js"

export function BookPreview({book}) {
    
    function getPriceString(book) {
        return `${utilService.getCurrencySymbol(book.listPrice.currencyCode)} ${book.listPrice.amount}`
    }

    const priceString = getPriceString(book)
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h3>{book.authors}</h3>
            <h4>{priceString}</h4>
            <img src={book.thumbnail} alt={`${book.title} cover`} />
            <p></p>
        </article>
    )
}

