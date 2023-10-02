import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router ,Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import MyOrders from './screens/MyOrders';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {
  return (
    <Router>


  
      <Header></Header>

      <main className='py-3'>

        <Container>
          <Route exact path="/" component={HomeScreen}>
        </Route>

        <Route exact path="/products/:id" component={ProductScreen} >

        </Route>


        <Route exact path="/admin/products" component={ProductListScreen} >

</Route>

<Route exact path="/admin/orders" component={OrdersScreen} >

</Route>

        <Route exact path="/admin/users" component={UserListScreen} >

        </Route>
        <Route exact path="/myorders" component={MyOrders} >

        </Route>

        <Route exact path="/placeorder" component={PlaceOrderScreen} >

        </Route>
        <Route exact path="/shipping" component={ShippingScreen} >

        </Route>
        <Route exact path="/payment" component={PaymentScreen} >

</Route>

<Route exact path="/order/:id" component={OrderScreen} >

</Route>

    <Route exact path="/admin/create" component={CreateProductScreen} >

    </Route>

        <Route exact path="/login" component={LoginScreen} >

        </Route>

        <Route exact path="/register" component={RegisterScreen} >

</Route>

        <Route exact path="/cart/:id?" component={CartScreen} >

        </Route>
      </Container>
        </main>


       <Footer></Footer>
  
  
    </Router> 
  );
}

export default App;
