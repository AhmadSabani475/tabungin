import LoginInput from "@/components/LoginInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useInput from "@/hooks/useInput";
import { asyncSetAuthUser } from "@/states/auth/action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
function LoginPage() {
  const [email, changeEmail] = useInput();
  const [password, changePassword] = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  console.log("authUser di LoginPage:", authUser);
  const login = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate("/");
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <img src={logo} alt="Logo" className="h-16 mb-2 mx-auto" />
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginInput
            email={email}
            onChangeEmail={changeEmail}
            password={password}
            onChangePassword={changePassword}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => login({ email, password })}
          >
            Login
          </Button>
          <Button variant="outline" className="w-full">
            <Link to="/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
export default LoginPage;
