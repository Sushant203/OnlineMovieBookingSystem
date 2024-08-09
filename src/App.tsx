import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout";
import HomePage from "./pages/homepage/HomePage";
import About from "./pages/About";
import MovieTheaterPage from "./components/movie/MovieTheater";
import LoginUi from "./components/login/LoginUi";
// import NowShowing from './components/movie/NowShowing'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path={"/"}>
          <Route index element={<HomePage />} />
          <Route path={"/about"} element={<About />} />
          <Route
            path="/movie/:movieId/theater/:theaterId"
            element={<MovieTheaterPage />}
          />
          <Route path="/login" element={<LoginUi />} />
          {/* <Route path={'/nowshowing'} element={<NowShowing/>}/> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
