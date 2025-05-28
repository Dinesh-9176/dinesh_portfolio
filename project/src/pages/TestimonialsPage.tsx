import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const videoFiles = [
  { id: 1, filename: 'testimonial1.mp4' },
  { id: 2, filename: 'testimonial2.mp4' }
];

const TestimonialsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              They Said It, Not Me
            </span>
            <span className="ml-3">😊</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here's what people I've worked with have to say about me
          </p>
        </motion.div>
        
        <div className="space-y-16">
          {videoFiles.map((video, index) => (
            <motion.div
              key={video.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="aspect-video bg-black">
                <video 
                  src={`/videos/${video.filename}`} 
                  controls 
                  className="w-full h-full object-cover"
                  preload="metadata"
                  poster="/videos/thumbnail.jpg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
