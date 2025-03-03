"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Send,
  Code,
  Database,
  Lock,
  Cpu,
  Server,
  Globe,
} from "lucide-react"

// Form schema for contact form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function BlockchainPortfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sections = useRef<HTMLDivElement[]>([])
  const [mounted, setMounted] = useState(false)

  // For particle animation in hero section
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    reset()
    alert("Message sent successfully!")
  }

  // Particle animation class
  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.color = `rgba(100, 217, 232, ${Math.random() * 0.5 + 0.2})`
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Initialize particles
  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(new Particle(canvas))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((particle) => {
        particle.update(canvas)
        particle.draw(ctx)
      })

      // Draw connections between particles
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          const dx = particlesRef.current[a].x - particlesRef.current[b].x
          const dy = particlesRef.current[a].y - particlesRef.current[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 217, 232, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y)
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Intersection Observer for section detection
  useEffect(() => {
    if (!mounted) return

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [mounted])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Projects data
  const projects = [
    {
      id: 1,
      title: "DeFi Lending Platform",
      description:
        "A decentralized finance platform enabling users to lend and borrow crypto assets with dynamic interest rates based on market conditions.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solidity", "React", "Web3.js", "Ethereum"],
      github: "#",
      demo: "#",
      category: "defi",
    },
    {
      id: 2,
      title: "NFT Marketplace",
      description:
        "A marketplace for creating, buying, and selling NFTs with support for multiple blockchains and royalty payments to creators.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Solidity", "IPFS", "Polygon"],
      github: "#",
      demo: "#",
      category: "nft",
    },
    {
      id: 3,
      title: "Cross-Chain Bridge",
      description:
        "A secure bridge allowing users to transfer assets between different blockchain networks with minimal fees and fast confirmation times.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Rust", "Solidity", "React", "Polkadot"],
      github: "#",
      demo: "#",
      category: "infrastructure",
    },
    {
      id: 4,
      title: "DAO Governance Platform",
      description:
        "A decentralized autonomous organization platform with proposal creation, voting mechanisms, and treasury management.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solidity", "TypeScript", "The Graph", "Ethereum"],
      github: "#",
      demo: "#",
      category: "governance",
    },
    {
      id: 5,
      title: "Blockchain Analytics Dashboard",
      description:
        "A comprehensive analytics dashboard providing insights into blockchain networks, transaction volumes, and smart contract interactions.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "D3.js", "Node.js", "GraphQL"],
      github: "#",
      demo: "#",
      category: "analytics",
    },
    {
      id: 6,
      title: "Smart Contract Security Auditor",
      description:
        "An automated tool for auditing smart contracts, identifying vulnerabilities, and suggesting security improvements.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Python", "Solidity", "Machine Learning", "Security"],
      github: "#",
      demo: "#",
      category: "security",
    },
  ]

  // Skills data
  const skills = [
    { name: "Solidity", level: 95, icon: <Code className="h-6 w-6" /> },
    { name: "Java", level: 90, icon: <Globe className="h-6 w-6" /> },
    { name: "SQL", level: 95, icon: <Globe className="h-6 w-6" /> },
    { name: "JavaScript", level: 85, icon: <Cpu className="h-6 w-6" /> },
    { name: "Smart Contract Development", level: 90, icon: <Lock className="h-6 w-6" /> },
    { name: "Web3.js / Ethers.js", level: 85, icon: <Globe className="h-6 w-6" /> },
    { name: "Hardhat / Foundry", level: 90, icon: <Globe className="h-6 w-6" /> },
    { name: "React / Next.js", level: 90, icon: <Code className="h-6 w-6" /> },
    { name: "DeFi Protocols", level: 80, icon: <Database className="h-6 w-6" /> },
    { name: "Blockchain Architecture", level: 85, icon: <Server className="h-6 w-6" /> },
    { name: "Cryptography", level: 75, icon: <Lock className="h-6 w-6" /> },
    { name: "Rust", level: 70, icon: <Cpu className="h-6 w-6" /> },
   
  ]

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Particle background for hero section */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-screen pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-black"
          >
            <span className="text-black">Hemant</span>
            <span className="text-black/80"> Rajpurohit</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-6"
          >
            {["home", "about", "projects", "skills", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={cn(
                  "text-sm font-medium capitalize transition-colors relative",
                  activeSection === section ? "text-black" : "text-muted-foreground hover:text-black",
                )}
              >
                {section}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-b"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {["home", "about", "projects", "skills", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={cn(
                      "text-left py-2 px-4 rounded-md transition-colors capitalize",
                      activeSection === section ? "bg-black/10 text-black" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <Badge variant="outline" className="px-4 py-1 text-sm bg-black/10 border-black/20">
                  Blockchain Developer & Innovator
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-black/60"
              >
                Building the Decentralized Future
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                I create secure, scalable blockchain solutions that bridge the gap between innovative technology and
                real-world applications.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10">View My Projects</span>
                  <span className="absolute inset-0 bg-black/80 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                  <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")} className="group">
                  <span>Get In Touch</span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12 flex items-center justify-center space-x-4"
              >
                <a
                  href="https://github.com/Hemant-exe"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hemant-rajpurohit/"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/Hemant_Raj_17"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-black transition-colors"
              aria-label="Scroll down"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <div className="h-1 w-20 bg-black mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground">
                Passionate blockchain developer with expertise in building decentralized applications
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
                  <img
                    src="/Picture.jpg?height=600&width=600"
                    alt="Blockchain Developer"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-black/10 backdrop-blur-sm border border-black/20 rounded-lg p-4 w-40">
                  <p className="font-bold text-lg">2+ Years</p>
                  <p className="text-sm text-muted-foreground">Blockchain Experience</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">
                  Hi, I'm Hemant, a <span className="text-black">Blockchain Developer & Smart Contract Specialist</span>
                </h3>
                <p className="text-muted-foreground">
                  With over 2 years of experience in blockchain development, I specialize in creating secure, efficient
                  smart contracts and decentralized applications that solve real-world problems. My expertise spans
                  across multiple blockchain platforms including Ethereum, Sonic, and Solana.
                </p>
                <p className="text-muted-foreground">
                  I'm passionate about the potential of blockchain technology to revolutionize industries through
                  decentralization, transparency, and security. My approach combines technical excellence with a deep
                  understanding of business needs to deliver solutions that drive innovation and adoption.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Jaipur, Rajasthan</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Experience</p>
                    <p className="text-muted-foreground">2+ Years</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Projects Completed</p>
                    <p className="text-muted-foreground">5+</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Specialization</p>
                    <p className="text-muted-foreground">DeFi, NFTs, DAOs</p>
                  </div>
                </div>
                <Button onClick={() => scrollToSection("contact")} className="mt-6">
                  Contact Me
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">My Projects</h2>
              <div className="h-1 w-20 bg-black mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground">
                Explore my blockchain projects spanning DeFi, NFTs, and decentralized infrastructure
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="w-full mb-12">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="defi">DeFi</TabsTrigger>
                  <TabsTrigger value="nft">NFTs</TabsTrigger>
                  <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="defi" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.category === "defi")
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="nft" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.category === "nft")
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="infrastructure" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.category === "infrastructure")
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">My Skills</h2>
              <div className="h-1 w-20 bg-black mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground">
                Technical expertise in blockchain development and related technologies
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-2 text-black">{skill.icon}</div>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                          className="h-full bg-black rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">Blockchain Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Ethereum",
                    "Sonic",
                    "Solana",
                    "Polygon",
                    "Avalanche",
                    "Cosmos",
                    
                  ].map((platform, index) => (
                    <motion.div
                      key={platform}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-background border rounded-lg p-4 flex items-center space-x-3"
                    >
                      <div className="h-3 w-3 rounded-full bg-black" />
                      <span>{platform}</span>
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-6 pt-4">Development Approach</h3>
                <ul className="space-y-4">
                  {[
                    "Security-first development methodology",
                    "Gas optimization for efficient contracts",
                    "Comprehensive testing and auditing",
                    "Cross-chain compatibility design",
                    "User-centered interface development",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mr-2 mt-1 text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <div className="h-1 w-20 bg-black mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground">
                Have a project in mind or want to discuss blockchain solutions? Let's connect!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out through the contact form or via the contact details below. I'm always open to
                  discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-black/10 p-3 rounded-full text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">+91 9799915179</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-black/10 p-3 rounded-full text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">hemant17052002@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-black/10 p-3 rounded-full text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">Jaipur, Rajasthan</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="font-medium mb-4">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Hemant-exe"
                      className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/hemant-rajpurohit/"
                      className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://x.com/Hemant_Raj_17"
                      className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Send Me a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          {...register("name")}
                          className={cn(
                            "transition-all focus-within:border-black",
                            errors.name && "border-destructive focus-within:border-destructive",
                          )}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          {...register("email")}
                          className={cn(
                            "transition-all focus-within:border-black",
                            errors.email && "border-destructive focus-within:border-destructive",
                          )}
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Your message"
                          rows={5}
                          {...register("message")}
                          className={cn(
                            "resize-none transition-all focus-within:border-black",
                            errors.message && "border-destructive focus-within:border-destructive",
                          )}
                        />
                        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold text-black mb-2">
                <span className="text-black">HR</span>
                <span className="text-black/80">Chain</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Building secure, scalable blockchain solutions that bridge the gap between innovative technology and
                real-world applications.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="https://github.com/Hemant-exe" className="text-muted-foreground hover:text-black transition-colors" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hemant-rajpurohit/"
                  className="text-muted-foreground hover:text-black transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://x.com/Hemant_Raj_17" className="text-muted-foreground hover:text-black transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} HRChain. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-black/10 border-black/20">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{project.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

