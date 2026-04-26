const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // This bypasses your ISP's DNS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Status</title>
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #fcfaff;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          border: 2px solid #8b5cf6;
          background: white;
          padding: 25px 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
        }

        .typing-wrapper {
          display: flex;
          align-items: center;
          font-size: 32px;
          font-weight: 800;
          color: #7c3aed;
        }

        /* The Typing Effect */
        .text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 8px solid #7c3aed; /* This is the blinking cursor */
          padding-right: 10px;
          animation: 
            typing 3.5s steps(20, end),
            blink-caret 0.75s step-end infinite;
        }

        .rocket {
          margin-left: 5px;
          font-size: 32px;
        }

        /* Animation to "move" the cursor across the text */
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        /* Animation to make the cursor blink */
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #7c3aed }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="typing-wrapper">
          <div class="text">Server is Running</div>
          <span class="rocket">🚀</span>
        </div>
      </div>
    </body>
    </html>
    `);
})

// Connect to MongoDB
mongoose 
    .connect("mongodb+srv://ayiee00:ayiee00@expressnodedb.c9yqjzz.mongodb.net/")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

//Midlleware
app.use(cors());
app.use(express.json());

//Import API folder
const submitTalentForm = require('./API/submit')

//use API
app.use("/submit", submitTalentForm);

// // Start the server locally
// const PORT = 5000

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

//Start the Server Mircrosft Azure
  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });