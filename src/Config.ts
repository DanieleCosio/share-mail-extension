export const Config = {
    BASE_URL: "http://localhost:5500",
    GET_LINK: "api/v1/email/link",
    PAGE_CONNECTOR: "assets/PageConnector.js",
    EXTENSION_EVENT_TAG: "extension-share-mail",
    GMAIL_ORIGIN: "https://mail.google.com",
    EMAIL_BODY_MATCH_PATTERN: /<html[^>]*>(([^<]+|<(?!\/html>))*)<\/html>/im,
} as const;
