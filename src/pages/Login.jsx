import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from "js-cookie";
import BASE_URL from '../config';

function Login() {
    return (
        <div>
            <LoginContent />
        </div>
    )
}

function LoginContent() {
    return (
        <>
            <LoginForm />
        </>
    )
}

function LoginForm() {
    let [user, SetUser] = useState({
        email: "",
        password: ""
    })

    let [loading, SetLoading] = useState(false)
    let navigate = useNavigate();

    function handleInputChange(e) {
        let { name, value } = e.target;
        SetUser((prev) => ({
            ...prev,
            [name]: value
        }
        ))
    }

    let handleSubmit = async (e) => {
        SetLoading(true);
        e.preventDefault();
        try {
            let response = await axios.post(`${BASE_URL}/api/login`, user)
            console.log(response.data);

            if (response.data.success) {
                SetUser({
                    email: "",
                    password: ""
                })
            }
            alert(response.data.message);
            cookie.set("token", response.data.token)
            navigate("/")

        } catch (e) {
            SetUser({
                email: "",
                password: ""
            })

            SetLoading(false);
            alert(e.response.data.message)
            navigate("/Login")
        } finally {
            SetLoading(false);
        }
    }

    return (
        <>
            <section className="section-spacing">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Login Now!</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-8 offset-lg-2">
                            <form id="contactForm" onSubmit={handleSubmit} className="contact-form wow fadeIn" data-toggle="validator" method="post">
                                <div className="row">
                                </div>
                                <div className="form-group">
                                    <input placeholder="Email Address" id="email" value={user.email} onChange={handleInputChange} className="form-control" name="email" type="email" required data-error="Please enter your valid email address" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Enter Password" id="password" value={user.password} onChange={handleInputChange} className="form-control" name="password" type="password" required data-error="Please enter your password" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="text-center">
                                    <input value={loading ? "Fetching Account...." : "Login"} name="submit" className="btn btn-primary" type="submit" />
                                    <div id="msgSubmit" className="hidden" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* end contact */}
        </>
    )
}

export default Login
