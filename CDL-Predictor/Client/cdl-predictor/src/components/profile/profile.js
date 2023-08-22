import { useEffect, useState } from "react"
import { editUser, getTeams, getUserById } from "../ApiManager.js"
import './profile.css'


export const Profile = () => {

    const [formState, setFormState] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [teams, setTeams] = useState([])

    //Provide initial state for user
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        faveTeam: 0,
        imageURL: ""
    })

    useEffect(() => {
        getTeams()
            .then((responseArray) => {
                setTeams(responseArray)
            })
    },
        [])

    const toggleForm = () => { formState ? setFormState(false) : setFormState(true) }
    const togglePassword = () => { showPassword ? setShowPassword(false) : setShowPassword(true) }

    const localUser = localStorage.getItem("current_user")
    const userObject = JSON.parse(localUser)
    const userId = parseInt(userObject.id)
    const imageURL = userObject.imageURL

    useEffect(() => {
        getUserById(userId)
            .then((responseArray) => {
                setUser(responseArray)
            })
    },
        [userId])

    //loop through teams state and grab users favorite team
    const matchingTeams = teams?.filter(team => team.id === user?.faveTeam)
    const faveTeam = matchingTeams[0]?.fullTeamName

    const updateCurrentUser = (user) => {

        //save a copy of current user object
        const copyOfUserObject = userObject

        //delete the current user
        localStorage.removeItem("current_user")

        //update username
        copyOfUserObject.username = user.username

        //update image URL
        copyOfUserObject.imageURL = user.imageURL

        //set current_user to copy
        localStorage.setItem("current_user", JSON.stringify(copyOfUserObject))

    }

    const reloadPage = () => {window.location.reload()}

    //when saving profile, also update current_user by deleting it and replacing it with the updated info
    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()
        editUser(user)
            .then(updateCurrentUser(user))
            .then(toggleForm)
            .then(reloadPage)
    }

    const handleDiscardClick = () => {
        setShowPassword(false)
        toggleForm()
    }


    return <div className="profile--section">

        {formState ?


            <div className="profile--form">
                <h3>Edit Profile</h3>

                <fieldset>
                    <div className="form-group">
                        <label className="form--label" htmlFor="description">Username:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control user--input"
                            value={user.username}
                            onChange={
                                (evt) => {
                                    const copy = { ...user }
                                    copy.username = evt.target.value
                                    setUser(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="form--label" htmlFor="description">Email:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control user--input"
                            value={user.email}
                            onChange={
                                (evt) => {
                                    const copy = { ...user }
                                    copy.email = evt.target.value
                                    setUser(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="form--label" htmlFor="description">Password:</label>
                        <input
                            required autoFocus
                            type={showPassword ? "text" : "password"}
                            className="form-control user--input"
                            value={user.password}
                            onChange={
                                (evt) => {
                                    const copy = { ...user }
                                    copy.password = evt.target.value
                                    setUser(copy)
                                }
                            } />
                        <button onClick={togglePassword}>Show Password</button>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="form--label" htmlFor="faveTeam">Favorite Team:</label>

                        <select className="form-control"
                            id="faveTeam"
                            name="faveTeam"
                            value={user.faveTeam}
                            onChange={
                                (event) => {
                                    const copy = { ...user }
                                    copy.faveTeam = parseInt(event.target.value)
                                    setUser(copy)
                                }
                            } >

                            {teams.map((team) => { return <option key={`${team.id}`} value={`${team.id}`}>{team.fullTeamName}</option> })}

                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="form--label" htmlFor="description">Profile Image URL:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control user--input"
                            value={user?.imageURL}
                            onChange={
                                (evt) => {
                                    const copy = { ...user }
                                    copy.imageURL = evt.target.value
                                    setUser(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <button className="button button--form" onClick={handleDiscardClick}>Discard Changes</button>
                <button className="button button--form" onClick={handleSaveButtonClick}>Save Profile</button>

            </div>

            :

            <>
                <div className="profile--container">
                    <h3>User Profile</h3>

                    {/* replace profile image with div with image url as background to maintain aspect ratio*/}
                    {/* <img className="profile--image" src={imageURL} alt="PROFILE" /> */}
                    
                    <div className="profile--image" style={{backgroundImage: `url(${imageURL})`}}></div>
                    <div>Username: {user?.username}</div>
                    <div>Email: {user?.email}</div>
                    <div>Favorite Team: {faveTeam}</div>
                </div>
                <button className="button button--form" onClick={toggleForm}>Edit Profile</button>
            </>

        }

    </div>

}