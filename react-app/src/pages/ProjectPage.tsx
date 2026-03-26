import SiteFooter from '../components/site/SiteFooter';
import SiteHeader from '../components/site/SiteHeader';
import ProjectAccordionSection from '../components/site/ProjectAccordionSection';
import { projectPages, ProjectSlug } from '../data/siteContent';

type ProjectPageProps = {
  project: ProjectSlug;
};

const ProjectPage = ({ project }: ProjectPageProps) => {
  const data = projectPages[project];

  return (
    <>
      <SiteHeader page="project" />

      <div className="hero-bg-container">
        <div className="hero-bg-overlay" />
      </div>

      <section className="project-hero hero-with-bg">
        <div className="container">
          <div className="project-hero-content">
            <img src={data.logoSrc} alt={data.title} className="project-hero-title-logo" />
            <p className="project-hero-subtitle">{data.subtitle}</p>
            <a href={data.appHref} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Open in App
            </a>
          </div>
        </div>
      </section>

      <section className="project-details section">
        <div className="container">
          {data.sections.map((section) => (
            <ProjectAccordionSection
              key={section.title}
              title={section.title}
              paragraphs={'paragraphs' in section ? [...section.paragraphs] : undefined}
              bullets={'listItems' in section ? [...section.listItems] : undefined}
              techTags={'techTags' in section ? [...section.techTags] : undefined}
            />
          ))}

          <div className="project-cta">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{data.ctaTitle}</h3>
            <a href="/#contact" className="btn btn-primary">
              Contact Us About This Project
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
};

export default ProjectPage;
