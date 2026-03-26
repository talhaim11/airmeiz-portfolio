export const homePageData = {
  heroSubtitle:
    "We create innovative digital solutions that transform ideas into powerful, user-centric experiences. From cutting-edge mobile applications to intelligent platforms, we're shaping the future of technology.",
  projects: [
    {
      slug: 'alphaflow',
      title: 'ALPHAFLOW',
      subtitle: 'Sports Application',
      overlayText: 'Revolutionary sports tracking and performance analytics platform',
      imageSrc: '/assets/img/preview/alphaflow-preview.png?v=2',
      href: '/projects/alphaflow',
    },
    {
      slug: 'pulsegate',
      title: 'PULSEGATE',
      subtitle: 'Class & Activity Registration Platform',
      overlayText: 'Streamlined registration system for classes and activities',
      imageSrc: '/assets/img/preview/pulsegate-preview.png?v=2',
      href: '/projects/pulsegate',
    },
    {
      slug: 'swappex',
      title: 'SWAPPEX',
      subtitle: 'Logistics & Moving Application',
      overlayText: 'Smart logistics solution for seamless moving experiences',
      imageSrc: '/assets/img/preview/swapex-preview.png?v=2',
      href: '/projects/swappex',
    },
    {
      slug: 'erevshabbat',
      title: 'EREVSHABBAT',
      subtitle: 'Medical Research Project',
      overlayText: 'Ending late-stage oral cancer through AI-powered early detection',
      imageSrc: '/assets/img/preview/erevshabbat-preview.png?v=3',
      href: '/projects/erevshabbat',
    },
    {
      slug: 'novapay',
      title: 'Novapay',
      subtitle: 'Smart Credit & Payment Management',
      overlayText: 'Intelligent credit and payment management system',
      imageSrc: '/assets/img/preview/novapay-preview.png?v=2',
      href: '/projects/novapay',
    },
  ],
  aboutParagraphs: [
    'AIRMEIZ is a forward-thinking technology company dedicated to creating exceptional digital experiences. We specialize in developing innovative solutions that bridge the gap between complex technology and intuitive user experiences.',
    'Our team combines technical expertise with creative vision to deliver projects that not only meet but exceed expectations. From mobile applications to web platforms, we are committed to excellence in every pixel and line of code.',
    "With a focus on cutting-edge technologies and user-centered design, we transform ambitious ideas into reality, helping our clients stay ahead in an ever-evolving digital landscape.",
    "Our innovative thinking goes beyond conventional solutions: we question assumptions, explore emerging technologies, and design for the future while solving today's challenges. We believe the best products come from blending curiosity with discipline, experimenting boldly and shipping reliably.",
  ],
  team: [
    {
      name: 'Yoav Shriker',
      role: 'CEO + COO',
      bio: 'Visionary leader driving company operations and strategic growth.',
      imageSrc: '/assets/img/yoav-shriker.jpg',
    },
    {
      name: 'Tal Haim',
      role: 'CTO + CMO',
      bio: 'Expert in technology architecture and marketing strategy.',
      imageSrc: '/assets/img/tal-haim.jpg',
    },
    {
      name: 'Sagi Mutas',
      role: 'CFO + CHRO',
      bio: 'Financial strategist and human resources expert driving team excellence.',
      imageSrc: '/assets/img/sagi-mutas.jpg',
    },
  ],
};

export const footerProjectLinks = [
  { label: 'ALPHAFLOW', href: '/projects/alphaflow' },
  { label: 'PULSEGATE', href: '/projects/pulsegate' },
  { label: 'SWAPPEX', href: '/projects/swappex' },
  { label: 'EREVSHABBAT', href: '/projects/erevshabbat' },
  { label: 'Novapay', href: '/projects/novapay' },
];

export type ProjectSlug = 'alphaflow' | 'pulsegate' | 'novapay';
export type LegalPageKey = 'privacy' | 'terms';

