import React, { useState } from "react";
import "./Login.css";

// Login Components
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import Input from "../../commons/Input/Input";
import Button from "../../commons/Button/Button";
import { TestGettingData } from "../../services/testApi";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(name, value) {
    if (name === "userName") {
      setUser(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit() {
    let account = { user, password };
    if (account) {
      console.log("Account: ", account);

      // Test react node
      TestGettingData()
    } 
  }



  return (
    <form>
      <div className="container-login">
        <Title text="Inicio de sesión" />
        <Label text="Usuario" />
        <Input
          attribute={{
            id: "idUser",
            name: "userName",
            type: "text",
            placeholder: "Ingrese su usuario",
          }}
          handleChange={handleChange}
        />
        <Label text="Contraseña" />
        <Input
          attribute={{
            id: "idPassword",
            name: "password",
            type: "password",
            placeholder: "Ingrese su contraseña",
          }}
          handleChange={handleChange}
        />
        <Button text="Iniciar sesión" handleSubmit={handleSubmit} />
      </div>
    </form>
  );
};

export default Login;