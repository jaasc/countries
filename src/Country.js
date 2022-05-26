import React, { useState } from "react"
import { faMagnifyingGlass, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"

export default function Country(props){
    let navigate = useNavigate()
    const region = ["Africa", "America", "Asia", "Europe", "Oceana"]
    const [tRegion, setTRegion] = useState(false)
    const [srch, setSrch] = useState("")
    const [fReg, setFReg] = useState("")

    const filterRegions = region.map(reg => 
        <div key={reg} 
            className={`opReg${props.sMode? " light-elements" : " dark-elements"}`}  
            onClick={() => selFilter(reg)}>{reg}</div>)
    
    const listOfCountries = 
        (fReg ? props.countries.filter(b => b.name.startsWith(srch) && b.region === fReg) :
            srch ? props.countries.filter(b => b.name.startsWith(srch)):props.countries).map(a => {
        return(
            <div className={`indCountry ${props.sMode? " light-elements" : " dark-elements"}`}
                onClick={() => navigate(`/details/${a.name}`)} key={a.name}>
                <img src={a.flags.png} alt="flag"></img>
                <div className="indCountry-details">
                    <h1>{a.name}</h1>
                    <h4><span>Population: </span>{a.population}</h4>
                    <h4><span>Region: </span>{a.region}</h4>
                    <h4><span>Capital: </span>{a.capital}</h4>
                </div>
            </div>
        )
    })

    function searchCountry(event){
        srch ? setSrch(a => event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) : 
            setSrch(a => event.target.value.toUpperCase())
    }

    function toggleRegion(){
        setTRegion(!tRegion)
    }

    function selFilter(selreg){
        selreg !== "Filter by Region" ? setFReg(a => selreg) : setFReg(a => "")
    }

    return(
        <div className={`country-Container ${props.sMode? " light-bg" : " dark-bg"}`}>

            <div className="filter-Container">

                <div className="input-div">
                    <input type="text" placeholder="Search for a country..."
                    className={props.sMode? "light-elements" : "dark-elements"} 
                        onChange={searchCountry}></input>
                    <FontAwesomeIcon icon={faMagnifyingGlass} 
                        className={`search-icon ${props.sMode? " light-elements" : " dark-elements"}`}/>
                </div>

                <div className="region-div">
                    <div className={`selection${props.sMode? " light-elements" : " dark-elements"}`}>
                    <div className={`options${props.sMode? " light-elements" : " dark-elements"}`}  
                        onClick={() => selFilter("Filter by Region")}>{fReg? fReg : "Filter by Region"}</div>
                    <FontAwesomeIcon icon={faAngleDown} 
                        className={`down-icon ${props.sMode? " light-elements" : " dark-elements"}`} 
                        onClick={toggleRegion}/>
                    </div>

                <div className={`sel-options${tRegion? "-active" : ""} ${props.sMode? " light-elements" : " dark-elements"}`}>
                    {filterRegions}
                </div>
    
            </div>

            </div>

            <div className="countryList">
                {listOfCountries}
            </div>

        </div>
    )
}