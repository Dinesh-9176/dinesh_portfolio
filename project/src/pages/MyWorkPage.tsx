import { motion } from 'framer-motion';
import { Brain, Satellite, Leaf, MapPin, Palette, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  category: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Privacy Protection AI for Content Creators',
    description: 'Detects and blurs privacy-sensitive data (faces, license plates, credit cards, etc.) in images, videos, and live camera feeds to prevent legal issues for YouTubers and influencers.',
    technologies: ['YOLO', 'OpenCV', 'Python', 'React', 'Deep Learning', 'Streamlit'],
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    category: 'AI & ML Projects'
  },
  {
    id: 2,
    title: 'Brain Stroke Detection from CT Scans',
    description: 'Deep learning model trained to classify different types of brain strokes using medical CT images.',
    technologies: ['CNN', 'TensorFlow/Keras', 'Medical Imaging', 'Python'],
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    category: 'AI & ML Projects'
  },
  {
    id: 3,
    title: 'Tuberculosis Detection from Chest X-rays',
    description: 'AI-based model to predict tuberculosis from user-uploaded chest X-ray scans. Integrated into a React web app.',
    technologies: ['CNN', 'Keras', 'TensorFlow', 'Python', 'React'],
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    category: 'AI & ML Projects'
  },
  {
    id: 4,
    title: 'CubeSat-Based Aviation Network for In-Flight Connectivity',
    description: 'Builds a low-latency internet system for aircraft using ULEO CubeSats, drone relays, and laser communication. Smart-switching between satellite, drone, and air-to-ground networks.',
    technologies: ['Satellite Comms', 'Laser Tech', 'Network Protocol Design', 'Embedded Systems', 'CesiumJS/Three.js'],
    icon: <Satellite className="w-6 h-6 text-blue-500" />,
    category: 'SpaceTech & Connectivity'
  },
  {
    id: 5,
    title: 'Green Geeks – Toxicity Analysis of E-Waste',
    description: 'Web application to identify toxic components in electronic devices, raise awareness about e-waste, and promote donation or recycling.',
    technologies: ['React.js', 'Image Classification', 'Node.js', 'AES Encryption', 'Blockchain', 'Custom ML model'],
    icon: <Leaf className="w-6 h-6 text-green-500" />,
    category: 'Green Computing & Sustainability'
  },
  {
    id: 6,
    title: 'Land Suitability Analysis for Establishments',
    description: 'ML model that checks if a given lat/lon is suitable for schools, hospitals, villas, or industries based on environmental and geospatial datasets. Recommends 3 better locations if not suitable.',
    technologies: ['Shapefiles', 'QGIS', 'Python', 'GeoPandas', 'Machine Learning', 'OSM', 'Satellite Data'],
    icon: <MapPin className="w-6 h-6 text-amber-500" />,
    category: 'Geospatial AI & Smart Land Use'
  },
  {
    id: 7,
    title: 'Tai-CustomMade',
    description: 'Platform for personalized recommendations of custom-made products, integrating user preferences and product metadata for matching.',
    technologies: ['Recommendation Systems', 'Web Development'],
    icon: <Palette className="w-6 h-6 text-pink-500" />,
    category: 'Personalization & Product Recommendation'
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  'AI & ML Projects': <Brain className="w-5 h-5 mr-2" />,
  'SpaceTech & Connectivity': <Satellite className="w-5 h-5 mr-2" />,
  'Green Computing & Sustainability': <Leaf className="w-5 h-5 mr-2" />,
  'Geospatial AI & Smart Land Use': <MapPin className="w-5 h-5 mr-2" />,
  'Personalization & Product Recommendation': <Palette className="w-5 h-5 mr-2" />
};

const MyWorkPage = () => {
  const navigate = useNavigate();
  const categories = Array.from(new Set(projects.map(project => project.category)));
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 py-4 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my work across various domains including AI/ML, SpaceTech, and more.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  {categoryIcons[category]}
                  {category}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter(project => project.category === category)
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: project.id * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-lg bg-gray-700/50 mr-3">
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyWorkPage;
