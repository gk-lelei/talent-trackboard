
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Settings, FileBadge } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 mr-6">
          <FileBadge className="h-6 w-6" />
          <span className="font-bold text-lg">TalentTrack</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 md:space-x-6 flex-1">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
            Jobs
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/applications')}>
                  My Applications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-sm font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/jobs" className="text-sm font-medium" onClick={toggleMenu}>
              Jobs
            </Link>
            <Link to="/about" className="text-sm font-medium" onClick={toggleMenu}>
              About
            </Link>

            {user ? (
              <>
                <hr className="my-2" />
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium" onClick={toggleMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/dashboard" className="text-sm font-medium" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link to="/applications" className="text-sm font-medium" onClick={toggleMenu}>
                  My Applications
                </Link>
                <Link to="/profile" className="text-sm font-medium" onClick={toggleMenu}>
                  Profile
                </Link>
                <Button variant="outline" className="mt-2" onClick={() => {
                  logout();
                  toggleMenu();
                }}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button className="w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
