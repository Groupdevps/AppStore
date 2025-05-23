export interface User {
    "uid": string,
    "name": string,
    displayName: string,
    "email": string,
    "password": string,
    "oauth2": "google" | "facebook" | "custom",
    "fiscalInfo": {
        "rfc": string,
        "address": string,
        "country": string
    },
    infoPayment?: {
        "address": string,
        "postalCode": string
    }
}