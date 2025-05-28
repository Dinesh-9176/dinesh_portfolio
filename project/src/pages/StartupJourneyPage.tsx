import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Lightbulb, Users, Award, Satellite, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StartupJourneyPage = () => {
  const navigate = useNavigate();

  const journeyItems = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Idea Conception',
      year: '2023',
      description: 'Initial concept and market research',
      longDescription: 'Identified a gap in the market and developed the initial concept through extensive market research and validation. Conducted customer interviews and competitive analysis to refine the idea.',
      tags: ['Ideation', 'Market Research', 'Validation']
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Project Pitching',
      year: '2023',
      description: 'Presented the project to investors and stakeholders',
      longDescription: 'Prepared and delivered compelling pitches to potential investors and stakeholders. Refined the business model and value proposition based on feedback and market validation.',
      tags: ['Pitching', 'Investor Relations', 'Business Development']
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Incubation Program',
      year: '2023',
      description: 'Selected for prestigious incubation program',
      longDescription: 'Accepted into a competitive startup incubation program, receiving mentorship, resources, and funding to accelerate growth. Connected with industry experts and potential investors.',
      tags: ['Incubation', 'Mentorship', 'Funding']
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognition & Awards',
      year: '2023-2024',
      description: 'Industry recognition and funding',
      longDescription: 'Received multiple awards and grants for innovation and impact. Secured seed funding to scale operations and expand the team.',
      tags: ['Awards', 'Grants', 'Funding']
    }
  ];

  const spaceTechItems = [
    {
      icon: <Satellite className="w-6 h-6" />,
      title: 'Space Technology Research',
      year: '2024-Present',
      description: 'Advanced research in space technology',
      longDescription: 'Conducting cutting-edge research in space technology, focusing on innovative solutions for satellite systems and space exploration.',
      tags: ['Research', 'Space Tech', 'Innovation']
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Space Technology Centre Membership',
      year: '2024-Present',
      description: 'Active member of Space Technology Centre',
      longDescription: 'Contributing to the Space Technology Centre as a key member, collaborating on projects that push the boundaries of space exploration and technology.',
      tags: ['Membership', 'Collaboration', 'Space Exploration']
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-stone-900 to-stone-800 py-6 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-stone-900 to-stone-950">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                My Startup & Space Tech Journey
              </h1>
              <p className="text-xl text-white/70 mb-8">
                From concept to incubation and beyond, exploring the intersection of innovation and space technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Startup Journey Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Startup Journey</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 -translate-x-1/2"></div>
                
                <div className="space-y-16">
                  {journeyItems.map((item, index) => (
                    <motion.div
                      key={`journey-${index}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-start`}
                    >
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                        <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{item.title}</h3>
                              <span className="text-sm text-white/50">{item.year}</span>
                            </div>
                          </div>
                          <p className="text-white/80 mb-4">{item.longDescription}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.tags.map((tag, i) => (
                              <span key={i} className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/70">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-4 border-stone-950 z-10"></div>
                      
                      {/* Empty spacer for alignment */}
                      <div className="hidden md:block w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Photo Gallery Section */}
        <section className="py-20 bg-gradient-to-b from-stone-950 to-stone-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Moments & Milestones</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* First Photo */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Replace with your image path */}
                  <img
                    src="/images/meeting-isro-chairman.jpg"
                    alt="Meeting with ISRO Chairman and Dr. A. Sivathanu Pillai"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div>
                    <p className="text-white text-sm mb-2">Honored to have met the visionaries behind India's space and defense excellence!</p>
                    <p className="text-white/80 text-xs">Meeting with Dr. V. Narayanan, Chairman of ISRO, and Dr. A. Sivathanu Pillai, Father of BrahMos, at IEI TNSC, Chennai.</p>
                  </div>
                </div>
              </motion.div>

              {/* Second Photo */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Replace with your image path */}
                  <img
                    src="/images/cubesat-presentation.jpg"
                    alt="Presenting about CubeSat at National Seminar 4.0"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div>
                    <p className="text-white text-sm mb-2">Presenting about CubeSat at National Seminar 4.0</p>
                    <p className="text-white/80 text-xs">Delivered a presentation about CubeSat technology in front of scientists from ISRO during the National Seminar 4.0.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Space Technology Section */}
        <section className="py-20 bg-stone-900/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Space Technology Centre</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {spaceTechItems.map((item, index) => (
                  <motion.div
                    key={`spacetech-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <span className="text-sm text-white/50">{item.year}</span>
                      </div>
                    </div>
                    <p className="text-white/80 mb-4">{item.longDescription}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-stone-900 to-stone-800">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Collaborate?</h2>
              <p className="text-xl text-white/70 mb-8">
                Interested in working together on innovative projects or learning more about my journey?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StartupJourneyPage;
