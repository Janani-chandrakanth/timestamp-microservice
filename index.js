// index.js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so that the API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (for index.html)
app.use(express.static('public'));

// Root endpoint serving the index.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  
  let date;

  // Handle no date provided, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if the date is a UNIX timestamp
    if (!isNaN(dateString)) {
      dateString = parseInt(dateString);
    }
    date = new Date(dateString);
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the server and listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
