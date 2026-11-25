"use client";

import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { Fragment, useRef, type ReactNode } from "react";

/** Easing di marca: lento in uscita, come un gesto che si posa. */
export const ormaEase = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: ormaEase, duration: 0.9 }}>
      {children}
    </MotionConfig>
  );
}

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Spostamento verticale iniziale, in px. */
  offsetY?: number;
};

/** Comparsa sobria in entrata nel viewport. */
export function Reveal({ delay = 0, offsetY = 28, children, ...divProps }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: ormaEase, delay }}
      {...divProps}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titolo che emerge parola per parola da una maschera.
 * Le parole sono testo reale e compaiono una sola volta nel DOM: niente copia sr-only
 * affiancata a una versione aria-hidden, che i crawler leggerebbero come testo duplicato.
 */
export function WordsReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** true = anima al montaggio; false = anima all'ingresso nel viewport. */
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const animationTrigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...animationTrigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;
        // Lo spazio sta fuori dall'inline-block: dentro verrebbe collassato e le parole si attaccherebbero.
        // La maschera è più alta del testo (padding) per non tagliare le discendenti (g, p, q) con interlinea stretta;
        // i margini negativi compensano, così l'interlinea resta invariata. Stesso trucco ai lati per il corsivo.
        return (
          <Fragment key={wordIndex}>
            <span
              className="-mx-[0.08em] -mb-[0.2em] inline-block overflow-hidden px-[0.08em] pb-[0.28em] align-top"
            >
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "105%" },
                  visible: { y: "0%", transition: { duration: 1.1, ease: ormaEase } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {isLastWord ? null : " "}
          </Fragment>
        );
      })}
    </motion.span>
  );
}

/** Contenitore con parallasse verticale leggera. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  /** Escursione massima verso l'alto e verso il basso, in px. */
  distance?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const translateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-distance, distance]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ y: translateY }} className="absolute inset-[-80px_0]">
        {children}
      </motion.div>
    </div>
  );
}

/** Immagine che si svela con una tenda verticale. */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, ease: ormaEase, delay }}
    >
      {children}
    </motion.div>
  );
}
