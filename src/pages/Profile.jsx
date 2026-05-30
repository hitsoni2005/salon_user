import React, { use, useEffect, useState } from 'react'
import Breadcrumbs from '../common/Breadcrumbs'
import Appointment from '../common/Appointment'
import Header from '../common/Header'
import Footer from '../common/Footer'
import axios from 'axios'
import CheckToken from '../utils/CheckToken'
import Logout from '../utils/Logout'
import BASE_URL from '../config'

function Profile() {
    return (
        <div>
            <Header />
            <ProfileContent />
            <Footer />
        </div>
    )
}

function ProfileContent() {
    return (
        <>
            <Breadcrumbs title="User Profile" />
            <UserProfileForm />
            <Appointment />
        </>
    )
}

function UserProfileForm() {
    let [user, SetUser] = useState({});
    let [loading, SetLoading] = useState(true);
    let [error, SetError] = useState("");

    async function FetchUserProfile() {
        try {
            let res = await axios.get(`${BASE_URL}/api/profile`, {
                headers: {
                    Authorization: "Bearer " + CheckToken()
                }
            })
            console.log(res.data)
            if (res.data.success) {
                SetUser(res.data.profile);
            }
        } catch (e) {
            SetError(e);
            // Logout();
        } finally {
            SetLoading(false);
        }
    }
    useEffect(() => {
        FetchUserProfile();
    }, []
    )
    if (error) return <h3>{error}</h3>

    return (
        <>
            <section className='section-spacing'>
                <div className='container'>
                    {loading ? (<><h3>LOADING....</h3></>) : (<>

                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='section-title text-center'>
                                    <h2><span>User Profile</span></h2>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-lg-8 offset-lg-2">
                                <form id="profileForm" className="profile-form">

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            className="form-control"
                                            placeholder="Full Name"
                                            required
                                            value={user.full_name}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email Address"
                                            required
                                            value={user.email}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            id="mobile"
                                            name="mobile"
                                            className="form-control"
                                            placeholder="Mobile Number"
                                            required
                                            value={user.mobile_no}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="form-control"
                                            placeholder="City"
                                            value={user.city}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Profile Image</label>
                                        <input
                                            type="file"
                                            id="profileImage"
                                            name="profileImage"
                                            className="form-control"
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Avatar</label>
                                        <input
                                            disabled
                                            type="image"
                                            id="Image"
                                            name="Image"
                                            className="form-control"
                                            src='https://www.w3schools.com/w3images/avatar6.png'
                                            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <input
                                            type="submit"
                                            value="Update Profile"
                                            className="btn btn-primary"
                                        />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </>)}
                </div>
            </section>
        </>
    )
}

export default Profile
