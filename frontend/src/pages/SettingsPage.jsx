import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Yo, how's it going lately?", isSent: false },
  { id: 2, content: "Pretty solid! Coding some fresh stuff.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div
        className={`space-y-6 transition-all duration-500 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col gap-1 animate-fade-in">
          <h2 className="text-lg font-semibold transition-colors duration-300">Theme</h2>
          <p className="text-sm text-base-content/70 transition-colors duration-300">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 animate-fade-in-delay-1">
          {THEMES.map((t, index) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg 
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                ${theme === t ? "bg-base-200 ring-2 ring-primary/50 shadow-lg" : "hover:bg-base-200/50 hover:shadow-md"}
                animate-theme-item
              `}
              style={{ animationDelay: `${index * 0.03}s` }}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden 
                transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary transition-all duration-300 group-hover:scale-105"></div>
                  <div className="rounded bg-secondary transition-all duration-300 group-hover:scale-105"></div>
                  <div className="rounded bg-accent transition-all duration-300 group-hover:scale-105"></div>
                  <div className="rounded bg-neutral transition-all duration-300 group-hover:scale-105"></div>
                </div>
              </div>
              <span
                className={`
                text-[11px] font-medium truncate w-full text-center
                transition-all duration-300
                ${theme === t ? "text-primary font-semibold" : "group-hover:text-primary"}
              `}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3 animate-fade-in-delay-2 transition-colors duration-300">Preview</h3>
        <div
          className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg 
          animate-fade-in-delay-2 transition-all duration-300 hover:shadow-xl"
        >
          <div className="p-4 bg-base-200 transition-colors duration-300">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div
                className="bg-base-100 rounded-xl shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-md"
              >
                {/* Chat Header */}
                <div
                  className="px-4 py-3 border-b border-base-300 bg-base-100 
                  transition-all duration-300 animate-slide-down"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center 
                      text-primary-content font-medium transition-all duration-300 hover:scale-110"
                    >
                      N
                    </div>
                    <div>
                      <h3 className="font-medium text-sm transition-colors duration-300">Nico Aramy</h3>
                      <p className="text-xs text-base-content/70 transition-colors duration-300">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 
                  transition-colors duration-300"
                >
                  {PREVIEW_MESSAGES.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"} 
                        animate-preview-message`}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          transition-all duration-300 hover:shadow-md hover:scale-[1.02]
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm transition-all duration-300">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5 transition-opacity duration-300
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div
                  className="p-4 border-t border-base-300 bg-base-100 
                  transition-all duration-300 animate-slide-up"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10 
                        transition-all duration-300 
                        focus:scale-[1.01] focus:shadow-md focus:border-primary/50"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button
                      className="btn btn-primary h-10 min-h-0 
                      transition-all duration-300 
                      hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <Send
                        size={18}
                        className="transition-transform duration-300 
                        group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
