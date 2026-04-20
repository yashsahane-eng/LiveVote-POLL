import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { Trophy, Activity, Users, ShieldCheck } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const PollView = () => {
  const { pollId } = useParams();
  const socket = useSocket();

  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOption, setVotedOption] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

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

    const votedPolls = JSON.parse(localStorage.getItem("voted_polls") || "[]");
    if (votedPolls.includes(pollId)) {
      setHasVoted(true);
    }

    if (socket) {
      socket.emit("joinPoll", pollId);
      socket.on("pollUpdated", (updatedPoll) => {
        if (updatedPoll._id === pollId) {
          setPoll(updatedPoll);
        }
      });

      return () => {
        socket.off("pollUpdated");
      };
    }
  }, [pollId, socket]);

  const handleVote = async (optionIndex) => {
    if (hasVoted) return;

    try {
      // optimistic update
      setHasVoted(true);
      setVotedOption(optionIndex);
      
      const res = await axios.post(`${API}/polls/${pollId}/vote`, {
        optionIndex,
      });

      setPoll(res.data);

      const votedPolls = JSON.parse(localStorage.getItem("voted_polls") || "[]");
      localStorage.setItem("voted_polls", JSON.stringify([...votedPolls, pollId]));
    } catch {
      alert("Error casting vote");
      setHasVoted(false);
      setVotedOption(null);
    }
  };

  if (!poll) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Activity className="text-[#A3FF12] w-8 h-8" />
        <span className="text-gray-400 font-mono text-sm">Fetching endpoint...</span>
      </div>
    </div>
  );

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  
  // Find max votes for highlighting
  const maxVotes = Math.max(...poll.options.map(o => o.votes), 0);

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-[#0B0F14] to-[#0F172A] relative overflow-hidden flex justify-center items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#A3FF12] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-2xl z-10 relative">
        {/* Connection status */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2">
             <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3FF12] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A3FF12]"></span>
            </span>
            <span className="text-xs font-mono text-[#A3FF12] uppercase tracking-wider">Live Socket Active</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider bg-[rgba(255,255,255,0.03)] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.05)]">
            <ShieldCheck size={14} /> Anonymous mode
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-panel rounded-2xl overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-8 border-b border-[rgba(255,255,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity className="w-32 h-32 text-indigo-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight relative z-10">{poll.question}</h2>
            <div className="text-sm font-mono text-gray-400 mt-4 flex items-center gap-2">
              ID: {pollId.slice(-6)} • <Users size={14} className="ml-2" /> {totalVotes} Telemetry Logs
            </div>
          </div>

          {/* Options */}
          <div className="p-8 space-y-4 bg-[rgba(0,0,0,0.2)]">
            {poll.options.map((option, index) => {
              const percentage = totalVotes === 0 ? 0 : ((option.votes / totalVotes) * 100).toFixed(1);
              const isWinner = totalVotes > 0 && option.votes === maxVotes;
              const isVoted = votedOption === index;

              return !hasVoted ? (
                <button
                  key={index}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => handleVote(index)}
                  className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 relative overflow-hidden
                    ${isHovered === index ? 'border-[#A3FF12] bg-[rgba(163,255,18,0.05)] translate-x-2' : 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]'}
                  `}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`text-lg font-medium transition-colors ${isHovered === index ? 'text-[#A3FF12]' : 'text-gray-200'}`}>
                      {option.text}
                    </span>
                    <span className={`text-sm font-mono transition-opacity ${isHovered === index ? 'opacity-100 text-[#A3FF12]' : 'opacity-0'}`}>
                      [ Execute ]
                    </span>
                  </div>
                </button>
              ) : (
                <div key={index} className="relative w-full rounded-xl overflow-hidden bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className={`absolute inset-y-0 left-0 rounded-lg opacity-20 ${
                      isWinner ? 'bg-[#A3FF12]' : isVoted ? 'bg-indigo-400' : 'bg-gray-500'
                    }`}
                  />
                  
                  {isWinner && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="absolute inset-y-0 left-0 w-1 bg-[#A3FF12] rounded-l-lg z-10 shadow-[0_0_10px_rgba(163,255,18,1)]"
                    />
                  )}
                  {isVoted && !isWinner && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 rounded-l-lg z-10" />
                  )}
                  
                  <div className="relative z-10 flex justify-between px-5 py-4 items-center">
                    <span className={`text-lg font-medium flex items-center gap-2 ${
                      isWinner ? 'text-[#A3FF12]' : isVoted ? 'text-indigo-300' : 'text-gray-300'
                    }`}>
                      {option.text}
                      {isVoted && <span className="text-xs font-mono border border-current rounded px-1.5 py-0.5 opacity-70 ml-2">YOU</span>}
                    </span>
                    
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-sm text-gray-500 font-mono hidden sm:inline">{option.votes} ops</span>
                      <span className={`font-mono text-lg font-bold ${
                        isWinner ? 'text-[#A3FF12]' : 'text-white'
                      }`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-[rgba(0,0,0,0.6)] px-8 py-4 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center">
            <span className="text-xs font-mono text-gray-500">Node JS / Socket.io Backend</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PollView;
