import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const token = localStorage.getItem("gigguard-token");
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">GigGuard</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#" className="hover:text-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex gap-2">
          {token ? (
            <Link to="/dashboard"><Button size="sm">Dashboard</Button></Link>
          ) : (
            <>
              <Link to="/login"><Button size="sm" variant="secondary">Login</Button></Link>
              <Link to="/register"><Button size="sm">Sign Up</Button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
