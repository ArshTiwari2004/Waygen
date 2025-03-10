import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

// Button Component
const Button = ({ asChild, size, className, children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${size === 'lg' ? 'py-3 text-lg' : 'py-2'} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 h-full flex flex-col border border-gray-700 shadow-xl hover:shadow-blue-900/10 hover:border-blue-900/30 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-blue-900/20 p-3 rounded-lg w-fit mb-4">
        <span className="text-blue-300 text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-blue-300">{title}</h3>
      <p className="text-gray-100 flex-grow">{description}</p>
    </motion.div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, image, techStack, socials, index }) => {
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 shadow-xl hover:shadow-blue-900/10 hover:border-blue-900/30 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <img src={image || "/placeholder.svg"} alt={name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-blue-300">{name}</h3>
        {role && <p className="text-gray-200 mb-3">{role}</p>}

        {techStack && techStack.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-white">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span key={index} className="bg-blue-900/30 text-xs px-2 py-1 rounded text-blue-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          {socials?.github && (
            <a href={socials.github} className="text-gray-300 hover:text-blue-300 transition">
              <Github className="h-5 w-5" />
            </a>
          )}
          {socials?.linkedin && (
            <a href={socials.linkedin} className="text-gray-300 hover:text-blue-300 transition">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {socials?.twitter && (
            <a href={socials.twitter} className="text-gray-300 hover:text-blue-300 transition">
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Features Data
const features = [
  {
    icon: "⿡",
    title: "AI-Based Traffic Congestion Detection",
    description:
      "Uses YOLOv8 Object Detection to detect vehicles on four lanes simultaneously, utilizing multi-processing to analyze real-time CCTV or drone footage and dynamically adjust signal timing.",
  },
  {
    icon: "⿢",
    title: "IoT-Controlled Traffic Lights",
    description:
      "Raspberry Pi & Arduino control traffic lights automatically based on AI predictions, altering green light duration with a Manual Override Mode for traffic police control.",
  },
  {
    icon: "⿣",
    title: "MapMyIndia API Integration",
    description:
      "Fetches real-time traffic data, helps divert traffic dynamically to alternate routes, and displays real-time congestion heatmaps through geospatial visualization.",
  },
  {
    icon: "⿤",
    title: "Multi-Mode Operation",
    description:
      "Features Auto Mode for AI dynamic adjustments, Manual Mode for traffic authorities, and Emergency Mode that prioritizes ambulances & emergency vehicles.",
  },
  {
    icon: "⿥",
    title: "Real-Time Dashboard",
    description:
      "Provides live feed from cameras, traffic density analysis, historical reports & insights, admin control for manual overrides, and predictive analysis using ML trends.",
  },
  {
    icon: "⿦",
    title: "Cloud-Based Analytics",
    description:
      "Stores traffic trends in MongoDB for long-term analytics, generates reports & visualizations for city planners, and predicts peak hours & congestion patterns.",
  },
  //{
   // icon: "⿧",
   // title: "SMS & Push Notifications",
   // description:
     // "Sends congestion alerts via SMS/WhatsApp and notifies nearby vehicles when an ambulance is approaching for emergency vehicle priority.",
  //},
];

// Team Members Data
const teamMembers = [
  {
    name: "Arsh Tiwari",
    image: "/arsh.png?height=300&width=300",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Priyanshi Bothra",
    image: "/priyanshi.png?height=300&width=300",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Nibedan Pati",
    image: "/nibedan.png?height=300&width=300",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Apoorv Mittal",
    image: "/placeholder.svg?height=300&width=300",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

// Animated Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgb(255, 255, 255)`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particlesArray = [];
    const numberOfParticles = Math.min(100, window.innerWidth / 20);
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
    
    // Connect particles with lines
    function connectParticles() {
      const maxDistance = 150;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a192f');
      gradient.addColorStop(1, '#112240');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

// Simple animation variants for consistent use
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-city-street-at-night-34573-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 inline-block">Way</span>
              <span className="text-blue-300 inline-block">Gen</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            AI-powered roads, seamless journeys – Built with MapMyIndia
          </motion.p>
          
          <motion.div 
            className="flex justify-center items-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-10 py-4 shadow-lg shadow-blue-500/30 font-medium flex items-center transition-all duration-300 text-lg"
              onClick={() => window.location.href = '/dashboard'}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-0 right-0 z-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="#about" className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-300">Revolutionizing Traffic Management</h2>
            <p className="text-lg text-gray-100">
              WayGen combines cutting-edge AI technology with MapMyIndia's powerful mapping capabilities to create
              intelligent traffic management systems that reduce congestion, improve emergency response times, and make
              our roads safer for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Our Mission</h3>
              <p className="text-gray-100 mb-6">
                To transform urban mobility through intelligent traffic systems that adapt to real-time conditions,
                creating smoother, safer, and more efficient journeys for all road users.
              </p>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Our Vision</h3>
              <p className="text-gray-100">
                A world where traffic flows seamlessly, emergency vehicles reach their destinations without delay, and
                cities can make data-driven decisions to improve infrastructure.
              </p>
            </motion.div>
            <motion.div 
              className="rounded-lg overflow-hidden shadow-xl border border-gray-700"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="/ambulance.png?height=400&width=600"
                alt="Traffic Management System"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-blue-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-blue-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 text-center border border-gray-700 shadow-xl hover:shadow-blue-900/10 hover:border-blue-900/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-300 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">Data Collection</h3>
              <p className="text-gray-100">
                Our system collects real-time traffic data from CCTV cameras, drones, and MapMyIndia APIs to analyze
                current road conditions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 text-center border border-gray-700 shadow-xl hover:shadow-blue-900/10 hover:border-blue-900/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-300 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">AI Processing</h3>
              <p className="text-gray-100">
                Our YOLOv8 object detection algorithms analyze the data to identify vehicles, measure congestion, and
                make intelligent decisions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 text-center border border-gray-700 shadow-xl hover:shadow-blue-900/10 hover:border-blue-900/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-300 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">Smart Response</h3>
              <p className="text-gray-100">
                The system automatically adjusts traffic signals, sends notifications, and provides real-time updates to
                improve traffic flow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-blue-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Meet The Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                techStack={member.techStack}
                socials={member.socials}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Traffic Management?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join us in creating smarter, more efficient roads with AI-powered traffic solutions.
            </p>
            <div className="flex justify-center items-center mt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-10 py-4 shadow-lg shadow-blue-500/30 font-medium flex items-center transition-all duration-300 text-lg"
                onClick={() => window.location.href = '/dashboard'}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 py-12 relative">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">WayGen</h3>
              <p className="text-gray-300">AI-powered roads, seamless journeys – Built with MapMyIndia</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-300 hover:text-blue-300 transition"
                  >
                    Features
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-300 hover:text-blue-300 transition"
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">© {new Date().getFullYear()} WayGen. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-300 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-300 transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-300 transition">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;




