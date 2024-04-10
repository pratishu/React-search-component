import { useState, useEffect } from "react";
import DropdownCard from "./components/DropdownCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    fetch(`https://dummyjson.com/posts/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const changeddata = data.posts; // this dummyjson API sends object with `posts` array inside, expected: array with object inside
        setResults(changeddata);
        setShowDropdown(true);
      })
      .catch((error) => console.error("Error:", error));
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setShowDropdown(false);
    }
  };

  const closeDropdown = (value) => {
    setShowDropdown(value);
  };

  return (
    <>
      <div className="container">
        <div className="mt-16 min-h-screen w-full flex justify-center items-start py-8">
          <div className="w-[1000px]">
            <div className="relative w-full min-w-[600px]">
              <input
                type="text"
                placeholder="Search for Posts"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border rounded-lg bg-zinc-100 focus:outline-none text-text "
              />
              {showDropdown && results.length > 0 && (
                <div className="absolute w-full mt-2 max-w-[1000px] ">
                  <ul className="flex gap-2 flex-col ">
                    {results.map((result, id) => (
                      <DropdownCard
                        result={result}
                        closeDropdown={closeDropdown}
                        key={id}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
