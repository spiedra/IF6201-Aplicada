import React, { useState } from "react";
import "./Login.css";

// Login Components
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import Input from "../../commons/Input/Input";
import Button from "../../commons/Button/Button";
import { TestPost } from "../../services/testApi";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleChange(name, value) {
    if (name === "userName") {
      setUser(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit() {
    let account = { userName, password };
    if (account) {
      // console.log("Account: ", account);
      // history.push("/home");
      TestPost(account).then((data) => {
        switch (data) {
          case 1:
            history.push("/home");
            break;

          case 0:
            break;

          case -1:
            break;

          default:
            break;
        }
      });
    }
  }

  return (
    <div className="container-login">
      <form className="form__login">
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
      </form>
    </div>
  );
};

export default Login;
