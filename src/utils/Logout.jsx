import React from 'react'
import cookie from "js-cookie"

function Logout() {
    try {
        cookie.remove("token");
        alert("Logout Successfull.")
        window.location.href = "/Login"
    } catch (e) {
        window.location.href = "/"
    }
}

export default Logout
