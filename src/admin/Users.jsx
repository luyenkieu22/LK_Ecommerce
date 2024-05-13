import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Users = () => {

    const { data: usersData, isLoading } = useGetData('users')

    const deleteUser = async id => {
        if (!window.confirm('Are you sure you want to delete?')) return
        await deleteDoc(doc(db, 'users', id))
        toast.success('User deleted!')
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
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? <h5 className='pt-5 fw-bold'>Loading....</h5> :
                                    usersData?.map(item => (
                                        <tr key={item.uid}>
                                            <td>
                                                <img src={item.photoURL} alt="" />
                                            </td>
                                            <td>{item.displayName}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteUser(item.uid)}>Delete</button>
                                            </td>
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

export default Users