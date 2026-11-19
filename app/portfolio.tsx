"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  ExternalLink,
  GitBranch,
  BriefcaseBusiness,
  Mail,
  Menu,
  X,
} from "lucide-react";
import ArtGallery from "./art-gallery";
import ParticleField from "./particle-field";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Skills", href: "#skills" },
  { label: "Publication", href: "#publication" },
  { label: "Contact", href: "#contact" },
];

const interests = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Human-Computer Interaction",
  "Quantum Computing",
  "Spatial Computing",
  "Virtual Reality",
];

const researchProjects = [
  {
    index: "01",
    title: "Nuclear Power Plant Accident Classification",
    status: "COMPUTATIONAL RESEARCH",
    technologies: ["Python", "TensorFlow", "Conv1D", "NPPAD Dataset"],
    overview:
      "A deep-learning study for classifying nuclear power plant accident scenarios from multivariate time-series sensor data.",
    problem:
      "Accurate interpretation of plant operating signals is important for identifying and differentiating abnormal scenarios.",
    methodology:
      "Processed multivariate time-series data and trained a Conv1D-based neural network across nine accident categories.",
    result: "Approximately 86.05% test accuracy on the NPPAD dataset.",
  },
  {
    index: "02",
    title:
      "Immersive Virtual Reality for Learning Quantum-Computer Hardware: Design, Interaction, and Preliminary User Evaluation",
    status: "IEEE OCIT 2026 | ACCEPTED",
    technologies: [
      "Blender",
      "Unity",
      "Meta XR SDK",
      "XR Interaction Toolkit",
    ],
    overview:
      "An immersive VR learning environment built around a detailed, three-qubit quantum computer model.",
    problem:
      "Quantum-computer hardware concepts can be difficult to understand from two-dimensional representations alone.",
    methodology:
      "Designed a detailed model in Blender, integrated it into Unity, and implemented VR interactions using Meta XR SDK and XR Interaction Toolkit.",
    result:
      "Research paper accepted at the IEEE 24th OITS International Conference on Information Technology (OCIT), 2026.",
  },
  {
    index: "03",
    title: "Nuclear Power Plant VR Simulation and Training Environment",
    status: "IN PROGRESS",
    technologies: ["Blender", "Unity", "C#", "Meta XR"],
    overview:
      "A developing virtual environment for educational and training-oriented visualisation of nuclear power infrastructure.",
    problem:
      "Operational systems and reactor infrastructure can benefit from spatial, immersive visualisation.",
    methodology:
      "Creating detailed PWR components and plant infrastructure, with work underway on a virtual control room and reactor parameter scenarios.",
    result:
      "Ongoing work: 3D assets are being developed for integration into Unity.",
  },
  {
    index: "04",
    title: "Industrial and Engineering 3D Asset Modelling",
    status: "ENGINEERING VISUALISATION",
    technologies: ["Blender", "3D Modelling"],
    overview:
      "Engineering and industrial 3D assets designed for technical visualisation and potential real-time integration.",
    problem:
      "Complex industrial systems require clear, detailed models that communicate structure and operating relationships.",
    methodology:
      "Created models of nuclear reactors, power plant structures, heat exchangers, and steam turbines.",
    result:
      "A growing collection of reusable Blender studies documented in the 3D gallery.",
  },
];

const softwareProjects = [
  {
    title: "Unity Drone Simulation",
    technologies: ["Unity", "C#", "Rigidbody Physics", "Meta XR SDK"],
    description:
      "Built interactive drone mechanics with Rigidbody movement, colliders, collision detection, obstacle spawning, collectibles, scoring, camera flow, restart logic, and proximity detection.",
    extra: "Integrated toggleable VR vignette comfort effects and used Git and GitHub for collaborative development.",
    repo: "https://github.com/Vinod-M-1/Unity_Drone_Simulation.git",
  },
  {
    title: "Propel Income Shield",
    technologies: ["Java", "Guidewire", "Gosu", "REST APIs", "SOAP"],
    description:
      "Collaborated on a full-stack insurance application during a hackathon, contributing to frontend and backend insurance workflows.",
    extra: "Worked with backend business logic, REST APIs, SOAP services, and database operations.",
    repo: "https://github.com/hari-shankar-k/propel-income-shield",
  },
  {
    title: "Retail Product Management System",
    technologies: ["Java", "Spring Boot", "Spring Data JPA", "MySQL"],
    description:
      "Developed a backend application for managing retail product information using RESTful CRUD APIs.",
    extra: "Used a Controller-Service-Repository architecture and tested APIs with Postman.",
  },
  {
    title: "Ambient Light System",
    technologies: ["ESP32", "WS2812B", "WLED", "HyperHDR"],
    description:
      "Built a real-time ambient lighting system synchronised with screen output.",
    extra: "Integrated ESP32, WLED, and HyperHDR for dynamic, screen-based lighting adaptation.",
  },
];

