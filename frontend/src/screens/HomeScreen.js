import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message';
import Loader from '../components/Loader';
import './HomeScreen.css'
import SearchSuggestions from '../components/SearchSuggestions'

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch=useDispatch();
    const productList=useSelector(state=>state.productList) //getting all products from store combinereducer
    const {loading,error,products}=productList // getting loading error and products from productList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false)

    //const [products,setProducts]=useState([]);
    useEffect(() => {
        dispatch(listProducts()); //getting products from database ,calling actions
       /* const fetchproducts=async()=>{
            const res=await axios.get('/api/products')
            setProducts(res.data);
        
        }
        fetchproducts();
        */
        searchSuggestions();

    }, [searchTerm])

    const searchSuggestions = async()=>{
        const data = await fetch("http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="+searchTerm);
        const json = await data.json();
        console.log(json)
        setSearchData(json[1]);
    }
    
    return (
        <>
            {userInfo && userInfo.isAdmin?
                <h1>Welcome Admin</h1>
            :(
                <>
                <div className='seachcontainer'>
                    <input className='searchbar' onBlur={()=>setShowSuggestions(false)} onFocus={()=>setShowSuggestions(true)} value={searchTerm} onChange={(e)=>
                        setSearchTerm(e.target.value)
                    } type='text' placeholder='Search by product name...'></input>
                    <button className='button'>Search</button>
                </div>
                {showSuggestions && searchData.length>0 && <div className='searchsuggestionscontainer'>
                    <SearchSuggestions data={searchData}></SearchSuggestions>
                </div>}
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
