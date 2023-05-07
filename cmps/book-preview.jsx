export function BookPreview({book}) {
    return (
        <article className="car-preview">
            <h2>Title: {book.title}</h2>
            <h4>List Price: {book.listPrice}</h4>
            
        </article>
    )
}