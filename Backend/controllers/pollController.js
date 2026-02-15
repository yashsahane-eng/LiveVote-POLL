const Poll = require("../models/Poll");

// ✅ Create Poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const formattedOptions = options.map((opt) => ({
      text: opt,
    }));

    const poll = await Poll.create({
      question,
      options: formattedOptions,
    });

    res.status(201).json({
      pollId: poll._id,
      shareLink: `/poll/${poll._id}`,
      poll,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Poll by ID
exports.getPoll = async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await Poll.findById(id); // 🔥 use existing import

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Vote on Poll
exports.votePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;

    const voterId = req.ip;

    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (poll.voters.includes(voterId)) {
      return res.status(400).json({ message: "You already voted" });
    }

    if (
      optionIndex === undefined ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({ message: "Invalid option" });
    }

    poll.options[optionIndex].votes += 1;
    poll.voters.push(voterId);

    await poll.save();
    const io = req.app.get("io");
   io.to(id).emit("pollUpdated", poll);


    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
