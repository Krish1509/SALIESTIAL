"use client";

import { Sidebar } from "@/components/sidebar";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-space relative">
      <Starfield />
      <div className="relative z-10 flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-8 lg:ml-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-[#00d4ff]/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[rgba(0,212,255,0.05)] border border-[#00d4ff]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[rgba(0,212,255,0.05)] border border-[#00d4ff]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[rgba(0,212,255,0.05)] border border-[#00d4ff]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition-all resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-[#00d4ff]/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Get in Touch</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg glass hover:bg-[#00d4ff]/5 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-400">info@saliestial.com</p>
                      <p className="text-gray-400">support@saliestial.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg glass hover:bg-[#00d4ff]/5 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff0066] to-[#cc0052] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone</h3>
                      <p className="text-gray-400">+91 XXX XXX XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg glass hover:bg-[#00d4ff]/5 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#ff0066] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Address</h3>
                      <p className="text-gray-400">
                        SAL Institute of Technology
                        <br />
                        Ahmedabad, Gujarat, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#ff0066]/30 bg-gradient-to-br from-[#ff0066]/10 to-[#00d4ff]/10">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Join Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Interested in volunteering or partnering with SALIESTIAL 2025?
                    We're always looking for passionate individuals to join our team.
                  </p>
                  <Button variant="outline" className="w-full">
                    Become a Volunteer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

