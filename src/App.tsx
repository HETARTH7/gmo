import "./App.css";
import Form from "./Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableData from "./TableData";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/second" element={<TableData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
