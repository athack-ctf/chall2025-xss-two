function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function swapUrlComponents(url, newProtocol, newDomain, newPort) {
    const parsedUrl = new URL(url); // Parse the URL

    // Change the protocol, hostname, and port
    parsedUrl.protocol = newProtocol; // Example: 'https:', 'ftp:'
    parsedUrl.hostname = newDomain;   // Example: 'example.com'
    parsedUrl.port = newPort;         // Example: '8080'

    // Return the modified URL
    return parsedUrl.toString();
}

function validatePagePath(url, targetPath) {
    try {
        // Parse the URL using the URL constructor
        const parsedUrl = new URL(url);

        // Get the pathname from the parsed URL
        const pathname = parsedUrl.pathname;

        // Check if the pathname starts with the target path
        return pathname.startsWith(targetPath);
    } catch (error) {
        return false;
    }
}

module.exports = {isValidHttpUrl, swapUrlComponents, validatePagePath};