
import Search from "./components/Search.jsx";

const App = () => {
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">movies</span> you&apos;ll enjoy without the hassle</h1>
                </header>

                <Search />
            </div>
        </main>
    )
}
export default App
