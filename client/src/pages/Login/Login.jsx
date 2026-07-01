import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              className="w-full p-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition duration-200 text-slate-800 placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full p-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition duration-200 text-slate-800 placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Helpers */}
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center space-x-2 text-slate-600 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 accent-green-600" 
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-medium text-green-600 hover:text-green-700 transition">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-8">
          Don't have an account?{" "}
          <a href="#" className="font-semibold text-green-600 hover:text-green-700 transition">
            Sign up free
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;