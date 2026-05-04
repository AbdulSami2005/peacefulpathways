import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, HeartPulse, BookOpen, LineChart, Users, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Exercises from './components/Exercises';
import Worksheets from './components/Worksheets';
import Tracking from './components/Tracking';
import Resources from './components/Resources';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Leaf },
    { id: 'exercises', label: 'Exercises', icon: HeartPulse },
    { id: 'worksheets', label: 'Worksheets', icon: BookOpen },
    { id: 'tracking', label: 'Tracking', icon: LineChart },
    { id: 'resources', label: 'Resources', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'exercises': return <Exercises />;
      case 'worksheets': return <Worksheets />;
      case 'tracking': return <Tracking />;
      case 'resources': return <Resources />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-warm-white font-sans text-stone-800 selection:bg-sage-light">

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b-0 border-white/20 m-4 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="bg-sage text-white p-2 rounded-2xl shadow-sm">
                <Leaf size={24} strokeWidth={1.5} />
              </div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-sage-dark relative top-0.5">Peaceful Pathways</h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-1 justify-center space-x-1 sm:space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-full flex items-center gap-2 ${
                      isActive ? 'text-sage-dark' : 'text-[#6B705C] opacity-70 hover:opacity-100'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-[#A3B18A]/20 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-600 hover:text-sage-dark focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass-panel border-t border-white/20 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                        activeTab === tab.id ? 'bg-sage/10 text-sage-dark font-medium' : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Icon size={20} className={activeTab === tab.id ? 'text-sage-dark' : 'text-stone-400'} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-[#6B705C] text-xs font-semibold tracking-widest uppercase mt-auto z-10 relative">
        <p className="opacity-60">&copy; {new Date().getFullYear()} Peaceful Pathways. All rights reserved.</p>
        <p className="mt-2 font-serif italic text-sage-dark text-lg capitalize tracking-normal">Breathe in, breathe out.</p>
      </footer>
    </div>
  );
}
