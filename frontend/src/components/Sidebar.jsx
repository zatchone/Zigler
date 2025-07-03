import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, Home, Phone, Users } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

  return (
    <aside className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700/50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent tracking-wide">
            Zigler
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = currentPath === path;
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white shadow-lg shadow-purple-500/10"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50 hover:border-gray-600/50 border border-transparent"
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-md" 
                  : "bg-gray-800/50 group-hover:bg-gray-700/50"
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
              </div>
              <span className={`font-medium ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                {label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Decorative Elements */}
      <div className="px-4 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-700/50 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 group">
          <div className="relative">
            <img 
              src={authUser?.profilePic} 
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-200"
            />
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm truncate">
              {authUser?.fullName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating dots for visual appeal */}
      <div className="absolute top-32 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-48 right-12 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-6 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50 animate-pulse delay-500"></div>
    </aside>
  );
};

export default Sidebar;