import { useEffect, useState } from "react";
import api from "../../services/api";
import CropCard from "../../components/CropCard/CropCard";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

function Home() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const { data } = await api.get("/crops");
      setCrops(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchCrop = async (value) => {
    setSearch(value);
    try {
      if (value === "") {
        fetchCrops();
        return;
      }
      const { data } = await api.get(`/crops/search?name=${value}`);
      setCrops(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white py-28 px-4 overflow-hidden shadow-xl">
        
        {/* Floating Ambient Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>

        {/* Floating Animated Emojis */}
        <div className="absolute top-16 left-12 text-6xl opacity-30 select-none animate-[bounce_3s_infinite]">🌾</div>
        <div className="absolute bottom-16 right-16 text-6xl opacity-20 select-none animate-[pulse_4s_infinite]">🚜</div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="min-h-[60px] flex justify-center items-center">
            <TypeAnimation
              sequence={[
                "🌾 Welcome to कृषि𝓑𝓪𝔃𝓪𝓻",
                2000,
                "👨‍🌾 Buy Fresh Crops",
                2000,
                "🛒 Sell Directly to Buyers",
                2000,
              ]}
              wrapper="h1"
              speed={50}
              repeat={Infinity}
              className="text-4xl md:text-6xl font-extrabold text-yellow-300 tracking-tight drop-shadow-sm"
            />
          </div>

          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto font-medium leading-relaxed">
            India's Trusted Marketplace Connecting Farmers 👨‍🌾 and Buyers 🛒
          </p>

          {/* Stats Display Grid */}
          <div className="grid grid-cols-3 max-w-xl mx-auto py-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 my-8 shadow-inner animate-[fadeIn_1s_ease-out]">
            <div className="text-center border-r border-white/10">
              <h3 className="text-2xl md:text-4xl font-extrabold text-yellow-300">500+</h3>
              <p className="text-xs md:text-sm text-emerald-100 mt-1 font-medium">Farmers 👨‍🌾</p>
            </div>
            <div className="text-center border-r border-white/10">
              <h3 className="text-2xl md:text-4xl font-extrabold text-yellow-300">1000+</h3>
              <p className="text-xs md:text-sm text-emerald-100 mt-1 font-medium">Buyers 🛒</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-extrabold text-yellow-300">50+</h3>
              <p className="text-xs md:text-sm text-emerald-100 mt-1 font-medium">Crops 🌾</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3.5 rounded-xl font-bold transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-xl duration-200"
            >
              🌱 Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-white/80 hover:bg-white hover:text-green-800 px-8 py-3.5 rounded-xl font-bold transition-all transform hover:scale-[1.03] active:scale-[0.98] duration-200"
            >
              🔑 Login
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto py-16 px-6 -mt-10 relative z-20">
        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 tracking-tight mb-12">
            Why Choose <span className="text-green-600">कृषिbazar</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition duration-300">🌾</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Fresh Crops</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Buy directly from verified farmers without middlemen.
              </p>
            </div>

            <div className="group bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition duration-300">💰</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Best Prices</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Farmers get fair prices and buyers save money.
              </p>
            </div>

            <div className="group bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition duration-300">🚚</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Fast Delivery</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Simple ordering process with secure transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            🌾 Fresh Crops Marketplace
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Explore fresh crops directly from verified farmers across India.
          </p>
        </div>

        {/* Custom Input Search Component Styling */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search crops like Wheat, Rice, Potato..."
              value={search}
              onChange={(e) => searchCrop(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white px-6 py-4 pl-12 shadow-md focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200 text-slate-800 placeholder-slate-400"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 select-none pointer-events-none">
              🔍
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-100">
            🌱 Total Crops Available: &nbsp;<b className="text-green-800 font-extrabold">{crops.length}</b>
          </span>
        </div>

        {/* Crops Container Grid with subtle fade-in transition block */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 transition-all duration-500">
          {crops.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-5xl mb-3">📦</div>
              <h3 className="text-xl font-bold text-slate-700">No Crops Found</h3>
              <p className="text-slate-400 mt-1 max-w-sm mx-auto text-sm">
                We couldn't find matches for your search. Try checking your spelling or looking for a different item.
              </p>
            </div>
          ) : (
            crops.map((crop) => (
              <div key={crop._id} className="animate-[fadeIn_0.5s_ease-out]">
                <CropCard crop={crop} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Slogan Intermission */}
      <section className="bg-gradient-to-r from-emerald-800 to-green-900 text-white py-14 text-center my-6">
        <div className="max-w-3xl mx-auto px-6 space-y-2 animate-pulse">
          <h2 className="text-3xl md:text-4xl font-black text-yellow-300 tracking-wide font-serif">
            "जय जवान जय किसान"
          </h2>
          <p className="text-base text-emerald-100 font-medium tracking-wider">
            - लाल बहादुर शास्त्री
          </p>
        </div>
      </section>

      {/* Premium Footer Layout */}
      <footer className="bg-slate-950 text-slate-200 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          
          {/* Column 1: Logo & Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tight">
              🌾 कृषि𝓑𝓪𝔃𝓪𝓻
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering local agriculture infrastructures by safely connecting farmers straight to retail and wholesale buyers nationwide.
            </p>
          </div>

          {/* Column 2: Team Members */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Developed by Team
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-400 font-medium">
              <li className="flex items-center gap-2">💻 <span className="hover:text-white transition">Akhilesh Ojha</span></li>
              <li className="flex items-center gap-2">💻 <span className="hover:text-white transition">Yash Tiwari</span></li>
              <li className="flex items-center gap-2">💻 <span className="hover:text-white transition">Ishika</span></li>
              <li className="flex items-center gap-2">💻 <span className="hover:text-white transition">Trisha</span></li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide">Contact Us</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">📧 support@krishibazar.com</li>
              <li className="flex items-center gap-2">📞 +91 9794799768,8887180620</li>
              <li className="flex items-center gap-2">📍 Prayagraj, India</li>
            </ul>
          </div>
        </div>

        {/* Footer Base Rights */}
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 mt-12 pt-6 text-center text-xs text-slate-500 font-medium">
          © 2026 KrishiBazar. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;