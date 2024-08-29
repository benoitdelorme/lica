import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import EventBus from '@/abstracts/EventBus'

export const Cookie = class Cookie {
	constructor() {
		this.cookies = {
			"GoogleTagManager": false,
			"FacebookPixel": false,
			"GoogleAnalytics": false,
		}
		
		this.eventBus = new EventBus()

		this.init()
		this.initEvents()
	}

	init() {
		this.root = CookieConsent.run({
			categories: {
					necessary: {
							enabled: true,  // this category is enabled by default
							readOnly: true  // this category cannot be disabled
					},
					analytics: {}
			},
			onFirstConsent: ({cookie}) => {
        this.updateCookiesStatus(CookieConsent.getUserPreferences())
				this.eventBus.emit("page-view")
    	},
			onChange: ({cookie, changedCategories, changedServices}) => {
        this.updateCookiesStatus(CookieConsent.getUserPreferences())
				this.eventBus.emit("page-view")
    	},
			language: {
				default: 'fr',
				autoclear_cookies: true,                   // default: false
				page_scripts: true,
				guiOptions: {
					consentModal: {
						layout: 'box',
						position: 'bottom right',
						flipButtons: false,
						equalWeightButtons: false
					},
					preferencesModal: {
						layout: 'box',
						position: 'left right',
						flipButtons: false,
						equalWeightButtons: false
					}
				},
				translations: {
						fr: {
								"consentModal": {
									"title": "Nous utilisons des témoins",
									"description": window.tracking.cookieBannerText,
									"acceptAllBtn": "Tout accepter",
									"showPreferencesBtn": "Préférences",
								},
								"preferencesModal": {
									"title": "Gérer les préférences de cookies",
									"acceptAllBtn": "Tout accepter",
									"acceptNecessaryBtn": "Tout refuser",
									"savePreferencesBtn": "Accepter la sélection actuelle",
									"closeIconLabel": "Fermer le modal",
									"sections": [
										{
											"title": "Cookies strictement nécessaires",
											"description": "Ces cookies sont essentiels pour le bon fonctionnement du site Web et ne peuvent pas être désactivés.",
											"linkedCategory": "necessary"
										},
										{
											"title": "Performance et analytique",
											"description": "Ces cookies collectent des informations sur la façon dont vous utilisez notre site Web. Toutes les données sont anonymisées et ne peuvent pas être utilisées pour vous identifier.",
											"linkedCategory": "analytics"
										},
										{
											"title": "Plus d'informations",
											"description": "Pour toute question concernant notre politique sur les cookies et vos choix, veuillez nous contacter"
										}
									]
								}
						},
						en: {
								consentModal: {
										title: 'We use cookies',
										"description": window.tracking.cookieBannerText,
										acceptAllBtn: 'Accept all',
										showPreferencesBtn: 'Manage'
								},
								preferencesModal: {
										title: 'Manage cookie preferences',
										acceptAllBtn: 'Accept all',
										acceptNecessaryBtn: 'Reject all',
										savePreferencesBtn: 'Accept current selection',
										closeIconLabel: 'Close modal',
										sections: [
												{
														title: 'Strictly Necessary cookies',
														description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
														linkedCategory: 'necessary'
												},
												{
														title: 'Performance and Analytics',
														description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
														linkedCategory: 'analytics'
												},
												{
														title: 'More information',
														description: 'For any queries in relation to our policy on cookies and your choices, please contact us.'
												}
										]
								}
						}
				}
			}
		});

		this.updateCookiesStatus(CookieConsent.getUserPreferences())
	}

	updateCookiesStatus(consentData) {
		for (let key in this.cookies) {
			if (this.cookies.hasOwnProperty(key)) {
				this.cookies[key] = false;
			}
		}
	
		for (let category in consentData.acceptedServices) {
			if (consentData.acceptedServices.hasOwnProperty(category)) {
				consentData.acceptedServices[category].forEach(service => {
					if (this.cookies.hasOwnProperty(service)) {
						this.cookies[service] = true;
					}
				});
			}
		}
		
		for (let category in consentData.rejectedServices) {
			if (consentData.rejectedServices.hasOwnProperty(category)) {
				consentData.rejectedServices[category].forEach(service => {
					if (this.cookies.hasOwnProperty(service)) {
						this.cookies[service] = false;
					}
				});
			}
		}
	}

	initEvents() {
		
	}

	resize() {
		
	}
}