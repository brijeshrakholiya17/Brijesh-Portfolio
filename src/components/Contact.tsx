import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '', service: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = ['Web Design', 'Development', 'Mobile App', 'Other'];

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, [publicKey]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message required';
    if (!formData.service) newErrors.service = 'Select a service';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    if (!serviceId || !templateId || !publicKey) {
      setErrors(prev => ({ ...prev, service: 'EmailJS is not configured.' }));
      setIsSubmitting(false);
      alert('Email service is not configured properly.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        },
        publicKey
      );
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '', service: '' });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="min-h-dvh flex flex-col justify-center py-8 md:py-32 relative bg-surface text-white overflow-hidden -mb-px border-t border-white">
      <div className="absolute top-[-10%] right-[-5%] w-200 h-200 bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-16 lg:gap-24 items-center lg:items-start w-full">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col w-full text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px] font-heading font-bold uppercase tracking-tight leading-[1.1] mb-2 sm:mb-4 md:mb-8">
              Let's Start <br className="hidden lg:block"/> A <span className="text-gray-500">Project</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-xl max-w-md mx-auto lg:mx-0 mb-4 sm:mb-6 md:mb-16 leading-relaxed">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.
            </p>
            
            <div className="flex flex-row flex-wrap justify-center lg:justify-start lg:flex-col gap-4 sm:gap-6 md:gap-8">
              <a href="mailto:brijeshrakholiya001@gmail.com" className="flex items-center gap-3 md:gap-6 group w-fit">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] md:text-sm text-gray-500 uppercase tracking-widest font-bold mb-0.5 md:mb-1">Email</p>
                  <p className="text-sm md:text-xl font-medium group-hover:text-primary transition-colors duration-300">brijeshrakholiya001@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-3 md:gap-6 group w-fit">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-500">
                  <MapPin className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] md:text-sm text-gray-500 uppercase tracking-widest font-bold mb-0.5 md:mb-1">Location</p>
                  <p className="text-sm md:text-xl font-medium">Rajkot, Gujarat</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full bg-white/5 border border-white/10 rounded-3xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-12 lg:p-14 backdrop-blur-md relative"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 md:gap-10 relative z-10" noValidate>
              
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-400 mb-1 md:mb-2">I am interested in...</p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {services.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, service }));
                        if (errors.service) setErrors(prev => ({ ...prev, service: undefined }));
                      }}
                      className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 border ${
                        formData.service === service 
                          ? 'bg-primary text-black border-primary' 
                          : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {errors.service && (
                    <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] md:text-xs font-medium">
                      {errors.service}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-white/10 pt-4 md:pt-10 mt-1 md:mt-2 grid grid-cols-2 gap-4 md:gap-10">
                <div className="flex flex-col group relative">
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-xs md:text-base text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                    placeholder="name"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 transition-all cursor-text -top-3 md:-top-5 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest peer-placeholder-shown:top-2 md:peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs md:peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3 md:peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest"
                  >
                    Your name
                  </label>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[9px] md:text-xs font-medium absolute -bottom-4 md:-bottom-5 left-0">
                        {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col group relative">
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-xs md:text-base text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                    placeholder="email"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 transition-all cursor-text -top-3 md:-top-5 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest peer-placeholder-shown:top-2 md:peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs md:peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3 md:peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest"
                  >
                    Your email
                  </label>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[9px] md:text-xs font-medium absolute -bottom-4 md:-bottom-5 left-0">
                        {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col group relative mt-2 md:mt-4">
                <textarea 
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-xs md:text-base text-white focus:outline-none focus:border-primary transition-colors resize-none peer placeholder-transparent h-12 md:h-auto"
                  placeholder="message"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 transition-all cursor-text -top-3 md:-top-5 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest peer-placeholder-shown:top-2 md:peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs md:peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3 md:peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest"
                >
                  Message details
                </label>
                <AnimatePresence>
                  {errors.message && (
                    <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[9px] md:text-xs font-medium absolute -bottom-4 md:-bottom-5 left-0">
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-2 md:mt-8 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-2.5 md:px-8 md:py-4 bg-white text-black rounded-full font-bold uppercase tracking-wide overflow-hidden hover:scale-105 transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100 min-w-35 md:min-w-50 justify-center text-[10px] sm:text-xs md:text-base"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </motion.div>
                    ) : isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1 md:gap-2 text-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Sent successfully</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 md:gap-3"
                      >
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                        <span className="relative z-10 group-hover:text-black transition-colors">Send Message</span>
                        <Send className="w-3.5 h-3.5 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}