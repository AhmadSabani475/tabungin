import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function RegisterInput({
  name,
  email,
  password,
  changeName,
  changeEmail,
  changePassword,
}) {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="text">Name</Label>
          <Input
            value={name}
            onChange={changeName}
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={changeEmail}
            type="email"
            placeholder="jabrig@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={changePassword}
            type="password"
            required
          />
        </div>
      </div>
    </form>
  );
}
export default RegisterInput;
