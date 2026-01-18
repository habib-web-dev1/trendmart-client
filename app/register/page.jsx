"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaUser,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { loginWithGoogle, registerWithEmail } from "../lib/firebaseConfig";
import { syncUserToMongoDB } from "../lib/userSync";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle State
  const router = useRouter();

  // Sync Firebase User with MongoDB
  const saveUserToDB = async (user, displayName, photo) => {
    const userInfo = {
      name:
        displayName || user.displayName || user.email?.split("@")[0] || "User",
      email: user.email,
      uid: user.uid,
      image: photo || user.photoURL || "",
    };

    console.log("Attempting to save user to MongoDB:", userInfo);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);
      return data;
    } catch (error) {
      console.error("MongoDB sync error:", error);
      // Don't throw error - registration should still work even if MongoDB sync fails
      return { error: error.message };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Firebase Auth
      const result = await registerWithEmail(email, password, name, imageURL);

      // 2. MongoDB Sync
      const syncResult = await syncUserToMongoDB(result.user);
      if (!syncResult.success) {
        console.warn("MongoDB sync failed:", syncResult.error);
      }

      Swal.fire("Success", "Account created successfully!", "success");
      router.push("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();

      // Sync user to MongoDB
      const syncResult = await syncUserToMongoDB(result.user);
      if (!syncResult.success) {
        console.warn("MongoDB sync failed:", syncResult.error);
      }

      Swal.fire("Success", "Welcome to TrendMart!", "success");
      router.push("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] py-10 px-4">
      <div className="card w-full max-w-md bg-white shadow-2xl border border-gray-100">
        <div className="card-body">
          <header className="text-center mb-6">
            <h2 className="text-4xl justify-center flex items-center gap-3 font-black text-primary">
              <FaUserPlus /> Register
            </h2>
            <p className="text-gray-500 mt-2">Join the TrendMart community</p>
          </header>

          {/* Social Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-block btn-outline btn-primary gap-3 normal-case text-lg"
            disabled={loading}
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>

          <div className="divider text-gray-400 text-xs uppercase tracking-widest">
            OR
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label font-bold text-gray-700">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-12 rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Profile Image URL
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full pl-12 rounded-xl"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-12 rounded-xl"
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
                  placeholder="••••••••"
                  className="input input-bordered w-full px-12 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {/* Toggle Icon */}
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

            <button
              type="submit"
              className={`btn btn-primary btn-block rounded-xl text-lg mt-4 ${
                loading && "loading"
              }`}
              disabled={loading}
            >
              {!loading && "Create Free Account"}
            </button>
          </form>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <Link
                href="/login"
                className="font-bold text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
