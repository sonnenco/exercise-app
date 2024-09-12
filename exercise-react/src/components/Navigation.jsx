import '../App.css';
import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <nav>
            <Link className="nav-item" to="/">Homepage</Link>
            <Link className="nav-item" to="/create-exercise">Create an exercise</Link>
        </nav>
    );
}

export default Navigation;