export const projectPages = {
  alphaflow: {
    title: 'ALPHAFLOW',
    logoSrc: '/assets/img/logos/alphaflow-logo.png',
    subtitle: 'Sports performance platform for tracking training data and progress.',
    appHref: '/links/alphaflow',
    ctaTitle: 'Interested in learning more about ALPHAFLOW?',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'ALPHAFLOW helps athletes and coaches monitor workouts, compare performance over time, and make better training decisions from clear, structured data.',
        ],
      },
      {
        title: 'Technology Stack',
        paragraphs: [
          'Built with a mobile-first architecture, real-time data sync, and a cloud backend designed for fast performance analytics.',
          'The stack supports cross-platform delivery, wearable integrations, and scalable analytics pipelines for continuous training insights.',
        ],
        techTags: [
          'React Native',
          'TypeScript',
          'Node.js',
          'GraphQL',
          'PostgreSQL',
          'Redis',
          'AWS',
          'Machine Learning',
          'Real-time Analytics',
          'IoT Integration',
          'WebSockets',
          'Docker',
        ],
      },
      {
        title: 'Vision & Impact',
        paragraphs: ['ALPHAFLOW focuses on one goal: turn training data into practical actions that improve performance and consistency.'],
        listItems: [
          'Real-time performance monitoring with instant feedback',
          'Training insights based on workout history',
          'Comprehensive analytics dashboard with customizable metrics',
          'Integration with major wearable devices and fitness equipment',
          'Progress visualization and goal tracking',
        ],
      },
    ],
  },
  pulsegate: {
    title: 'PULSEGATE',
    logoSrc: '/assets/img/logos/pulsegate-logo.png',
    subtitle:
      'A smart registration platform for classes and activities, simplifying sign-ups through flexible, multi-channel access.',
    appHref: '/links/pulsegate',
    ctaTitle: 'Ready to transform your registration process?',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'PulseGate is a smart registration platform for classes and activities, designed to simplify sign-ups for both customers and businesses through flexible, multi-channel access.',
        ],
      },
      {
        title: 'Vision & Impact',
        paragraphs: [
          'To remove friction from class registration. PulseGate makes participation easier, increases attendance, and helps businesses manage communities without technical barriers.',
        ],
      },
      {
        title: 'Platform Capabilities',
        listItems: [
          'Class and activity registration management',
          'Multi-channel sign-up: app, WhatsApp, social platforms',
          'Seamless integration with existing business workflows',
          'Real-time availability and attendance tracking',
          'Simple experience for users, full control for businesses',
        ],
      },
      {
        title: 'The Goal',
        paragraphs: [
          'To become the standard gateway for activity registration, allowing anyone to join from any platform, in the way that feels most natural to them.',
        ],
      },
    ],
  },
  novapay: {
    title: 'Novapay',
    logoSrc: '/assets/img/logos/novapay-logo.png',
    subtitle:
      'Credit and payment management platform focused on visibility, automation, and smarter financial decisions.',
    appHref: '/links/novapay',
    ctaTitle: 'Interested in fintech solutions?',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Novapay unifies credit cards, loans, and payments in one dashboard, helping users track obligations, automate key actions, and improve financial control.',
        ],
      },
      {
        title: 'Technology Stack',
        paragraphs: [
          'Built on a secure fintech architecture with encrypted data handling, compliant payment flows, and scalable APIs.',
          'The platform integrates account aggregation, analytics services, and automation logic while maintaining strict security and performance standards.',
        ],
        techTags: [
          'React',
          'Next.js',
          'TypeScript',
          'Python',
          'FastAPI',
          'PostgreSQL',
          'Redis',
          'Plaid API',
          'Stripe',
          'AWS',
          'Machine Learning',
          'Encryption',
          'PCI DSS',
          'OAuth 2.0',
        ],
      },
      {
        title: 'Vision & Impact',
        paragraphs: ["Novapay's mission is to make credit and payment management simpler, clearer, and more proactive."],
        listItems: [
          'Unified dashboard for all credit cards, loans, and payment accounts',
          'Real-time credit score monitoring with improvement recommendations',
          'Intelligent bill payment automation with optimization algorithms',
          'Credit utilization tracking and alerts',
          'Rewards optimization across multiple credit cards',
          'Spending analytics with category breakdowns and trends',
          'Debt payoff calculator with multiple strategy comparisons',
          'Subscription tracking and management',
          'Financial goal setting and progress tracking',
          'Payment reminders to avoid late fees',
        ],
      },
    ],
  },
} as const;

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    effectiveDate: 'January 16, 2026',
    updatedDate: 'January 16, 2026',
    sections: [
      {
        title: '1. Introduction',
        paragraphs: [
          'Welcome to AIRMEIZ ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
          'By accessing or using our website and services, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this policy, please do not access our website or use our services.',
        ],
      },
      {
        title: '2. Information We Collect',
        paragraphs: [
          'We may collect several types of information from and about users of our website and services.',
          'Personal information may include name and contact information, account credentials, payment details processed through third parties, professional information, and anything you choose to provide through forms or communications.',
          'Automatically collected information may include device information, usage data, referral source and exit pages, cookies, and similar tracking technologies.',
        ],
      },
      {
        title: '3. How We Use Your Information',
        paragraphs: ['We use the information we collect for various purposes, including:'],
        listItems: [
          'Providing, maintaining, and improving our services',
          'Processing transactions and sending transaction notifications',
          'Responding to your inquiries and providing customer support',
          'Sending administrative information, updates, and security alerts',
          'Personalizing your experience and delivering targeted content',
          'Analyzing usage patterns to improve our website and services',
          'Detecting, preventing, and addressing technical issues and security threats',
          'Complying with legal obligations and enforcing our policies',
          'Sending marketing communications with your consent where required',
        ],
      },
      {
        title: '4. Information Sharing and Disclosure',
        paragraphs: ['We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:'],
        listItems: [
          'With trusted service providers who assist us in operating our website or business',
          'When required by law, subpoena, or other legal process',
          'In connection with a merger, acquisition, or sale of assets',
          'To protect our rights, property, or safety, or that of our users or the public',
          'With your explicit consent',
        ],
      },
      {
        title: '5. Data Security',
        paragraphs: [
          'We implement appropriate technical and organizational security measures such as encryption, access controls, employee training, and secure development practices.',
          'However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        title: '6. Your Rights and Choices',
        paragraphs: ['Depending on your location, you may have rights including access, correction, deletion, portability, objection, restriction, and opt-out of marketing communications.'],
      },
      {
        title: '7. Cookies and Tracking Technologies',
        paragraphs: [
          'We use cookies and similar tracking technologies to track activity on our website and hold certain information.',
          'You can instruct your browser to refuse cookies, but some parts of the website may not function properly if you do.',
        ],
      },
      {
        title: '8. Third-Party Links',
        paragraphs: [
          'Our website may contain links to third-party websites or services that are not owned or controlled by AIRMEIZ, and we assume no responsibility for their content or practices.',
        ],
      },
      {
        title: "9. Children's Privacy",
        paragraphs: [
          'Our services are not intended for individuals under the age of 18, and we do not knowingly collect personal information from children under 18.',
        ],
      },
      {
        title: '10. International Data Transfers',
        paragraphs: [
          'Your information may be transferred to and maintained on computers outside of your jurisdiction where data protection laws may differ, and we take appropriate steps to ensure it is handled securely.',
        ],
      },
      {
        title: '11. Changes to This Privacy Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time by posting the new version on this page and updating the last updated date.',
        ],
      },
      {
        title: '12. Contact Us',
        paragraphs: [
          'If you have any questions about this Privacy Policy, please contact us at privacy@airmeiz.com or through our website contact form.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    effectiveDate: 'January 16, 2026',
    updatedDate: 'January 16, 2026',
    sections: [
      {
        title: '1. Agreement to Terms',
        paragraphs: [
          'These Terms of Service constitute a legally binding agreement between you and AIRMEIZ concerning your access to and use of our website and services.',
          'By accessing or using our website, you agree that you have read, understood, and agree to be bound by these Terms.',
        ],
      },
      {
        title: '2. Intellectual Property Rights',
        paragraphs: [
          'Unless otherwise indicated, the website and all content, features, and functionality are owned by AIRMEIZ, its licensors, or other content providers and are protected by applicable intellectual property laws.',
        ],
      },
      {
        title: '3. User Representations',
        paragraphs: ['By using our website and services, you represent and warrant that:'],
        listItems: [
          'All registration information you submit is truthful and accurate',
          'You will maintain the accuracy of such information',
          'You have the legal capacity and agree to comply with these Terms',
          'You are not a minor in the jurisdiction in which you reside',
          'You will not access the website through automated or non-human means',
          'You will not use the website for any illegal or unauthorized purpose',
          'Your use of the website will not violate any applicable law or regulation',
        ],
      },
      {
        title: '4. Prohibited Activities',
        paragraphs: ['You may not access or use the website for any purpose other than that for which we make it available.'],
        listItems: [
          'Systematically retrieving data or content to create a collection, compilation, database, or directory',
          'Circumventing, disabling, or interfering with security-related features',
          'Engaging in unauthorized framing of or linking to the website',
          'Tricking, defrauding, or misleading us and other users',
          'Interfering with, disrupting, or creating an undue burden on the website',
          'Attempting to impersonate another user or person',
          'Using any information obtained from the website to harass, abuse, or harm another person',
          'Using the website in a manner inconsistent with applicable laws or regulations',
          'Uploading or transmitting malicious material',
          'Engaging in automated use of the system without our express written consent',
        ],
      },
      {
        title: '5. User Generated Content',
        paragraphs: [
          'The website may allow you to submit or transmit content. You retain ownership of your content, but you grant us a worldwide, non-exclusive, royalty-free license to use it in connection with operating the website and services.',
        ],
      },
      {
        title: '6. Services and Products',
        paragraphs: [
          'We reserve the right to modify, suspend, or discontinue any service or product at any time without notice.',
        ],
      },
      {
        title: '7. Payment Terms',
        paragraphs: [
          'If you purchase products or services from us, you agree to provide current, complete, and accurate purchase and account information.',
        ],
      },
      {
        title: '8. Disclaimer of Warranties',
        paragraphs: [
          'The website and services are provided on an as-is and as-available basis. We disclaim all warranties to the fullest extent permitted by law.',
        ],
      },
      {
        title: '9. Limitation of Liability',
        paragraphs: [
          'To the fullest extent permitted by law, AIRMEIZ shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your access to or use of the website.',
        ],
      },
      {
        title: '10. Indemnification',
        paragraphs: [
          'You agree to defend, indemnify, and hold harmless AIRMEIZ and its affiliates from claims arising out of your violation of these Terms or your use of the website.',
        ],
      },
      {
        title: '11. Governing Law and Dispute Resolution',
        paragraphs: [
          'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AIRMEIZ is established.',
        ],
      },
      {
        title: '12. Modifications to Terms',
        paragraphs: [
          'We reserve the right to modify these Terms at any time by posting the updated Terms on this page with a new last updated date.',
        ],
      },
      {
        title: '13. Termination',
        paragraphs: [
          'We may terminate or suspend your access to the website immediately, without prior notice or liability, for any reason whatsoever, including breach of these Terms.',
        ],
      },
      {
        title: '14. Severability and Waiver',
        paragraphs: [
          'If any provision of these Terms is held to be unenforceable or invalid, the remaining provisions will continue in full force and effect.',
        ],
      },
      {
        title: '15. Contact Us',
        paragraphs: [
          'If you have any questions about these Terms of Service, please contact us at legal@airmeiz.com or through our website contact form.',
        ],
      },
    ],
  },
} as const;
