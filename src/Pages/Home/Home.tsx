import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page. Please log in to access the admin panel.</p>
            <Link to="/login">Go to Login</Link>
        </div>
    );
}

export default Home