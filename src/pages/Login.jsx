import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const signIn = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            console.log(user);
            setIsLoading(false)
            toast.success('Successfully logged in!')
            navigate('/checkout')
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }
    return (
        <Helmet title='Login'>
            <section>
                <Container>
                    <Row>
                        {isLoading ? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading...</h5></Col> : <Col lg='6' className='m-auto text-center'>
                            <h3 className='fw-bold mb-4'>Login</h3>
                            <Form className='auth__form' onSubmit={signIn}>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                                </FormGroup>
                                <button className='buy__btn auth__btn' type='submit'>Login</button>
                                <p>Don't have an account? <Link to={'/signup'}>Create ab account</Link></p>
                            </Form>
                        </Col>}
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Login