import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function CarIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

}