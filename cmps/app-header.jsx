const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header full main-layout">
            <div className="header-container">
                <h1>Book Shop</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/book" >Books</NavLink>
                </nav>
            </div>
        </header>
    )
}