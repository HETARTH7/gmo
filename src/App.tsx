import "./App.css";
import Form from "./components/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableData from "./components/TableData";
import { Divider, Typography } from "@mui/material";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Typography variant="h3" color="inherit" component="div">
          GrowMeOrganic Private Limited React Internship Assignment by Hetarth
          Raval
        </Typography>
        <Divider style={{ marginBottom: "5rem" }} />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/second" element={<TableData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
