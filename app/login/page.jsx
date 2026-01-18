"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { loginWithGoogle, loginWithEmail } from "../lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Helper to ensure MongoDB has the user (important for Google Login)
  const syncUserWithDB = async (user) => {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      image: user.photoURL,
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    } catch (error) {
      console.error("Auth sync error:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      Swal.fire({
        title: "Welcome Back!",
        text: "Successfully logged into TrendMart.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      // We sync here because Google Login acts as both Login and Registration
      await syncUserWithDB(result.user);

      Swal.fire({
        title: "Google Login Success",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-10 px-4">
      <div className="card w-full max-w-md bg-white shadow-2xl border border-gray-100">
        <div className="card-body">
          <header className="text-center mb-6">
            <h2 className="text-4xl justify-center flex items-center gap-3 font-black text-primary">
              <FaSignInAlt /> Login
            </h2>
            <p className="text-gray-500 mt-2">Welcome back to TrendMart</p>
          </header>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-block btn-outline btn-primary gap-3 normal-case text-lg h-14"
            disabled={loading}
          >
            <FcGoogle className="text-2xl" /> Login with Google
          </button>

          <div className="divider text-gray-400 text-xs uppercase tracking-widest my-6">
            OR
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-12 rounded-xl focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full px-12 rounded-xl focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <span className="label-text text-gray-500">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                size="sm"
                className="text-xs font-bold text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-block rounded-xl text-lg h-14 mt-2 ${
                loading && "loading"
              }`}
              disabled={loading}
            >
              {!loading && "Sign In"}
            </button>
          </form>

          {/* Mock Login Section */}
          <div className="divider text-gray-400 text-xs uppercase tracking-widest my-6">
            Demo Login
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <p className="text-sm text-gray-600 mb-3 text-center">
              Quick demo access (no registration needed)
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  setEmail("demo@trendmart.com");
                  setPassword("demo123");
                }}
                className="btn btn-sm btn-outline btn-secondary"
                disabled={loading}
              >
                Fill Demo Credentials
              </button>
              <div className="text-xs text-gray-500 text-center mt-1">
                Email: demo@trendmart.com | Password: demo123
              </div>
            </div>
          </div>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-primary hover:underline"
              >
                Register for free
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
