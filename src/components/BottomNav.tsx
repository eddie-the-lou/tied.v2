import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Sparkles, Link2, Bot, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/suggested-ties', label: 'Suggested', icon: Users },
    { path: '/todays-tie', label: "Today's Tie", icon: Sparkles },
    { path: '/my-ties', label: 'My Ties', icon: Link2 },
    { path: '/talk-to-ty', label: 'Ty', icon: Bot },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary-600' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-primary-600' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
