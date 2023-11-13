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
    const [filteredProducts, setFilteredProducts]=useState([]);
    const productList=useSelector(state=>state.productList) //getting all products from store combinereducer
    const {loading,error,products}=productList // getting loading error and products from productList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);

    const [showSuggestions, setShowSuggestions]=useState(true);

    //const [products,setProducts]=useState([]);
    useEffect(() => {
        dispatch(listProducts()); //getting products from database ,calling actions
       /* const fetchproducts=async()=>{
            const res=await axios.get('/api/products')
            setProducts(res.data);
        }
        fetchproducts();
        */

    },[])

    useEffect(() => {
        // Whenever the 'products' state changes, update 'filteredProducts'
        setFilteredProducts(products);
      }, [products]);

    useEffect(()=>{
          //debouncing to limit api calls when user is typing with delay less than 2secs
        const cachedData=JSON.parse(localStorage.getItem("cachedSuggestions"));

          let timer = setTimeout(()=>{
            searchSuggestions();
        },1500)

        return ()=>{
            clearTimeout(timer)
        }
    },[searchTerm])

    const searchSuggestions = async()=>{
        const data = await fetch("http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="+searchTerm);
        const json = await data.json();
        localStorage.setItem("cachedSuggestions",JSON.stringify(json))
        setSearchData(json[1]);

        let cachedSuggestions = JSON.parse(localStorage.getItem("cachedSuggestions")) || [];

        let newItem = {
        key: searchTerm,       // Replace with your key
        value: JSON.stringify(json[1])   // Replace with your value
        };

        cachedSuggestions.push(newItem);
        localStorage.setItem("cachedSuggestions", JSON.stringify(cachedSuggestions));

        console.log(localStorage.getItem("cachedSuggestions"));


    }

    const handleFilter=(name)=>{
        setShowSuggestions(false);
        setSearchTerm(name)
    }

    const handleSearchClick=()=>{
        const filteredProducts = products.filter((product)=>{
            return product.name.toLowerCase().includes(searchTerm.toLowerCase())
        })

        setFilteredProducts(filteredProducts)
    }

    return (
        <>
            {userInfo && userInfo.isAdmin?
                <h1>Welcome Admin</h1>
            :(
                <>
                <div className='seachcontainer'>
                    <input className='searchbar' onFocus={()=>setShowSuggestions(true)} value={searchTerm} onChange={(e)=>
                        setSearchTerm(e.target.value)
                    } type='text' placeholder='Search by product name...'></input>
                    <button className='button' onClick={handleSearchClick}>Search</button>
                </div>
                {showSuggestions && searchData.length>0 && <div className='searchsuggestionscontainer'>
                    <SearchSuggestions handleFilter={handleFilter} showSuggestions={setShowSuggestions} data={searchData}></SearchSuggestions>
                </div>}
            <h1>Latest Products</h1>
            {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
             <Row>
             {
                 filteredProducts.map(product=>(

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
