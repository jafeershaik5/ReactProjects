import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard"; // Assuming difficulty has fixed values
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

function SearchBar() {
  const [data, setData] = useState<null | Recipe[]>(null);
  const [query, setQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<null | Recipe>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (!query.trim()) {
        setData([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/search?q=${query}`
        );

        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }

        const result = await response.json();
        setData(result?.recipes);
      } catch (error: unknown) {
        console.error("Error =>", error);
        // Ensure error is a string before setting it in state
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    const timerId = setTimeout(getData, 200);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [query]);
  console.log("data=>", data);
  const handleFocus = () => {
    setShowResults(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };
  const handleSelectRecipe = (item: Recipe) => {
    setSelectedRecipe(item);
    setQuery("");
  };

  return (
    <>
      <div className="flex flex-col items-center relative group">
        <div className="w-[250px] xs:w-[350px] sm:w-[450px] md:w-[550px] lg:w-[650px] relative">
          <input
            type="text"
            placeholder="Search Recipe..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className={`w-full px-6 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            placeholder-gray-400 dark:placeholder-gray-400 transition-all duration-200 rounded-lg 
            border border-gray-300 dark:border-gray-600
            ${
              showResults &&
              data &&
              (query || loading || error || data.length > 0)
                ? "rounded-b-none border-b-0"
                : ""
            }
            shadow-sm outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600`}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {showResults &&
            data &&
            (query || loading || error || data.length > 0) && (
              <div
                className="absolute top-full w-full bg-white dark:bg-gray-800 border border-t-0 
                border-gray-300 dark:border-gray-600 rounded-b-lg shadow-lg dark:shadow-xl 
                z-50 overflow-hidden"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div className="max-h-80 overflow-y-auto">
                  {error ? (
                    <div className="p-4 text-red-600 dark:text-red-400 text-center text-sm font-medium">
                      ⚠️ {error}
                    </div>
                  ) : loading ? (
                    <div className="p-4 text-gray-500 dark:text-gray-400 text-center text-sm">
                      🔍 Searching...
                    </div>
                  ) : data.length === 0 && query ? (
                    <div className="p-4 text-gray-500 dark:text-gray-400 text-center text-sm">
                      😞 No recipes found for "{query}"
                    </div>
                  ) : (
                    data.map((item: Recipe) => (
                      <button
                        key={item.id}
                        className={`w-full px-6 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 
                        transition-colors duration-150 text-gray-700 dark:text-gray-200 text-sm 
                        font-medium border-gray-100 dark:border-gray-600 first:border-t-0`}
                        onMouseDown={() => handleSelectRecipe(item)}
                      >
                        {item.name}
                        <span className="text-gray-400 dark:text-gray-400 ml-2 text-xs">
                          ({item.cuisine})
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
        </div>
        {selectedRecipe && (
          <RecipeCard key={selectedRecipe.id} {...selectedRecipe} />
        )}
      </div>
    </>
  );
}

export default SearchBar;
