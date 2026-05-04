import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Play, Square, X } from 'lucide-react';

const exercises = [
  {
    id: 'breathing',
    title: 'Breathing Exercise',
    desc: 'Calm your mind and body with deep, rhythmic breathing.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'meditation',
    title: 'Meditation',
    desc: 'Focus on the present moment to reduce stress and enhance mindfulness.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pmr',
    title: 'Progressive Muscle Relaxation',
    desc: 'Relieve tension by tensing and relaxing each muscle group systematically.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'visualization',
    title: 'Visualization',
    desc: 'Imagine a peaceful place to create mental relaxation and clarity.',
    image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cbt',
    title: 'Cognitive Behavioral Therapy',
    desc: 'Techniques that help change negative thought patterns contributing to stress.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nature',
    title: 'Time in Nature',
    desc: 'Spending time outdoors away from the demands of everyday life.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'journaling',
    title: 'Gratitude Journaling',
    desc: 'Cultivate a positive mindset by acknowledging the good things in your life.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mindful-walking',
    title: 'Mindful Walking',
    desc: 'Connect with your environment by paying close attention to the sensation of walking.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    desc: 'Mentally scan your body to release hidden tension and promote deep relaxation.',
    image: 'https://images.unsplash.com/photo-1545389336-eaee310af3ea?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'grounding-54321',
    title: '5-4-3-2-1 Grounding',
    desc: 'A sensory technique to bring you back to the present moment during moments of anxiety.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Exercises() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-serif text-stone-800">Interactive Exercises</h2>
        <p className="text-lg text-stone-600">
          Engage in various exercises designed to enhance your stress management skills 
          and bring peace to your daily routine.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, i) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer bg-[#FAF9F4] rounded-[32px] overflow-hidden border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 flex flex-col"
            onClick={() => setSelectedExercise(exercise.id)}
          >
            <div className="h-48 overflow-hidden mx-2 mt-2 rounded-[24px]">
              <img 
                src={exercise.image} 
                alt={exercise.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-sage-dark mb-2">{exercise.title}</h3>
              <p className="text-[#6B705C] text-sm leading-relaxed line-clamp-2">{exercise.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedExercise && (
          <ExerciseModal 
            exerciseId={selectedExercise} 
            onClose={() => setSelectedExercise(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ExerciseModal({ exerciseId, onClose }: { exerciseId: string; onClose: () => void }) {
  const exercise = exercises.find(e => e.id === exerciseId);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Simple breathing timer logic
  if (isBreathing) {
    setTimeout(() => {
      if (breathPhase === 'Inhale') setBreathPhase('Hold');
      else if (breathPhase === 'Hold') setBreathPhase('Exhale');
      else setBreathPhase('Inhale');
    }, breathPhase === 'Hold' ? 2000 : 4000);
  }

  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X size={20} />
        </button>

        <div className="h-64 relative">
          <img src={exercise.image} alt={exercise.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="p-8 -mt-20 relative">
          <h3 className="text-3xl font-serif mb-4 flex items-center gap-3">
            {exercise.title}
          </h3>
          <p className="text-stone-600 text-lg leading-relaxed mb-8">
            {exercise.desc} 
            Find a quiet, comfortable space where you won't be disturbed. Notice your breath, 
            relax your shoulders, and allow yourself this moment of calm.
          </p>

          {exerciseId === 'breathing' ? (
            <div className="bg-sage/5 rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full bg-sage/20"
                  animate={
                    isBreathing ? {
                      scale: breathPhase === 'Inhale' ? 1.5 : breathPhase === 'Hold' ? 1.5 : 1,
                      opacity: breathPhase === 'Hold' ? 0.8 : 0.4
                    } : {
                      scale: 1, opacity: 0.2
                    }
                  }
                  transition={{ duration: breathPhase === 'Hold' ? 2 : 4, ease: "easeInOut" }}
                />
                <div className="w-32 h-32 bg-white rounded-full shadow-sm flex items-center justify-center relative z-10">
                  <span className="font-serif text-2xl text-sage-dark">
                    {isBreathing ? breathPhase : 'Ready?'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="px-6 py-3 rounded-full bg-sage text-white font-medium hover:bg-sage-dark transition-colors flex items-center gap-2"
              >
                {isBreathing ? <><Square size={16} fill="currentColor" /> Stop</> : <><Play size={16} fill="currentColor" /> Start Breathing</>}
              </button>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl p-8 text-center text-stone-500">
              <p>Take 5 minutes quietly reflecting on this concept. More guided content coming soon.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
