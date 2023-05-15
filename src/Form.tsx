import { useState } from "react";
import { Button, TextField } from "@mui/material";

const Form = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.phone === "") {
      alert("Please provide all details");
      window.location.href = "/";
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/second";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={user.name}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        name="phone"
        label="Phone number"
        value={user.phone}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        name="email"
        label="Email"
        value={user.email}
        onChange={handleInputChange}
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
