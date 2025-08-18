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
  const links = [
    {
        title: 'Privacy Policy',
        href: '#',
    },
    {
        title: 'Terms of Service',
        href: '#',
    },
    {
        title: 'Imprint',
        href: '#',
    },
  ]

  return (
      <footer className="py-6 md:py-8 border-t mt-16">
          <div className="mx-auto max-w-5xl px-6">
              <div className="flex justify-between">
                <div className="flex flex-col items-start justify-baseline">
                  <Link
                    to="/"
                    aria-label="go home"
                    className="block">
                    <Logo />
                  </Link>
                  <div className="my-8 flex flex-wrap gap-6 text-sm">
                      <a
                          href="https://github.com/everythingbuiltwith"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="block">
                          {getIconifyComponent("GitHub", "size-6")}
                      </a>
                      <a
                          href="https://x.com/MaxWagnerDev"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X/Twitter"
                          className="block">
                          {getIconifyComponent("x", "size-6")}
                      </a>
                  </div>
                  <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} everythingbuiltwith.com, All rights reserved</span>
                </div>
              
                <div className="flex flex-wrap gap-6 text-sm items-end">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
              </div>
          </div>
      </footer>
  )
}



function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Layers2 className="text-primary mr-2"/>
      <span className="text-lg font-extrabold tracking-tigh">everything<span className="text-primary">built</span>with</span>
    </div>
  );
} 