const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const pollRoutes = require("./routes/pollRoutes");

const app = express();

// middlewaresss
app.use(cors());
app.use(express.json());

app.use("/polls", pollRoutes);
app.use('/api/polls', pollRoutes);

app.get("/health", (req, res) => {
  res.send("server running");
});

// MongoDB...
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//  HTTP s
const server = http.createServer(app);

//  Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socket connection establishment  
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
  });
});

// Make io accessible in controllers
app.set("io", io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
