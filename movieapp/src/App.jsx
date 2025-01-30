import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import error from "eslint-plugin-react/lib/util/error.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
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

        setLoading(true);
        setErrorMessage("")

        try {

            const endpoint = `${API_BASE_URL}/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Could not fetch movies");
            }

            const data = await response.json();

            if(data.response === 'False'){
                setErrorMessage(data.Error || "Failed to fetch movies.");
            }

            setMovieList(data.results || []);

        } catch (error){
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        }
        finally {
            setLoading(false);
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

                    {loading ? (
                        <p className="text-white">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error.message}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <p key={movie.id} className="text-white">{movie.title}</p>
                            ))}
                        </ul>
                    )}
                </section>

                <h1 className="text-white">{searchTerm}</h1>
            </div>
        </main>
    )
}
export default App
