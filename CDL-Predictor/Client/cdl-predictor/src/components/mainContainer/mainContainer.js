import { useRef, useState } from "react"
import { TeamSection } from "../teams/teams.js"
import { ResultsSection } from "../results/results.js"
import { PredictionHistory } from "../predictions/predictions.js"
import './mainContainer.css'

export const MainContainer = () => {

    const [checkedTeams, setCheckedTeams] = useState([])
    const [predictions, setPredictions] = useState([])

    const teamsRef = useRef(null);
    const resultsRef = useRef(null);
    const predictionsRef = useRef(null);

    const scrollToTeams = () => teamsRef.current.scrollIntoView({ behavior:"smooth" });
    const scrollToPredictions = () => predictionsRef.current.scrollIntoView({ behavior:"smooth", block:"end" });
    const scrollToResults = () => resultsRef.current.scrollIntoView({ behavior:"smooth"});

    const localUser = localStorage.getItem("current_user")
    const userObject = JSON.parse(localUser)

    return <>
        <div className="home--container">

            <div className="teams--header" ref={teamsRef} >WHO'S PLAYING?</div>
            {<TeamSection checkedTeamsState={checkedTeams}
                checkedTeamsSetterFunction={setCheckedTeams}
                scrollToResults={scrollToResults}
            />}

            <div ref={resultsRef} className="results--header">RESULTS</div>
            {<ResultsSection checkedTeamsState={checkedTeams} 
                checkedTeamsSetterFunction={setCheckedTeams}
                scrollToTeams={scrollToTeams}
                scrollToPredictions={scrollToPredictions}
                predictionSetterFunction={setPredictions}
            />}

            <div className="history--header">PREVIOUS PREDICTIONS</div>
            { userObject ? <PredictionHistory predictionSetterFunction={setPredictions} scrollToResults={scrollToResults} predictionsState={predictions}/> : 
            <div style={{ 'marginBottom' : '40px' }}>Please login to save predictions</div>}

        </div>

        <footer ref={predictionsRef} className="footer"><a href="https://github.com/guacajoely" target="_blank"
          rel="noopener noreferrer">guacajoely</a></footer>
    </>
}