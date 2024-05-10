import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import '../styles/shop.css'
import ProductsList from '../components/UI/ProductsList.jsx'
import products from '../assets/data/products.js'

const Shop = () => {

  const [productsData, setProductsData] = useState(products)

  const handleFilter = e => {
    const filterValue = e.target.value;

    if (filterValue === 'allProducts') {
      const filtersProducts = products.filter((item) => item.category)
      setProductsData(filtersProducts)
    }

    if (filterValue === 'sofa') {
      const filtersProducts = products.filter((item) => item.category === "sofa")
      setProductsData(filtersProducts)
    }

    if (filterValue === 'chair') {
      const filtersProducts = products.filter((item) => item.category === "chair")
      setProductsData(filtersProducts)
    }

    if (filterValue === 'mobile') {
      const filtersProducts = products.filter((item) => item.category === "mobile")
      setProductsData(filtersProducts)
    }

    if (filterValue === 'watch') {
      const filtersProducts = products.filter((item) => item.category === "watch")
      setProductsData(filtersProducts)
    }

    if (filterValue === 'wireless') {
      const filtersProducts = products.filter((item) => item.category === "wireless")
      setProductsData(filtersProducts)
    }
  }

  const handleSearch = e => {
    const searchTerm = e.target.value
    const searchedProducts = products.filter((item) => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }

  return (
    <Helmet title='Shop'>
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="allProducts">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input type="text" placeholder='Search.....' onChange={handleSearch} />
                <span><i class="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {productsData.length === 0 ? <h1>No Products are found!</h1> : <ProductsList data={productsData} />}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop