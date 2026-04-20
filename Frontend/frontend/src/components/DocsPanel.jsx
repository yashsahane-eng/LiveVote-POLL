import React from 'react';
import { motion } from 'framer-motion';
import { X, Book, Server, Code, Zap, Shield, AlertTriangle, Lightbulb, FolderTree, Terminal } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const DocsPanel = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 w-full max-w-2xl h-full bg-[#0B0F14] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex-none p-6 border-b border-white/10 bg-[#0B0F14]/95 backdrop-blur-md sticky top-0 z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Book className="text-[#A3FF12]" /> Real-Time Poll Rooms
            </h2>
            <p className="text-gray-400 mt-1 text-sm font-mono">
              Built by Yash Sahane — ENTC Student creating web apps
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className="max-w-3xl mx-auto space-y-12 pb-20">
            
            {/* Overview */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="group">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-[#A3FF12] transition-colors">
                  <Book size={20} className="text-gray-500" /> Overview
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  A full-stack web application that allows users to create live polls, share them via a unique encrypted link, and watch votes update instantly in real time via robust WebSocket connections.
                </p>
              </div>
            </motion.section>

            <hr className="border-white/5" />

            {/* Live Demo */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-[#A3FF12] transition-colors">
                <Zap size={20} className="text-gray-500" /> Live Demo
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#A3FF12] transition-all group">
                  <div className="text-xs font-mono text-gray-500 mb-1">Frontend Client</div>
                  <div className="text-[#A3FF12] text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-pulse"></span>
                    https://poll-app.vercel.app
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#A3FF12] transition-all group">
                  <div className="text-xs font-mono text-gray-500 mb-1">Backend Core API</div>
                  <div className="text-gray-300 group-hover:text-white transition-colors text-sm">
                    https://api.poll-app.render.com
                  </div>
                </div>
              </div>
            </motion.section>

            <hr className="border-white/5" />

            {/* Objective */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4">Objective</h3>
              <ul className="space-y-3">
                {['Create dynamic interactive polls on the fly.', 'Share voting portals instantly via robust link generation.', 'Limit users to vote once per specific poll via hybrid tracking.', 'Broadcast vote updates locally and globally in true real-time.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A3FF12] flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>

            <hr className="border-white/5" />

            {/* Tech Stack */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-[#A3FF12] transition-colors">
                <Code size={20} className="text-gray-500" /> Tech Stack
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-4 bg-[#111827] rounded-xl border border-white/5 cursor-default hover:border-white/10 transition">
                  <h4 className="text-[#A3FF12] font-mono text-xs mb-3 uppercase tracking-wider">Frontend</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>React (Vite)</li>
                    <li>Tailwind CSS</li>
                    <li>Socket.IO Client</li>
                    <li>Axios</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#111827] rounded-xl border border-white/5 cursor-default hover:border-white/10 transition">
                  <h4 className="text-[#A3FF12] font-mono text-xs mb-3 uppercase tracking-wider">Backend</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB Atlas</li>
                    <li>Socket.IO</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#111827] rounded-xl border border-white/5 cursor-default hover:border-white/10 transition">
                  <h4 className="text-[#A3FF12] font-mono text-xs mb-3 uppercase tracking-wider">Deployment</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>Vercel (Client)</li>
                    <li>Render (API)</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <hr className="border-white/5" />

            {/* Features */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4">Core Features</h3>
              <div className="space-y-3">
                {[
                  { title: "Rapid Poll Creation", desc: "Construct multiple-choice queries with 2-6 unique options in seconds." },
                  { title: "Direct Join by Link", desc: "Share polls using custom endpoint URIs. Includes high-res QR generation." },
                  { title: "Real-Time Synchronization", desc: "Socket.IO ensures all connected clients receive vote payloads instantaneously." },
                  { title: "Fairness Controls", desc: "Prevents basic vote-spamming using decentralized LocalStorage checkpoints." }
                ].map((feat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                    <h4 className="text-white text-sm font-bold mb-1">{feat.title}</h4>
                    <p className="text-xs text-gray-400">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <hr className="border-white/5" />

            {/* Fairness System */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                <h3 className="text-lg font-bold text-indigo-400 mb-3 flex items-center gap-2">
                  <Shield size={18} /> Fairness System
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  The application employs a heuristic system to prevent double voting without forcing rigid user accounts.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2"><div className="w-1 h-3 bg-indigo-500 rounded"></div> <strong>LocalStorage Auth</strong>: Devices tag themselves locally per poll.</div>
                  <div className="flex items-center gap-2"><div className="w-1 h-3 bg-indigo-500 rounded"></div> <strong>IP Tracking (Beta)</strong>: Rate limiting across standard networks.</div>
                </div>
                <p className="mt-4 text-xs font-mono text-indigo-300 bg-indigo-500/10 p-2 rounded">
                  Note: A completely anonymous poll cannot be 100% immune to spoofing without standard auth flow (OAuth).
                </p>
              </div>
            </motion.section>

            {/* Limitations */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} /> Edge Cases & Limitations
                </h3>
                <ul className="space-y-2 text-sm text-amber-200/70">
                  <li>• Users switching browsers or clearing data can bypass the vote lock.</li>
                  <li>• Heavy network restrictions might force Socket.IO to fallback to XHR polling.</li>
                  <li>• Anonymous architecture means IP spoofing is technically possible.</li>
                </ul>
              </div>
            </motion.section>

            <hr className="border-white/5" />

            {/* Project Structure */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-[#A3FF12] transition-colors">
                <FolderTree size={20} className="text-gray-500" /> Project Structure
              </h3>
              <pre className="bg-[#111827] border border-white/10 p-5 rounded-xl overflow-x-auto text-xs text-gray-400 font-mono leading-relaxed">
{`/poll-app
├── backend/
│   ├── server.js
│   ├── models/Poll.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── DocsPanel.jsx
    │   ├── pages/
    │   │   ├── CreatePoll.jsx
    │   │   └── PollView.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json`}
              </pre>
            </motion.section>

            <hr className="border-white/5" />

            {/* Local Setup */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-[#A3FF12] transition-colors">
                <Terminal size={20} className="text-gray-500" /> Local Setup
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-gray-500 mb-2">1. Backend Node execution</div>
                  <pre className="bg-[#111827] border border-white/5 p-4 rounded-xl text-sm font-mono text-[#A3FF12]">
                    cd backend && npm run dev
                  </pre>
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 mb-2">2. Frontend Interface</div>
                  <pre className="bg-[#111827] border border-white/5 p-4 rounded-xl text-sm font-mono text-[#A3FF12]">
                    cd frontend && npm run dev -- --host
                  </pre>
                </div>
              </div>
            </motion.section>

            <hr className="border-white/5" />

            {/* Lightbulb Philosophy */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-[#A3FF12] transition-colors">
                <Lightbulb size={20} className="text-[#A3FF12]" /> Design Philosophy
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                The core philosophy is absolute simplicity intersecting with real-time feedback. Real-time interfaces demand a clean architecture to manage visual chaos. With deep dark mode aesthetics, minimal geometry, and strategic use of electric green, the user's attention remains solely focused on live telemetry.
              </p>
            </motion.section>

          </div>
        </div>

        {/* Footer */}
        <div className="flex-none p-6 border-t border-white/10 bg-[#0B0F14] text-center shrink-0">
             <div className="text-sm font-bold text-white mb-1">Built by Yash Sahane</div>
             <div className="text-xs font-mono text-gray-500">ENTC Student | Web App Developer</div>
        </div>
      </motion.div>
    </>
  );
};

export default DocsPanel;
