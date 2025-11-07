import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useState } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const { theme } = useThemeStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if current theme is dark
    const darkThemes = [
      "dark",
      "synthwave",
      "halloween",
      "forest",
      "black",
      "luxury",
      "dracula",
      "business",
      "night",
      "coffee",
    ];
    setIsDark(darkThemes.includes(theme));
  }, [theme]);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 overflow-hidden">
      <div className="max-w-md text-center">
        {/* Animated Chat Illustration */}
        <div className="relative mb-8 h-64 flex items-center justify-center">
          {/* Background decorative circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`absolute w-48 h-48 rounded-full ${isDark ? "bg-primary/5" : "bg-primary/10"} animate-pulse`}
            />
            <div
              className={`absolute w-64 h-64 rounded-full ${isDark ? "bg-primary/3" : "bg-primary/5"} animate-pulse`}
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            />
          </div>

          {/* Chat bubbles animation */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center gap-4">
            {/* Left message bubble */}
            <div className="flex justify-start animate-slide-in-left">
              <div
                className={`max-w-[70%] p-4 rounded-2xl rounded-tl-sm shadow-lg ${
                  isDark ? "bg-base-300" : "bg-white"
                } transition-all duration-300 hover:scale-105`}
              >
                <div className={`h-2 w-24 rounded ${isDark ? "bg-base-content/20" : "bg-gray-200"} mb-2`} />
                <div className={`h-2 w-32 rounded ${isDark ? "bg-base-content/20" : "bg-gray-200"}`} />
              </div>
            </div>

            {/* Right message bubble */}
            <div className="flex justify-end animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
              <div
                className="max-w-[70%] p-4 rounded-2xl rounded-tr-sm shadow-lg 
                bg-primary text-primary-content transition-all duration-300 hover:scale-105"
              >
                <div className="h-2 w-28 rounded bg-primary-content/30 mb-2" />
                <div className="h-2 w-20 rounded bg-primary-content/30" />
              </div>
            </div>

            {/* Left message bubble */}
            <div className="flex justify-start animate-slide-in-left" style={{ animationDelay: "1s" }}>
              <div
                className={`max-w-[70%] p-4 rounded-2xl rounded-tl-sm shadow-lg ${
                  isDark ? "bg-base-300" : "bg-white"
                } transition-all duration-300 hover:scale-105`}
              >
                <div className={`h-2 w-20 rounded ${isDark ? "bg-base-content/20" : "bg-gray-200"}`} />
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex justify-end animate-slide-in-right" style={{ animationDelay: "1.5s" }}>
              <div
                className="max-w-[70%] p-4 rounded-2xl rounded-tr-sm shadow-lg 
                bg-primary text-primary-content transition-all duration-300"
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary-content/50 animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-primary-content/50 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-primary-content/50 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating chat icons */}
          <div className="absolute top-0 right-0 animate-float">
            <div
              className={`w-8 h-8 rounded-full ${
                isDark ? "bg-primary/20" : "bg-primary/30"
              } flex items-center justify-center`}
            >
              <span className="text-xl">💬</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 animate-float" style={{ animationDelay: "1s" }}>
            <div
              className={`w-8 h-8 rounded-full ${
                isDark ? "bg-secondary/20" : "bg-secondary/30"
              } flex items-center justify-center`}
            >
              <span className="text-xl">✨</span>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="animate-fade-in-delay-2">
          <h2 className="text-2xl font-bold mb-4 transition-colors duration-300">{title}</h2>
          <p className="text-base-content/60 transition-colors duration-300">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
