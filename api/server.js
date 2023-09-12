const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON requests
app.use(express.json());

// Sample user data (replace with actual database interactions)
const users = {
  'user123': { address: 'user123', points: 100 },
  'user456': { address: 'user456', points: 50 },
};

app.post('/buy-ticket', (req, res) => {
  try {
    const { userAddress, ticketPriceInCrypto, pointsToGrant } = req.body;

    // Check if the user has enough cryptocurrency balance (you can also validate this on the server)
    const balanceInCrypto = users[userAddress].cryptoBalance; // Replace with the actual crypto balance of the user
    if (balanceInCrypto < ticketPriceInCrypto) {
      return res.status(400).json({ message: 'Insufficient cryptocurrency balance to buy a ticket.' });
    }

    // Deduct the ticket price in cryptocurrency from the user's balance (update in the database)
    users[userAddress].cryptoBalance -= ticketPriceInCrypto;

    // Grant points to the user (update in the database)
    users[userAddress].points += pointsToGrant;

    // Respond with a success message
    res.status(200).json({ message: 'Ticket bought and points granted successfully.' });
  } catch (error) {
    console.error('Error buying a ticket:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
