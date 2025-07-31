import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    // { icon: <Home size={20} />, label: "DashBoard" },
    { icon: <Users size={20} />, label: "Products" },
    { icon: <FileText size={20} />, label: "Orders" },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-400 text-white transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-white">
          {!isCollapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-gray-600"
          >
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-600 transition-colors ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <span
                      onClick={() =>
                        navigate(`/seller/${item.label.toLowerCase()}`)
                      }
                      className="flex-shrink-0"
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span
                        onClick={() =>
                          navigate(`/seller/${item.label.toLowerCase()}`)
                        }
                        className="ml-3"
                      >
                        {item.label}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div
          className={`p-4 border-t border-white ${
            isCollapsed ? "text-center" : "flex items-center"
          }`}
        >
          {!isCollapsed && (
            <div className="ml-3">
              <p
                className="text-sm font-medium"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Log Out
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
