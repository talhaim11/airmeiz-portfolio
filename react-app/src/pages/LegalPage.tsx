import SiteFooter from '../components/site/SiteFooter';
import SiteHeader from '../components/site/SiteHeader';
import { LegalPageKey, legalPages } from '../data/siteContent';

type LegalPageProps = {
  page: LegalPageKey;
};

const LegalPage = ({ page }: LegalPageProps) => {
  const data = legalPages[page];

  return (
    <>
      <SiteHeader page="legal" />

      <main className="legal-page">
        <div className="container">
          <div className="legal-content">
            <h1 className="legal-title">{data.title}</h1>
            <p className="legal-text">
              <strong>Effective Date:</strong> {data.effectiveDate}
              <br />
              <strong>Last Updated:</strong> {data.updatedDate}
            </p>

            {data.sections.map((section) => (
              <div key={section.title} className="legal-section">
                <h2 className="legal-section-title">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="legal-text">
                    {paragraph}
                  </p>
                ))}
                {'listItems' in section && section.listItems && (
                  <ul
                    style={{
                      listStyle: 'disc',
                      marginLeft: '2rem',
                      marginBottom: '1rem',
                      color: '#b0b0b0',
                      lineHeight: 1.8,
                    }}
                  >
                    {section.listItems.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href="/" className="btn btn-primary">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default LegalPage;
