import { Recipe } from "./SearchBar";

export default function RecipeCard(props: Recipe) {
  const {
    image,
    name,
    difficulty,
    rating,
    instructions,
    ingredients,
    prepTimeMinutes,
    cookTimeMinutes,
    cuisine,
    servings,
  } = props;

  return (
    <div
      className="max-w-4xl mx-auto my-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
      hover:shadow-2xl dark:hover:shadow-xl dark:shadow-gray-900/30 transition-shadow 
      duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 
            transition-transform duration-300"
        />
        <div
          className="absolute top-4 right-4 bg-amber-400 dark:bg-amber-500 px-4 py-2 
          rounded-full shadow-md flex items-center gap-2"
        >
          <span className="font-semibold text-gray-800 dark:text-gray-900">
            ★ {rating}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-900">
            ({Math.round(rating * 20)}%)
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Title and Basic Info */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
            <span
              className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 
              dark:text-blue-400 rounded-full text-sm font-medium"
            >
              {difficulty}
            </span>
            <span
              className="px-3 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 
              dark:text-green-400 rounded-full text-sm font-medium"
            >
              {cuisine}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-orange-500 dark:text-orange-400">⏳</span>
              <span>{prepTimeMinutes + cookTimeMinutes} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-500 dark:text-orange-400">👥</span>
              <span>Serves {servings}</span>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients Section */}
          <div>
            <h3
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 
              border-b-2 border-blue-100 dark:border-blue-800/30"
            >
              Ingredients
            </h3>
            <ul className="space-y-2">
              {ingredients?.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600 dark:text-gray-300 
                    before:content-['•'] before:text-orange-500 dark:before:text-orange-400 
                    before:mr-2"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div>
            <h3
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 
              border-b-2 border-blue-100 dark:border-blue-800/30"
            >
              Instructions
            </h3>
            <ol className="space-y-4">
              {instructions?.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 dark:text-gray-300"
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 bg-orange-500 dark:bg-orange-400 
                    text-white rounded-full flex items-center justify-center mr-3"
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
