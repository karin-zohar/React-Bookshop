const { useState } = React

import { HomePage } from "./views/home.jsx"
import { AboutUs } from "./views/about.jsx"
import { BookIndex } from "./views/book-index.jsx"

export function App() {
    const [page, setPage] = useState('book')


    function handlePageChange(page) {
        setPage(page)
    }

    return (
        <section className="app main-layout">
            <header className="app-header full main-layout">
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <a onClick={() => handlePageChange('home')} href="#">Home</a> |
                    <a onClick={() => handlePageChange('book')} href="#">Books</a> |
                    <a onClick={() => handlePageChange('about')} href="#">About Us</a>
                </nav>
            </header>
            <main>
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />} 
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}