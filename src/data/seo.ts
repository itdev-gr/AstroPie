import { address, phone, mapsUrl } from "~/data/config";

/**
 * Central SEO copy — primary intent: Rhodes coffee / café / best coffee Rhodes.
 * Titles target ~50–58 visible chars; descriptions ~150–160 chars.
 */
export const seoHome = {
	/** <title> */
	pageTitle: "Best Coffee Rhodes | Garage Cafe — Freddo, Espresso & Café",
	/** og:title / social (can match or vary) */
	ogTitle: "Best Coffee in Rhodes | Garage Cafe — Specialty Café & Delivery",
	description:
		"Garage Cafe — specialty coffee on Venetokleon, Rhodes: freddo espresso, Greek coffee, drinks & food. One of the best local cafés for coffee in Rhodes. Delivery 08:00–14:00 daily.",
	keywords:
		"best coffee Rhodes, Rhodes coffee shop, coffee Rhodes Greece, Garage Cafe Rhodes, freddo espresso Rhodes, Greek coffee Rhodes, cafe Venetokleon Rhodes, Rhodes Old Town coffee, specialty coffee Rhodes, breakfast coffee Rhodes",
} as const;

export const seoMenu = {
	pageTitle: "Coffee Menu & Prices Rhodes | Garage Cafe — Drinks & Food",
	ogTitle: "Rhodes Coffee Menu | Garage Cafe — Espresso, Freddo & Snacks",
	description:
		"Full menu & prices: coffees, freddo, frappe, Greek coffee, drinks, beer & food at Garage Cafe Rhodes. Best-value coffee combos on Venetokleon. Open daily — see what we serve.",
} as const;

export const seoContact = {
	pageTitle: "Contact & Location | Garage Cafe — Rhodes Coffee Shop",
	ogTitle: "Find Garage Cafe Rhodes | Address, Phone & Coffee Delivery",
	description:
		"Visit Garage Cafe on Venetokleon 13–15, Rhodes — top-rated local coffee shop. Call +30 22410 24609. Delivery 08:00–14:00. Directions & Google Maps here.",
} as const;

export const seo404 = {
	pageTitle: "Page not found | Garage Cafe Rhodes",
	ogTitle: "404 — Garage Cafe Rhodes",
	description: "This page could not be found. Return to Garage Cafe Rhodes for the best coffee menu, location & contact.",
	robots: "noindex, follow" as const,
} as const;

/** Schema.org — homepage / local SEO */
export function getLocalBusinessJsonLd(siteOrigin: string) {
	return {
		"@context": "https://schema.org",
		"@type": "CafeOrCoffeeShop",
		name: "Garage Cafe",
		description:
			"Specialty coffee shop in Rhodes — freddo espresso, Greek coffee, drinks, baguettes & snacks on Venetokleon.",
		image: `${siteOrigin}/images/garage/logo.png`,
		url: siteOrigin,
		telephone: phone.href.replace(/^tel:/, ""),
		address: {
			"@type": "PostalAddress",
			streetAddress: address.street,
			addressLocality: address.city,
			postalCode: address.zip,
			addressRegion: address.state,
			addressCountry: "GR",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 36.4504,
			longitude: 28.2231,
		},
		openingHours: "Mo-Su 08:00-14:00",
		servesCuisine: "Coffee shop",
		priceRange: "€",
		hasMap: mapsUrl,
	};
}
