import { useContext, useEffect, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { fakeUsers } from "../../mock/auth";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { updateUser, email} = useContext(userContext)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = fakeUsers.find((user) => user.email === form.email && user.password === form.password);
    if (user) {
      updateUser(user)
      navigate("/dashboard")
    }
  }

  useEffect(() => {
    if (email) {
      navigate("/dashboard")
    }
  }, [])
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src="https://cdn.pixelbin.io/v2/lingering-thunder-71cc8f/original/presolv/logo.1326f5cba41d9c4e5917.png"
            alt="Presolv Logo"
            className="h-12 mx-auto mb-6"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder="john@doe.com"
              label="Email"
              className="w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              placeholder="########"
              label="Password"
              type="password"
              className="w-full"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value })}
            />

            <Button
              type="submit"
              className="w-full"
            >
              Proceed To Dashboard
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
