import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll';
import PollView from './pages/PollView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/poll/:pollId" element={<PollView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;