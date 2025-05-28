import { motion } from 'framer-motion';
import { Rocket, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StartupJourneyProps {
  registerSection: (element: HTMLElement | null) => void;
}

const StartupJourney = ({ registerSection }: StartupJourneyProps) => {
  const navigate = useNavigate();
  return (
    <section 
      id="startup-journey" 
      ref={registerSection}
      className="relative py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="section-heading mb-6">Startup/Incubation Journey</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Explore my entrepreneurial journey, from concept to incubation, and my contributions to space technology.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <button
              onClick={() => navigate('/startup-journey')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
            >
              <Rocket className="w-5 h-5" />
              View My Journey
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StartupJourney;
