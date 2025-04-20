import { useRef } from 'react';
import { color, motion, useInView } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import AngryBirds from '../assets/pics/ab.png';
import Cinemate from '../assets/pics/cin.png';
import sos from '../assets/pics/sos.png';
import go from '../assets/pics/go.png';
import mis from '../assets/pics/mis.png';
import reg from '../assets/pics/reg.jpg';

const ProjectsPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  // Project data
  const projects = [
    {
      id: 1,
      title: 'MCU themed Angry Birds',
      description: 'Developed an MCU-themed Angry Birds game leveraging Java OOP, Collections and Serialization for dynamic gameplay.',
      image: AngryBirds,
      tags: ['Java', 'LibGDX', 'JavaFX'],
      onClick: () => window.open("https://github.com/anouskasahoo/AngryBirds", "_blank")
    },
    {
      id: 2,
      title: 'Cinemate',
      description: 'Developed ”Cinemate”, a React-based movie streaming web app integrating TMDB API to display and filter 500K+ titles.',
      image: Cinemate,
      tags: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'TMBD API'],
      onClick: () => window.open("https://github.com/anouskasahoo/Cinemate", "_blank")
    },
    {
      id: 3,
      title: 'SilentSOS',
      description: 'Developed a disguised domestic violence help app using Python, Twilio, and Google Geolocation API for secure SMS alerts and real-time location tracking.',
      image: sos,
      tags: ['Python', 'HTML', 'CSS', 'Twilio', 'Google API'],
      onClick: () => window.open("https://github.com/anouskasahoo/SilentSOS", "_blank")
    },
    {
      id: 4,
      title: 'GoCab',
      description: 'GoCab is an innovative platform built with React Native and Expo, providing seamless iOS and Android experiences using JS for API integration with an SQL database.',
      image: go,
      tags: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'React-Native'],
      onClick: () => window.open("https://github.com/Kavya787/GoCab", "_blank")
    },
    {
      id: 5,
      title: 'University Registration Backend',
      description: ' Built a Java-based course registration system using OOP principles, enabling user specific login.',
      image: reg,
      tags: ['Java', 'IntelliJ Idea', 'Git'],
      onClick: () => window.open("https://github.com/anouskasahoo/University-Registration-System-Backend", "_blank")
    },
    {
      id: 6,
      title: 'Colour Mismatch',
      description: 'This is a simple visual game made with Python and pygame where the user has to select the mismatched square from a grid.',
      image: mis,
      tags: ['Python', 'PyGame', 'PyCharm'],
      onClick: () => window.open("https://github.com/anouskasahoo/colour-mismatch-game", "_blank")
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 }
    }
  };
  
  return (
    <div style={{ paddingTop: '80px' }}>
      <section>
        <div className="container">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h1>Projects</h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}><h3>
            Discover my diverse range of projects below, and click on a card to explore the code on GitHub!
            </h3>
            </p>
          </motion.div>
          
          <motion.div
            className="grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div key={project.id} className="col-span-4" variants={itemVariants}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  onClick={project.onClick}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;