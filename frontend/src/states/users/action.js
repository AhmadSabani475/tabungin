import { api } from "@/utilty/api";

function asyncRegister({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
}
export { asyncRegister };
