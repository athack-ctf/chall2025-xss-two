const express = require('express');
const path = require('path');
const app = express();
const {isValidHttpUrl, validatePagePath, swapUrlComponents} = require("./utils");
const {visitPageAndCheckForProof} = require("./bot");

// Port 2025
const port = 2025;
const timeout = 2000;
const proof = "I_FOUND_AN_XSS!!!";

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Get url encoded data
app.use(express.urlencoded({extended: true}));

// Fallback route to serve welcome.html when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'welcome.html'));
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'calcutor.html'));
});

app.post('/submit-url', async (req, res) => {

    const url = req.body.url;

    // Validate url
    if (!isValidHttpUrl(url)) {
        res.sendFile(path.join(__dirname, 'private', 'no-flag.html'));
        return;
    }

    // Validate page path
    if (!validatePagePath(url, "/calculator")) {
        res.sendFile(path.join(__dirname, 'private', 'no-flag.html'));
        return;
    }

    // Fixing url (in case it points somewhere else)
    const safeUrl = swapUrlComponents(url, "http", "localhost", port);


    // Check if the XSS payload worked
    const xssPayloadWorked = await visitPageAndCheckForProof(safeUrl, proof, timeout);

    if (!xssPayloadWorked) {
        res.sendFile(path.join(__dirname, 'private', 'no-flag.html'));
        return;
    }

    // Return the flag page
    res.sendFile(path.join(__dirname, 'private', 'flag.html'));
});

// 404 Not Found handler for all routes that don't match
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'private', '404.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
