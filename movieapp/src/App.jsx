import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const [errorMessage, setErrorMessage] = useState("");

    const [movieList, setMovieList] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchMovies = async () => {
        try {

            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Could not fetch movies");
            }

            const data = await response.json();

            if(data.response === 'False'){
                setErrorMessage(data.error || "Failed to fetch movies.");
            }

            setMovieList(data.results || []);

        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">movies</span> you&apos;ll enjoy without the hassle</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2>All Movies</h2>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>

                <h1 className="text-white">{searchTerm}</h1>
            </div>
        </main>
    )
}
export default App
