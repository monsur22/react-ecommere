// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Singleproduct from './pages/Singleproduct';
import Cart from './pages/Cart';
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
      </main>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
