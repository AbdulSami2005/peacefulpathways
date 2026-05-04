import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Printer } from 'lucide-react';

export default function Worksheets() {
  const [stressors, setStressors] = useState(() => {
    const saved = localStorage.getItem('peaceful_pathways_stressors');
    return saved ? JSON.parse(saved) : [{ name: '', level: 5, category: '' }];
  });
  const [reframed, setReframed] = useState(() => {
    const saved = localStorage.getItem('peaceful_pathways_reframed');
    return saved ? JSON.parse(saved) : [{ original: '', reframed: '' }];
  });
  const [gratitude, setGratitude] = useState(() => {
    const saved = localStorage.getItem('peaceful_pathways_gratitude');
    return saved ? JSON.parse(saved) : ['', '', ''];
  });

  useEffect(() => {
    localStorage.setItem('peaceful_pathways_stressors', JSON.stringify(stressors));
  }, [stressors]);

  useEffect(() => {
    localStorage.setItem('peaceful_pathways_reframed', JSON.stringify(reframed));
  }, [reframed]);

  useEffect(() => {
    localStorage.setItem('peaceful_pathways_gratitude', JSON.stringify(gratitude));
  }, [gratitude]);

  const addStressor = () => setStressors([...stressors, { name: '', level: 5, category: '' }]);
  const addReframed = () => setReframed([...reframed, { original: '', reframed: '' }]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-12 max-w-4xl mx-auto printable-area">
      <style>{`
        @media print {
          body { background: white; }
          .no-print { display: none !important; }
          .glass-panel { box-shadow: none; border: 1px solid #ccc; break-inside: avoid; }
          input, textarea { border: none !important; border-bottom: 1px solid #ccc !important; background: transparent; }
          header, footer { display: none !important; }
        }
      `}</style>
      
      <div className="text-center space-y-4 relative">
        <h2 className="text-4xl font-serif text-stone-800">Coping Worksheets</h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Interactive worksheets to help you identify stressors and practice cognitive reframing.
          Fill them out here, or print them for your journal.
        </p>
        <button 
          onClick={handlePrint}
          className="no-print absolute top-0 right-0 p-3 bg-white text-stone-600 hover:text-sage hover:shadow-md rounded-full transition-all border border-stone-200"
          title="Print Worksheets"
        >
          <Printer size={20} />
        </button>
      </div>

      <motion.div 
        className="bg-[#FAF9F4] p-8 rounded-[32px] border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-serif mb-2 text-sage-dark font-semibold">1. Identifying Stressors</h3>
          <p className="text-[#6B705C] text-sm tracking-wide">List your stressors, rate their intensity, and categorize them (e.g., Work, Family, Finance).</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-stone-500 text-sm pb-2 border-b border-stone-100 hidden sm:grid">
            <div className="col-span-6">Stressor</div>
            <div className="col-span-3">Stress Level (1-10)</div>
            <div className="col-span-3">Category</div>
          </div>
          
          {stressors.map((item, index) => (
            <div key={index} className="grid sm:grid-cols-12 gap-4 items-center">
              <input 
                type="text" 
                placeholder="E.g. Upcoming deadline"
                className="sm:col-span-6 p-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all w-full"
                value={item.name}
                onChange={(e) => {
                  const newArr = [...stressors];
                  newArr[index].name = e.target.value;
                  setStressors(newArr);
                }}
              />
              <input 
                type="number" 
                min="1" max="10"
                className="sm:col-span-3 p-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all w-full"
                value={item.level}
                onChange={(e) => {
                  const newArr = [...stressors];
                  newArr[index].level = parseInt(e.target.value) || 1;
                  setStressors(newArr);
                }}
              />
              <input 
                type="text" 
                placeholder="E.g. Work"
                className="sm:col-span-3 p-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all w-full"
                value={item.category}
                onChange={(e) => {
                  const newArr = [...stressors];
                  newArr[index].category = e.target.value;
                  setStressors(newArr);
                }}
              />
            </div>
          ))}
          <button 
            onClick={addStressor}
            className="no-print mt-4 text-sm font-medium text-sage hover:text-sage-dark transition-colors"
          >
            + Add another row
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="bg-[#FAF9F4] p-8 rounded-[32px] border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-serif mb-2 text-sage-dark font-semibold">2. Thought Reframing</h3>
          <p className="text-[#6B705C] text-sm tracking-wide">Write down a stressful thought and reframe it into a positive or neutral perspective.</p>
        </div>
        
        <div className="space-y-6">
          {reframed.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-500 mb-2">Stressful Thought</label>
                <textarea 
                  rows={3}
                  placeholder="E.g. I’ll never finish this project in time."
                  className="w-full p-4 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all resize-none"
                  value={item.original}
                  onChange={(e) => {
                    const newArr = [...reframed];
                    newArr[index].original = e.target.value;
                    setReframed(newArr);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-500 mb-2">Reframed Perspective</label>
                <textarea 
                  rows={3}
                  placeholder="E.g. I can only do my best, and I will tackle this one step at a time."
                  className="w-full p-4 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all resize-none"
                  value={item.reframed}
                  onChange={(e) => {
                    const newArr = [...reframed];
                    newArr[index].reframed = e.target.value;
                    setReframed(newArr);
                  }}
                />
              </div>
            </div>
          ))}
          <button 
            onClick={addReframed}
            className="no-print mt-2 text-sm font-medium text-sage hover:text-sage-dark transition-colors"
          >
            + Add another thought
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="bg-[#FAF9F4] p-8 rounded-[32px] border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-serif mb-2 text-sage-dark font-semibold">3. Gratitude Practice</h3>
          <p className="text-[#6B705C] text-sm tracking-wide">Write down three things you’re grateful for today. Practicing gratitude can significantly lower stress levels over time.</p>
        </div>
        
        <div className="space-y-4">
          {gratitude.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-sage/10 text-sage-dark flex items-center justify-center font-serif font-medium shrink-0 mt-2">
                {index + 1}
              </div>
              <input 
                type="text" 
                placeholder={`Something I am grateful for...`}
                className="flex-1 p-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                value={item}
                onChange={(e) => {
                  const newArr = [...gratitude];
                  newArr[index] = e.target.value;
                  setGratitude(newArr);
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
