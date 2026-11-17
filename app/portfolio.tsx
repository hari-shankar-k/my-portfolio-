"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Boxes,
  Code2,
  Cpu,
  Download,
  Gamepad2,
  GitBranch,
  Layers3,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Menu,
  MonitorSmartphone,
  Sparkles,
  X,
} from "lucide-react";
import ArtGallery from "./art-gallery";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Gallery", href: "#gallery" },
  { label: "VR", href: "#vr" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

const projectCards: Array<{
  title: string;
  status: string;
  description: string;
  tags: string[];
  accent: string;
  image?: string;
  imageAlt?: string;
  stats?: string;
  repo?: string;
}> = [
  {
    title: "3-Qubit Quantum Computer Visualization in VR",
    status: "Selected for forthcoming research paper presentation",
    description:
      "Created a 3D model of a three-qubit quantum computer using Blender and integrated it into an interactive VR environment using Unity, Meta XR SDK, and XR Interaction Toolkit.",
    tags: [
      "Blender",
      "Unity",
      "VR",
      "Meta XR SDK",
      "Quantum Visualization",
    ],
    accent: "emerald",
    image: "/imaages/quantum/quantum%20main.png",
    imageAlt: "Three-qubit quantum computer model",
  },
  {
    title: "Nuclear Power Plant VR Simulation and Training Environment",
    status: "In progress",
    description:
      "Developing a detailed 3D nuclear power plant environment using Blender, with the intention of integrating it into Unity for immersive visualisation and trainee-oriented exploration.",
    tags: [
      "Nuclear Reactor Modelling",
      "Industrial Environment",
      "Blender to Unity",
      "VR Training Concept",
    ],
    accent: "slate",
    image: "/imaages/nuclear/reactor/nuclear%20plant.png",
    imageAlt: "Nuclear plant equipment and reactor-related structures",
  },
  {
    title: "Nuclear Power Plant Accident Classification",
    status: "Machine learning project",
    description:
      "Developed a machine learning model to classify nuclear power plant accident scenarios using time-series data from the NPPAD dataset.",
    tags: ["Python", "TensorFlow", "Conv1D", "Time-Series", "ML"],
    accent: "amber",
    stats: "86.05% test accuracy across nine accident categories",
  },
  {
    title: "Unity Drone Simulation",
    status: "Collaborative project",
    description:
      "Worked on a Unity drone simulation involving gameplay systems and physics-based interactions, from motion control and collision logic to scoring, obstacles, and restart flow.",
    tags: ["Unity", "C#", "Rigidbody Physics", "Collision", "Game Mechanics"],
    accent: "cyan",
    repo: "https://github.com/Vinod-M-1/Unity_Drone_Simulation.git",
  },
  {
    title: "Retail Product Management System",
    status: "REST API project",
    description:
      "Developed a REST API-based retail product management application using Java and Spring Boot.",
    tags: [
      "Java",
      "Spring Boot",
      "MySQL",
      "CRUD",
      "Controller-Service-Repository",
    ],
    accent: "rose",
  },
  {
    title: "Ambient Light System Using ESP32",
    status: "Hardware + visual sync project",
    description:
      "Created an ambient lighting system using ESP32 and WS2812B LED strips, with screen-synchronised lighting using HyperHDR and WLED.",
    tags: ["ESP32", "WS2812B", "HyperHDR", "WLED", "Lighting Systems"],
    accent: "violet",
  },
];

const skillGroups = [
  {
    title: "3D & Visual Design",
    icon: Layers3,
    items: ["Blender modelling", "Environment composition", "3D asset workflows"],
  },
  {
    title: "VR & Interactive Systems",
    icon: MonitorSmartphone,
    items: ["Unity development", "XR Interaction Toolkit", "Meta XR SDK", "VR integration"],
  },
  {
    title: "Programming & AI",
    icon: BrainCircuit,
    items: ["Java", "Python", "Machine learning", "Time-series analysis"],
  },
  {
    title: "Game & Engine Tools",
    icon: Gamepad2,
    items: ["Unity gameplay systems", "Physics & collisions", "Interaction design", "C#"],
  },
];

const researchItems = [
  {
    title: "3-Qubit Quantum Computer Visualization in VR",
    blurb:
      "A concept-driven VR experience exploring quantum systems through spatial storytelling, interactive 3D modelling, and immersive presentation.",
  },
  {
    title: "Nuclear Infrastructure Visualisation",
    blurb:
      "A developing immersive environment for industrial training and spatial understanding using Blender and Unity workflows.",
  },
  {
    title: "Accident Classification Using Time-Series Data",
    blurb:
      "A practical ML study focused on classifying complex nuclear power plant accidents using convolutional deep learning models.",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/hari-shankar-k", icon: GitBranch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harish-shankar-karri-493049361/", icon: BriefcaseBusiness },
  { label: "Email", href: "mailto:harishankarkarri2007@gmail.com", icon: Mail },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12 max-w-2xl space-y-4">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-zinc-300 md:text-lg">{description}</p>
    </div>
  );
}

