import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import api from "@/api/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await api.post("/login", {
        username,
        password,
      });
  
      setLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to HawkEye Threat Detection System",
      });
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Login Failed",
        description: err.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <Card className="card-cyber w-full max-w-md relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 cyber-glow">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl gradient-text">HawkEye</CardTitle>
            <CardDescription className="text-muted-foreground">
              AI-Based Insider Threat Detection System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-secondary/50 border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="2fa"
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => setTwoFactorEnabled(!!checked)}
              />
              <Label
                htmlFor="2fa"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable Two-Factor Authentication
              </Label>
            </div> */}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure Login</span>
                </div>
              )}
            </Button>
          </form>
          
          {/* 👇 New Section for Register Redirect */}
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:underline"
            >
              Click here to Register
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Authorized Personnel Only</p>
            <p className="text-xs mt-1">Security Level: Classified</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;