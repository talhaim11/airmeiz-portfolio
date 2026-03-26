import { footerProjectLinks } from '../../data/siteContent';

const SiteFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links">
              <li><a href="/#about" className="footer-link">About Us</a></li>
              <li><a href="/#projects" className="footer-link">Projects</a></li>
              <li><a href="/#team" className="footer-link">Team</a></li>
              <li><a href="/#contact" className="footer-link">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Projects</h4>
            <ul className="footer-links">
              {footerProjectLinks.map((project) => (
                <li key={project.href}>
                  <a href={project.href} className="footer-link">
                    {project.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Partnerships</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Become a Partner</a></li>
              <li><a href="#" className="footer-link">Technology Partners</a></li>
              <li><a href="#" className="footer-link">Investor Relations</a></li>
              <li><a href="#" className="footer-link">Press Kit</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/terms" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Cookie Policy</a></li>
              <li><a href="/#contact" className="footer-link">Contact</a></li>
            </ul>

            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Instagram" title="Instagram"><span aria-hidden="true">IG</span></a>
              <a href="#" className="social-icon" aria-label="Facebook" title="Facebook"><span aria-hidden="true">f</span></a>
              <a href="#" className="social-icon" aria-label="Twitter/X" title="Twitter/X"><span aria-hidden="true">X</span></a>
              <a href="#" className="social-icon" aria-label="LinkedIn" title="LinkedIn"><span aria-hidden="true">in</span></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 AIRMEIZ. All rights reserved. | Designed with passion and precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
