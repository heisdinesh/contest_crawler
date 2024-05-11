import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hackathons, BookMarked, Home } from "./pages";
import HackathonState from "./context/hackathonState";
import Telegram from "./components/Telegram";

function App() {
  return (
    <HackathonState>
      <div className="bg-stone-50">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Hackathons />}></Route>
            <Route path="/hackathons/bookmarked" element={<BookMarked />} />
          </Routes>
          <Telegram />
        </Router>
      </div>
    </HackathonState>
  );
}

export default App;
