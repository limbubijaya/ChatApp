import { useState } from "react";
import { Link } from "react-router-dom";
import authStore from "../store/authStore";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const { signup } = authStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();

    if (valid) {
      await signup(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col rounded-3xl border-8 h-auto p-4 w-full max-w-sm border-gray-50 text-black bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-5 w-full">
            <input
              type="email"
              name="email"
              id="email"
              className="border-b-2 border-gray-300 bg-white w-full p-2 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-5 w-full">
            <input
              type="text"
              name="name"
              id="name"
              className="border-b-2 border-gray-300 bg-white w-full p-2 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-5 w-full">
            <input
              type="password"
              name="password"
              id="password"
              className="border-b-2 border-gray-300 bg-white w-full p-2 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="font-bold border-2 text-white bg-purple-300 border-gray-300 rounded-xl w-full hover:bg-blue-400 py-2"
          >
            Create Account
          </button>
        </form>
        <div className="border-4 rounded-3xl mb-1 border-black dark:border-white p-4 w-full mt-6">
          <h1 className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
