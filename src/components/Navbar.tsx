'use client';

import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Database } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push('/tool');
  };

  return (
    <nav className="border-b">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <Link href="/" className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity">
                  MockAPI Studio
                </Link>
                <p className="text-xs text-muted-foreground">
                  Professional API mocking
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1">
                <Star className="w-3 h-3" />
                Free Tool
              </Badge>

              <SignedIn>
                <Button onClick={handleGetStarted} size="sm">
                  Go to Tool
                </Button>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <Button onClick={handleGetStarted} size="sm">
                  Try Now
                </Button>
              </SignedOut>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
} 