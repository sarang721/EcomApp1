
import React ,{useEffect}from 'react'
import { Link } from 'react-router-dom';
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { LinkContainer } from 'react-router-bootstrap'


const Header= ()=> {


  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (

      <Navbar>
      <div className="navbar">
      
                    <Link className="link" to="/"><h1>Ecommerce App</h1></Link>

                    
                    <ul className="unordered">

                    {
                     userInfo && userInfo.isAdmin?null:(

                           <Link  className="link" to="/cart"> <li className="lists"><i className='fas fa-shopping-cart'></i>Cart</li> 
                              </Link>

                        )
                    }

                            {userInfo && userInfo.isAdmin ?(

                              <ul className="unordered">
                                <li className="lists">Admin</li>
                                <Link to="/admin/users"><li className="lists">Users</li></Link>
                                      <Link to="/admin/products"> <li className="lists">Products</li></Link>
                                      <Link to="/admin/orders"> <li className="lists">Orders</li></Link>
                                    <li className="lists" onClick={logoutHandler}>Logout</li>
                                      </ul>


                                    )
                            
                            
                            :userInfo?
                            (
                              <>
                            <li className="lists">{userInfo.name}</li>
                            <Link className="link" to="/myorders"><li className="lists">My Orders</li></Link>
                            <li className="lists" onClick={logoutHandler}>Logout </li>
                            
                            </>

                           
                            )
                            
  
                            :<Link className="link" to="/login"><li className="lists"><i className='fas fa-user'></i>Sign In</li></Link>}
                          
                            
                            
                            
            
                              
      
                        </ul>


                   
         
          
      </div>
      </Navbar>
  )
}

export default Header;
