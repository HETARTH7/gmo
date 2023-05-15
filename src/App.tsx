import "./App.css";
import Form from "./Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
