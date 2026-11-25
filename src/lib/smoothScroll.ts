import { animate, type AnimationPlaybackControls } from "motion/react";

/**
 * Scroll animato più morbido di quello nativo (`scroll-behavior: smooth`, di cui non si controllano
 * durata e curva): partenza e arrivo dolci, durata proporzionale alla distanza.
 * La destinazione si ricalcola a ogni frame, così regge immagini o animazioni che spostano il layout
 * durante il tragitto. Qualsiasi gesto dell'utente (rotella, touch, tasti) interrompe l'animazione.
 */

/** easeInOutCubic: accelera e frena con dolcezza. */
const SOFT_EASE = [0.65, 0, 0.35, 1] as const;
const MIN_DURATION_S = 0.9;
const MAX_DURATION_S = 1.8;
/** Pixel percorsi per ogni secondo oltre la durata minima. */
const PIXELS_PER_EXTRA_SECOND = 3000;

const USER_INTERRUPT_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const;

let runningScroll: AnimationPlaybackControls | null = null;

function scrollInstantly(top: number) {
  // "instant" scavalca lo scroll-behavior: smooth del CSS, che altrimenti renderebbe ogni passo asincrono.
  window.scrollTo({ top, behavior: "instant" });
}

function smoothScrollTo(getTargetY: () => number) {
  runningScroll?.stop();
  const startY = window.scrollY;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scrollInstantly(getTargetY());
    return;
  }

  const distance = Math.abs(getTargetY() - startY);
  if (distance < 2) return;
  const duration = Math.min(MAX_DURATION_S, MIN_DURATION_S + distance / PIXELS_PER_EXTRA_SECOND);

  const stopOnUserInput = () => runningScroll?.stop();
  const removeInterruptListeners = () =>
    USER_INTERRUPT_EVENTS.forEach((eventName) => window.removeEventListener(eventName, stopOnUserInput));
  USER_INTERRUPT_EVENTS.forEach((eventName) => window.addEventListener(eventName, stopOnUserInput, { passive: true }));

  const controls = animate(0, 1, {
    duration,
    ease: SOFT_EASE,
    onUpdate: (progress) => scrollInstantly(startY + (getTargetY() - startY) * progress),
    onComplete: removeInterruptListeners,
    onStop: removeInterruptListeners,
  });
  runningScroll = controls;
}

/** Porta l'elemento con quell'id in cima, rispettando il suo scroll-margin-top (spazio per l'header). */
export function smoothScrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  smoothScrollTo(() => {
    const scrollMarginTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    return Math.min(maxScrollY, Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollMarginTop));
  });
  return true;
}

export function smoothScrollToTop() {
  smoothScrollTo(() => 0);
}
