import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, Check, Linkedin, Github, Twitter, Instagram, Mail as MailIcon, Loader2 } from 'lucide-react';
import { ContactSphere } from '../components/three/ContactSphere';
import emailjs from '@emailjs/browser';

interface ContactProps {
  registerSection: (element: HTMLElement | null) => void;
}

const Contact = ({ registerSection }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    registerSection(sectionRef.current);
  }, [registerSection]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Sending email with data:', {
        service_id: 'service_w163chq',
        template_id: 'template_yx24jek',
        user_id: 'DXiZOck6gaYRfO2RA',
        template_params: {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        }
      });

      // Initialize EmailJS with your public key
      emailjs.init('DXiZOck6gaYRfO2RA');
      
      // Match the template variable names exactly as defined in EmailJS
      const templateParams = {
        email: formState.email,  // Matches {{email}} in the template
        from_name: formState.name,
        message: formState.message,
        reply_to: 'mdks.cse@gmail.com'  // Using the static reply-to from your template
      };
      
      console.log('Sending form data with template variables:', templateParams);
      
      const response = await emailjs.send(
        'service_w163chq',
        'template_yx24jek',
        templateParams,
        'DXiZOck6gaYRfO2RA'
      );

      console.log('Email sent successfully:', response);
      
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Failed to send message. Full error:', error);
      if (error.response) {
        console.error('Error response:', error.response);
        setError(`Error: ${error.response.status} - ${error.response.text || 'Failed to send message'}`);
      } else {
        setError(error.message || 'Failed to send message. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding bg-stone-900 relative overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-950 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-12">Contact Me</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <p className="text-lg text-white/80 mb-8">
                Have a project in mind or want to discuss potential opportunities?
                I'd love to hear from you! Fill out the form, and I'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-stone-950 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary),0.5)] text-white"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-stone-950 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary),0.5)] text-white"
                    placeholder="Enter your mail"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-stone-950 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary),0.5)] text-white resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <motion.button
                    type="submit"
                    className="button button-primary w-full flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Sending...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <Check size={18} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </div>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="h-96 w-full rounded-lg overflow-hidden bg-stone-900 mb-6">
                <ContactSphere />
              </div>
              
              <div className="bg-stone-950 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6 gradient-text">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] flex items-center justify-center text-[rgb(var(--primary))]">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Email</p>
                      <p className="text-white">mdks.cse@gmail.com</p>
                    </div>
                  </div>
                  

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] flex items-center justify-center text-[rgb(var(--primary))]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Location</p>
                      <p className="text-white">Chennai - Tamilnadu</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-white/50 mb-3">Connect with me</p>
                    <div className="flex gap-4">
                      <a 
                        href="https://www.linkedin.com/in/dinesh-kumar-029399298/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--secondary),0.1)] flex items-center justify-center text-white/70 hover:from-[rgba(var(--primary),0.2)] hover:to-[rgba(var(--secondary),0.2)] hover:text-white transition-all hover:scale-110"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href="https://github.com/Dinesh-9176" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--secondary),0.1)] flex items-center justify-center text-white/70 hover:from-[rgba(var(--primary),0.2)] hover:to-[rgba(var(--secondary),0.2)] hover:text-white transition-all hover:scale-110"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </a>
                      <a 
                        href="https://x.com/DineshKuma52228" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--secondary),0.1)] flex items-center justify-center text-white/70 hover:from-[rgba(var(--primary),0.2)] hover:to-[rgba(var(--secondary),0.2)] hover:text-white transition-all hover:scale-110"
                        aria-label="Twitter"
                      >
                        <Twitter size={20} />
                      </a>
                      <a 
                        href="https://www.instagram.com/__dinh_____?igsh=MWU2bnc3cHBwN3JldQ==" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--secondary),0.1)] flex items-center justify-center text-white/70 hover:from-[rgba(var(--primary),0.2)] hover:to-[rgba(var(--secondary),0.2)] hover:text-white transition-all hover:scale-110"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                      <a 
                        href="mailto:mdks.cse@gmail.com" 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--secondary),0.1)] flex items-center justify-center text-white/70 hover:from-[rgba(var(--primary),0.2)] hover:to-[rgba(var(--secondary),0.2)] hover:text-white transition-all hover:scale-110"
                        aria-label="Email"
                      >
                        <MailIcon size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-white/50 text-sm">
              © 2025 Dinesh kumar-All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;