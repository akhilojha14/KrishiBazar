import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileOpen(false);
    navigate("/login");
  };

  // Helper function to dynamically highlight active page routes
  const isActive = (path) => location.pathname === path;
  const linkStyle = (path) => `
    text-sm font-semibold tracking-wide transition duration-200 py-1 border-b-2
    ${isActive(path) 
      ? "text-yellow-300 border-yellow-300" 
      : "text-emerald-100 border-transparent hover:text-white hover:border-emerald-400"
    }
  `;

  return (
    <nav className="bg-gradient-to-r from-green-900 to-emerald-800 text-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-green-800/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Brand Logo with micro-interaction pop */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-black tracking-tight transform active:scale-95 transition flex items-center gap-1 text-white"
        >
          <span className="animate-pulse">🌾</span> कृषि<span className="text-yellow-300 font-serif">𝓑𝓪𝔃𝓪𝓻</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className={linkStyle("/")}>Home</Link>

          {user?.role === "farmer" && (
            <>
              <Link to="/add-crop" className={linkStyle("/add-crop")}>Add Crop</Link>
              <Link to="/farmer-dashboard" className={linkStyle("/farmer-dashboard")}>Dashboard</Link>
            </>
          )}

          {user?.role === "buyer" && (
  <>
    <Link
      to="/buyer-dashboard"
      className={linkStyle("/buyer-dashboard")}
    >
      Dashboard
    </Link>

    <Link
      to="/buyer-orders"
      className={linkStyle("/buyer-orders")}
    >
      My Orders
    </Link>
  </>
)}

          {/* Authentication Conditional Toggles */}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-green-700/60">
            {!user ? (
              <>
                <Link to="/login" className="text-sm font-bold text-emerald-100 hover:text-white transition duration-150">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 text-sm font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition transform active:scale-95 duration-150"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-xs">👤</span>
                  <span className="text-xs font-bold text-yellow-300 max-w-[120px] truncate">
                    Hi, {user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-sm transition transform active:scale-95 duration-150"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Trigger Menu Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden p-2 text-emerald-100 hover:text-white focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.828 4.828 4.829-4.828a1 1 0 111.414 1.414l-4.828 4.828 4.828 4.829z"/>
            ) : (
              <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
            )}
          </svg>
        </button>
      </div>

      {/* Animated Dropdown Menu for Mobile Devices */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 max-h-0 ${mobileOpen ? "max-h-[300px] border-t border-green-800" : ""}`}>
        <div className="px-6 py-4 bg-green-950/95 space-y-3 flex flex-col">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-semibold hover:text-yellow-300 py-1">Home</Link>
          
          {user?.role === "farmer" && (
            <>
              <Link to="/add-crop" onClick={() => setMobileOpen(false)} className="text-sm font-semibold hover:text-yellow-300 py-1">Add Crop</Link>
              <Link to="/farmer-dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-semibold hover:text-yellow-300 py-1">Dashboard</Link>
            </>
          )}

          {user?.role === "buyer" && (
  <>
    <Link
      to="/buyer-dashboard"
      onClick={() => setMobileOpen(false)}
      className="text-sm font-semibold hover:text-yellow-300 py-1"
    >
      Dashboard
    </Link>

    <Link
      to="/buyer-orders"
      onClick={() => setMobileOpen(false)}
      className="text-sm font-semibold hover:text-yellow-300 py-1"
    >
      My Orders
    </Link>
  </>
)}

          <div className="pt-3 border-t border-green-800 flex flex-col gap-3">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold hover:text-yellow-300 py-1">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="bg-yellow-400 text-slate-900 text-center text-sm font-bold py-2 rounded-xl">Register</Link>
              </>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-yellow-300 truncate">👤 Hi, {user.name}</span>
                <button onClick={logout} className="bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;