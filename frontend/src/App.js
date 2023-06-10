import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Hackathons } from "./pages";

function App() {
  return (
   <div className="bg-stone-50">
    <Router>
    <Routes>
      <Route path="/" element={<Hackathons />} />
    </Routes>
   </Router>
   </div>
  );
}

export default App;
