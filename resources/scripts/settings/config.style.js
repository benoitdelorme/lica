import { $body } from "@/utils/dom"

export const STYLE = getComputedStyle($body)

export const COLORS = {
	mint: 			STYLE.getPropertyValue('--color-mint'),
	bottle1: 		STYLE.getPropertyValue('--color-bottle-m1'),
	bottle2: 		STYLE.getPropertyValue('--color-bottle-m2'),
	pearl: 			STYLE.getPropertyValue('--color-pearl'),
	sky: 				STYLE.getPropertyValue('--color-sky'),
	sand: 			STYLE.getPropertyValue('--color-sand'),
}

export const GRIDCSS = {
	columns: 	STYLE.getPropertyValue('--grid-columns'),
	gutter: 	STYLE.getPropertyValue('--grid-gutter'),
	margin: 	STYLE.getPropertyValue('--grid-margin'),
}