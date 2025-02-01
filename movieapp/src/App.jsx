import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "@react-hook/debounce";
import {updateSearchCount} from "./appwrite.js";


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

    const [debouncedSearchTerm  , setDebouncedSearchTerm  ] = useState('')

    //Debounce the searchTerm to prevent too many Aoi requests
    //By waiting for the user to stop typing for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchMovies = async (query) => {

        setLoading(true);
        setErrorMessage("")

        try {

            const endpoint = query ?
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
                `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Could not fetch movies");
            }

            const data = await response.json();

            if(data.response === 'False'){
                setErrorMessage(data.Error || "Failed to fetch movies.");

            }

            setMovieList(data.results || []);
            if(query && data.result.length > 0) {
                await updateSearchCount(query, data.result[0]);
            }


        } catch (error){
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

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
                    <h2 className="mt-[40px]">All Movies</h2>

                    {loading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">Error: {errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
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
