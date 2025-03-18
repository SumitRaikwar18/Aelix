import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Roadmap from "../components/Roadmap";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

interface IndexProps {
  handleDisconnect: () => Promise<void>;
  authenticated: boolean;
}

const Index: React.FC<IndexProps> = ({ handleDisconnect, authenticated }) => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 70,
            behavior: "smooth",
          });
          window.history.pushState({}, "", anchor.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col space-y-0">
        <Hero />
        <Features />
        <Roadmap />
        {authenticated && (
          <div className="text-center py-4">
            <Button onClick={handleDisconnect} variant="outline">
              Disconnect Wallet
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;