const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "Java", "C", "C++", "C#"],
  },
  {
    title: "Machine Learning",
    items: [
      "TensorFlow",
      "Conv1D",
      "Supervised Learning",
      "Time-Series Classification",
      "Model Evaluation",
    ],
  },
  {
    title: "VR & Interactive Systems",
    items: ["Unity", "Meta XR SDK", "XR Interaction Toolkit"],
  },
  {
    title: "3D Modelling",
    items: ["Blender", "3D Asset Creation", "Industrial Modelling"],
  },
  {
    title: "Backend",
    items: ["Spring Boot", "Spring Data JPA", "MySQL", "MongoDB", "SQL", "REST APIs"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman"],
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

export default function Home({ hasResume }: { hasResume: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-inner">
          <a href="#home" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="brand-mark">KH</span>
            <span>K. HARI SHANKAR</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <button
            type="button"
            className="menu-button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          <nav
            id="mobile-navigation"
            className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <p className="hero-kicker">
                <span /> Game Development · Interactive Systems · Immersive Experiences
              </p>
              <h1>K. HARI SHANKAR</h1>
              <p className="hero-headline">
                Computer Science Undergraduate | Game Development | AI/ML | Spatial Computing
              </p>
              <p className="hero-support">
                Building interactive worlds, intelligent systems, and immersive experiences.
              </p>
              <p className="hero-introduction">
                I am a Computer Science undergraduate interested in game development, interactive systems, artificial intelligence, and immersive technologies. I enjoy building interactive experiences, exploring game mechanics and simulations, and applying machine learning to real-world problems. My work spans Unity development, 3D modelling, virtual reality, deep learning, and computational research.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore Projects <ArrowRight />
                </a>
                <a className="button button-secondary" href="#research">
                  Research
                </a>
                <a
                  className="button button-secondary"
                  href="https://github.com/hari-shankar-k"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch /> GitHub
                </a>
                {hasResume ? (
                  <a className="icon-link" href="/resume.pdf" download aria-label="Download resume">
                    <Download />
                  </a>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ParticleField />
            </motion.div>
          </div>
        </section>

        <section id="about" className="content-section profile-section">
          <div className="profile-layout">
            <figure className="profile-portrait">
              <Image
                src="/imaages/hari-profile.jpg.jpeg"
                alt="Hari Shankar outdoors at sunset"
                fill
                sizes="(max-width: 560px) min(100vw - 36px, 400px), 43vw"
                unoptimized
                className="profile-portrait-image"
              />
              <span className="profile-corner profile-corner-top-left" aria-hidden="true" />
              <span className="profile-corner profile-corner-top-right" aria-hidden="true" />
              <span className="profile-corner profile-corner-bottom-left" aria-hidden="true" />
              <span className="profile-corner profile-corner-bottom-right" aria-hidden="true" />
              <figcaption className="profile-photo-label">
                <span>PORTRAIT / 01</span>
                <span>K. HARI SHANKAR</span>
              </figcaption>
            </figure>
            <div className="profile-content">
              <p className="eyebrow">01 / About</p>
              <h2>Engineering understanding through computation and spatial design.</h2>
              <p className="profile-introduction">
                I am a Computer Science undergraduate interested in game development,
                interactive systems, artificial intelligence, and immersive technologies.
                I enjoy building interactive experiences, exploring game mechanics and
                simulations, and applying machine learning to real-world problems. My work
                spans Unity development, 3D modelling, virtual reality, deep learning, and
                computational research.
              </p>
              <dl className="profile-highlights">
                <div>
                  <dt>STUDY</dt>
                  <dd>Computer Science · SRM University AP</dd>
                </div>
                <div>
                  <dt>FOCUS</dt>
                  <dd>Interactive systems · AI/ML · spatial computing</dd>
                </div>
                <div>
                  <dt>PRACTICE</dt>
                  <dd>Unity · 3D modelling · VR · computational research</dd>
                </div>
              </dl>
              <div className="profile-interests">
                <p className="eyebrow">Areas of interest</p>
                <ul>
                  {interests.map((interest) => <li key={interest}>{interest}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="content-section">
          <SectionHeading
            eyebrow="02 / Research"
            title="Research projects and technical investigations."
            description="Selected work across machine learning, quantum-computer visualisation, immersive training, and engineering modelling."
          />
          <div className="research-list">
            {researchProjects.map((project) => (
              <motion.article
                key={project.title}
                className="research-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
              >
                <div className="research-marker">
                  <span>{project.index}</span>
                  <span className={`status ${project.status.includes("IN PROGRESS") ? "status-progress" : ""}`}>
                    {project.status}
                  </span>
                </div>
                <div className="research-content">
                  <h3>{project.title}</h3>
                  {project.index === "02" ? (
                    <div className="publication-inline">
                      Accepted paper <span>IEEE OCIT 2026</span>
                    </div>
                  ) : null}
                  <p className="research-overview">{project.overview}</p>
                  <div className="research-details">
                    <div>
                      <span>Problem</span>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <span>Methodology</span>
                      <p>{project.methodology}</p>
                    </div>
                    <div>
                      <span>Outcome</span>
                      <p>{project.result}</p>
                    </div>
                  </div>
                  <div className="tag-row">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <ArtGallery />

        <section id="projects" className="content-section">
          <SectionHeading
            eyebrow="03 / Software"
            title="Software projects."
            description="Applications and systems developed across Unity, insurance technology, backend engineering, and embedded systems."
          />
          <div className="software-grid">
            {softwareProjects.map((project, index) => (
              <motion.article
                key={project.title}
                className="software-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.04 }}
              >
                <div className="card-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.repo ? (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} repository`}>
                      <ExternalLink />
                    </a>
                  ) : null}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.extra ? <p className="card-extra">{project.extra}</p> : null}
                <div className="tag-row">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section">
          <SectionHeading
            eyebrow="04 / Technical profile"
            title="Tools and methods."
          />
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                className="skill-group"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.03 }}
              >
                <p>{String(index + 1).padStart(2, "0")} / {group.title}</p>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="publication" className="content-section publication-section">
          <SectionHeading
            eyebrow="05 / Publication"
            title="Conference paper."
          />
          <article className="publication-card">
            <div className="publication-status">
              <span>IEEE OCIT 2026</span>
              <strong>ACCEPTED</strong>
            </div>
            <div className="publication-body">
              <p className="publication-author">Hari Shankar Karri</p>
              <h3>
                “Immersive Virtual Reality for Learning Quantum-Computer Hardware:
                Design, Interaction, and Preliminary User Evaluation.”
              </h3>
              <p>
                IEEE 24th OITS International Conference on Information Technology (OCIT), 2026.
              </p>
            </div>
          </article>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="contact-copy">
            <p className="eyebrow">06 / Contact</p>
            <h2>Interested in research, immersive systems, or engineering visualisation?</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:harishankarkarri2007@gmail.com">
              <Mail /> <span>Email</span>
              <small>harishankarkarri2007@gmail.com</small>
            </a>
            <a href="https://github.com/hari-shankar-k" target="_blank" rel="noopener noreferrer">
              <GitBranch /> <span>GitHub</span>
              <small>hari-shankar-k</small>
            </a>
            <a href="https://www.linkedin.com/in/hari-shankar-karri-493049361/" target="_blank" rel="noopener noreferrer">
              <BriefcaseBusiness /> <span>LinkedIn</span>
              <small>Hari Shankar Karri</small>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 K. Hari Shankar</span>
        <span>AI · VR · Spatial Computing · Engineering Visualisation</span>
      </footer>
    </div>
  );
}
