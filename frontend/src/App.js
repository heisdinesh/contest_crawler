import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Hackathons, BookMarked, Home } from "./pages";
import HackathonState from "./context/hackathonState";

function App() {
  return (
   <HackathonState>
    <div className="bg-stone-50">
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hackathons" element={<Hackathons />}>
        
      </Route>
      <Route path="/hackathons/bookmarked" element={<BookMarked />}/>
      
    </Routes>
   </Router>
   </div>
   </HackathonState>
  );
}

export default App;
