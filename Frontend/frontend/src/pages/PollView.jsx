import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { Trophy } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const PollView = () => {
  const { pollId } = useParams();
  const socket = useSocket();

  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOption, setVotedOption] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(`${API}/polls/${pollId}`);
        setPoll(res.data);
      } catch {
        console.error("Poll not found");
      }
    };

    fetchPoll();

    // fairness
    const votedPolls = JSON.parse(localStorage.getItem("voted_polls") || "[]");
    if (votedPolls.includes(pollId)) {
      setHasVoted(true);
    }

    // socket join
    socket.emit("joinPoll", pollId);

    socket.on("pollUpdated", (updatedPoll) => {
      if (updatedPoll._id === pollId) {
        setPoll(updatedPoll);
      }
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, [pollId, socket]);

  const handleVote = async (optionIndex) => {
    if (hasVoted) return;

    try {
      const res = await axios.post(`${API}/polls/${pollId}/vote`, {
        optionIndex,
      });

      setPoll(res.data);
      setHasVoted(true);
      setVotedOption(optionIndex);

      const votedPolls = JSON.parse(
        localStorage.getItem("voted_polls") || "[]"
      );

      localStorage.setItem(
        "voted_polls",
        JSON.stringify([...votedPolls, pollId])
      );
    } catch {
      alert("Error casting vote");
    }
  };

  if (!poll) return <div className="p-10 text-center">Loading poll...</div>;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="max-w-xl mx-auto pt-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">{poll.question}</h2>

        <div className="space-y-4">
          {poll.options.map((option, index) => {
            const percentage =
              totalVotes === 0
                ? 0
                : Math.round((option.votes / totalVotes) * 100);

            return !hasVoted ? (
              <button
                key={index}
                onClick={() => handleVote(index)}
                className="w-full text-left px-6 py-4 rounded-xl border hover:border-indigo-500"
              >
                {option.text}
              </button>
            ) : (
              <div
                key={index}
                className="relative w-full h-12 bg-slate-50 rounded-xl overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className="absolute h-full bg-indigo-200"
                />
                <div className="relative flex justify-between px-4 items-center h-full">
                  <span>{option.text}</span>
                  <span>{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-sm text-slate-500">
          <Trophy size={14} className="inline mr-1" />
          {totalVotes} total votes
        </div>
      </motion.div>
    </div>
  );
};

export default PollView;
