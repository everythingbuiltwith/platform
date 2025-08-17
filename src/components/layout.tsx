import { ReactNode, useEffect, useState } from "react";
import { Menubar } from "./ui/menubar";
import { Layers2 } from "lucide-react";
import { getIconifyComponent } from "@/lib/icons";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { authClient } from "@/lib/auth-client";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 46);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "backdrop-blur bg-background/90" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link to="/submit">Submit Stack</Link>
          </Button>
          <AuthLoading>
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          </AuthLoading>
          <Unauthenticated>
            <Button asChild variant="outline">
              <Link to="/signin">Sign In</Link>
            </Button>
          </Unauthenticated>
          <Authenticated>
            <UserMenu />
          </Authenticated>
          <Menubar className="bg-transparent border-none" />
        </div>
      </div>
    </header>
  );
}

function UserMenu() {
  const user = useQuery(api.auth.getCurrentUser);
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {user?.name || user?.email}
      </span>
      <Button 
        variant="secondary"
        size="sm"
        onClick={() => authClient.signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-border text-sm mt-8">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4 flex flex-col md:flex-row md:justify-between md:items-start items-center gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex">
            <Logo />
          </div>
          <p className="text-sm max-w-xs text-muted-foreground">
          Discover the tech behind successful products, with curated stories, real-world insights, and the reasons behind every choice. For developers, founders, and teams making smarter decisions.
          </p>
          <div className="flex items-center gap-4 mt-2 text-xl text-muted-foreground">
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{getIconifyComponent("GitHub")}</a>
            <a href="https://discord.com/" aria-label="Discord" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{getIconifyComponent("Discord")}</a>
            <a href="https://x.com/" aria-label="X" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{getIconifyComponent("X")}</a>
          </div>
        </div>
        <div className="min-w-[160px]">
          <div className="font-semibold text-foreground mb-2">Product</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Examples</a></li>
            <li><a href="#" className="hover:underline">Roadmap</a></li>
          </ul>
        </div>
        <div className="min-w-[160px]">
          <div className="font-semibold text-foreground mb-2">Resources</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">GitHub</a></li>
            <li><a href="#" className="hover:underline">Discord</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-4 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
        <span>&copy; 2025 everybuiltwith.com - All rights reserved.</span>
        <ul className="flex gap-4">
          <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          <li><a href="#" className="hover:underline">Terms of use</a></li>
          <li><a href="#" className="hover:underline">Imprint</a></li>
        </ul>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Layers2 className="text-primary mr-2"/>
      <span className="text-lg font-extrabold tracking-tigh">everything<span className="text-primary">built</span>with</span>
    </div>
  );
} 