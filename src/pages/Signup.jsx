import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { storage } from '../firebase.config';

import '../styles/login.css'
import { toast } from 'react-toastify';

const Signup = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + username}`)
            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on((error) => {
                toast.error(error.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    // update user profile
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });

                    // store user data in firestore database
                    await setDoc(doc, (db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL,
                    })
                })
            })
            setIsLoading(false);
            toast.success("Account created")
            navigate('/login')
        } catch (error) {
            toast.error("Something went wrong!")
        }

    }

    return (
        <Helmet title='Signup'>
            <section>
                <Container>
                    <Row>
                        {isLoading ? <Col className='text-center'> <h5 className='fw-bold'>Loading...</h5></Col> : <Col lg='6' className='m-auto text-center'>
                            <h3 className='fw-bold mb-4'>Signup</h3>
                            <Form className='auth__form' onSubmit={handleSignup}>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Username' value={username} onChange={e => setUserName(e.target.value)} />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                                </FormGroup>
                                <button className='buy__btn auth__btn' type='submit'>Create an Account</button>
                                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                            </Form>
                        </Col>}
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Signup