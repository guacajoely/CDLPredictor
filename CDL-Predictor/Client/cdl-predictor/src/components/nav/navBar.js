import { Link, useNavigate } from "react-router-dom"
import "./navBar.css"

export const NavBar = () => {

    const localUser = localStorage.getItem("current_user")
    const userObject = JSON.parse(localUser)
    const userName = userObject?.username
    const imageURL = userObject?.imageURL

    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar--item active">
                <Link className="navbar--link" to="/">
                    <img className="navbar--image" src={require("../../images/header3.png")} alt="CDL Match Predictor logo" />
                </Link>
            </li>
            <div className="navbar--container--right">

                <div className="navbar--links--right">

                    {
                        localStorage.getItem("current_user")
                            ?
                            <li className="navbar--profile--link active">
                                <div className="navbar--image-mobile" style={{ backgroundImage: `url(${imageURL})` }}></div>
                                <Link className="navbar--link" to="/profile">{userName}</Link>
                            </li>

                            : ''
                    }

                    <div className="navbar--links">
                        <li className="navbar--item active">
                            <Link className="navbar--link" to="/">HOME</Link>
                        </li>

                        |

                        <li className="navbar--item active">
                            <Link className="navbar--link" to="/about">ABOUT</Link>
                        </li>

                        |

                        <li className="navbar--item active">
                            <Link className="navbar--link" to="/sources">SOURCES</Link>
                        </li>

                        |

                        {
                            localStorage.getItem("current_user") ?

                                <li className="navbar--item navbar--logout">
                                    <Link className="navbar--link" to="" onClick={(event) => {

                                        localStorage.removeItem("current_user")
                                        window.alert("You have been logged out")
                                        navigate("/", { replace: true })
                                        window.location.reload()
                                    }}>LOGOUT</Link>
                                </li>

                                : <li className="navbar--item navbar--login">
                                    <Link className="navbar--link" to="/login" onClick={() => {
                                        navigate("/login")
                                    }}>LOGIN</Link>
                                </li>
                        }
                    </div>



                </div>

                {
                    localStorage.getItem("current_user")
                        ?
                        <Link className="navbar--link" to="/profile">
                            <div className="navbar--image-profile" style={{ backgroundImage: `url(${imageURL})` }}></div>
                        </Link>
                        : ''
                }

            </div>

        </ul>
    )
}