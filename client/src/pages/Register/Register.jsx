import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
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
      const res = await api.post("/auth/register", form);

      alert(res.data.message || "Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
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
            Create an Account
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Join us today! Please fill in your details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full p-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition duration-200 text-slate-800 placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              I am a...
            </label>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                className="w-full p-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition duration-200 text-slate-800 bg-white appearance-none cursor-pointer"
                onChange={handleChange}
              >
                <option value="buyer">🛒 Buyer (Looking to purchase)</option>
                <option value="farmer">🧑‍🌾 Farmer (Looking to sell)</option>
              </select>
              {/* Custom dropdown arrow icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-8">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-green-600 hover:text-green-700 transition">
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;