import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const AllProduct = () => {
  const { data: productsData, isLoading } = useGetData('products')

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return
    await deleteDoc(doc(db, 'products', id))
    toast.success('Product deleted!')
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? <h3 className='py-5 text-center fw-bold'>Loading....</h3> :
                  productsData?.map(item => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName || item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td><button className="btn btn-danger" onClick={() => deleteProduct(item.id)}>Delete</button></td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProduct