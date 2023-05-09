const { useState } = React

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx"
import { HomePage } from "./views/home.jsx"
import { About } from "./views/about.jsx"
import { BookIndex } from "./views/book-index.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { BookEdit } from "./views/book-edit.jsx"
import { BookDetails } from "./views/book-details.jsx"
import { Vision } from "./assets/style/cmps/vision.jsx"
import { Team } from "./assets/style/cmps/team.jsx"
import { ReviewEdit } from "./views/review-edit.jsx"


export function App() {
   
    return (
        <Router>
            <section className="app main-layout">

                <AppHeader/>
                
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<Team/>} />
                            <Route path="/about/vision" element={<Vision/>} />
                        </Route>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/:bookId/review" element={<ReviewEdit />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )


}