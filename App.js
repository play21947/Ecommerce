import './App.css';
import Navbar from './components/Navbar';
import {Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import DisplayProduct from './components/DisplayProduct';
import {useHistory} from 'react-router-dom'
import Cart from './components/Cart';
import ProductBuy from './components/ProductBuy';
import Order from './components/Order';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/display_product" component={DisplayProduct}></Route>
      <Route path="/cart" component={Cart}></Route>
      <Route path="/product_buy/:id" component={ProductBuy}></Route>
      <Route path="/order" component={Order}></Route>
    </div>
  );
}

export default App;