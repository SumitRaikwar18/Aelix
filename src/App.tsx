import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

  const AppContent = () => {
    const navigate = useNavigate();
    const { logout, authenticated, user } = usePrivy();

    const handleLogin = (user: any) => {
      console.log("Login successful, user:", user); // Debug log
      console.log("Authenticated:", authenticated); // Debug log
      navigate("/dashboard"); // Redirect to dashboard immediately on login
    };

    const handleDisconnect = async () => {
      try {
        await logout();
        await fetch("http://localhost:3000/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        console.log("Wallet disconnected on server");
        navigate("/");
      } catch (error) {
        console.error("Error during disconnect:", error);
      }
    };

    if (!privyAppId) {
      return (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      );
    }

    return (
      <PrivyProvider
        appId={privyAppId}
        config={{
          appearance: {
            theme: "light",
            accentColor: "#000000",
            logo: "/images/83658abf-c342-42b2-9279-82b780dec951.png",
          },
          loginMethods: ["wallet"],
          embeddedWallets: {
            createOnLogin: "all-users",
          },
        }}
        onSuccess={handleLogin}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route
                path="/"
                element={<Index handleDisconnect={handleDisconnect} authenticated={authenticated} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard handleDisconnect={handleDisconnect} authenticated={authenticated} />}
              />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </PrivyProvider>
    );
  };

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;