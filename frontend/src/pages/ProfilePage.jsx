import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div
        className={`max-w-2xl mx-auto p-4 py-8 transition-all duration-500 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="bg-base-300 rounded-xl p-6 space-y-8 transition-all duration-300 
          hover:shadow-lg animate-fade-in"
        >
          <div className="text-center animate-fade-in-delay-1">
            <h1 className="text-2xl font-semibold transition-colors duration-300">Profile</h1>
            <p className="mt-2 transition-colors duration-300">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4 animate-fade-in-delay-2">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 
                  transition-all duration-500 ease-out
                  group-hover:scale-105 group-hover:shadow-2xl group-hover:rotate-3"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-110
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-300 ease-out
                  hover:shadow-lg active:scale-95
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200 transition-transform duration-300" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400 transition-all duration-300 animate-fade-in-delay-3">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div
              className="space-y-1.5 animate-fade-in-delay-4 
              transition-all duration-300 hover:translate-x-1"
            >
              <div className="text-sm text-zinc-400 flex items-center gap-2 transition-colors duration-300">
                <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                Full Name
              </div>
              <p
                className="px-4 py-2.5 bg-base-200 rounded-lg border 
                transition-all duration-300 hover:bg-base-100 hover:shadow-md"
              >
                {authUser?.fullName}
              </p>
            </div>

            <div
              className="space-y-1.5 animate-fade-in-delay-5 
              transition-all duration-300 hover:translate-x-1"
            >
              <div className="text-sm text-zinc-400 flex items-center gap-2 transition-colors duration-300">
                <Mail className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                Email Address
              </div>
              <p
                className="px-4 py-2.5 bg-base-200 rounded-lg border 
                transition-all duration-300 hover:bg-base-100 hover:shadow-md"
              >
                {authUser?.email}
              </p>
            </div>
          </div>

          <div
            className="mt-6 bg-base-300 rounded-xl p-6 animate-fade-in-delay-6 
            transition-all duration-300 hover:bg-base-200"
          >
            <h2 className="text-lg font-medium mb-4 transition-colors duration-300">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div
                className="flex items-center justify-between py-2 border-b border-zinc-700 
                transition-all duration-300 hover:translate-x-1 hover:border-primary/50"
              >
                <span className="transition-colors duration-300">Member Since</span>
                <span className="transition-colors duration-300">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div
                className="flex items-center justify-between py-2 
                transition-all duration-300 hover:translate-x-1"
              >
                <span className="transition-colors duration-300">Account Status</span>
                <span
                  className="text-green-500 transition-all duration-300 
                  hover:scale-110 font-semibold"
                >
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
