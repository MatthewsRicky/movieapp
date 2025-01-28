
import Search from "./components/Search.jsx";
import {useState} from "react";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">movies</span> you&apos;ll enjoy without the hassle</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <h1 className="text-white">{searchTerm}</h1>
            </div>
        </main>
    )
}
export default App
