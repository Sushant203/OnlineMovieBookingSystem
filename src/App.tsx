import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout";
import HomePage from "./pages/homepage/HomePage";
import About from "./pages/About";
import MovieTheaterPage from "./components/movie/MovieTheater";
import LoginUi from "./components/login/LoginUi";
import Seat from "./app/seat";
import SignUp from "./components/signup/SignUp";
import Movie from "./components/movie/index";
import SingleMovie from "./components/SIngleMovie";
import PaymentPage from "./components/payment_handling/Payment";
import TicketPage from "./components/ticket_page/TicketPage";
import { Contact } from "lucide-react";
import ContactUs from "./app/contact/ContactUs";

// PayPal configuration
const initialOptions = {
  clientId:
    "AX3kTcjFomhMjqgfARYCr52eXed_niqPM2USFaskn_G9bqbl-HNHaPw8a78Nqix7nbFDAN0lnVdJFlRQ", // Make sure this is correct
  currency: "USD",
  intent: "CAPTURE", // You might also want to ensure you're using the right intent
};

const App: React.FC = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <Routes>
          <Route element={<Layout />} path={"/"}>
            <Route index element={<HomePage />} />
            <Route path={"/about"} element={<About />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/movie/:movieId" element={<SingleMovie />} />
            <Route
              path="/movie/:movieId/theater/:theaterId"
              element={<MovieTheaterPage />}
            />
            <Route path="/login" element={<LoginUi />} />
            <Route
              path="/seat/movie/:movieId/theater/:theaterId/showtime/:showtimeId"
              element={<Seat />}
            />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
