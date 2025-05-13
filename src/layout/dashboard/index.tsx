import { Calendar, LogOut} from "lucide-react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Button from "../../components/ui/button";
import SessionContext from "../../context/sessionContext";


export default function Dashboard() {
  const location = useLocation();
  const {name = "", email, resetUser} = useContext(userContext);  
  
  const navItems = [
    { name: "Calendar", path: "/dashboard", icon: <Calendar /> },
  ];

  const logout = () => {
    resetUser()
    window.location.href = "/"
  }
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-300 px-6 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          <img
            src="https://cdn.pixelbin.io/v2/lingering-thunder-71cc8f/original/presolv/logo.1326f5cba41d9c4e5917.png"
            alt="Presolv Logo"
            className="h-12 py-1 mx-auto"
          />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative border border-gray-300 py-1 px-2 rounded-xl">
              <button className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none">
                <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  {name?.[0]}
                </div>
                <div className="flex flex-col items-start">
                <p className="font-semibold">{name}</p>
                <p className="text-sm">{email}</p>
                </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-300 overflow-y-auto">
          <div className="h-full flex flex-col">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 mt-auto border-t border-gray-300">
              <Button 
                onClick={() => logout()}
                variant="link"
                className="flex gap-4 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                <LogOut size={16}/>
                Sign Out
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <SessionContext>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        </SessionContext>
      </div>
    </div>
  );
}