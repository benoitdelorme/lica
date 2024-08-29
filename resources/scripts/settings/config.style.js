import { $body } from "@/utils/dom"

export const STYLE = getComputedStyle($body)

export const COLORS = {
	primary: 	STYLE.getPropertyValue('--color-primary'),
}

export const GRIDCSS = {
	columns: 	STYLE.getPropertyValue('--grid-columns'),
	gutter: 	STYLE.getPropertyValue('--grid-gutter'),
	margin: 	STYLE.getPropertyValue('--grid-margin'),
}