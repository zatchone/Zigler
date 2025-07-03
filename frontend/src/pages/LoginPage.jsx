import { useState } from "react";
import { Phone, Globe, Users, MessageCircle, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row bg-black/20 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* LEFT SIDE - LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-12">
            <Phone className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Zigler</span>
          </div>

          {/* FORM CONTENT */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-purple-200 text-lg">
                Sign in to continue your language journey
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <span className="text-red-200">{error.response?.data?.message || "Login failed"}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* EMAIL INPUT */}
              <div className="space-y-2">
                <label className="block text-white font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                />
              </div>

              {/* PASSWORD INPUT */}
              <div className="space-y-2">
                <label className="block text-white font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* SIGN IN BUTTON */}
              <button
                onClick={handleLogin}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-purple-400 disabled:to-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* SIGN UP LINK */}
              <div className="text-center pt-4">
                <p className="text-purple-200">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ILLUSTRATION & FEATURES */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-800/50 to-blue-800/50 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
          
          {/* Background decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-8 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute top-1/3 right-24 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-1/3 left-12 w-1.5 h-1.5 bg-purple-300 rounded-full"></div>

          {/* Feature Icons */}
          <div className="flex justify-end mb-8 space-x-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2 backdrop-blur-sm">
                <Globe className="w-6 h-6 text-purple-300" />
              </div>
              <p className="text-sm text-purple-200">Global Reach</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2 backdrop-blur-sm">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <p className="text-sm text-purple-200">Community</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2 backdrop-blur-sm">
                <MessageCircle className="w-6 h-6 text-purple-300" />
              </div>
              <p className="text-sm text-purple-200">Real-time Chat</p>
            </div>
          </div>

          {/* Globe Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                <Globe className="w-24 h-24 text-white" />
              </div>
              {/* Floating dots around globe */}
              <div className="absolute -top-2 left-8 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute top-12 -right-4 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-8 -left-2 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Connect with language partners worldwide
            </h2>
            <p className="text-lg text-purple-200 leading-relaxed">
              Practice conversations, make friends, and improve your language skills with our global community
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-12 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-sm text-purple-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm text-purple-300">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-purple-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;