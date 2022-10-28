import { useState, useEffect } from "react";
import "boxicons";
import Events from "./events.json";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState("");
  const [order, setOrder] = useState("asc");

  // find all cities for the select
  const cities = [...new Set(Events.map((event) => event.city))];


  // Create values for display to show the price ranges, example $0 - $20 uniformly
  const priceRanges = [
    { value: "0-20", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-500", label: "$200 - $500" },
  ]

  // Check and display the event whose price is lowest



  useEffect(() => {
    setEvents(Events);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Return all events whose city name match the search value or is like the search value
    const filteredEvents = Events.filter((event) =>
      event.city.toLowerCase().includes(value.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  // const handleReset = () => {
  //   setEvents(Events);
  //   setValue("");
  // };

  const handleCityOrder = (col) => {
    if (order === "asc") {
      const sortedEvents = [...events].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setEvents(sortedEvents);
      setOrder("desc");
    }

    if (order === "desc") {
      const sortedEvents = [...events].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setEvents(sortedEvents);
      setOrder("asc");
    }
  };

  const handlePriceOrder = (col) => {
    if (order === "asc") {
      const sortedEvents = [...events].sort((a, b) => a[col] - b[col]);
      setEvents(sortedEvents);
      setOrder("desc");
    }

    if (order === "desc") {
      const sortedEvents = [...events].sort((a, b) => b[col] - a[col]);
      setEvents(sortedEvents);
      setOrder("asc");
    }
  };

  return (
    <div className="overflow-x-auto relative">
      <form className="mb-4" onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by City"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <form className="flex items-center space-x-4 my-4">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-[9px]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by city ..."
            required
          />
        </div>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>City</option>
          {cities.map((city) => (
            <option value={city}>{city}</option>
          ))}
        </select>

        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Price</option>
          {/* Loop thro the price ranges and show labels and values */}
          {priceRanges.map((priceRange) => (
            <option value={priceRange.value}>{priceRange.label}</option>
          ))}
        </select>

        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer w-[25%]">
          <input type="checkbox" defaultValue id="default-toggle" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Min Price</span>
        </label>

        <button
          type="submit"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-sm sm:rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-3">#</th>
            <th scope="col" className="py-3 px-6">
              Id
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">
                <span className="mr-2">City</span>
                <span
                  className="mr-2 cursor-pointer"
                  onClick={() => handleCityOrder("city")}
                >
                  <box-icon name="sort-alt-2"></box-icon>
                </span>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">
                <span className="mr-2">Min Price</span>
                <span
                  className="mr-2 cursor-pointer"
                  onClick={() => handlePriceOrder("minPrice")}
                >
                  <box-icon name="sort-alt-2"></box-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {events.indexOf(event) + 1}
                </th>
                <td className="py-3 px-6">{event.id}</td>
                <th className="py-3 px-6">{event.name}</th>
                <td className="py-3 px-6">{event.city}</td>
                <td className="py-3 px-6">{event.minPrice}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-3 px-6">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
