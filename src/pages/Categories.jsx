import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Breadcrumbs from '../common/Breadcrumbs'
import Footer from '../common/Footer'
import Appointment from '../common/Appointment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BASE_URL from '../config'

function Categories() {
    return (
        <div>
            <CategoriesContent />
        </div>
    )
}

function CategoriesContent() {
    return (
        <>
            <Header />
            <Breadcrumbs title="Categories" />
            <CategoriesSec />
            <Appointment />
            <Footer />
        </>
    )
}

function CategoriesSec() {
    let [categories, SetCategories] = useState([])
    let [loading, SetLoading] = useState(false)
    let [error, SetError] = useState("")

    async function FetchCategories() {
        try {
            SetLoading(true)
            let res = await axios.get(`${BASE_URL}/api/categories`)
            console.log(res.data)
            SetCategories(res.data.categories);
        } catch (e) {
            SetError("Something Went Wrong")
        } finally {
            setTimeout(() => {
                SetLoading(false);
            }, 2000
            );
        }
    }
    useEffect(() => {
        FetchCategories();
    }, []
    )

    if (error) return <h2>{error}</h2>

    return (
        <>
            <section className="section-spacing">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Our gallery</span></h2>
                                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            loading ? (<><h2>Loading....</h2></>) : (<>
                                {
                                    categories ?
                                        categories.map((value, index) => {
                                            return (
                                                (<>
                                                    <div className="col-sm-6 col-md-4" key={index}>
                                                        <div className="gallery-item wow fadeIn">
                                                            <Link to={`/SubCategoryByCategory/${value._id}`} className="venobox" data-gall="gallery">
                                                                <img
                                                                    src={
                                                                        value.category_image
                                                                            ? `${BASE_URL}${value.category_image}`
                                                                            : "/img/categories.jpg"
                                                                    }
                                                                    alt=""
                                                                />
                                                                <div className="gallery-caption text-center">
                                                                    <i className="fa fa-heart-o" />
                                                                    <p>{value.category_name}</p>
                                                                    <h3>{value.category_description}</h3>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </>)
                                            )
                                        }
                                        ) : <h3>Categories Not Found</h3>
                                }
                            </>)
                        }

                    </div>
                </div>
            </section>
            {/* end gallery */}

        </>
    )
}

export default Categories
