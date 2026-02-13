"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  GraduationCap,
  Users,
  MapPin,
  Phone,
  Mail,
  Building2,
  CreditCard,
  Menu,
  X,
  ChevronDown,
  Play,
} from "lucide-react";

const images = {
  hero: "/084d74f8-254d-46e1-87a6-a292c368f54a.JPG",
  logo: "/UM-logo.png",
  gallery: [
    "/ce3f11ad-9468-40d5-9ce3-78f9af15e5da.JPG",
    "/fef4c58c-d5f3-45cd-97be-72a4ca2ce115.JPG",
    "/96bf9869-fcbc-4592-a006-69368304b45d.JPG",
    "/974ac27e-4076-42b6-9883-cbc8b9bdc33f.JPG",
    "/f539f3c6-1cde-4545-a4fb-f2be366f3fc4.JPG",
    "/12b6bc29-8105-4de6-b7cd-c61bc665380c.JPG",
    "/5fce18f5-92b5-4d12-8288-352faa7f84cd.JPG",
    "/422c6d62-0591-46b4-abc1-7f95bddf392b.JPG",
    "/5efcee9c-2020-491e-91c6-09ae6f11fa33.JPG",
    "/61eebe15-bab5-40a3-9213-b8cbbeb97198.JPG",
    "/ea8c2d7f-6f7a-4299-a39e-08d20c763fd3.JPG",
    "/19223127-7cf7-4f1f-b8d6-d1c9ce5c7edc.JPG",
    "/PHOTO-2026-02-10-08-38-47.jpg",
    "/PHOTO-2026-02-10-08-38-47 2.jpg",
  ],
  kids: [
    "/d0721c4a-0e7b-4a33-8683-9632e852a990.JPG",
    "/1fdbef84-509e-4411-b8f7-e6c796a39ef1.JPG",
  ],
};

