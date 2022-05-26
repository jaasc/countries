import React, { useState, useEffect } from 'react';
import Country from './Country';
import Details from './Details';
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [color, setMode] = useState(true);
  const [countries, setCountries] = useState([])

    useEffect(() => {
        async function getCountry() {
            const res = await fetch("https://restcountries.com/v2/all")
            const data = await res.json()
            setCountries(data)
        }
        getCountry()
    }, [])

  function toggleMode(){
    setMode(!color)
  }

  return (
    <div className="App">
      <header className={color? "light-elements" : "dark-elements"}>
        <h3>Where in the world?</h3>
        <div className="mode-Container" onClick={toggleMode}>
          <FontAwesomeIcon icon={faMoon} />
          <h3>{!color? "Light" : "Dark"} Mode</h3>
        </div>
      </header>
      
      <Router>
        <Routes>
          <Route path="/" element={<Country sMode={color} countries={countries}/>}/>
          <Route path="/details/:country" element={<Details sMode={color} countries={countries}/>}/>
        </Routes>
        </Router>
    </div>
  )
}

export default App;
