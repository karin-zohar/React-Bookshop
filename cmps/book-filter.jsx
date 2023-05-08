import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('handle change')
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        console.log('on submit filter')
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, maxPrice } = filterByToEdit
    return (
        <section className="book-filter full main-layout">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title:</label>
                <input type="text" value={title} name="title" id="title" placeholder="By title" onChange={handleChange} />
                
                <label htmlFor="maxPrice">Title:</label>
                <input type="number" value={maxPrice} name="maxPrice" id="maxPrice" placeholder="By maximal price" onChange={handleChange} />

                <button>Filter books</button>
            </form>
        </section>
    )
}