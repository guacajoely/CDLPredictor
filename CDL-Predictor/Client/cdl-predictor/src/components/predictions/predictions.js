import { useEffect, useState } from "react"
import { deletePrediction, getPredictions, getTeams } from "../ApiManager.js"
import './predictions.css'

export const PredictionHistory = ({ predictionSetterFunction, predictionsState, scrollToResults }) => {

    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams()
            .then((responseArray) => {
                setTeams(responseArray)
            })
    }, [])

    const localUser = localStorage.getItem("current_user")
    const userObject = JSON.parse(localUser)
    const userId = parseInt(userObject.id)

    const reFetchPredictions = () => {
        getPredictions(userId)
            .then((responseArray) => {
                predictionSetterFunction(responseArray)
            })
    }

    useEffect(() => {
        getPredictions(userId)
            .then((responseArray) => {
                predictionSetterFunction(responseArray)
            })
    }, [predictionSetterFunction, userId])

    return <>

        <div className="predictions--container">

            {

                predictionsState.length > 0 ?
                    predictionsState.map(prediction => {

                        const team1 = teams.find(team => team.id === prediction.team1)
                        const team2 = teams.find(team => team.id === prediction.team2)

                        return <div className="prediction" key={`prediction--${prediction.id}`}>

                            <div className="prediction--card" draggable="true">

                                <div className="prediction--team1">{team1?.fullTeamName}</div>

                                {/* replace hyphen with non-breaking one (&#8209;) */}
                                <div className="prediction--score">{prediction?.team1Score}&#8209;{prediction.team2Score}</div>

                                <div className="prediction--team2">{team2?.fullTeamName}</div>

                            </div>

                            <button className="button--round"
                                id={`delete--${prediction.id}`}
                                onClick={(event) => {
                                    const [, grabbedId] = event.target.id.split("--")
                                    const predictionId = parseInt(grabbedId)

                                    deletePrediction(predictionId)
                                        .then(reFetchPredictions)

                                }}>x</button>
                        </div>


                    })

                    : <div style={{ 'margin': '40px' }}>Save a prediction to store it here</div>

            }

            {predictionsState.length > 10 ?
                <button className="button"
                    style={{ 'margin': '20px 0 30px 0' }}
                    onClick={scrollToResults}
                >back to results</button> :
                ''}


        </div>
    </>
}