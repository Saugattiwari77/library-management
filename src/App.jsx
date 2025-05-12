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
import HomePage from "./Pages/Design/MainHomePage";
import ReportsPage from "./Pages/Report/Report";
import ContactUs from "./Pages/Contact Us/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import SettingsPage from "./Pages/Settings/Setting";
import LogoutPage from "./Pages/LogOut/Logout";
import AdminDashboard from "./Pages/Admin/AdminPage";
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import Orders from "./Pages/Admin/Orders";
import Discounts from "./Pages/Admin/Discounts";
import { Book } from "lucide-react";
import Announcements from "./Pages/Admin/Announcements";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/Landing" element={<Landing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Login />} /> {/* fallback to login */}
            <Route path="/Admin" element={<AdminDashboard />} />
            <Route path="/report" element={<ReportsPage />} />
            <Route path="/sidebar" element={<AdminSidebar />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/discount" element={<Discounts />} />
            <Route path="/book" element={<Book />} />
            <Route path="/anouncement" element={<Announcements />} />
            {/* <Route path="/report" element={<ReportsPage />} /> */}
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
