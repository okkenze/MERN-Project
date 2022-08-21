import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EditWorkout from "../src/components/EditWorkout";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/editworkout" element={<EditWorkout />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
