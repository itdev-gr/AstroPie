import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let context: gsap.Context | null = null;

/** Ένα run ανά «παρουσία» στην αρχική — αποφεύγει διπλό intro (page-load + load) */
let homeIntroStarted = false;

function killHome() {
	context?.revert();
	context = null;
	ScrollTrigger.getAll().forEach((t) => t.kill());
}

function initHome() {
	const hero = document.querySelector("[data-home-hero]");
	const img = document.querySelector<HTMLElement>("[data-home-hero-img]");
	if (!hero || !img) return;

	killHome();

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	context = gsap.context(() => {
		gsap.set("[data-home-hero-overlay]", { opacity: 0 });
		gsap.set(img, {
			scale: 1.28,
			opacity: 0.65,
			transformOrigin: "50% 40%",
		});
		gsap.set("[data-home-hero-line]", { scaleX: 0, transformOrigin: "center center", opacity: 1 });
		gsap.set("[data-home-hero-animate]", { opacity: 0, y: 48, filter: "blur(12px)" });
		gsap.set("[data-home-hero-offer]", {
			opacity: 0,
			y: 40,
			rotateX: -14,
			transformOrigin: "50% 0%",
			transformPerspective: 1200,
		});
		gsap.set("[data-home-scroll-hint]", { opacity: 0, y: 16 });

		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		tl.to("[data-home-hero-overlay]", { opacity: 1, duration: 1.2 }, 0)
			.to(
				img,
				{
					scale: 1,
					opacity: 1,
					duration: 2.5,
					ease: "power2.out",
				},
				0,
			)
			.to("[data-home-hero-line]", { scaleX: 1, duration: 1.25, ease: "power4.out" }, 0.38)
			.to(
				"[data-home-hero-animate]",
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 1.05,
					stagger: 0.12,
					ease: "power3.out",
				},
				0.3,
			)
			.to(
				"[data-home-hero-offer]",
				{
					opacity: 1,
					y: 0,
					rotateX: 0,
					duration: 1.05,
					ease: "power3.out",
				},
				"-=0.55",
			)
			.to("[data-home-scroll-hint]", { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.35");

		tl.eventCallback("onComplete", () => {
			gsap.to(img, {
				yPercent: 11,
				scale: 1.07,
				ease: "none",
				scrollTrigger: {
					trigger: "[data-home-hero]",
					start: "top top",
					end: "bottom top",
					scrub: 1.2,
				},
			});
		});

		gsap.to("[data-home-hero-line]", {
			opacity: 0.42,
			duration: 2.4,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			delay: 2,
		});
	}, document.body);
}

function startHomeIntroOnce() {
	if (!document.querySelector("[data-home-hero]") || !document.querySelector("[data-home-hero-img]")) return;
	if (homeIntroStarted) return;
	homeIntroStarted = true;
	initHome();
}

document.addEventListener("astro:before-swap", () => {
	homeIntroStarted = false;
	killHome();
});

document.addEventListener("astro:page-load", () => startHomeIntroOnce());

/* Κρίσιμο: σε cold load το astro:page-load συχνά τρέχει ΠΡΙν το module script κολλήσει listener — οπότε χάνεται το intro */
if (typeof document !== "undefined") {
	const kick = () => startHomeIntroOnce();
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", kick, { once: true });
	} else {
		queueMicrotask(kick);
	}
	window.addEventListener("load", kick, { once: true });
}
