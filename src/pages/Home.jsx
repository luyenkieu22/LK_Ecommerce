import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import Helmet from '../components/Helmet/Helmet'
import { motion } from 'framer-motion'
import heroImg from '../assets/images/hero-img.png'
import counterImg from '../assets/images/counter-timer-img.png'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import Clock from '../components/UI/Clock'
import useGetData from '../custom-hooks/useGetData'

const Home = () => {
    const { data: products, isLoading } = useGetData('products')
    const [trendingProduct, setTrendingProduct] = useState([])
    const [bestSalesProduct, setBestSalesProduct] = useState([])
    const [mobileProducts, setMobileProduct] = useState([])
    const [wirelessProduct, setWirelessProduct] = useState([])
    const [popularProduct, setPopularProduct] = useState([])

    const year = new Date().getFullYear()

    useEffect(() => {
        const filteredTrendingProducts = products.filter(item => item.category === 'chair');

        const filteredSalesProducts = products.filter(item => item.category === 'sofa');

        const filteredMobileProducts = products.filter(item => item.category === 'mobile');

        const filteredWirelessProducts = products.filter(item => item.category === 'wireless');

        const filteredPopularProducts = products.filter(item => item.category === 'watch');

        setTrendingProduct(filteredTrendingProducts)
        setBestSalesProduct(filteredSalesProducts)
        setMobileProduct(filteredMobileProducts)
        setWirelessProduct(filteredWirelessProducts)
        setPopularProduct(filteredPopularProducts)
    }, [products]);

    return (
        <Helmet title={'Home'}>
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="hero__content">
                                <p className="hero__subtitle">Trending product in {year}</p>
                                <h2>Make Your Interior More Minimalistic & Modern</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro doloremque quos tempore debitis autem veritatis ex blanditiis quaerat ratione odit?</p>
                                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to={'/shop'}>SHOP NOW</Link></motion.button>
                            </div>
                        </Col>
                        <Col md='6' lg='6'>
                            <div className="hero__img">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Services />

            <section className="trending__products">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className="section__title">Trending Products</h2>
                        </Col>
                        {isLoading ? <h5 className='fw-bold'>Loading...</h5> :
                            <ProductsList data={trendingProduct} />
                        }
                    </Row>
                </Container>
            </section>

            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className="section__title">Best Sales</h2>
                        </Col>
                        {isLoading ? <h5 className='fw-bold'>Loading...</h5> :
                            <ProductsList data={bestSalesProduct} />
                        }
                    </Row>
                </Container>
            </section>

            <section className="timer__count">
                <Container>
                    <Row>
                        <Col lg='6' md='12' className='count__down-col'>
                            <div className="clock__top-content">
                                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                                <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
                            </div>
                            <Clock />
                            <motion.button whileTap={{ scale: 1.1 }} className="buy__btn store__btn">
                                <Link to='/shop'>Visit Store</Link>
                            </motion.button>
                        </Col>
                        <Col lg='6' md='12' className='text-end counter__img'>
                            <img src={counterImg} alt="" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="new_arrivals">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center mb-5'>
                            <h2 className="section__title">New Arrivals</h2>
                        </Col>
                        {isLoading ? <h5 className='fw-bold'>Loading...</h5> :
                            <ProductsList data={mobileProducts} />
                        }
                        {isLoading ? <h5 className='fw-bold'>Loading...</h5> :
                            <ProductsList data={wirelessProduct} />
                        }
                    </Row>
                </Container>
            </section>

            <section className="popular__category">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center mb-5'>
                            <h2 className="section__title">Popular in Category</h2>
                        </Col>
                        {isLoading ? <h5 className='fw-bold'>Loading...</h5> :
                            <ProductsList data={popularProduct} />
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Home