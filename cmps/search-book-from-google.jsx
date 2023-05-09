const { useState, useEffect } = React

import { GoogleResultList } from './google-results-list.jsx'
import { bookService } from '../services/book.service.js'
export function SearchBookFromGoogle() {
    // const [searchTitle, setSearchTitle] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {

    }, [searchResults])

    function handleChange({ target }) {
        console.log('target.value: ', target.value)
        bookService.getBooksFromGoogle(target.value)
            .then(setSearchResults)
    }

    function onSubmitSearch() {
        ev.preventDefault()
    }

    function onAddBook(book) {
        bookService.save(book)
    }

    return (
        <section className="search-book-from-google">
            <form onSubmit={onSubmitSearch}>
                <label htmlFor="search-google"><button>Add book from Google</button></label>
                <input type="search" name="search-google" id="search-google" placeholder="search by title" onChange={handleChange} />
            </form>
            {searchResults && searchResults.length &&
            <GoogleResultList searchResults={searchResults} onAddBook={() => onAddBook}/>}
        </section>
    )
} 