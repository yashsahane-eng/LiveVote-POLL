import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Send, Terminal, Sparkles, Copy, ExternalLink, Activity, DownloadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import DocsPanel from "../components/DocsPanel";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [createdPollId, setCreatedPollId] = useState(null);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleAddOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/polls`,
        { question, options }
      );
      if (response.data.pollId) {
        setCreatedPollId(response.data.pollId);
      }
    } catch (error) {
      console.error("Error creating poll", error);
      alert("Failed to create poll.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/poll/${createdPollId}`);
    alert("Copied to clipboard!");
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `poll-${createdPollId}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0B0F14] to-[#0F172A]">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A3FF12] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-24 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md w-max">
              <Sparkles className="text-[#A3FF12] w-4 h-4" />
              <span className="text-sm font-medium text-gray-300">Next-gen Polling Infrastructure</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              It’s time to make <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] to-[#34d399] glow-text">
                your software.
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-400 max-w-xl leading-relaxed">
              Deploy real-time interactive polls instantly. Built for developers with high-performance WebSockets. Zero configuration required.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('poll-creator').scrollIntoView({ behavior: 'smooth' })}
                className="glow-button px-8 py-4 rounded-xl font-bold flex items-center gap-2 text-lg"
              >
                Start building <Terminal size={20} />
              </button>
              <button 
                onClick={() => setIsDocsOpen(true)}
                className="px-8 py-4 rounded-xl font-bold text-gray-300 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.05)] transition-all cursor-pointer"
              >
                View Docs
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Floating Card UI */}
          <motion.div 
             id="poll-creator"
            initial={{ opacity: 0, scale: 0.95, rotateY: 15, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut", type: "spring" }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            {/* The decorative glass top bar */}
            <div className="glass-panel w-full rounded-2xl overflow-hidden relative z-10 transition-transform duration-500 hover:scale-[1.02]">
              <div className="bg-[rgba(0,0,0,0.4)] px-4 py-3 flex items-center border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono ml-4 flex-1 text-center pr-10">~/projects/poll-cli</div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-[rgba(163,255,18,0.1)] p-2.5 rounded-lg border border-[rgba(163,255,18,0.2)]">
                    <Activity className="text-[#A3FF12] w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {createdPollId ? "Deployment Active" : "Initialize Engine"}
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  {!createdPollId ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest font-mono">
                          Query Parameters
                        </label>
                        <input
                          required
                          autoFocus
                          type="text"
                          placeholder="Enter primary question..."
                          className="terminal-input w-full px-5 py-4 rounded-xl font-medium"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest font-mono">
                          Data Array
                        </label>

                        <AnimatePresence>
                          {options.map((option, index) => (
                             <motion.div
                              key={index}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex gap-2 overflow-hidden"
                            >
                              <span className="flex items-center text-gray-500 font-mono select-none">
                                {index + 1}.
                              </span>
                              <input
                                required
                                type="text"
                                placeholder="String value"
                                className="terminal-input flex-1 px-4 py-3 rounded-lg text-sm"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                              />
                              {options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(index)}
                                  className="p-3 text-gray-500 hover:text-red-400 transition-colors bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,0,0,0.1)] rounded-lg border border-transparent hover:border-[rgba(255,0,0,0.2)]"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        {options.length < 6 && (
                          <button
                            type="button"
                            onClick={handleAddOption}
                            className="flex items-center justify-center gap-2 text-gray-400 font-medium hover:text-[#A3FF12] py-3 rounded-lg transition-all border border-dashed border-[rgba(255,255,255,0.1)] hover:border-[#A3FF12] hover:bg-[rgba(163,255,18,0.05)] bg-[rgba(0,0,0,0.2)]"
                          >
                            <Plus size={18} /> Append Option
                          </button>
                        )}

                        <button
                          disabled={loading}
                          type="submit"
                          className="glow-button w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-2"
                        >
                          {loading ? "Deploying..." : (
                            <>
                              <Send size={18} /> Execute Deployment
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="qr-module"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="flex flex-col items-center w-full pb-4"
                    >
                      <div className="w-full text-center mb-6">
                        <p className="text-[#A3FF12] font-mono text-xs tracking-widest uppercase mb-2 flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse"></span>
                          Endpoint Live
                        </p>
                        <p className="text-gray-400 text-lg">Scan to Join Space</p>
                      </div>

                      <div className="relative p-5 bg-white rounded-2xl shadow-[0_0_50px_rgba(163,255,18,0.15)] mb-8 transition-transform hover:scale-105 duration-300">
                        <QRCodeCanvas
                          id="qr-canvas"
                          value={`${window.location.origin}/poll/${createdPollId}`}
                          size={1024}
                          style={{ width: 220, height: 220 }}
                          level="H"
                          includeMargin={false}
                        />
                        <div className="absolute inset-0 border-2 border-[#A3FF12] rounded-2xl opacity-40 pointer-events-none"></div>
                      </div>

                      <div className="w-full bg-[rgba(0,0,0,0.4)] px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.05)] mb-8">
                        <div className="flex items-center gap-3">
                          <input
                            readOnly
                            value={`${window.location.origin}/poll/${createdPollId}`}
                            className="flex-1 bg-transparent text-gray-300 font-mono text-sm outline-none w-full"
                          />
                          <button 
                            onClick={copyLink}
                            className="p-2 bg-[rgba(255,255,255,0.1)] hover:bg-[#A3FF12] hover:text-black text-gray-300 rounded-lg transition-all border border-[rgba(255,255,255,0.05)]"
                            title="Copy Link"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex w-full gap-4">
                        <button
                          onClick={() => { setCreatedPollId(null); setQuestion(""); setOptions(["",""]); }}
                          className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm bg-[rgba(255,255,255,0.03)] text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-all border border-[rgba(255,255,255,0.05)]"
                        >
                          Reset Engine
                        </button>
                        <button
                          onClick={downloadQR}
                          className="flex-[2] glow-button py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(163,255,18,0.3)]"
                        >
                          <DownloadCloud size={18} /> High-Res PNG
                        </button>
                      </div>
                      
                      <Link
                        to={`/poll/${createdPollId}`}
                        className="mt-8 text-sm text-[#A3FF12] hover:text-[#B4FF33] font-mono underline underline-offset-4 flex flex-row items-center gap-1.5"
                      >
                        Access Terminal Node <ExternalLink size={14} className="inline" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Decoration Behind absolute */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A3FF12] to-indigo-600 rounded-[1.2rem] blur opacity-20 -z-10 group-hover:opacity-30 transition duration-1000 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isDocsOpen && <DocsPanel isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />}
      </AnimatePresence>

    </div>
  );
};

export default CreatePoll;
