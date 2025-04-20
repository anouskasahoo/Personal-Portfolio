import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import me from '../assets/pics/me.jpg';
import { useAppContext } from '../context/AppContext';

const AboutPage = () => {
  const { timeOfDay } = useAppContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  /*
  // Timeline data for design journey
  const timelineEvents = [
    {
      year: '2017',
      title: 'Design Education',
      description: 'Began formal education in interactive design, focusing on user-centered methodologies and fundamental principles.'
    },
    {
      year: '2018',
      title: 'First UI/UX Projects',
      description: 'Started working on practical projects applying interface design theories and usability testing methods.'
    },
    {
      year: '2019',
      title: 'Multimodal Interaction Research',
      description: 'Conducted research into combining visual, auditory, and touch-based interactions for more immersive experiences.'
    },
    {
      year: '2020',
      title: 'Augmented Reality Experiments',
      description: 'Explored the integration of digital elements with physical spaces through AR technologies and prototypes.'
    },
    {
      year: '2021',
      title: 'Context-Aware Design',
      description: 'Developed applications that adapt to user context, time of day, and environmental factors for enhanced personalization.'
    },
    {
      year: '2022',
      title: 'Affective Computing Integration',
      description: 'Incorporated emotional intelligence into interfaces through sentiment analysis and adaptive response systems.'
    },
    {
      year: '2023',
      title: 'Social Interaction Design',
      description: 'Focused on creating interfaces that facilitate meaningful connections between users while maintaining privacy.'
    },
    {
      year: '2024',
      title: 'Current Focus',
      description: 'Combining all previous learnings into cohesive design systems that seamlessly blend multiple interaction modalities.'
    }
  ]*/
  
  
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
            <h1>About Me</h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 1, fontSize: 17 }}>
              This portfolio documents my evolution as a designer, developer and student, exploring various 
              interaction and programming paradigms and pushing the boundaries of digital experiences.
            </p>
          </motion.div>
          
          <div className="grid">
            <div className="col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3>Helo :)</h3>
                <h2>I'm Anouska Sahoo!</h2>
                <p style = {{fontSize: 16}}>
                Versatile Designer-Developer with a passion for crafting intuitive, context-aware digital experiences through seamless integration of design and development.
                <br/><br/>Front-End Focused, leveraging React and React Native to build responsive, accessible, and performance-optimized applications across platforms.
                <br/><br/>Full-Stack Proficiency, combining clean front-end code with scalable backend solutions using Node.js and SQL, always striving for smooth, user-friendly experiences.</p>
              </motion.div>
            </div>
            
            <div className="col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div 
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '12px',
                  background: timeOfDay == 'evening' ? 'white' : 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img 
                  src= {me}
                  alt="me :)" 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }} 
                />
              </div>
              </motion.div>
            </div>
          </div>
          <section style={{ padding: '60px 0', textAlign: 'center' }}>
  <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>My Skills</h1>
  <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', fontSize: 23 }}>
    C++ | Java | Python | C | JavaScript | TypeScript | React Native | React.js | Node.js | HTML | CSS | Git | GitHub | SQL | Figma | Adobe Creative Suite | Unix/Linux </p>
</section>

        </div>
      </section>
    </div>
  );
};

// Timeline item component
const TimelineItem = ({ 
  year, 
  title, 
  description, 
  isLeft, 
  index 
}: { 
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        paddingBottom: '60px',
        position: 'relative'
      }}
    >
      <div 
        style={{
          width: '50%',
          textAlign: isLeft ? 'right' : 'left',
          paddingRight: isLeft ? '30px' : '0',
          paddingLeft: isLeft ? '0' : '30px'
        }}
      >
        <div 
          style={{
            display: 'inline-block',
            padding: '16px 24px',
            borderRadius: '8px',
            background: 'var(--color-background)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '8px' }}>
            {year}
          </div>
          <h3 style={{ marginBottom: '8px' }}>{title}</h3>
          <p style={{ opacity: 0.8 }}>{description}</p>
        </div>
      </div>
      
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      />
    </motion.div>
  );
};

export default AboutPage;