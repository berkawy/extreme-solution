import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { ThemeProviderComponent } from "./Theme/ThemeContext";

function App() {
  return (
    <ThemeProviderComponent>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </ThemeProviderComponent>
  );
}

export default App;
