import { LogOut, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onBack?: () => void; // ✅ ADD THIS
}

export default function Header({ user, onLogout, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Back + Logo */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">V</span>
            </div>

            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              VotePlatform
            </span>
          </div>

          {/* Right: User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=2563eb&color=fff`
                }
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
              <span className="text-gray-700 font-medium hidden sm:block">
                {user.name}
              </span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
