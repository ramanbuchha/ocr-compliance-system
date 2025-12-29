import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";

const SettingsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth call
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // TODO: clear auth tokens / session here
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Admin Settings
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage admin access, authentication and application settings.
          </p>

          {/* Auth / access block */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Admin Access
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Only authorized admins can modify compliance rules and system
                configuration.
              </p>

              {isLoggedIn ? (
                <div className="space-y-4">
                  <p className="text-sm">
                    Status: <span className="font-semibold">Logged in as admin</span>
                  </p>
                  <Button variant="outline" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Admin email</label>
                    <Input type="email" required placeholder="admin@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <Input type="password" required placeholder="••••••••" />
                  </div>
                  <Button type="submit" className="w-full">
                    Log in
                  </Button>
                </form>
              )}
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security & Sessions
              </h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                <li>Use strong passwords and rotate them regularly.</li>
                <li>Log out after finishing rule changes.</li>
                <li>Restrict admin access to trusted team members only.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
