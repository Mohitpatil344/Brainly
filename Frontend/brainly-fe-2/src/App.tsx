import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin" 
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home";
import { SharePage } from "./pages/SharePage";
import { Notes } from "./pages/Notes"; // Ensure this is correctly imported
import Todo from "./pages/Todo";
import { Twitter } from "./pages/Twitter";
import { Youtube } from "./pages/Youtube"; // Ensure this is correctly imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/share/:shareLink" element={<SharePage />} />
        <Route path="/notes" element={<Notes />} /> {/* Notes route */}
        <Route path="/checklist" element={<Todo />} /> 
        <Route path="/twitter" element={<Twitter />} />
        <Route path="/youtube" element={<Youtube />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;