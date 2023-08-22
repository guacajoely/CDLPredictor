import { useEffect, useState } from "react"
import { createPrediction, getPredictions, getTeams } from "../ApiManager.js"
import "./results.css"
import { Comparison } from "./comparison.js"

export const ResultsSection = ({ checkedTeamsState, scrollToTeams, scrollToPredictions, checkedTeamsSetterFunction, predictionSetterFunction }) => {

    const [teams, setTeams] = useState([])
    const [filteredTeams, setFiltered] = useState([])

    //get current user id from local storage
    const localUser = localStorage.getItem("current_user")
    const userObject = JSON.parse(localUser)
    const userId = parseInt(userObject?.id)

    useEffect(() => {
        getTeams()
            .then((responseArray) => {
                setTeams(responseArray)
            })
    },
        [])

    useEffect(
        () => {
            const team1 = teams.find(team => {
                return team.id === checkedTeamsState[0]
            })

            const team2 = teams.find(team => {
                return team.id === checkedTeamsState[1]
            })

            //only set filtered once both teams are selected, otherwise blank array
            const OtherMatchingTeams = team1 && team2 ? [team1, team2] : []

            setFiltered(OtherMatchingTeams)
            // console.log(OtherMatchingTeams)

        }, [checkedTeamsState, teams]
    )

    // Comparison function imported to compare two teams. 
    // compareTeams called in createTeam and handleSavePrediction
    const compareTeams = () => {
        return Comparison(filteredTeams[0], filteredTeams[1])
    }

    let winner = ''
    let resultsText = ''

    const createTeam = (team, otherTeam, arrayIndex) => {

        const results = compareTeams()
        const finalScore = results.finalScore
        winner = results.winner
        resultsText = results.resultsText

        return <div className="team--container">
            <img className={` 
            
            ${finalScore[arrayIndex] === 3 ? 'winner--image' : 'loser--image'}
            ${team.teamName}-image 
            results--image`}

                src={require(`../../images/${team.teamName}.png`)}
                alt={`${team.teamName} Logo`}

            />

            <div className={` ${finalScore[arrayIndex] === 3 ? 'winner--overall' : 'loser--overall'} `}> {finalScore[arrayIndex]} </div>
            <table>
                <tbody className="team--table" key={`team--${team.id}`}>
                    <tr>
                        <td className="team--name">{team.teamName.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td className={` ${team.hp > otherTeam.hp ? 'winner' : 'loser'} `}> {team.hp} </td>
                    </tr>
                    <tr>
                        <td className={` ${team.snd > otherTeam.snd ? 'winner' : 'loser'} `}> {team.snd} </td>
                    </tr>
                    <tr>
                        <td className={` ${team.con > otherTeam.con ? 'winner' : 'loser'} `}> {team.con} </td>
                    </tr>
                    <tr>
                        <td className={` ${team.seed < otherTeam.seed ? 'winner' : 'loser'} `}> {team.seed} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }

    //.5 second timeout added because scroll up was not delayed enough in mobile test
    const handleNewPrediction = () => {
        checkedTeamsSetterFunction([])
        setTimeout(scrollToTeams, 500)
    }

    const reFetchPredictions = () => {
        getPredictions(userId)
            .then((responseArray) => {
                predictionSetterFunction(responseArray)
            })
    }

    const handleSavePrediction = () => {

        const results = compareTeams()
        const finalScore = results.finalScore
        const team1id = filteredTeams[0].id
        const team2id = filteredTeams[1].id

        userObject ?
            createPrediction(userId, team1id, team2id, finalScore)
                .then(reFetchPredictions)
                .then(scrollToPredictions)
            : window.alert("Please login to save your predictions")
    }




    return (

        <>
            <div>

                {filteredTeams.length > 1 ?
                    <>
                        <div id="results_container" className="results--container">
                            {createTeam(filteredTeams[0], filteredTeams[1], 0)}

                            <section className="team--container">

                                <div className="results--text">VS</div>

                                <table>
                                    <tbody className="results--text--table">
                                        <tr>
                                            <td className="prediction--text">PREDICTED SCORE</td>
                                        </tr>
                                        <tr>
                                            <td>TEAM</td>
                                        </tr>
                                        <tr>
                                            <td>HARDPOINT WIN %</td>
                                        </tr>
                                        <tr>
                                            <td>SND WIN %</td>
                                        </tr>
                                        <tr>
                                            <td>CONTROL WIN %</td>
                                        </tr>
                                        <tr>
                                            <td>CURRENT SEED</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>


                            {createTeam(filteredTeams[1], filteredTeams[0], 1)}

                        </div>

                        <div className="results--summary">{winner} {resultsText}</div>


                        <div className="button--container">
                            <button className="button" onClick={handleSavePrediction}> Save Prediction </button>
                            <button className="button" onClick={handleNewPrediction}> Make Another Prediction </button>
                        </div>


                    </>

                    :

                    <div style={{ 'margin': '40px' }}>Select 2 teams for a head-to-head comparison</div>
                }

            </div>

        </>)
}