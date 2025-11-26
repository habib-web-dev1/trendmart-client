"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaUser,
  FaImage,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { loginWithGoogle, registerWithEmail } from "../lib/firebaseConfig";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerWithEmail(email, password, name, imageURL);

      Swal.fire(
        "Success",
        "Registration successful! You are now logged in.",
        "success"
      );
    } catch (error) {
      console.error("Registration error:", error.message);
      Swal.fire(
        "Error",
        error.message || "Registration failed. Please try again.",
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
            <FaUserPlus className="text-3xl" /> Register
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Join TrendMart today!
          </p>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-block btn-outline btn-primary hover:bg-primary/10 mb-4"
            disabled={loading}
          >
            <FcGoogle className="w-5 h-5" /> Continue with Google
          </button>

          <div className="divider text-gray-400">OR Use Email</div>

          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center font-medium">
                  <FaUser className="mr-2" /> Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center font-medium">
                  <FaImage className="mr-2" /> Profile Image URL
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>

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
                placeholder="minimum 6 characters"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?
            <Link
              href="/login"
              className="link link-hover font-bold text-primary"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
