const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 4000;

// Function to read quotes from the JSON file
function loadQuotes() {
    const data = fs.readFileSync('quotes.json', { encoding: 'utf8', flag: 'r' });
    return JSON.parse(data);
}

const quotes = loadQuotes();
let currentQuoteIndex = 0;  // Initial quote index

// Rotate the quote every 24 hours
setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;  // Cycle through the quotes
    console.log(`Quote updated to: ${quotes[currentQuoteIndex].quote}`);
}, 86400000);  // 86400000 ms = 24 hours

// Endpoint to get the current quote
app.get('/quote-of-the-day', (req, res) => {
    res.json(quotes[currentQuoteIndex]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
