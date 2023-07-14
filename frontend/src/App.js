import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchPage from "./pages/SearchPage";
import FilteredCategory from "./pages/FilteredCategory";
import About from "./pages/About";
import Login from "./pages/Login";
import PizzaDetails from "./pages/PizzaDetails";
import Basket from "./pages/Basket.jsx"
import Checkout from "./pages/Checkout.jsx"
import Success from "./pages/Success.jsx"
import Orders from "./pages/Orders.jsx"
import OrderDetails from "./pages/OrderDetails.jsx"

function App() {
  return (
    <>
      <AnimatePresence>
        <Router>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/search/:search"} element={<SearchPage />} />
            <Route path={"/category/:cat"} element={<FilteredCategory />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/pizza/:id"} element={<PizzaDetails />} />
            <Route path={"/cart"} element={<Basket />} />
            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"/success"} element={<Success />} />
            <Route path={"/orders"} element={<Orders />} />
            <Route path={"/orders/:id"} element={<OrderDetails />} />
          </Routes>
        </Router>
      </AnimatePresence>

      <ToastContainer />
    </>
  );
}

export default App;
