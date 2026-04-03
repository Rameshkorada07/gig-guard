import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-bold">GigGuard</span>
      </div>
      <p className="text-sm text-muted-foreground">
        AI-powered income protection for delivery partners.
      </p>
    </div>
  </footer>
);

export default Footer;
