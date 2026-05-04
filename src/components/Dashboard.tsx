import { motion } from 'motion/react';
import { ArrowRight, Wind, HeartPulse, BookOpen } from 'lucide-react';

export default function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4 sm:px-6 space-y-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-block"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-sage/10 text-sage-dark text-sm font-medium tracking-wide mb-4">
            Mental Wellness Platform
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl sm:text-6xl font-serif text-stone-800 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Find your <span className="text-sage font-style-italic font-light italic">balance</span> in a chaotic world.
        </motion.h1>
        
        <motion.p 
          className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover proactive strategies for stress management, practice effective coping 
          techniques, and track your well-being journey—all in one peaceful space.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            onClick={() => setActiveTab('exercises')}
            className="px-8 py-4 bg-sage-dark text-white rounded-full text-xs uppercase tracking-widest font-bold shadow-lg shadow-sage/20 hover:bg-[#3A4A3A] hover:-translate-y-1 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Start Breathing <Wind size={16} />
          </button>
          <button 
            onClick={() => setActiveTab('worksheets')}
            className="px-8 py-4 bg-white text-sage-dark border border-stone-200 rounded-full text-xs uppercase tracking-widest font-bold shadow-sm hover:border-sage-dark transition-all w-full sm:w-auto justify-center"
          >
            Take an Assessment
          </button>
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        <motion.div 
          className="bg-[#FAF9F4] p-8 rounded-[32px] border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center text-sage-dark mb-6">
            <HeartPulse size={24} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-4">Understanding Stress</h2>
          <p className="text-[#6B705C] leading-relaxed mb-6">
            Stress is the body's reaction to challenges, triggering a "fight-or-flight" response. 
            While short-term stress can motivate, prolonged stress negatively impacts mental and physical health.
            Management involves proactive strategies to prevent it from becoming overwhelming.
          </p>
        </motion.div>

        <motion.div 
          className="bg-[#FAF9F4] p-8 rounded-[32px] border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-clay/20 rounded-full flex items-center justify-center text-[#BC6C25] mb-6">
            <BookOpen size={24} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-4">Effective Coping</h2>
          <p className="text-[#6B705C] leading-relaxed mb-6">
            Coping addresses stress after it arises. Healthy coping includes problem-solving, 
            mindfulness, and seeking support. Unhealthy coping, like avoidance, offers temporary 
            relief but worsens stress over time. We focus on building sustainable, healthy habits.
          </p>
        </motion.div>
      </section>

      {/* Quick Access Area */}
      <section className="bg-[#FAF9F4] organic-bg rounded-[40px] p-8 sm:p-12 text-center max-w-5xl mx-auto border border-white shadow-sm relative overflow-hidden">
        <h2 className="text-3xl font-serif mb-8 text-sage-dark relative z-10">Begin Your Journey</h2>
        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {[
            { id: 'exercises', subtitle: 'Step I', label: 'Guided Exercises', color: 'bg-clay/20 hover:bg-clay/30 border flex flex-col items-start justify-end p-6 h-48 rounded-[32px] transition-all cursor-pointer border-white/50 group shadow-sm text-left relative overflow-hidden' },
            { id: 'worksheets', subtitle: 'Step II', label: 'Self Assessments', color: 'bg-clay-light/40 hover:bg-clay-light/50 border flex flex-col items-start justify-end p-6 h-48 rounded-[32px] transition-all cursor-pointer border-white/50 group shadow-sm text-left relative overflow-hidden' },
            { id: 'tracking', subtitle: 'Step III', label: 'Mood Tracking', color: 'bg-white hover:bg-white/80 border flex flex-col items-start justify-end p-6 h-48 rounded-[32px] transition-all cursor-pointer border-white/50 group shadow-sm text-left relative overflow-hidden' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={item.color}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-sage-dark group-hover:scale-110 transition-transform">
                <ArrowRight size={18} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B705C] mb-1">{item.subtitle}</span>
              <h4 className="font-serif text-2xl text-stone-800">{item.label}</h4>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
