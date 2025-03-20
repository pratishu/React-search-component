// App.tsx
import { useCallback, useEffect, useState } from "react";
import DropdownCard from "./components/DropdownCard";
import { Post } from "./types"; // Create a types.ts file for shared interfaces

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: number;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/posts/search?q=${query}`
        );
        const data = await response.json();
        setResults(data.posts);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error:", error);
        setShowDropdown(false);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    // main div here
    <div className="flex flex-col bg-gray-100">
      <h1 className="font-montserrat text-gray-700 text-center mt-8">
        React Search Component
      </h1>
      {/* Search component */}
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg placeholder-gray-400 transition-all duration-200"
              />

              {isLoading && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="p-4 text-gray-500 text-sm">Searching...</div>
                </div>
              )}

              {showDropdown && results.length > 0 && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden">
                  <ul className="divide-y divide-gray-100">
                    {results.map((result) => (
                      <DropdownCard
                        key={result.id}
                        result={result}
                        closeDropdown={() => setShowDropdown(false)}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
