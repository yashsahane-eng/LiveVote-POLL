import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll';
import PollView from './pages/PollView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B0F14] text-[#E5E7EB] font-sans selection:bg-[#A3FF12] selection:text-black">
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/poll/:pollId" element={<PollView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;