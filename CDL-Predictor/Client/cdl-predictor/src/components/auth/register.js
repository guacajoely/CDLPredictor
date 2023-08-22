import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../ApiManager.js"
import "./login.css"

export const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        //set to default profile image
        imageURL: "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
    })

    let navigate = useNavigate()

    const togglePassword = () => { showPassword ? setShowPassword(false) : setShowPassword(true) }

    const registerNewUser = () => {
        return createUser(user)
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("current_user", JSON.stringify({
                        id: createdUser.id,
                        username: createdUser.username,
                        imageURL: createdUser.imageURL
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (event) => {
        event.preventDefault()
        return getUserByEmail(user.email)
            .then(response => {
                if (response.id) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (event) => {
        const copy = { ...user }
        copy[event.target.id] = event.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="header">Register for CDL Match Predictor</h1>

                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateUser}
                        type="text" id="username" className="form-control"
                        placeholder="" required autoFocus />
                </fieldset>

                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type={showPassword ? "text" : "password"}
                        id="password" 
                        className="form-control"
                        placeholder="" 
                        required />
                        <button onClick={togglePassword}>Show Password</button>
                </fieldset>

                <fieldset>
                    <button className="register--button" type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}