export interface User {
    "uid": string,
    "name": string,
    "email": string,
    "password": string,
    "oauth2": "google" | "facebook" | "custom",
    "fiscalInfo": {
        "rfc": string,
        "address": string,
        "country": string
    }
}