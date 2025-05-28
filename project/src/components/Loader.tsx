import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-stone-950 flex items-center justify-center z-50">
      <motion.div 
        className="flex flex-col items-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-[rgb(var(--primary))]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-[rgb(var(--secondary))]"
            initial={{ rotate: 60 }}
            animate={{ rotate: 420 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
        <motion.p 
          className="text-sm uppercase tracking-widest text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading Experience
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;