export default function Home({ hasResume }: { hasResume: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.12),transparent_28%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/80 backdrop-blur-xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="#home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-zinc-100 uppercase"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-xs text-emerald-300">
              KS
            </span>
            Hari Shankar
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/15 sm:inline-flex sm:px-4"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-100 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          <nav
            id="mobile-navigation"
            className={`${isMobileMenuOpen ? "block" : "hidden"} absolute inset-x-4 top-full mt-2 rounded-2xl border border-white/10 bg-[#101112]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section id="home" className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-200">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                3D Environment Artist · VR Developer
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white md:text-7xl">
                  3D worlds.
                  <span className="block text-zinc-300">Immersive by design.</span>
                </h1>
                <p className="max-w-xl text-lg leading-8 text-zinc-300 md:text-xl">
                  I&apos;m a Computer Science undergraduate creating detailed 3D environments and technical visualizations in Blender, then bringing selected concepts into interactive VR with Unity.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-zinc-200">
                {[
                  "Blender · 3D Modeling",
                  "Unity · XR Development",
                  "Spatial Storytelling",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-400/25 bg-emerald-400/8 px-3 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300"
                >
                  Explore 3D Work
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  Contact Me
                </a>
                {hasResume ? (
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-emerald-300/40 hover:bg-emerald-300/10"
                  >
                    Download résumé
                    <Download className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
              className="relative"
            >
              <a
                href="#gallery"
                className="group relative mx-auto block max-w-xl overflow-hidden rounded-[30px] border border-white/10 bg-[#101112] shadow-[0_30px_90px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/imaages/quantum/quantum%20main.png"
                    alt="Three-qubit quantum computer model, featured 3D study"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-md sm:left-7 sm:top-7">
                    Featured 3D study
                  </span>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                        Blender · Unity · VR
                      </p>
                      <p className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Three-qubit quantum computer
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition group-hover:bg-white/20">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="About"
                title="Designing immersive digital environments from concept to interaction."
                description="I am interested in creating immersive digital environments by combining 3D modelling, real-time engines, programming, and interactive technologies. My work focuses on bringing spatial ideas into believable, engaging experiences that sit at the intersection of art, code, and human interaction."
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7"
            >
              <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-zinc-400">
                <MapPin className="h-4 w-4 text-emerald-300" />
                India
              </div>
              <div className="space-y-6 text-zinc-200">
                <p>
                  I am a student developer with practical project experience in Blender modelling, Unity development, VR integration, Meta XR SDK, XR Interaction Toolkit, Java and Python development, and machine learning projects.
                </p>
                <div className="space-y-3">
                  {[
                    "Blender modelling",
                    "Unity development",
                    "VR integration",
                    "Meta XR SDK",
                    "XR Interaction Toolkit",
                    "Java and Python development",
                    "Machine learning projects",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <ArtGallery />

        <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Featured work"
            title="Projects shaped by systems, story, and experimentation."
            description="A selection of 3D, VR, AI, and software projects that reflect my interest in visualisation, interaction design, and technical problem-solving."
          />

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {projectCards.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0f]"
              >
                <div
                  className={`relative h-52 border-b border-white/10 bg-gradient-to-br ${
                    project.accent === "emerald"
                      ? "from-emerald-500/20 via-zinc-800 to-zinc-950"
                      : project.accent === "slate"
                        ? "from-slate-700/20 via-zinc-800 to-zinc-950"
                        : project.accent === "amber"
                          ? "from-amber-500/20 via-zinc-800 to-zinc-950"
                          : project.accent === "cyan"
                            ? "from-cyan-500/20 via-zinc-800 to-zinc-950"
                            : project.accent === "rose"
                              ? "from-rose-500/20 via-zinc-800 to-zinc-950"
                              : "from-violet-500/20 via-zinc-800 to-zinc-950"
                  } p-4`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  {project.image ? (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />
                  ) : null}
                  <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="relative flex h-full items-end justify-between">
                    <div className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-200">
                      {project.status}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emerald-200">
                      <Code2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-zinc-300">{project.description}</p>

                  {project.stats ? (
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-sm text-emerald-200">
                      {project.stats}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-emerald-200 transition hover:text-emerald-100"
                    >
                      View repository
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="vr" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeading
                  eyebrow="VR & interactive development"
                  title="Turning spatial concepts into interactive learning and exploration environments."
                  description="I enjoy creating immersive experiences where users can observe, navigate, and understand complex systems through direct interaction. My work combines modelling, design, and real-time technology to shape spaces that are both functional and atmospheric."
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { icon: Boxes, title: "3D scene building", text: "Designing believable spaces for exploration and narrative context." },
                  { icon: Code2, title: "Unity interaction", text: "Building interactive systems with XR-ready logic and user flow." },
                  { icon: Cpu, title: "Systems thinking", text: "Aligning technical architecture with immersive usability." },
                  { icon: Sparkles, title: "Visual storytelling", text: "Using composition, lighting, and spatial cues to guide attention." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-[24px] border border-white/10 bg-[#0b0b0d] p-5">
                    <div className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 p-2 text-emerald-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-3 text-lg font-medium text-white">{title}</h3>
                    <p className="text-sm leading-7 text-zinc-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Technical skills"
            title="A multidisciplinary toolkit for design, simulation, and software development."
            description="I work across 3D design, game systems, AI, and software engineering, aiming to build expressive digital experiences with strong technical foundations."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map(({ title, icon: Icon, items }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="rounded-[26px] border border-white/10 bg-[#0d0d0f] p-6"
              >
                <div className="mb-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-4 text-lg font-medium text-white">{title}</h3>
                <ul className="space-y-3 text-sm text-zinc-300">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="research" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Research and selected work"
            title="Exploring technologies that connect visualisation, cognition, and real-time systems."
            description="My selected work reflects a strong interest in using immersive systems, AI methods, and interactive tools to turn abstract technical ideas into understandable experiences."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {researchItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="rounded-[26px] border border-white/10 bg-[#0d0d0f] p-6"
              >
                <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
                  <span>Research</span>
                  <span>0{index + 1}</span>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-7 text-zinc-300">{item.blurb}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-[30px] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(20,83,45,0.32),rgba(9,9,9,0.9))] p-8 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-200">Contact</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Let&apos;s build something spatial, interactive, and memorable.
                </h2>
              </div>

              <a
                href="mailto:harishankarkarri2007@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300"
              >
                harishankarkarri2007@gmail.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emerald-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-400 lg:px-8">
        © 2026 K. Hari Shankar — 3D Environment Artist | VR Developer | Unity Developer | AI/ML Enthusiast
      </footer>
    </div>
  );
}
