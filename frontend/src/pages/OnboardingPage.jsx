import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Loader, MapPin, Anchor, Shuffle, Camera } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-8 w-64 h-64 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating dots */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-400/50 rounded-full"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400/40 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400/50 rounded-full"></div>

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-4xl shadow-2xl">
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Anchor className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Complete Your Profile
            </h1>
            <p className="text-white/70 text-lg">
              Set up your language learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden shadow-xl">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Camera className="w-16 h-16 text-white/40" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full border-4 border-white/20"></div>
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                <Shuffle className="w-4 h-4" />
                Generate Random Avatar
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-white font-medium text-lg">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                {/* Native Language */}
                <div className="space-y-3">
                  <label className="text-white font-medium text-lg">Native Language</label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-purple-900 text-white">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()} className="bg-purple-900 text-white">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Language */}
                <div className="space-y-3">
                  <label className="text-white font-medium text-lg">Learning Language</label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-purple-900 text-white">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()} className="bg-purple-900 text-white">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Bio */}
                <div className="space-y-3">
                  <label className="text-white font-medium text-lg">Bio</label>
                  <textarea
                    name="bio"
                    value={formState.bio}
                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                    className="w-full h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell others about yourself and your language learning goals"
                  />
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label className="text-white font-medium text-lg">Location</label>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-4 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      name="location"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
                disabled={isPending}
                type="submit"
              >
                {!isPending ? (
                  <>
                    <Anchor className="w-6 h-6" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <Loader className="animate-spin w-6 h-6" />
                    Setting up your profile...
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Bottom decorative text */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Join thousands of language learners worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;