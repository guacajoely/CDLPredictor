import { useEffect, useState } from "react"
import { getTeams } from "../ApiManager.js"
import "./teams.css"

export const TeamSection = ({ checkedTeamsState, checkedTeamsSetterFunction, scrollToResults }) => {

    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams()
            .then((responseArray) => {
                setTeams(responseArray)
            })
    },
        [])

    const handleCheckboxChange = (event) => {

        //GET ID FROM TEAM CLICKED
        const [, id] = event.target.id.split("--")
        const teamId = parseInt(id)

        //SEE IF THAT TEAM WAS ALREADY ADDED TO THE CHECKED ARRAY STATE
        if (checkedTeamsState.some((checkedTeam) => { return checkedTeam === teamId })) {

            // IF IT WAS ALREADY ADDED, REMOVE IT (uncheck)
            const copy = checkedTeamsState
            copy.splice(copy.indexOf(teamId), 1)
            // console.log(`team #${teamId} was UNchecked`)
            checkedTeamsSetterFunction([...copy])
        }

        //IF 2 TEAMS ALREADY SELECTED, clear checked team state by splicing both already selected, and pushing new selection in
        else if (checkedTeamsState.length === 2) {
            const copy = checkedTeamsState
            copy.splice(0, 2)
            copy.push(teamId)
            // console.log(`team #${teamId} was checked`)
            checkedTeamsSetterFunction([...copy])
        }

        // IF ITS NOT ALREADY BEEN ADDED, AND THERES NOT ALREADY 2 TEAMS SELECTED, ADD IT
        else {
            const copy = checkedTeamsState
            copy.push(teamId)
            // console.log(`team #${teamId} was checked`)
            checkedTeamsSetterFunction([...copy])

            //IF THIS IS THE SECOND TEAM CHECKED, SCROLL TO RESULTS SECTION
            if (checkedTeamsState.length === 2) {
                setTimeout(scrollToResults, 300);
            }
        }

        // console.log(checkedTeamsState)

    }


    return (

        <>
            <div className="teams--container">
                {teams.map(team => {

                    const checkedTeams = checkedTeamsState

                    return <div className="team--card" key={team.id}>

                        <label className={`team--label ${checkedTeams?.some(checkedTeam => checkedTeam === team.id) ? 'checked' : ''} `} htmlFor={`team--${team.id}`}>
                            <img className={` 
                        
                            ${team.teamName}-image 
                            team--image`}

                                src={require(`../../images/${team.teamName}.png`)}
                                alt={`${team.teamName}Logo`}

                            />

                            <div className={`${team.teamName}--text`}>{team.fullTeamName}</div>
                        </label>

                        <input type="checkbox"
                            className={`team--input`}
                            id={`team--${team.id}`}
                            value={team.id}
                            name={team.teamName}
                            onChange={(event) => { handleCheckboxChange(event) }}
                        // checked={` ${checkedTeams.some(checkedTeam => checkedTeam === team.id) ? 'checked' : ''}`}
                        />

                    </div>
                })}

            </div>
        </>)
}