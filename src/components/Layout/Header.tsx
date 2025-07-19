import React from 'react';
import { Moon, Sun, Menu, X, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import PasswordChangeModal from '../Dashboard/PasswordChangeModal';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenu?: boolean;
  isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, showMenu = false, isLandingPage = false }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);

  const handleLogoClick = () => {
    if (user) {
      logout(); // Log the user out if logged in
    }
    navigate('/'); // Redirect to the landing page
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {!isLandingPage && (
                <button
                  onClick={onMenuToggle}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {showMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
              <div
                onClick={handleLogoClick}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  TaskFlow
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>

              {user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
                      Welcome, {user.name}
                    </span>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                      aria-label="Change password"
                      title="Change Password"
                    >
                      <Settings size={20} />
                    </button>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-500"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default Header;