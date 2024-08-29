export const ENV_DEBUG = import.meta.env.MODE == "development" ? true : false

export const IS_DEBUG = ENV_DEBUG // force here

export const DEBUG = {
	scrollTrigger: false,
	logComponentsError: true
}

export const PREFIX = "S9"

export const GMAP_API_KEY = import.meta.env.GMAP_API_KEY || ""
export const GMAP_ID = import.meta.env.GMAP_ID || "";