import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'

import {
  listProducts,deleteProduct} from '../actions/productActions'


const ProductListScreen = ({ history, match }) => {


  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null);

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList


  const productDelete = useSelector((state) => state.productDelete) //from store 
  const { loading:loadingDelete, error:errorDelete,success:successDelete } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const handleFileInput = (e)=>{
    const file = e.target.files[0]; // Get the first selected file
    setSelectedFile(file);
    
  }

  const getFiles = async () => {

    console.log("getting files");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get("/api/products/getfiles", config);
      //setFiles(data);
      console.log(data);
    } catch (err) {
      alert("Some Error Occured while getting files");
    }
  };

  const uploadToCloud = async () => {

    const fileName = selectedFile.name.toLowerCase();
    if (!fileName.endsWith('.csv')) {
      alert('Please select a CSV file.');
      return ;
    } 

    const formData = new FormData();
    formData.append("file", selectedFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.post("/api/products/uploadFile", formData, config);
      alert("File Uploaded");
    } catch (err) {
      alert("Problem occured while uploading the file");
    }
  };

  useEffect(() => {
    
    if(userInfo && userInfo.isAdmin)
    {
        dispatch(listProducts());
    }
    else
    {
        history.push('/login');
    }

   
  }, [
    dispatch,
    history,
    userInfo,
    successDelete
  ])

  const deleteHandler = (id) => {

        window.confirm("Are you sure")
        dispatch(deleteProduct(id))
    
  }


  return (
    <>
       <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Link to="/admin/create"><Button className='my-3' >
            <i className='fas fa-plus'></i> Create Product
          </Button></Link>
        </Col>
        <Col className='text-right'>
          <input type="file" onChange={handleFileInput} />
         <Button className='my-3' disabled={!selectedFile} onClick={uploadToCloud} >
            <i className='fas'></i> Upload A CSV File</Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>Rs {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
        )}
    </>
  )
}

export default ProductListScreen