// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Singleproduct from './pages/Singleproduct';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import UserList from './pages/UserList';
import Header from './layout/Header';
import Footer from './layout/Footer';
function App() {
  return (
    <Router>
    <div className="grid-container">
      <Header/>
      <main>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/product/:id" component={Singleproduct}></Route>
        <Route path="/cart/:id?" component={Cart}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/shipping" component={Shipping}></Route>
        <Route path="/payment" component={Payment}></Route>
        <Route path="/placeorder" component={PlaceOrder}></Route>
        <Route path="/order/:id" component={Order}></Route>
        <Route path="/admin/userlist" component={UserList}></Route>
      </main>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
