import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ContactPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { audioEnabled } = useAppContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Play sound if enabled
    if (audioEnabled) {
      const audio = new Audio('/src/assets/sounds/submit.mp3');
      audio.volume = 0.3;
      audio.play();
    }
    
    // Simulate form submission
    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Reset status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  // Contact information
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'anouska.sahoo007@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 9871437916'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Delhi, India'
    }
  ];
  
  // Social links
  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/anouska-sahoo/'
    },
    {
      icon: <Github size={20} />,
      url: 'https://github.com/anouskasahoo'
    },
    {
      icon: <Twitter size={20} />,
      url: 'https://x.com/anouskasahooo'
    }
  ];
  
  return (
    <div style={{ paddingTop: '80px' }}>
      <section>
        <div className="container">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2>Let's Connect!</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.8, fontSize: 20 }}>
              Have a project in mind or just want to connect? I'd love to hear from you!
            </p>
          </motion.div>
          
          <div className="grid">
            <div className="col-span-6 md:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2>Contact Information</h2>
                <p style={{ marginBottom: '32px', fontSize: 18 , fontWeight: 0}}>
                  Feel free to reach out through any of these channels. I'm always 
                  open to discussing new projects, creative ideas, or opportunities.
                </p>
                
                {/* Contact details */}
                <div style={{ marginBottom: '40px' }}>
                  {contactInfo.map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px',
                        fontWeight: 600,
                        fontSize: 30,
                      }}
                    >
                      <div 
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize:20,
                          marginRight: '16px',
                          flexShrink: 0
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{item.label}</div>
                        <div style={{ fontWeight: 'bold' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Social links */}
                <div>
                  <h3 style={{ marginBottom: '16px' }}>Connect</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {socialLinks.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-background)'
                        }}
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="col-span-6 md:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div 
                  style={{
                    color: 'var(--color-background)',
                    backgroundColor: 'rgb(135, 125, 181)',
                    borderRadius: '12px',
                    padding: '32px',
                    boxShadow: '0 4px 30px rgba(255, 255, 255, 0.63)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <h2 style={{ marginBottom: '24px' }}>Send Me a Message</h2>
                  
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px',
                        marginBottom: '16px',
                        fontSize: 20
                      }}
                    >
                      <div>
                        <label 
                          htmlFor="name"
                          style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: 20, 
                            fontWeight: 500
                          }}
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            fontSize: 15, 
                            backgroundColor: 'white'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="email"
                          style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: 20, 
                            fontWeight: 500
                          }}
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            fontSize: 15, 
                            backgroundColor: 'white'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label 
                        htmlFor="subject"
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontSize: 20,
                          fontWeight: 500
                        }}
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          fontSize: 15,
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '24px' }}>
                      <label 
                        htmlFor="message"
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontSize: 20,
                          fontWeight: 500
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          fontSize: 15,
                          resize: 'vertical',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '12px 32px',
                        backgroundColor: 'var(--color-accent)',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: 20,
                        fontWeight: 200,
                        border: 'none',
                        cursor: formStatus === 'submitting' || formStatus === 'success' ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: formStatus === 'submitting' || formStatus === 'success' ? 0.7 : 1
                      }}
                    >
                      {formStatus === 'idle' && (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                      
                      {formStatus === 'submitting' && 'Sending...'}
                      
                      {formStatus === 'success' && 'Message Sent!'}
                      
                      {formStatus === 'error' && 'Error - Try Again'}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;