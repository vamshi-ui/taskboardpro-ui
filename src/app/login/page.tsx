"use client";

import { useEffect, useState } from "react";
import { Layout, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "primereact/button";
import { useApi } from "../hooks/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
import { API_CONST } from "../constants/api.constant";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const searchParams = useSearchParams();
  const { commonApiCall, toastRef } = useApi();
  const unauthorized = searchParams.get("unauthorized");

  useEffect(() => {
    if (unauthorized) {
      toastRef.show({
        severity: "error",
        summary: "error",
        detail: "Please log in to continue accessing the features.",
      });
    }
  }, [unauthorized]);

  function submitForm() {
    console.log(process.env.baseUrl);
    
    if (email && password) {
      commonApiCall({
        endPoint: API_CONST.LOGIN,
        params: {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId: email, password }),
        },
      })
        .then((data: any) => {
          localStorage.setItem("userData", JSON.stringify(data.userData));
          toastRef.show({
            severity: "success",
            summary: "success",
            detail: data.message,
          });
          route.push("dashboard");
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      toastRef.show({
        severity: "error",
        summary: "error",
        detail: "Please Enter Valid Email & Password",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-amber-100 bg-white/80 backdrop-blur-sm p-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Layout className="h-7 w-7 text-amber-500" strokeWidth={2} />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                TaskBoard Pro
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md border border-gray-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-gray-600 mt-2">
                Sign in to your account to continue
              </p>
            </div>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-amber-500 focus:ring-amber-300 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-amber-600 hover:text-amber-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  submitForm();
                }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 rounded-md transition-colors duration-200 flex justify-center"
              >
                Sign in
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue with Google
                </button>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
