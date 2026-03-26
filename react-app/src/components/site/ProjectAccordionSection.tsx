import { useState } from 'react';

type ProjectAccordionSectionProps = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  techTags?: string[];
  accentBullets?: boolean;
};

const ProjectAccordionSection = ({
  title,
  paragraphs = [],
  bullets = [],
  techTags = [],
  accentBullets = false,
}: ProjectAccordionSectionProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="project-section project-accordion">
      <button type="button" className="project-section-title" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
        <span>{title}</span>
        <span className="accordion-icon" aria-hidden="true">▼</span>
      </button>

      <div className={`project-section-content${expanded ? '' : ' collapsed'}`}>
        <div className="project-section-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}

          {techTags.length > 0 && (
            <div className="project-tech-stack">
              {techTags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {bullets.length > 0 && (
            <ul className={accentBullets ? 'project-feature-list' : undefined} style={accentBullets ? undefined : { listStyle: 'disc', marginLeft: '2rem', marginTop: '1rem', lineHeight: 2 }}>
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAccordionSection;
