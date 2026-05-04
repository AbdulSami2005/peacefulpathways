import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const resources = [
  {
    title: 'National Institute of Mental Health (NIMH)',
    desc: 'Practical tips for coping with stress and information about how stress can affect the body and mind.',
    link: 'https://www.nimh.nih.gov/health/publications/coping-with-stress',
  },
  {
    title: 'American Psychological Association (APA)',
    desc: 'Comprehensive articles on what stress is, how it affects mental and physical health, and effective ways to manage it.',
    link: 'https://www.apa.org/topics/stress',
  },
  {
    title: 'WebMD - Stress Management',
    desc: 'A wide variety of articles on stress management, including different techniques such as deep breathing and exercise.',
    link: 'https://www.webmd.com/balance/stress-management',
  },
  {
    title: 'Mindful.org',
    desc: 'An excellent resource for learning about mindfulness practices that can help reduce stress and increase emotional regulation.',
    link: 'https://www.mindful.org',
  },
  {
    title: 'Psychology Today',
    desc: 'Practical advice on handling stress, including cognitive-behavioral strategies and time management tips.',
    link: 'https://www.psychologytoday.com/us/basics/stress/stress-management-strategies',
  },
  {
    title: 'Headspace',
    desc: 'Guided meditations and mindfulness practices to bring calmness to your daily life.',
    link: 'https://www.headspace.com',
  }
];

export default function Resources() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-serif text-stone-800">Resources & Community</h2>
        <p className="text-lg text-stone-600">
          Explore a carefully curated variety of resources, articles, and communities 
          to support your stress management journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {resources.map((item, i) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="block bg-[#FAF9F4] p-6 sm:p-8 rounded-[32px] hover:bg-white transition-all group border border-[#E6E2D3] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-serif font-semibold text-sage-dark pr-4">{item.title}</h3>
              <div className="text-[#6B705C] group-hover:text-sage-dark transition-colors p-2 bg-[#E9EDC9]/50 group-hover:bg-[#E9EDC9] rounded-full flex-shrink-0">
                <ExternalLink size={18} />
              </div>
            </div>
            <p className="text-[#6B705C] leading-relaxed text-sm">
              {item.desc}
            </p>
          </motion.a>
        ))}
      </div>

      <div className="mt-16 bg-sage-light/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-white/50 shadow-sm">
        <h3 className="text-2xl font-serif mb-4 text-stone-800">Support Communities</h3>
        <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
          Connecting with others can significantly reduce the burden of stress. Find support 
          and encouragement from peers who understand what you're experiencing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="px-6 py-2 bg-white rounded-full text-stone-700 text-sm font-medium hover:text-sage-dark hover:shadow-md transition-all border border-stone-100">Discussion Forums</a>
          <a href="#" className="px-6 py-2 bg-white rounded-full text-stone-700 text-sm font-medium hover:text-sage-dark hover:shadow-md transition-all border border-stone-100">Local Meetups</a>
          <a href="#" className="px-6 py-2 bg-white rounded-full text-stone-700 text-sm font-medium hover:text-sage-dark hover:shadow-md transition-all border border-stone-100">Online Webinars</a>
        </div>
      </div>
    </div>
  );
}
