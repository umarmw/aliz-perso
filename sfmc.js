function getConsentCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

const cookieConsent = getConsentCookie("cookieConsent");
let cookieEssential;
let cookieAnalytics;
let cookiePersonalization;

if (cookieConsent) {
    const cookieObject = JSON.parse(cookieConsent);
    console.log(cookieObject); // { essential: true, analytics: true, personalization: true }
    cookieEssential = cookieObject.essential;
    cookieAnalytics = cookieObject.analytics;
    cookiePersonalization = cookieObject.personalization;
} else {
    console.log("Cookie not found.");
}

if (cookiePersonalization) {

    SalesforceInteractions.init({
        cookieDomain: "stately-dragon-717d36.netlify.app"
    }).then(() => {
        const sitemapConfig = {
            global: {
                account: "hangarworldwide",
                dataset: "engage",
            },
            pageTypeDefault: {
                name: "default",
                interaction: {
                    name: "Default Page",
                },
            },
            pageTypes: [
                {
                    name: "Homepage",
                    isMatch: () => /^\/$/.test(window.location.pathname),
                    interaction: {
                        name: "Homepage",
                    },
                    contentZones: [
                        { name: "home_hero", selector: "#hero" },
                        { name: "home_featured", selector: "#features" },
                        { name: "home_converage", selector: "#coverage" }
                    ],
                },
                {
                    name: "Login_Page",
                    isMatch: () => /^\/account\/$/.test(window.location.pathname) && window.location.hash === "#/loginPage",
                    interaction: {
                        name: "Login_Page"
                    },
                },
                {
                    name: "My_Account_Homepage",
                    isMatch: () => /^\/account\/$/.test(window.location.pathname) && window.location.hash === "#/myAccountHomePage",
                    interaction: {
                        name: "My_Account_Homepage",
                    },
                    contentZones: [
                        { name: "insurance_recommendation", selector: ".advertisement" },
                        { name: "marketing_optin", selector: ".app-int" },
                        { name: "marketing_optin_infobar", selector: ".header__headline" },
                    ],
                },

            ],
        };

        /*
          Check for URL change every 1 seconds. If URL has changed, reinitialize beacon and sitemap.
      */
        const handleSPAPageChange = () => {
            let url = window.location.hash;
            const urlChangeInterval = setInterval(() => {
                if (url !== window.location.hash) {
                    url = window.location.hash;
                    SalesforceInteractions.reinit();
                }
            }, 1000);
        }

        handleSPAPageChange();

        SalesforceInteractions.initSitemap(sitemapConfig);
    });

}