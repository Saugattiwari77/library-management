import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/header";
import Homepage from "./Pages/Home/Homepage";
import Landing from "./Components/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import CartDisplay from "./Pages/Cart/index";
import Wishlist from "./Pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <WishlistProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<CartDisplay />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/books" element={<Books />} />
    <Route path="/members" element={<Members />} />
    <Route path="/transactions" element={<Transactions />} /> */}
        </Routes>
        <Footer />
      </Router>
    </WishlistProvider>
  );
}

export default App;
