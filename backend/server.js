const express = require('express');
const usersRoute = require('./routes/users-route');
const authRoute = require('./routes/auth-route');

const app = express();
const PORT = 3000;

app.use(express.json());

// Route HTTP requests to /users to users-route
app.use('/users', usersRoute);

// Route HTTP requests to /auth to auth-route
app.use('/auth', authRoute)

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}')
});