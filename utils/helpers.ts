export function formatForWhatsApp(rawNumber: any, defaultCountryCode = "1") {
    if (!rawNumber) return "";

    // remove everything except digits
    let digits = rawNumber.replace(/\D/g, "");

    // if it starts with country code already, return as is
    if (digits.startsWith(defaultCountryCode)) {
        return digits;
    }

    // otherwise, prepend default country code
    return defaultCountryCode + digits;
}