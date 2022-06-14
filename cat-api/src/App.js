import { useState, useEffect } from "react";
import "./App.css";

const apiKey = "b85d08cd-1f35-4385-a726-f64ca994864f"; //api key
const randURL = " https://api.thecatapi.com/v1/images/search"; //random search generator
const url = "https://api.thecatapi.com/v1/breeds?limit=10"; //limit to 10

function App() {
  const [cats, setCats] = useState(); // useState hook to dynamically render data for random cat search
  const [breed, setBreed] = useState([]); //useState hook with empty array parameter

  useEffect(() => {
    //useEffect hook with both random cat and breed selection functions
    getCat();
    getBreed();
  }, []); // Passing an empty array will allow the hook to only render once initially when mounting

  const getBreed = async () => {
    //async fetch call to retrieve data from search API
    const res = await fetch(url);
    const fetchRes = await res.json();
    console.log(fetchRes); //test to see if results are displayed in the console

    setBreed(fetchRes); //set usestate value to allow it to be used in JSX
  };

  const getCat = async () => {
    const res = await fetch(randURL, {
      headers: {
        "x-api-key": apiKey, //header for API key as per docs
      },
    });
    const fetchRes = await res //fetch call for search URL
      .json()
      .then((cats) => {
        setCats(cats[0].url); //returns 1st object and filters the image url
      })
      .catch((error) => {
        console.log("error: ", error); 
      });
  };

  //map through each element of breed and render image and name

  return (
    <div className="app">
      <div className="imgTop">
        <img src={cats} />
      </div>
      <div className="imgTop-btn">
        <button onClick={getCat}>Random Cat Generator</button> 
      </div>

      <h2>Breed Name</h2>

      <div className="imgBottom"> 
        {breed.map((element) => (
          <>
              <img src={element.image.url} />
              <h3>{element.name}</h3>
          
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
