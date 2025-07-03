import { useState } from "react";
import { Phone, Globe, Users, MessageCircle, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 lg:p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <Phone className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Zigler</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-gray-400">Join thousands of language learners worldwide</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <span className="text-red-400 text-sm">{error.response.data.message}</span>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="hello1"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello1@gmail.com"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors pr-12"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-purple-400 hover:underline cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-purple-400 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSignup}
              disabled={isPending}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="text-lg">✨</span>
                </>
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-400 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="text-white space-y-8">
          {/* Feature Icons */}
          <div className="flex justify-center lg:justify-start gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300">Global Reach</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300">Community</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300">Real-time Chat</p>
            </div>
          </div>

          {/* Floating Dots */}
          <div className="relative">
            <div className="absolute top-0 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
            <div className="absolute top-12 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
            <div className="absolute top-24 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50"></div>
            <div className="absolute top-36 right-1/2 w-1 h-1 bg-blue-300 rounded-full opacity-30"></div>
          </div>

          {/* Globe Icon */}
          <div className="flex justify-center lg:justify-start mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <Globe className="w-16 h-16 text-purple-300 opacity-80" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-4">
              Connect with language partners worldwide
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Practice conversations, make friends, and improve your language skills with our global community
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;