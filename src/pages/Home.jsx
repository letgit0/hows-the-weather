import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

function Home() {
    return(
       <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-mauve-200">
        <SearchBar />
      </div>
    </div>
    )
}
export default Home;