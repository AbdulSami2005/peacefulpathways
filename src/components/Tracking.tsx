import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type MoodData = {
  day: string;
  mood: number;
};

const initialData: MoodData[] = [
  { day: 'Mon', mood: 5 },
  { day: 'Tue', mood: 7 },
  { day: 'Wed', mood: 6 },
  { day: 'Thu', mood: 8 },
  { day: 'Fri', mood: 9 },
  { day: 'Sat', mood: 6 },
  { day: 'Sun', mood: 5 },
];

export default function Tracking() {
  const [data, setData] = useState<MoodData[]>(() => {
    const saved = localStorage.getItem('peaceful_pathways_moodData');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [formValues, setFormValues] = useState<number[]>(() => {
    const saved = localStorage.getItem('peaceful_pathways_moodFormValues');
    return saved ? JSON.parse(saved) : initialData.map(d => d.mood);
  });

  React.useEffect(() => {
    localStorage.setItem('peaceful_pathways_moodData', JSON.stringify(data));
  }, [data]);

  React.useEffect(() => {
    localStorage.setItem('peaceful_pathways_moodFormValues', JSON.stringify(formValues));
  }, [formValues]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = initialData.map((item, index) => ({
      ...item,
      mood: formValues[index],
    }));
    setData(newData);
  };

  const getEmoji = (mood: number) => {
    if (mood <= 2) return '😩';
    if (mood <= 4) return '😐';
    if (mood <= 6) return '😌';
    if (mood <= 8) return '🙂';
    return '😁';
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-serif text-stone-800">Your Progress</h2>
        <p className="text-lg text-stone-600">
          Tracking your mood daily can help identify stress triggers and evaluate 
          the effectiveness of your coping strategies.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-1 bg-[#FAF9F4] p-6 sm:p-8 rounded-[32px] border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-serif font-semibold text-sage-dark mb-6">Update Your Week</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            {initialData.map((item, index) => (
              <div key={item.day} className="flex items-center gap-4 border-b border-stone-100 pb-3">
                <label className="w-16 font-medium text-stone-600">{item.day}</label>
                <div className="text-xl">{getEmoji(formValues[index])}</div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formValues[index]}
                  onChange={(e) => {
                    const newVals = [...formValues];
                    newVals[index] = parseInt(e.target.value, 10);
                    setFormValues(newVals);
                  }}
                  className="flex-1 accent-sage"
                />
                <span className="w-8 text-right text-stone-500 font-mono text-sm">{formValues[index]}</span>
              </div>
            ))}
            <button 
              type="submit"
              className="w-full mt-6 py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-900 transition-colors"
            >
              Update Chart
            </button>
          </form>
        </motion.div>

        <motion.div 
          className="lg:col-span-2 bg-[#FAF9F4] p-6 sm:p-8 rounded-[32px] flex flex-col border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-serif font-semibold text-sage-dark mb-8">Mood Chart</h3>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#8a9a86" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#8a9a86', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#78716c', fontSize: 14 }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, 10]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#78716c', fontSize: 14 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  formatter={(value: number) => [`${value}/10`, 'Mood Level']}
                  labelStyle={{ color: '#78716c', marginBottom: '4px' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
