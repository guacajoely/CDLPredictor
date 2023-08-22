import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../ApiManager.js";
import "./login.css"

export const Login = () => {

    const [email, set] = useState("user@user.com")
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return getUserByEmail(email)
            .then(foundUser => {
                if (foundUser) {
                    const user = foundUser
                    localStorage.setItem("current_user", JSON.stringify({
                        id: user.id,
                        username: user.username,
                        imageURL: user.imageURL
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>

                    <h1>CDL Match Predictor</h1>
                    <h2>Please sign in</h2>

                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={event => set(event.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            className="form-control"
                            required autoFocus />
                    </fieldset>

                    <fieldset>
                        <button className="submit--button" type="submit">
                            Sign in
                        </button>
                    </fieldset>

                    <section className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </section>
                </form>

            </section>

        </main>
    )
}