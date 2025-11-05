import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 animate-fade-in">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-all duration-300 ease-out
                group-hover:scale-110 group-hover:rotate-3"
              >
                <MessageSquare
                  className="size-6 text-primary transition-transform duration-300 
                  group-hover:scale-110"
                />
              </div>
              <h1 className="text-2xl font-bold mt-2 transition-all duration-300">Create Account</h1>
              <p className="text-base-content/60 transition-all duration-300">Get started with your free Account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control animate-fade-in-delay-1">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative group">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
                  transition-all duration-300 group-focus-within:text-primary"
                >
                  <User
                    className="size-5 text-base-content/40 transition-colors duration-300 
                    group-focus-within:text-primary"
                  />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 transition-all duration-300 
                    focus:scale-[1.02] focus:shadow-lg focus:border-primary/50"
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control animate-fade-in-delay-2">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative group">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
                  transition-all duration-300 group-focus-within:text-primary"
                >
                  <Mail
                    className="size-5 text-base-content/40 transition-colors duration-300 
                    group-focus-within:text-primary"
                  />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 transition-all duration-300 
                    focus:scale-[1.02] focus:shadow-lg focus:border-primary/50"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control animate-fade-in-delay-3">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative group">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
                  transition-all duration-300 group-focus-within:text-primary"
                >
                  <Lock
                    className="size-5 text-base-content/40 transition-colors duration-300 
                    group-focus-within:text-primary"
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 transition-all duration-300 
                    focus:scale-[1.02] focus:shadow-lg focus:border-primary/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center 
                    transition-all duration-300 hover:scale-110 active:scale-95"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      className="size-5 text-base-content/40 transition-colors duration-300 
                      hover:text-primary"
                    />
                  ) : (
                    <Eye
                      className="size-5 text-base-content/40 transition-colors duration-300 
                      hover:text-primary"
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full transition-all duration-300 
                hover:scale-[1.02] hover:shadow-xl active:scale-95
                animate-fade-in-delay-4"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center animate-fade-in-delay-5">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary transition-all duration-300 hover:scale-105 inline-block">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
