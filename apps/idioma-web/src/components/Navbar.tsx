import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <Link to="/idioms">Idioms</Link> |
            <Link to="/submit">Submit</Link> |
            <Link to="/login">Login</Link>
        </nav>
    )
}