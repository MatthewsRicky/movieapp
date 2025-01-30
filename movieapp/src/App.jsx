import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
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

    const fetchMovies = async () => {
        try {
            const response = await fetch(API_BASE_URL, {})
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {}, [])

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
