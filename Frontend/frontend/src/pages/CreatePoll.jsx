import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Send, BarChart3 } from "lucide-react";
import axios from "axios";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW STATE → for share link
  const [createdPollId, setCreatedPollId] = useState(null);

  const handleAddOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
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

      const id = response.data.pollId;

      // ✅ instead of redirect — show share link UI
      if (id) {
        setCreatedPollId(id);
      }
    } catch (error) {
      console.error("Error creating poll", error);
      alert("Failed to create poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-3 rounded-2xl">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Create a Live Poll
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Your Question
            </label>
            <input
              required
              type="text"
              placeholder="What do you want to ask?"
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Poll Options
            </label>

            <AnimatePresence>
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-2"
                >
                  <input
                    required
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-400 rounded-xl outline-none transition-all"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, e.target.value)
                    }
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            {options.length < 6 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="flex items-center justify-center gap-2 text-indigo-600 font-semibold hover:bg-indigo-50 py-3 rounded-xl transition-colors border-2 border-dashed border-indigo-200"
              >
                <Plus size={20} /> Add Option
              </button>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              {loading ? "Creating..." : (
                <>
                  <Send size={20} /> Create and Share
                </>
              )}
            </button>
          </div>
        </form>

        {/* 🔥 SHARE LINK SECTION */}
        {createdPollId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100"
          >
            <p className="text-sm font-semibold text-indigo-600 mb-2">
              🎉 Poll created! Share this link:
            </p>

            <div className="flex gap-2">
              <input
                readOnly
                value={`${window.location.origin}/poll/${createdPollId}`}
                className="flex-1 px-4 py-2 rounded-lg border bg-white text-sm"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/poll/${createdPollId}`
                  );
                  alert("Link copied!");
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Copy
              </button>
            </div>

            <button
              onClick={() =>
                (window.location.href = `/poll/${createdPollId}`)
              }
              className="mt-3 text-sm text-indigo-700 underline"
            >
              Open Poll →
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatePoll;
