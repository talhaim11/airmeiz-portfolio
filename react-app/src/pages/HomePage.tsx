import { FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SiteFooter from '../components/site/SiteFooter';
import SiteHeader from '../components/site/SiteHeader';
import { homePageData } from '../data/siteContent';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const id = location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.hash]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert('Thank you for your interest! Form submission will be implemented in the next phase.');
  };

  return (
    <>
      <SiteHeader page="home" />

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <img src="/assets/img/airmeiz-logo.png?v=9" alt="AIRMEIZ" className="hero-logo" />
            <p className="hero-title">your vision, our mission</p>
            <p className="hero-subtitle">{homePageData.heroSubtitle}</p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects section">
        <div className="container">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">Innovative solutions that make a difference</p>
          <div className="projects-grid">
            {homePageData.projects.map((project) => (
              <article
                key={project.slug}
                className="project-tile animate-on-scroll visible"
                onClick={() => navigate(project.href)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(project.href);
                  }
                }}
                tabIndex={0}
                role="button"
              >
                <img src={project.imageSrc} alt={`${project.title} Project`} className="project-tile-image" />
                <div className="project-tile-content">
                  <h3 className="project-tile-title">{project.title}</h3>
                  <p className="project-tile-subtitle">{project.subtitle}</p>
                </div>
                <div className="project-tile-overlay">
                  <div className="project-tile-overlay-content">
                    <h3 className="project-tile-overlay-title">{project.title}</h3>
                    <p className="project-tile-overlay-text">{project.overlayText}</p>
                    <span className="btn btn-primary">View Details</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about section">
        <div className="container">
          <h2 className="section-title">About AIRMEIZ</h2>
          <p className="section-subtitle">Pioneering digital innovation through technology and creativity</p>
          <div className="about-content">
            {homePageData.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="about-text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="team section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the talented individuals behind AIRMEIZ</p>
          <div className="team-grid">
            {homePageData.team.map((member) => (
              <div key={member.name} className="team-member animate-on-scroll visible">
                <img src={member.imageSrc} alt={member.name} className="team-member-image" />
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss how we can help bring your project to life</p>
          <div className="contact-content">
            <div className="contact-info">
              <p className="contact-email">
                <a href="mailto:info@airmeiz.com">info@airmeiz.com</a>
              </p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" id="name" name="name" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
};

export default HomePage;