const videos = [
  "/0c4c16d9-8d1e-4d1e-b514-b4f381c41095.MP4",
  "/854f82c2-703f-4a23-a139-4d8dc70cf29c.MP4",
  "/f21afe86-e444-418d-a131-b4249353a29e.MP4",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        // Open mailto link
        if (data.mailtoLink) {
          window.location.href = data.mailtoLink;
        }
        // Reset form
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src={images.logo}
                  alt="Uche & Mmesoma Foundation Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm md:text-base text-gray-900">UCHE & MMESOMA</h1>
                <p className="text-xs text-[#1E56A0] font-medium">FOUNDATION</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-700 hover:text-[#1E56A0] transition-colors font-medium">About</a>
              <a href="#mission" className="text-gray-700 hover:text-[#1E56A0] transition-colors font-medium">Mission</a>
              <a href="#gallery" className="text-gray-700 hover:text-[#1E56A0] transition-colors font-medium">Gallery</a>
              <a href="#donate" className="text-gray-700 hover:text-[#1E56A0] transition-colors font-medium">Donate</a>
              <a href="#contact" className="text-gray-700 hover:text-[#1E56A0] transition-colors font-medium">Contact</a>
              <a href="#donate">
                <Button className="bg-[#F5A623] hover:bg-[#e09615] text-white font-semibold px-6">
                  Donate Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#about" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#mission" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Mission</a>
              <a href="#gallery" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
              <a href="#donate" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Donate</a>
              <a href="#contact" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href="#donate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#F5A623] hover:bg-[#e09615] text-white font-semibold">
                  Donate Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="Children celebrating with backpacks"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-block px-4 py-2 bg-[#F5A623]/20 rounded-full mb-6"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#F5A623] font-semibold text-sm">RC: 7359601</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              Empowering Children Through{" "}
              <span className="text-[#F5A623]">Education</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Making sure no child is denied the opportunity to acquire good education. 
              We provide school supplies, backpacks, and educational resources to 
              children in need across Nigeria and potentially other African countries.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#donate" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#e09615] text-white font-semibold text-lg px-8 py-6"
                >
                  <Heart className="mr-2" size={20} />
                  Donate Now
                </Button>
              </a>
              <a href="#about" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <a 
          href="#about" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Our Foundation
            </h2>
            <div className="w-24 h-1 bg-[#F5A623] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Uche & Mmesoma Foundation is dedicated to transforming lives through 
              education. With offices in Nigeria, we bridge communities 
              and create opportunities for children to thrive, with possible expansions to other African countries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src={images.kids[0]}
                      alt="Foundation beneficiaries"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src={images.gallery[0]}
                      alt="Distribution event"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src={images.gallery[1]}
                      alt="Community gathering"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src={images.kids[1]}
                      alt="Happy children"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-6"
                variants={fadeInUp}
              >
                Building Brighter Futures
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-6 leading-relaxed"
                variants={fadeInUp}
              >
                Since our inception, we have been committed to ensuring that every child, 
                regardless of their background, has access to quality education. Through 
                our annual back-to-school drives and community outreach programs, we have 
                touched the lives of thousands of children.
              </motion.p>
              <motion.p 
                className="text-gray-600 mb-8 leading-relaxed"
                variants={fadeInUp}
              >
                Our dedicated team of volunteers works tirelessly to distribute school 
                supplies, organize educational events, and create lasting change in 
                communities across Nigeria and potentially other African countries.
              </motion.p>

              <motion.div 
                className="grid grid-cols-3 gap-6"
                variants={fadeInUp}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1E56A0]">5000+</div>
                  <div className="text-sm text-gray-600">Children Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F5A623]">2</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E7D32]">5+</div>
                  <div className="text-sm text-gray-600">Years Active</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-[#1E56A0] mx-auto" />
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn} transition={{ duration: 0.5 }}>
              <Card className="group hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#F5A623] h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#F5A623]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F5A623]/20 transition-colors">
                  <GraduationCap className="text-[#F5A623]" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Enhance Education
                </h3>
                <p className="text-gray-600 text-sm">
                  Enhancing the education of the less privileged children in our communities.
                </p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={scaleIn} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="group hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#1E56A0] h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#1E56A0]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1E56A0]/20 transition-colors">
                  <Users className="text-[#1E56A0]" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Reduce Dropouts
                </h3>
                <p className="text-gray-600 text-sm">
                  Reducing the number of out-of-school children in the country.
                </p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={scaleIn} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="group hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#2E7D32] h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#2E7D32]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2E7D32]/20 transition-colors">
                  <Heart className="text-[#2E7D32]" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Equal Opportunity
                </h3>
                <p className="text-gray-600 text-sm">
                  Making sure no child is denied the opportunity to acquire good education.
                </p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={scaleIn} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="group hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#9C27B0] h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Building2 className="text-purple-600" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Support Parents
                </h3>
                <p className="text-gray-600 text-sm">
                  Helping to ease the burdens on parents for the education of their children.
                </p>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Action
            </h2>
            <div className="w-24 h-1 bg-[#F5A623] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the joy and hope we bring to communities through our educational outreach programs.
            </p>
          </motion.div>

          {/* Photo Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {images.gallery.map((src, index) => (
              <motion.div 
                key={index} 
                className={`relative overflow-hidden rounded-xl group cursor-pointer
                  ${index === 0 || index === 5 ? 'row-span-2' : ''}
                  ${index === 0 ? 'col-span-2 md:col-span-1' : ''}
                `}
                style={{ minHeight: index === 0 || index === 5 ? '320px' : '160px' }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Image
                  src={src}
                  alt={`Foundation activity ${index + 1}`}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Videos Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Watch Our Story
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div 
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 group cursor-pointer"
                  onClick={() => setActiveVideo(activeVideo === video ? null : video)}
                >
                  {activeVideo === video ? (
                    <video
                      src={video}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <video
                        src={video}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="text-white ml-1" size={24} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 bg-gradient-to-br from-[#1E56A0] to-[#0d3a7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Support Our Cause
            </h2>
            <div className="w-24 h-1 bg-[#F5A623] mx-auto mb-6" />
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Your generous donation helps us provide school supplies, backpacks, and 
              educational resources to children in need.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* America Account */}
            <motion.div variants={scaleIn} transition={{ duration: 0.5 }}>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F5A623] rounded-xl flex items-center justify-center">
                    <CreditCard className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">America Bank Account</h3>
                    <p className="text-blue-200 text-sm">For donations from America</p>
                  </div>
                </div>

                <Separator className="bg-white/20 mb-6" />

                <div className="space-y-4">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Account Name</p>
                    <p className="text-white font-semibold">UCHE AND MMESOMA FOUNDATION</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Account Number</p>
                    <p className="text-white font-mono text-lg font-bold">1800902003708</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Bank Name</p>
                    <p className="text-white font-semibold">UNIVERSITY FEDERAL CREDIT UNION</p>
                    <p className="text-blue-200 text-sm">Austin, Texas, America</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Nigeria Account */}
            <motion.div variants={scaleIn} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#2E7D32] rounded-xl flex items-center justify-center">
                    <CreditCard className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Nigeria Bank Account</h3>
                    <p className="text-blue-200 text-sm">For donations from Nigeria</p>
                  </div>
                </div>

                <Separator className="bg-white/20 mb-6" />

                <div className="space-y-4">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Account Name</p>
                    <p className="text-white font-semibold">UCHE AND MMESOMA FOUNDATION</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Account Number</p>
                    <p className="text-white font-mono text-lg font-bold">1229433400</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Bank Name</p>
                    <p className="text-white font-semibold">ZENITH BANK PLC</p>
                    <p className="text-blue-200 text-sm">Nigeria</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-blue-100 mb-6">
              Every contribution, no matter how small, makes a difference in a child&apos;s life.
            </p>
            <a href="#donate">
              <Button 
                size="lg" 
                className="bg-[#F5A623] hover:bg-[#e09615] text-white font-semibold text-lg px-10"
              >
                <Heart className="mr-2" size={20} />
                Make a Donation
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-[#1E56A0] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or want to get involved? Reach out to us at any of our locations.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* America Office */}
            <motion.div variants={scaleIn} transition={{ duration: 0.5 }}>
            <Card className="hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#1E56A0]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="text-[#1E56A0]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">America Office</h3>
                    <p className="text-gray-500 text-sm">Austin, Texas</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="text-gray-400 mt-1" size={18} />
                    <div>
                      <p className="text-gray-900 font-medium">Address</p>
                      <p className="text-gray-600">
                        11217 Kirkland Hill Path<br />
                        Austin, Texas 78754, America
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1" size={18} />
                    <div>
                      <p className="text-gray-900 font-medium">Email</p>
                      <a href="mailto:uchemmesomafoundation@gmail.com" className="text-[#1E56A0] hover:underline">
                        uchemmesomafoundation@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Nigeria Office */}
            <motion.div variants={scaleIn} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#2E7D32]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="text-[#2E7D32]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Nigeria Office</h3>
                    <p className="text-gray-500 text-sm">Imo State</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="text-gray-400 mt-1" size={18} />
                    <div>
                      <p className="text-gray-900 font-medium">Address</p>
                      <p className="text-gray-600">
                        36A BSC Road<br />
                        Orlu, Imo State, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1" size={18} />
                    <div>
                      <p className="text-gray-900 font-medium">Email</p>
                      <a href="mailto:uchemmesomafoundation@gmail.com" className="text-[#2E7D32] hover:underline">
                        uchemmesomafoundation@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form Placeholder */}
          <motion.div 
            className="mt-16 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Send Us a Message
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent resize-none"
                  />
                  {submitStatus && (
                    <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#1E56A0] hover:bg-[#164785] text-white font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="mr-2" size={18} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src={images.logo}
                    alt="Uche & Mmesoma Foundation Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">UCHE & MMESOMA</h3>
                  <p className="text-gray-400 text-sm">FOUNDATION</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering children through education. Making sure no child is denied 
                the opportunity to acquire good education.
              </p>
              <p className="text-gray-500 text-sm">RC: 7359601</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-[#F5A623] transition-colors">About Us</a></li>
                <li><a href="#mission" className="text-gray-400 hover:text-[#F5A623] transition-colors">Our Mission</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-[#F5A623] transition-colors">Gallery</a></li>
                <li><a href="#donate" className="text-gray-400 hover:text-[#F5A623] transition-colors">Donate</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#F5A623] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Our Locations</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[#F5A623] font-medium mb-1">America</p>
                  <p className="text-gray-400 text-sm">Austin, Texas</p>
                </div>
                <div>
                  <p className="text-[#2E7D32] font-medium mb-1">Nigeria</p>
                  <p className="text-gray-400 text-sm">Orlu, Imo State</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Uche & Mmesoma Foundation. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with <Heart className="inline text-red-500" size={14} /> for the children
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
