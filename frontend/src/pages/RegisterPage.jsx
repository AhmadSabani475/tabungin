import useInput from "@/hooks/useInput";
import { asyncRegister } from "@/states/users/action";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterInput from "@/components/RegisterInput";
import { Button } from "@/components/ui/button";
function RegisterPage() {
  const [name, changeName] = useInput();
  const [email, changeEmail] = useInput();
  const [password, changePassword] = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegis = ({ name, email, password }) => {
    dispatch(asyncRegister({ name, email, password }));
    navigate("/");
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <img src={logo} alt="Logo" className="h-16 mb-2 mx-auto" />
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterInput
            name={name}
            email={email}
            password={password}
            changeEmail={changeEmail}
            changeName={changeName}
            changePassword={changePassword}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => onRegis({ name, email, password })}
          >
            Login
          </Button>
          <Button variant="outline" className="w-full">
            <Link to="/">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
export default RegisterPage;
