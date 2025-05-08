
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-bg-dark text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-gradient mb-4">404</h1>
        <p className="text-xl text-crypto-text-primary mb-6">
          Oops! This page has vanished like crypto in a bear market
        </p>
        <Button 
          asChild
          className="bg-crypto-accent-blue hover:bg-crypto-accent-blue/80"
        >
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
