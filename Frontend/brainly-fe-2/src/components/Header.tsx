import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
      <div className="flex items-center justify-center">
        <Brain className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold text-primary">Brainly</span>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          to="/signup"
          className="text-sm font-medium hover:text-primary"
        >
          Signup
        </Link>
        <Link
          to="/signin"
          className="text-sm font-medium hover:text-primary"
        >
          Signin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
