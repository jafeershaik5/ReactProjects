import React, { useState, useEffect, useRef } from "react";

// Define possible states for the component
const STATE = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

function TypeAhead() {
    // State for storing the user's query
    const [query, setQuery] = useState('')

    // State for storing the search results
    const [result, setResult] = useState([])

    // State for tracking the status of the data fetch
    const [status, setStatus] = useState(STATE.SUCCESS)

    // Ref to store a reference to the input element
    const inputRef = useRef(null)

    // Ref to cache results to avoid redundant API calls
    const cache = useRef({})

    // Handler for updating the query state when the input changes
    const changeHandler = (e) => {
        setQuery(e.target.value)
    }

    // Effect to handle the data fetching logic
    useEffect(() => {
        // Focus on the input element when the component mounts
        inputRef.current.focus()

        // Create an AbortController to allow for aborting fetch requests
        const abortController = new AbortController()
        const { signal } = abortController;

        // Async function to fetch data from the API
        const getData = async () => {
            try {
                // Set status to LOADING before fetching data
                setStatus(STATE.LOADING)

                // Check if the query result is already in the cache
                if (cache.current[query]) {
                    console.log('retrieved from cache')
                    setResult(cache.current[query])
                    setStatus(STATE.SUCCESS)
                    return;
                }

                // If not in cache, make an API call
                console.log('API called')
                const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=15`, { signal })
                const data = await response.json()

                // Update the result state with the fetched data
                setResult(data.products)
                setStatus(STATE.SUCCESS)

                // Store the fetched data in the cache
                cache.current[query] = data.products

            } catch (error) {
                // Handle errors, except if the error is due to aborting the fetch
                if (error.name !== 'AbortError') {
                    setStatus(STATE.ERROR)
                }
            }
        }

        // Set a timer to debounce the input change and avoid excessive API calls
        let timerId = setTimeout(getData, 700)

        // Cleanup function to clear the timer and abort the fetch request if the component unmounts or query changes
        return () => {
            clearTimeout(timerId)
            abortController.abort()
        }
    }, [query]) // Re-run the effect whenever the query state changes

    return (
        <>
            {/* Input field for the user to type their query */}
            <input onChange={changeHandler} ref={inputRef} value={query} placeholder="Search..." />
            <br />
            {/* Display loading message while data is being fetched */}
            {status === STATE.LOADING && <h3>Loading ...</h3>}
            {/* Display error message if there was an error fetching data */}
            {status === STATE.ERROR && <h3>⚠️ERROR OCCURRED⚠️</h3>}
            {/* Display the fetched results if data fetch was successful */}
            {status === STATE.SUCCESS && (
                <ul>
                    {result.map((product, index) => {
                        return <li key={index}>{product.title}</li>
                    })}
                </ul>
            )}
        </>
    )
}

export default TypeAhead