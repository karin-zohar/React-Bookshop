const {Outlet, Link} = ReactRouterDOM

export function About() {
    return (
        <section className="about">
            <h1>Our mission: books for all</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas doloremque magnam porro perferendis eos fugit. Dolorum asperiores ducimus quisquam. Fugiat magnam dolores illum laboriosam, nostrum minima accusamus beatae dicta nemo!</p>
        
        <nav>
            <Link to="/about/team">Team |</Link>
            <Link to="/about/vision">Vision</Link>

            <section className="nested-routes">
                <Outlet />
            </section>
        </nav>
        </section>
    )
}