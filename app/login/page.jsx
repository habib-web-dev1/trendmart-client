"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { loginWithEmail, loginWithGoogle } from "../lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      Swal.fire("Success", "Login successful!", "success");
    } catch (error) {
      console.error("Login error:", error.message);
      Swal.fire(
        "Error",
        error.message || "Login failed. Please check your email and password.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      Swal.fire("Success", "Login with Google successful!", "success");
    } catch (error) {
      console.error("Google login error:", error.message);
      Swal.fire("Error", error.message || "Google login failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-10">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100 transform transition-all duration-500 hover:shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-4xl justify-center mb-2 font-extrabold text-primary">
            <FaSignInAlt className="text-3xl" /> Login
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Welcome back to TrendMart!
          </p>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-block btn-outline btn-primary  mb-4"
            disabled={loading}
          >
            <FcGoogle className="w-5 h-5" /> Continue with Google
          </button>

          <div className="divider text-gray-400">OR Login with Email</div>

          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center font-medium">
                  <FaEnvelope className="mr-2" /> Email
                </span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text flex items-center font-medium">
                  <FaLock className="mr-2" /> Password
                </span>
              </label>
              <input
                type="password"
                placeholder="enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary btn-block text-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-sm">
            Don't have an account?
            <Link
              href="/register"
              className="link link-hover font-bold text-primary"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
