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
// import NowShowing from './components/movie/NowShowing'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path={"/"}>
          <Route index element={<HomePage />} />
          <Route path={"/about"} element={<About />} />
          <Route path="/movies" element={<Movie />} />
          <Route
            path="/movie/:movieId/theater/:theaterId"
            element={<MovieTheaterPage />}
          />
          <Route path="/login" element={<LoginUi />} />
          <Route
            path="/seat/movie/:movieId/theater/:theaterId/showtime/:showtimeId"
            element={<Seat />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
