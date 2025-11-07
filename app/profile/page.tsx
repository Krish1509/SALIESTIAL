"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VideoBackground } from "@/components/video-background";
import { DashboardSpaceElements } from "@/components/dashboard-space-elements";
import { TopNav } from "@/components/top-nav";
import { User, LogOut, ArrowLeft, Edit2, Save, Phone, MapPin, GraduationCap, Calendar, Award, Mail, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import Image from "next/image";

interface UserProfile {
  phone?: string;
  college?: string;
  educationLevel?: string;
  year?: string;
  department?: string;
  city?: string;
  state?: string;
  bio?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({});

  // Auto-enable editing if no profile exists
  useEffect(() => {
    if (!loading && !profile) {
      setIsEditing(true);
    }
  }, [loading, profile]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch("/api/profile", {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      const data = await response.json();
      
      if (response.ok) {
        setProfile(data.profile || null);
        setFormData(data.profile || {});
      } else {
        toast.error(data.error || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error("Request timeout. Please check your connection and try again.");
        } else {
          toast.error(error.message || "Failed to load profile");
        }
      } else {
        toast.error("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        setProfile(data.profile);
        setIsEditing(false);
        toast.success("Profile saved successfully!");
        await fetchProfile();
      } else {
        toast.error(data.error || "Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error("Request timeout. Please check your connection and try again.");
        } else {
          toast.error(error.message || "Failed to save profile");
        }
      } else {
        toast.error("Failed to save profile");
      }
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCompletion = () => {
    if (!profile) return 0;
    
    // Base required fields for all users (Education Level is always required)
    const baseFields = ['phone', 'college', 'city', 'state', 'educationLevel'];
    let requiredFields: string[] = [...baseFields];
    
    // Add education level specific fields
    const educationLevel = profile.educationLevel;
    
    if (educationLevel) {
      // School levels (8th-10th): only need base fields (already included)
      if (educationLevel === '8th' || educationLevel === '9th' || educationLevel === '10th') {
        // Only base fields needed
      }
      // 11th-12th: need college + department
      else if (educationLevel === '11th' || educationLevel === '12th') {
        requiredFields.push('department');
      }
      // Higher education (Diploma, Degree, Master's): need college + year + department
      else if (educationLevel === 'Diploma' || educationLevel === 'Degree' || educationLevel === 'Master\'s') {
        requiredFields.push('year', 'department');
      }
    }
    
    // Count filled required fields
    const filledFields = requiredFields.filter(field => {
      const value = profile[field as keyof UserProfile];
      return value && String(value).trim() !== '';
    });
    
    return requiredFields.length > 0 
      ? Math.round((filledFields.length / requiredFields.length) * 100)
      : 0;
  };

  const handleCompleteProfile = () => {
    setIsEditing(true);
    // Scroll to first field after a short delay to ensure form is rendered
    setTimeout(() => {
      const phoneInput = document.getElementById('phone-input');
      if (phoneInput) {
        phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phoneInput.focus();
      }
    }, 100);
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-[#00d4ff] text-xl font-heading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const completionPercentage = calculateCompletion();
  const isComplete = completionPercentage === 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <VideoBackground />
      <DashboardSpaceElements />
      <TopNav onProfileClick={() => {}} />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 pt-20 sm:pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                size="sm"
                className="!px-4 !py-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-white">
                My Profile
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="!px-6 !py-3 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>

          {/* Profile Completion Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card 
              className={`glass border-[#00d4ff]/30 ${!isEditing && (!profile || !isComplete) ? 'cursor-pointer hover:border-[#00d4ff]/50 transition-all' : ''}`}
              onClick={!isEditing && (!profile || !isComplete) ? handleCompleteProfile : undefined}
            >
              <CardContent className="!pt-6 !px-6 !pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold font-heading text-white">Profile Completion</h3>
                      {isComplete ? (
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Complete
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-[#ff0066]/20 border border-[#ff0066]/50 rounded-full text-[#ff0066] text-xs font-bold">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                          isComplete 
                            ? 'bg-gradient-to-r from-green-500 to-green-400' 
                            : 'bg-gradient-to-r from-[#00d4ff] to-[#ff0066]'
                        }`}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{completionPercentage}% Complete</p>
                  </div>
                  {!isEditing && (!profile || !isComplete) && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteProfile();
                      }}
                      variant="default"
                      size="sm"
                      className="!px-4 !py-2 text-sm"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Complete Profile
                    </Button>
                  )}
                  {!isEditing && profile && isComplete && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                      }}
                      variant="default"
                      size="sm"
                      className="!px-4 !py-2 text-sm"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Picture and Basic Info */}
            <Card className="glass border-[#00d4ff]/30">
              <CardContent className="!pt-6 !px-6 !pb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#00d4ff] glow-blue shadow-lg shrink-0">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#ff0066] to-[#00d4ff] flex items-center justify-center">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2">
                      {session.user?.name || "User"}
                    </h2>
                    <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                      <Mail className="w-4 h-4" />
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Form */}
            <Card className="glass border-[#00d4ff]/30">
              <CardContent className="!pt-6 !px-6 !pb-6 space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#00d4ff]" />
                        Phone Number
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 1234567890"
                        className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#00d4ff]" />
                        Education Level
                      </label>
                      <select
                        value={formData.educationLevel || ""}
                        onChange={(e) => {
                          handleInputChange("educationLevel", e.target.value);
                          // Clear year when education level changes to school
                          if (e.target.value === "8th" || e.target.value === "9th" || e.target.value === "10th" || e.target.value === "11th" || e.target.value === "12th") {
                            handleInputChange("year", "");
                          }
                          // Clear department when education level changes to 8th, 9th, or 10th
                          if (e.target.value === "8th" || e.target.value === "9th" || e.target.value === "10th") {
                            handleInputChange("department", "");
                          }
                          // Clear college when education level changes away from Diploma, Degree, or Master's
                          if (e.target.value !== "Diploma" && e.target.value !== "Degree" && e.target.value !== "Master's") {
                            handleInputChange("college", "");
                          }
                        }}
                        className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                      >
                        <option value="">Select Education Level</option>
                        <optgroup label="School">
                          <option value="8th">8th Standard</option>
                          <option value="9th">9th Standard</option>
                          <option value="10th">10th Standard</option>
                          <option value="11th">11th Standard</option>
                          <option value="12th">12th Standard</option>
                        </optgroup>
                        <optgroup label="Higher Education">
                          <option value="Diploma">Diploma</option>
                          <option value="Degree">Degree</option>
                          <option value="Master's">Master's</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Year/Semester - Only show for Diploma, Degree, or Master's */}
                    {formData.educationLevel && formData.educationLevel !== "8th" && formData.educationLevel !== "9th" && formData.educationLevel !== "10th" && formData.educationLevel !== "11th" && formData.educationLevel !== "12th" && (
                      <div>
                        <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#00d4ff]" />
                          Year/Semester
                        </label>
                        <select
                          value={formData.year || ""}
                          onChange={(e) => handleInputChange("year", e.target.value)}
                          className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                        >
                          <option value="">Select Year</option>
                          {formData.educationLevel === "Diploma" && (
                            <>
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                              <option value="3rd Year">3rd Year</option>
                            </>
                          )}
                          {formData.educationLevel === "Degree" && (
                            <>
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                              <option value="3rd Year">3rd Year</option>
                              <option value="4th Year">4th Year</option>
                            </>
                          )}
                          {formData.educationLevel === "Master's" && (
                            <>
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                            </>
                          )}
                        </select>
                      </div>
                    )}

                    {/* Department/Stream - Show for 11th, 12th, and higher education only */}
                    {formData.educationLevel && formData.educationLevel !== "8th" && formData.educationLevel !== "9th" && formData.educationLevel !== "10th" && (
                      <div>
                        <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#00d4ff]" />
                          Department/Stream
                        </label>
                        <input
                          type="text"
                          value={formData.department || ""}
                          onChange={(e) => handleInputChange("department", e.target.value)}
                          placeholder={
                            formData.educationLevel === "11th" || formData.educationLevel === "12th"
                              ? "e.g., Science, Commerce, Arts"
                              : formData.educationLevel === "Diploma"
                              ? "e.g., Engineering, IT, Electronics"
                              : formData.educationLevel === "Degree"
                              ? "e.g., CSE, IT, ECE, Mechanical, Civil"
                              : formData.educationLevel === "Master's"
                              ? "e.g., M.Tech, MBA, MCA, M.Sc"
                              : "e.g., CSE, IT, ECE, Science, Commerce, Arts"
                          }
                          className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        />
                      </div>
                    )}

                    {/* School/College/University - Always visible */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#00d4ff]" />
                        School/College/University
                      </label>
                      <input
                        type="text"
                        value={formData.college || ""}
                        onChange={(e) => handleInputChange("college", e.target.value)}
                        placeholder="Enter your school/college/university name"
                        className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#00d4ff]" />
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city || ""}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Your city"
                          className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                          <Globe className="w-4 h-4 text-[#00d4ff]" />
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.state || ""}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="Your state"
                          className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Bio</label>
                      <textarea
                        value={formData.bio || ""}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={handleSave}
                        variant="default"
                        className="flex-1 !px-6 !py-3"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData(profile || {});
                        }}
                        variant="outline"
                        className="flex-1 !px-6 !py-3"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {profile?.phone && (
                      <div className="flex items-center gap-3 py-2">
                        <Phone className="w-5 h-5 text-[#00d4ff]" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Phone</p>
                          <p className="text-white font-medium">{profile.phone}</p>
                        </div>
                      </div>
                    )}

                    {profile?.college && (
                      <div className="flex items-center gap-3 py-2">
                        <GraduationCap className="w-5 h-5 text-[#00d4ff]" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">College</p>
                          <p className="text-white font-medium">{profile.college}</p>
                        </div>
                      </div>
                    )}

                    {(profile?.educationLevel || profile?.year || profile?.department) && (
                      <div className="flex items-center gap-3 py-2">
                        <Award className="w-5 h-5 text-[#00d4ff]" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Education</p>
                          <p className="text-white font-medium">
                            {profile.educationLevel && `${profile.educationLevel}`}
                            {profile.educationLevel && profile.year && ` • `}
                            {profile.year && `${profile.year}`}
                            {profile.department && ` • ${profile.department}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {(profile?.city || profile?.state) && (
                      <div className="flex items-center gap-3 py-2">
                        <MapPin className="w-5 h-5 text-[#00d4ff]" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Location</p>
                          <p className="text-white font-medium">
                            {profile.city} {profile.state && `, ${profile.state}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {profile?.bio && (
                      <div className="pt-2 border-t border-[#00d4ff]/20">
                        <p className="text-xs text-gray-400 mb-2">Bio</p>
                        <p className="text-white text-sm">{profile.bio}</p>
                      </div>
                    )}

                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
