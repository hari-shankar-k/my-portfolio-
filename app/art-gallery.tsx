"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";

const galleryProjects = [
  {
    title: "Quantum Computing",
    number: "01",
    discipline: "3D visualization · VR",
    description:
      "A three-qubit quantum computer model created in Blender and presented in an interactive Unity VR environment. The collection brings together the full model, closer views, and an in-VR scene to show the project from both a modeling and immersive-presentation perspective.",
    images: [
      {
        src: "/imaages/quantum/quantum%20main.png",
        title: "Three-qubit system — full assembly",
        alt: "Full assembly view of the three-qubit quantum computer model",
      },
      {
        src: "/imaages/quantum/quantum%20pic.png",
        title: "Quantum system — component study",
        alt: "Closer view of the quantum computer's layered components",
      },
      {
        src: "/imaages/quantum/quantum%20pic2.png",
        title: "Suspended platform and cabling",
        alt: "Detailed Blender view of the quantum computer platform and cabling",
      },
      {
        src: "/imaages/quantum/quantum%20pic3.png",
        title: "Quantum system — structural view",
        alt: "Angled view of the layered quantum computer structure",
      },
      {
        src: "/imaages/quantum/quantum%20pic4.png",
        title: "Lower assembly — detail",
        alt: "Close-up of the lower quantum computer assembly",
      },
      {
        src: "/imaages/quantum/QUANTUM%20%20IN%20VR%20.png",
        title: "Quantum system in VR",
        alt: "Quantum computer model placed inside a Unity VR scene",
      },
    ],
  },
  {
    title: "Nuclear Reactor",
    number: "02",
    discipline: "Industrial modeling · Blender",
    description:
      "A Blender modeling study of a nuclear reactor, shown through a full assembly view and closer views of its internal components. The collection documents the model from multiple angles, from its overall form to its interior.",
    images: [
      {
        src: "/imaages/nuclear/reactor/nuclear_reactor%20main.png",
        title: "Reactor vessel — full assembly",
        alt: "Full Blender viewport view of the nuclear reactor vessel model",
      },
      {
        src: "/imaages/nuclear/reactor/nuclear_reactor1.png",
        title: "Reactor core — internal structure",
        alt: "Close view into the modeled reactor core and control rods",
      },
      {
        src: "/imaages/nuclear/reactor/nuclear_reactor2.png",
        title: "Reactor vessel — alternate view",
        alt: "Alternate angle of the nuclear reactor model",
      },
    ],
  },
  {
    title: "Nuclear Power Plant",
    number: "03",
    discipline: "Environment concept · In progress",
    description:
      "An early Blender study of nuclear power plant equipment, part of a developing environment project. The current view documents the model as work in progress, with immersive exploration as the intended direction.",
    images: [
      {
        src: "/imaages/nuclear/reactor/nuclear%20plant.png",
        title: "Plant environment — equipment study",
        alt: "Nuclear plant equipment and reactor-related structures in Blender",
      },
    ],
  },
  {
    title: "Heat Exchanger",
    number: "04",
    discipline: "Industrial systems · Blender",
    description:
      "A heat exchanger modeled in Blender and documented through several views. Alternate angles show the overall assembly and its colored components, giving visitors a closer look at the modeling study.",
    images: [
      {
        src: "/imaages/nuclear/heat%20exchanger/heat%20exchanger%20mai.png",
        title: "Heat exchanger — main assembly",
        alt: "Main Blender view of the heat exchanger assembly and its pipework",
      },
      {
        src: "/imaages/nuclear/heat%20exchanger/heat%20exchanger%202.png",
        title: "Heat exchanger — piping layout",
        alt: "Heat exchanger model showing colored pipes and exchanger banks",
      },
      {
        src: "/imaages/nuclear/heat%20exchanger/heat%20exchanger%203.png",
        title: "Heat exchanger — system view",
        alt: "Alternate view of the heat exchanger's piping and components",
      },
      {
        src: "/imaages/nuclear/heat%20exchanger/heat%20exhanger%201.png",
        title: "Heat exchanger — close study",
        alt: "Closer Blender study of the heat exchanger assembly",
      },
    ],
  },
  {
    title: "Steam Turbine",
    number: "05",
    discipline: "Mechanical modeling · Blender",
    description:
      "A steam turbine model documented through overall and close-up Blender views. The collection includes alternate viewport and material presentations that show the model at different levels of detail.",
    images: [
      {
        src: "/imaages/nuclear/turbine/turbine%20pic.png",
        title: "Steam turbine — overall assembly",
        alt: "Blender viewport view of the steam turbine model",
      },
      {
        src: "/imaages/nuclear/turbine/TURBINE%20PIC%202.png",
        title: "Steam turbine — mechanical detail",
        alt: "Alternate detailed view of the steam turbine assembly",
      },
      {
        src: "/imaages/nuclear/turbine/turbine%20close%20up.png",
        title: "Steam turbine — close-up",
        alt: "Close-up view of modeled steam turbine components",
      },
      {
        src: "/imaages/nuclear/turbine/turbine%20no%20color.png",
        title: "Steam turbine — form study",
        alt: "Uncolored viewport study of the steam turbine model",
      },
    ],
  },
];

