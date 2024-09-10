import { $body } from "@/utils/dom"

export const STYLE = getComputedStyle($body)

export const COLORS = {
	mint: 			STYLE.getPropertyValue('--color-mint'),
	pearl: 			STYLE.getPropertyValue('--color-pearl'),
	charcoal: 	STYLE.getPropertyValue('--color-charcoal'),
	sky: 				STYLE.getPropertyValue('--color-sky'),
	sand: 			STYLE.getPropertyValue('--color-sand'),
}

export const GRIDCSS = {
	columns: 	STYLE.getPropertyValue('--grid-columns'),
	gutter: 	STYLE.getPropertyValue('--grid-gutter'),
	margin: 	STYLE.getPropertyValue('--grid-margin'),
}