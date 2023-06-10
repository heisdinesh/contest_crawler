import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Hackathons, BookMarked } from "./pages";
import Bookmarked_hackathons from "./components/Bookmarked_hackathons";
import HackathonState from "./context/hackathonState";

function App() {
  return (
   <HackathonState>
    <div className="bg-stone-50">
    <Router>
    <Routes>
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
