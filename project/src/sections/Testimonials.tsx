import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface TestimonialsProps {
  registerSection: (element: HTMLElement | null) => void;
}

const Testimonials = ({ registerSection }: TestimonialsProps) => {
  return (
    <section 
      id="testimonials" 
      ref={registerSection}
      className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjUwJSIgaGVpZ2h0PSI1MCUiIGZpbGw9IiNmZmZmZmYwNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              They Said It, Not Me
            </span>
            <span className="ml-3">😉</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Don't just take my word for it. Hear what others have to say about working with me.
          </p>
          
          <motion.a
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            Watch Testimonial Videos
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
