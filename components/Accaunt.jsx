"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AccountTabs() {
  const router = useRouter();
  
  // Signup state
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const onSignUp = async () => {
    try {
        setLoading(true);
        // const response = await axios.post("/api/users/signup", user);
        const response = await fetch("/api/user/singup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        console.log("Signup success", response.data);
        router.push("/chat");
        
    } catch (error) {
        console.log("Signup failed", error.message);
        
        toast.error(error.message);
    }finally {
        setLoading(false);
    }
}

useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);


  const onLogin = async () => {
    try {
      setLoginLoading(true);
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful!");
      router.push("/chat");
      
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
    }
  };


  // Validate login form
  useEffect(() => {
    setLoginButtonDisabled(!loginData.email || !loginData.password);
  }, [loginData]);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  disabled={loginLoading}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  disabled={loginLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={onLogin}
                disabled={loginButtonDisabled || loginLoading}
                className="w-full"
              >
                {loginLoading ? "Logging in..." : loginButtonDisabled ? "Enter credentials" : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  disabled={loading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={onSignUp}
                disabled={buttonDisabled || loading}
                className="w-full"
              >
                {loading ? "Creating account..." : buttonDisabled ? "Fill all fields" : "Sign Up"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}