import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let valuedata = "https://engineering-task.elancoapps.com/api/resources";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [valData, setValData] = useState(data);
  const [serchValue, setSerchValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("");
  const [check, setCheck] = useState<any>();
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(valuedata);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  //  const handleSearch = async () => {
  //    try {
  //      const response = await fetch(
  //        `https://api.example.com/search?q=${searchQuery}`
  //      );
  //      const data = await response.json();
  //      setSearchResults(data.results);
  //    } catch (error) {
  //      console.error("Error fetching search results:", error);
  //    }
  //  };
  const handleSearch = () => {
    let val = data.filter((el) => el == search);
    setSerchValue(val);
  };

  useEffect(() => {
    setValData(data);
  }, []);

  //Sort data
  let sortdata = () => {
    let val = data.sort();
    console.log(val, "value of data");
    setValData(val);
  };

  //search data
  useEffect(() => {
    const value = data.filter((item: any, data: any) => {
      return `${item.toLowerCase()}`.includes(searchValue.toLowerCase());
    });

    setCheck(value);
  }, [searchValue]);

  useEffect(() => {
    if (check && check.length > 0) {
      setSearchData(check);
    } else {
      setSearchData(data);
    }
  }, [check]);

  return (
    <div className="container w-4/5 mx-auto border my-5 xl:my-10 shadow-md rounded">
      <div className="flex justify-between  px-4 mt-4">
        <form className="w-3/5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
              required
              value={searchValue}
              onChange={(e) =>
                setSearchValue(e.target.value.replace(/[^a-zA-Z ]/gi, ""))
              }
            />
          </div>
        </form>
        <button
          onClick={() => sortdata()}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded my-3 ml-4"
        >
          Sort
        </button>
      </div>

      <div className="grid grid-col-12 text-left">
        {(searchData.length > 0 ? searchData : data).map((item) => (
          <h1 className="border-b py-2 px-4 flex">
            <span className="font-bold mr-2 w-1/5">Name : </span>
            <span>{item}</span>
          </h1>
        ))}
      </div>
    </div>
  );
}

export default App;
