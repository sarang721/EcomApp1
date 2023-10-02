import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer ,productDetailsReducer,productDeleteReducer,addProductReducer} from './reducer/productReducers';
import { cartReducer } from './reducer/cartReducers';
import { userLoginReducer,userRegisterReducer,userListReducer } from './reducer/userReducer';
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer} from './reducer/orderReducers';


const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    productDelete:productDeleteReducer,
    productAdded:addProductReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer

});

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []


  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

  

  const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress:shippingAddressFromStorage
  
    }
  }

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store;