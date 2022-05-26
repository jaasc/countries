import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Details(props){
    let { country } = useParams()
    let navigate = useNavigate()
    const selectedC = props.countries.find(b => b.name === country)
    
    const bordersC = selectedC.borders && selectedC.borders.map(a => a)
    const popC = bordersC && bordersC.map(a => props.countries.find(b => (b.alpha3Code === a) && b.name))
    const borderC = popC && popC.map(a => <button 
        className={`borderBtn${props.sMode? " light-elements" : " dark-elements"}`}
        key={a.name} onClick={() => navigate(`/details/${a.name}`)}>{a.name}</button>)

    return(
        <div className={`countrydetails-Container ${props.sMode? " light-bg" : " dark-bg"}`}>
            <div className={`back-div${props.sMode? " light-elements" : " dark-elements"}`} onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                <h4>Back</h4>
            </div>

            <div className="detail-Container">
                <div className="flag-div">
                    <img src={selectedC.flags.png} alt={`${country} flag`}></img>
                </div>

                <div className="details-div">
                    <h1>{country}</h1>
                    <div className="detail-sub">
                        <h4><span>Native Name: </span>{selectedC.nativeName}</h4>
                        <h4><span>Population: </span>{selectedC.population}</h4>
                        <h4><span>Region: </span>{selectedC.region}</h4>
                        <h4><span>Capital: </span>{selectedC.capital}</h4>
                    </div>

                    <div className="detail-sub">
                        <h4><span>Top Level Domain: </span>{selectedC.topLevelDomain}</h4>
                        <h4><span>Currencies: </span>{selectedC.currencies && selectedC.currencies.map((a, ind) => ind === selectedC.currencies.length-1 ? a.name : `${a.name}, `)}</h4>
                        <h4><span>Languages: </span>{selectedC.languages && selectedC.languages.map((a, ind) => ind === selectedC.languages.length-1 ? a.name : `${a.name}, `)}</h4>
                    </div>

                    {selectedC.borders && 
                    <div className="borders-div">
                        <h3>Border Countries:</h3>
                        <div className="border-sub">
                            {borderC}
                        </div>
                    </div>}
                </div>

            </div>
        </div>
    )
}