import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/header";
// import Homepage from "./Pages/Home/Homepage";
import Landing from "./Components/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Signup from "./Pages/SignUp/Signup";
import Login from "./Pages/Login/login";
import AdminDashboard from "./Pages/Admin/AdminPage";
import HomePage from "./Pages/Design/MainHomePage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Login />} /> {/* fallback to login */}
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            {/* <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/books" element={<Books />} />
    <Route path="/members" element={<Members />} />
    <Route path="/transactions" element={<Transactions />} /> */}
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
