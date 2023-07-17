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
import Basket from "./pages/Basket.jsx";
import Checkout from "./pages/Checkout.jsx";
import Success from "./pages/Success.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { ADMIN_DATA, USER_DATA } from "./data/static_data";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  const user = localStorage.getItem(USER_DATA)
    ? JSON.parse(localStorage.getItem(USER_DATA))
    : null;

  const admin = localStorage.getItem(ADMIN_DATA)
    ? JSON.parse(localStorage.getItem(ADMIN_DATA))
    : null;
  return (
    <>
      <AnimatePresence mode="wait">
        <Router>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/search/:search"} element={<SearchPage />} />
            <Route path={"/category/:cat"} element={<FilteredCategory />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/pizza/:id"} element={<PizzaDetails />} />
            <Route path={"/cart"} element={<Basket />} />
            <Route
              path={"/checkout"}
              element={
                <ProtectedRoute
                  redirectTo={"login"}
                  user={user}
                  children={<Checkout />}
                />
              }
            />
            <Route
              path={"/success"}
              element={
                <ProtectedRoute
                  redirectTo={"login"}
                  user={user}
                  children={<Success />}
                />
              }
            />
            <Route
              path={"/orders"}
              element={
                <ProtectedRoute
                  redirectTo={"login"}
                  user={user}
                  children={<Orders />}
                />
              }
            />
            <Route
              path={"/orders/:id"}
              element={
                <ProtectedRoute
                  redirectTo={"login"}
                  user={user}
                  children={<OrderDetails />}
                />
              }
            />

            {/* Admin routes start */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
             exact
              path={"/admin"}
              element={
                <ProtectedRoute
                  redirectTo={"admin/login"}
                  user={admin}
                  children={<AdminHome />}
                />
              }
            />
            <Route
              path={"/admin/orders/:id"}
              element={
                <ProtectedRoute
                  redirectTo={"admin/login"}
                  user={admin}
                  children={<AdminOrderDetails />}
                />
              }
            />

            <Route
            exact
              path={"/admin/orders"}
              element={
                <ProtectedRoute
                  redirectTo={"admin/login"}
                  user={admin}
                  children={<AdminOrders/>}
                />
              }
            />

            {/* Admin routes ends */}
          </Routes>
        </Router>
      </AnimatePresence>

      <ToastContainer />
    </>
  );
}

export default App;
