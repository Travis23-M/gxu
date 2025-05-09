import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Getproducts from './components/Getproducts';
import Addproduct from './components/Addproduct';
import Makepayment from './components/Makepayment';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navcomp from './components/Navcomp';
import Aboutus from './components/Aboutus';
import Footer from './components/Footer';
import Customerservice from './components/Customerservice';
// import { CartProvider } from './context/CartContext'; // Import CartProvider
import CartComp from './components/Cartcomp'; // Import CartComp
import CartPayment from './components/Cartpayment';

function App() {
  return (
    // <CartProvider> {/* Wrap the application with CartProvider */}
      <Router>
        <div className="App">
          <header className="App-header">
            <h4 className="App-header">GxU HOME APPLIANCES</h4>
          </header>
          <Navcomp /> {/* Navigation bar */}
        </div>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Getproducts />} />
          <Route path="/addproducts" element={<Addproduct />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/customerservice" element={<Customerservice />} />
          <Route path="/cart" element={<CartComp />} /> 
          <Route path="/cartpayment" element={<CartPayment/>}/>
          {/* <Route path="/cartitem" element={<cartitem/>}/> */}
        </Routes>

        <Footer /> {/* Footer component */}
      </Router>
    // {/* </CartProvider> */}
  );
}

export default App;