const allImages = galleryProjects.flatMap((project) =>
  project.images.map((image) => ({ ...image, category: project.title })),
);

function GalleryImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
    />
  );
}

export default function ArtGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : allImages[activeIndex];
  const isLightboxOpen = activeIndex !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "Tab") {
        const focusableButtons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])",
          );
        if (!focusableButtons?.length) return;

        const firstButton = focusableButtons[0];
        const lastButton = focusableButtons[focusableButtons.length - 1];
        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault();
          lastButton.focus();
        } else if (!event.shiftKey && document.activeElement === lastButton) {
          event.preventDefault();
          firstButton.focus();
        }
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % allImages.length,
        );
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null
            ? allImages.length - 1
            : (current - 1 + allImages.length) % allImages.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [isLightboxOpen]);

  function openImage(src: string) {
    const index = allImages.findIndex((image) => image.src === src);
    if (index >= 0) {
      const activeElement = document.activeElement;
      returnFocusRef.current =
        activeElement instanceof HTMLElement ? activeElement : null;
      setActiveIndex(index);
    }
  }

  function showPreviousImage() {
    setActiveIndex((current) =>
      current === null
        ? 0
        : (current - 1 + allImages.length) % allImages.length,
    );
  }

  function showNextImage() {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % allImages.length,
    );
  }

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
      aria-labelledby="gallery-title"
    >
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/80">
            3D art gallery · 18 original images
          </p>
          <h2
            id="gallery-title"
            className="text-3xl font-semibold tracking-tight text-white md:text-5xl"
          >
            Engineering, seen differently.
          </h2>
          <p className="text-base leading-7 text-zinc-300 md:text-lg">
            A collection of Blender studies and immersive visualizations,
            bringing complex machines into focus through form, detail, and
            spatial storytelling.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-400">
          <span className="h-px w-8 bg-emerald-300/60" />
          Five collections
        </div>
      </div>

      <div className="space-y-8">
        {galleryProjects.map((project, projectIndex) => {
          const coverImage = project.images[0];

          return (
            <article
              key={project.title}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0e10] shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            >
              <button
                type="button"
                onClick={() => openImage(coverImage.src)}
                aria-label={`Open ${project.title} featured image`}
                className="group relative block h-[260px] w-full overflow-hidden bg-zinc-900 text-left sm:h-[360px] lg:h-[460px]"
              >
                <GalleryImage
                  src={coverImage.src}
                  alt={coverImage.alt}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={projectIndex === 0}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 transition-colors duration-500 group-hover:from-black/75" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-8 lg:p-10">
                  <span>
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
                      Collection {project.number}
                    </span>
                    <span className="block text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {project.title}
                    </span>
                  </span>
                  <span className="mb-1 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-white/20 sm:flex">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </span>
                <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/85 backdrop-blur-md sm:right-8 sm:top-8">
                  {project.images.length}{" "}
                  {project.images.length === 1 ? "image" : "images"}
                </span>
              </button>

              <div className="p-5 sm:p-8 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="max-w-3xl">
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300/80">
                      {project.discipline}
                    </p>
                    <h3 className="mb-3 text-xl font-medium text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-7 text-zinc-300 sm:text-base">
                      {project.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openImage(coverImage.src)}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-zinc-200 transition hover:border-emerald-300/50 hover:bg-emerald-300/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                  >
                    Explore collection
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {project.images.length > 1 ? (
                  <div className="mt-7 flex gap-3 overflow-x-auto pb-2">
                    {project.images.slice(1).map((image) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => openImage(image.src)}
                        aria-label={`View ${image.title}`}
                        className="group relative h-[92px] w-[138px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition hover:border-emerald-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:h-[112px] sm:w-[168px]"
                      >
                        <GalleryImage
                          src={image.src}
                          alt={image.alt}
                          sizes="168px"
                        />
                        <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => openImage(coverImage.src)}
                      className="flex h-[92px] w-[138px] shrink-0 items-center justify-center rounded-xl border border-dashed border-white/15 text-xs uppercase tracking-[0.14em] text-zinc-400 transition hover:border-emerald-300/50 hover:text-white sm:h-[112px] sm:w-[168px]"
                    >
                      View all {project.images.length}
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {activeImage && activeIndex !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeImage.category}: ${activeImage.title}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505]/[0.97] p-4 backdrop-blur-xl sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                {activeImage.category}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-white sm:text-base">
                {activeImage.title}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative my-4 min-h-0 flex-1">
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:left-4 sm:h-12 sm:w-12"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next image"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:right-4 sm:h-12 sm:w-12"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 text-xs text-zinc-400">
            <span className="truncate">{activeImage.alt}</span>
            <span className="shrink-0 font-mono tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(allImages.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
