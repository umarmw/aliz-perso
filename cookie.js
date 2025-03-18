// DOM Elements
const cookieConsentModal = document.getElementById('cookieConsentModal');
const cookiePreferencesModal = document.getElementById('cookiePreferencesModal');
const cookieSettingsButton = document.getElementById('cookieSettingsButton');
const notification = document.getElementById('notification');

// Buttons
const customizeButton = document.getElementById('customizeButton');
const acceptAllButton = document.getElementById('acceptAllButton');
const savePreferencesButton = document.getElementById('savePreferencesButton');
const acceptAllPreferencesButton = document.getElementById('acceptAllPreferencesButton');

// Toggles
const analyticsToggle = document.getElementById('analyticsToggle');
const personalizationToggle = document.getElementById('personalizationToggle');

// Cookie Functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Check if the user has already set cookie preferences
function checkCookieConsent() {
    const consent = getCookie('cookieConsent');
    
    if (consent) {
        // User has already set preferences
        cookieConsentModal.classList.remove('active');
        cookieSettingsButton.classList.add('active');
        
        // Apply saved preferences
        const preferences = JSON.parse(consent);
        analyticsToggle.checked = preferences.analytics;
        personalizationToggle.checked = preferences.personalization;
        
        // Initialize Salesforce personalization if enabled
        if (preferences.personalization) {
            initializeSalesforcePersonalization();
        }
    } else {
        // First time visitor, show consent modal
        cookieConsentModal.classList.add('active');
    }
}

// Save user preferences
function savePreferences(acceptAll = false) {
    const preferences = {
        essential: true, // Always enabled
        analytics: acceptAll ? true : analyticsToggle.checked,
        personalization: acceptAll ? true : personalizationToggle.checked
    };
    
    // Save preferences as a cookie
    setCookie('cookieConsent', JSON.stringify(preferences), 365); // Valid for 1 year
    
    // Show notification
    showNotification('Preferences saved successfully!');
    
    // Hide consent modal and show settings button
    cookieConsentModal.classList.remove('active');
    cookiePreferencesModal.classList.remove('active');
    cookieSettingsButton.classList.add('active');
    
    // Initialize Salesforce personalization if enabled
    if (preferences.personalization) {
        initializeSalesforcePersonalization();
    }
}

// Initialize Salesforce personalization
function initializeSalesforcePersonalization() {
    // Placeholder for Salesforce personalization initialization
    console.log('Salesforce personalization initialized');
    
    // Normally you would include your Salesforce integration code here
    // For example, loading Salesforce Marketing Cloud or Interaction Studio scripts
    
    // Example (commented out):
    /*
    const script = document.createElement('script');
    script.src = 'https://YOUR_SALESFORCE_ENDPOINT/personalization.js';
    script.async = true;
    document.head.appendChild(script);
    */
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Event Listeners
customizeButton.addEventListener('click', () => {
    cookiePreferencesModal.classList.add('active');
});

acceptAllButton.addEventListener('click', () => {
    analyticsToggle.checked = true;
    personalizationToggle.checked = true;
    savePreferences(true);
});

savePreferencesButton.addEventListener('click', () => {
    savePreferences();
});

acceptAllPreferencesButton.addEventListener('click', () => {
    analyticsToggle.checked = true;
    personalizationToggle.checked = true;
    savePreferences(true);
});

cookieSettingsButton.addEventListener('click', () => {
    cookiePreferencesModal.classList.add('active');
});

// Close preferences modal when clicking outside
cookiePreferencesModal.addEventListener('click', (e) => {
    if (e.target === cookiePreferencesModal) {
        cookiePreferencesModal.classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', checkCookieConsent);