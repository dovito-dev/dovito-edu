import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import logoImage from "@assets/generated_images/Dovito_EDU_square_logo_1e2e311b.png";
import { SiGoogle } from "react-icons/si";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
    setLocation("/dashboard");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={logoImage} alt="Dovito EDU" className="h-16 w-16 rounded-lg" />
          </div>
          <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your educational resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => console.log("Forgot password clicked")}
                  data-testid="button-forgot-password"
                >
                  Forgot?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-login-submit">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
              OR
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleLogin}
            data-testid="button-google-login"
          >
            <SiGoogle className="h-4 w-4" />
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link href="/register">
              <a className="text-primary hover:underline" data-testid="link-register">
                Sign up
              </a>
            </Link>
          </p>
          <Link href="/">
            <a className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-back-home">
              ← Back to home
            </a>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
