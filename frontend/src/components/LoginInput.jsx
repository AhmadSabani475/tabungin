import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
function LoginInput({ email, password, onChangeEmail, onChangePassword }) {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={onChangeEmail}
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            value={password}
            onChange={onChangePassword}
            type="password"
            required
          />
        </div>
      </div>
    </form>
  );
}
export default LoginInput;
