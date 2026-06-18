import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Breadcrumbs from '../common/Breadcrumbs'
import Footer from '../common/Footer'
import Appointment from '../common/Appointment'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import BASE_URL from '../config'

function SubCategoryByCategory() {
    return (
        <div>
            <SubCategoriesContent />
        </div>
    )
}

function SubCategoriesContent() {
    return (
        <>
            <Header />
            <Breadcrumbs title="Sub Categories" />
            <SubCategoriesSec />
            <Appointment />
            <Footer />
        </>
    )
}

function SubCategoriesSec() {
    let [categories, SetCategories] = useState([])
    let [loading, SetLoading] = useState(false)
    let [error, SetError] = useState("")

    let id = useLocation().pathname.split("/")[2];
    console.log("URL ID:", id);

    async function FetchCategories() {
        try {
            SetLoading(true)
            let res = await axios.get(`${BASE_URL}/api/subcategories/${id}`)
            console.log(res.data)
            SetCategories(res.data.subCategoryByCategory);
        } catch (e) {
            console.log(e.response?.data);
            SetError(
                e.response?.data?.message ||
                e.message
            );
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
                                                <>
                                                    <div className="col-sm-6 col-md-4">
                                                        <div className="gallery-item wow fadeIn">
                                                            <Link to={`/ServiceByCategory/${value.category_id}`} className="venobox" data-gall="gallery">
                                                                <img src={value.subcategory_image ? `${BASE_URL}${value.subcategory_image}` : "/img/serviceImage.jpg"} alt="" />
                                                                <div className="gallery-caption text-center">
                                                                    <i className="fa fa-heart-o" />
                                                                    <p>{value.subcategory_name}</p>
                                                                    <h3>{value.subcategory_description}</h3>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </>
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

export default SubCategoryByCategory
