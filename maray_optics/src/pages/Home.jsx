import Navbar from "../components/navbar";
import { Link } from 'react-router-dom';
import '../../styles/home.css'

const Home = () =>{
    return(
        <>
            <main className="mainHome">
                <Navbar/>
                
                <h2>Home</h2>
            </main>

            
        </>
    )
}

export default Home;