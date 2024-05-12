import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDesc, setEnterDesc] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const docRef = await collection(db, 'products')
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)
      uploadTask.on(() => {
        toast.error('Images not uploaded!')
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            title: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDesc,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL
          })
        })
      })
      setIsLoading(false)
      toast.success('Added product successfully!')
      navigate('/dashboard/all-products')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              isLoading ? <h4 className="py-5">Loading....</h4> : <>
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input type="text" placeholder="Lorem..."
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input type="text" placeholder="Description..."
                      value={enterDesc}
                      onChange={(e) => setEnterDesc(e.target.value)} />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input type="text" placeholder="$100"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                        required>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="Wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className="form__group">
                      <span>Product image</span>
                      <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} />
                    </FormGroup>
                  </div>
                  <button className="buy__btn" type="submit">Add Product</button>
                </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;
