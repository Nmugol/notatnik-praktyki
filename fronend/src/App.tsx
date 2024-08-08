import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Project from './pages/project';
import OpenProject from './pages/open-project';
import NoteEditor from './pages/note_editor';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/open_project/:id" element={<OpenProject/>} />
        <Route path='/note_editor/:id' element={<NoteEditor/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
