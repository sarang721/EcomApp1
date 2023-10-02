import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch=useDispatch();
    const productList=useSelector(state=>state.productList) //getting all products from store combinereducer
    const {loading,error,products}=productList // getting loading error and products from productList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    //const [products,setProducts]=useState([]);
    useEffect(() => {
        dispatch(listProducts()); //getting products from database ,calling actions
       /* const fetchproducts=async()=>{
            const res=await axios.get('/api/products')
            setProducts(res.data);
        
        }
        fetchproducts();
        */
    }, [dispatch])
    
    return (
        <>
            {userInfo && userInfo.isAdmin?
                <h1>Welcome Admin</h1>
            :(
                <>
            <h1>Latest Products</h1>
            {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
             <Row>
             {
                 products.map(product=>(

                     <Col sm={12} md={6} lg={4} xl={3}>
                          <Product  product={product}></Product>
                     </Col>
                 ))
             }
          </Row>
      )
            }
          </>
            
            )
        }
            
           
        </>
    )
}

export default HomeScreen
