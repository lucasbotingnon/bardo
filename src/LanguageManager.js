const fs = require('fs');
const path = require('path');

class LanguageManager {
    constructor() {
        this.locales = new Map();
        this.loadLocales();
    }

    loadLocales() {
        const localesPath = path.join(__dirname, '..', 'locales');
        const localeFiles = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

        for (const file of localeFiles) {
            const locale = file.replace('.json', '');
            const translations = JSON.parse(fs.readFileSync(path.join(localesPath, file), 'utf-8'));
            this.locales.set(locale, translations);
        }
    }

    get(locale, key, ...args) {
        const translations = this.locales.get(locale) || this.locales.get('en');
        let translation = translations[key] || this.locales.get('en')[key];

        if (typeof translation === 'string') {
            args.forEach((arg, index) => {
                const regex = new RegExp(`\\{${index}\\}`, 'g');
                translation = translation.replace(regex, arg);
            });
        }

        return translation;
    }
}

module.exports = LanguageManager; 