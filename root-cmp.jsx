const { useState } = React

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx"
import { HomePage } from "./views/home.jsx"
import { About } from "./views/about.jsx"
import { BookIndex } from "./views/book-index.jsx"


export function App() {
    const [page, setPage] = useState('book')


    function onSetPage(page) {
        setPage(page)
    }

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader onSetPage={onSetPage} />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )


}