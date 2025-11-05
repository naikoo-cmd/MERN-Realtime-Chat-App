import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-16 bg-gradient-to-br from-base-100/50 to-base-200/30 min-h-screen">
      <div className="max-w-xs sm:max-w-md lg:max-w-lg text-center space-y-4 sm:space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse"></div>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center animate-bounce shadow-lg border border-primary/20">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Selamat Datang di Chat Yuk! 🚀
          </h2>
          <p className="text-sm sm:text-base text-base-content/70 leading-relaxed px-2">
            Pilih percakapan dari sidebar untuk mulai mengobrol dengan teman-teman
          </p>
        </div>

        {/* Additional Elements */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-primary/50 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
