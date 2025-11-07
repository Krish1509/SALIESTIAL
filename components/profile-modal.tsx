"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { X, User, LogOut, Edit2, Save, Phone, MapPin, GraduationCap, Calendar, Award, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  phone?: string;
  college?: string;
  year?: string;
  department?: string;
  city?: string;
  state?: string;
  bio?: string;
  interests?: string[];
  registeredEvents?: string[];
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({});
  const [formData, setFormData] = useState<UserProfile>({});

  useEffect(() => {
    if (session?.user?.email) {
      const savedProfile = localStorage.getItem(`profile_${session.user.email}`);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setFormData(parsed);
      }
    }
  }, [session]);

  const handleSave = () => {
    if (session?.user?.email) {
      localStorage.setItem(`profile_${session.user.email}`, JSON.stringify(formData));
      setProfile(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!session?.user) return null;

  const hasCompleteProfile = profile.phone && profile.college && profile.year;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:right-4 md:top-20 md:bottom-auto z-50 w-full md:w-[500px] max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 md:p-8 border border-[#00d4ff]/30 shadow-2xl [&>*]:box-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white flex items-center gap-2">
                <User className="w-6 h-6 text-[#00d4ff]" />
                Profile
              </h2>
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="!px-4 !py-2"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
                <button
                  onClick={onClose}
                  className="text-[#00d4ff] hover:text-[#ff0066] transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="flex flex-col items-center mb-6"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#00d4ff] glow-blue shadow-lg mb-4">
                {session.user.image ? (
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
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white text-center">
                {session.user.name}
              </h3>
              <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" />
                {session.user.email}
              </p>
              {!hasCompleteProfile && !isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 px-4 py-2 bg-[#ff0066]/20 border border-[#ff0066]/50 rounded-lg"
                >
                  <p className="text-sm text-[#ff0066] text-center">
                    Complete your profile to get started!
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Profile Information */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <Card className="glass border-[#00d4ff]/30">
                    <CardContent className="!pt-6 !px-6 !pb-6 space-y-4">
                      <div>
                        <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#00d4ff]" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone || ""}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+91 1234567890"
                          className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#00d4ff]" />
                          College/University
                        </label>
                        <input
                          type="text"
                          value={formData.college || ""}
                          onChange={(e) => handleInputChange("college", e.target.value)}
                          placeholder="Enter your college name"
                          className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#00d4ff]" />
                            Year
                          </label>
                          <select
                            value={formData.year || ""}
                            onChange={(e) => handleInputChange("year", e.target.value)}
                            className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                          >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Graduate">Graduate</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm text-gray-300 mb-2 block flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#00d4ff]" />
                            Department
                          </label>
                          <input
                            type="text"
                            value={formData.department || ""}
                            onChange={(e) => handleInputChange("department", e.target.value)}
                            placeholder="e.g., CSE, IT, ECE"
                            className="w-full !px-4 !py-2.5 bg-black/40 border border-[#00d4ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
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
                            setFormData(profile);
                          }}
                          variant="outline"
                          className="flex-1 !px-6 !py-3"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="glass border-[#00d4ff]/30">
                    <CardContent className="!pt-6 !px-6 !pb-6 space-y-4">
                      {profile.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#00d4ff]" />
                          <div>
                            <p className="text-xs text-gray-400">Phone</p>
                            <p className="text-white font-medium">{profile.phone}</p>
                          </div>
                        </div>
                      )}

                      {profile.college && (
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-5 h-5 text-[#00d4ff]" />
                          <div>
                            <p className="text-xs text-gray-400">College</p>
                            <p className="text-white font-medium">{profile.college}</p>
                          </div>
                        </div>
                      )}

                      {(profile.year || profile.department) && (
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-[#00d4ff]" />
                          <div>
                            <p className="text-xs text-gray-400">Education</p>
                            <p className="text-white font-medium">
                              {profile.year} {profile.department && `• ${profile.department}`}
                            </p>
                          </div>
                        </div>
                      )}

                      {(profile.city || profile.state) && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#00d4ff]" />
                          <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="text-white font-medium">
                              {profile.city} {profile.state && `, ${profile.state}`}
                            </p>
                          </div>
                        </div>
                      )}

                      {profile.bio && (
                        <div className="pt-2 border-t border-[#00d4ff]/20">
                          <p className="text-xs text-gray-400 mb-2">Bio</p>
                          <p className="text-white text-sm">{profile.bio}</p>
                        </div>
                      )}

                      {!hasCompleteProfile && (
                        <div className="pt-4 border-t border-[#00d4ff]/20">
                          <Button
                            onClick={() => setIsEditing(true)}
                            variant="default"
                            className="w-full !px-6 !py-3"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Complete Your Profile
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="pt-4">
                    <Button
                      onClick={() => signOut()}
                      variant="outline"
                      className="w-full !px-6 !py-3"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
