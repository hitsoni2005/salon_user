import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../utils/Logout';
import CheckToken from '../utils/CheckToken';

function Header() {
    let [token, SetToken] = useState(false);
    useEffect(() => {
        let token = CheckToken();
        if (token) {
            SetToken(token);
        }
    }, []
    )
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img src="../img/logo.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="main-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>					</li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About Us</Link>					</li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Services">Services</Link>					</li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Categories">Categories</Link>					</li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Contactus">Contact Us</Link>					</li>
                            {
                                token != "" ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={Logout}>Logout</Link>					</li>
                                        <li className="nav-item btn-appointment">
                                            <Link className="nav-link" to="/Profile">Profile</Link>					</li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Signup">Sign Up</Link>					</li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Login">Login</Link>					</li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {/* end nav */}

        </div>
    )
}

export default Header
