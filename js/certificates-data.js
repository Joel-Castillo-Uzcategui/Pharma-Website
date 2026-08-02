/* ==========================================================================
   certificates-data.js
   The certificate content itself, kept separate from certificates.js so it
   can be updated (add / remove / edit a certificate) without touching any
   rendering or search logic.
   ========================================================================== */

window.CERTIFICATE_DATA = (function () {
  const CATEGORY = [
    '1. Drug Development & Pharmaceutical Sciences',
    '2. Clinical Research & Real-World Evidence',
    '3. Project Management & Leadership',
    '4. Data Analytics, AI & Digital Skills',
    '5. Quality, Biosafety & Scientific Communication'
  ];

  const CERTS = [
    { name: 'Molecular Pharmacology', institution: 'University of Oxford', date: 'March 2001', year: 2001, category: CATEGORY[0] },
    { name: 'Biologics Drug Development', institution: 'Swedish Academy of Pharmaceutical Sciences (Läkemedelsakademin)', date: '14–16 May 2019', year: 2019, category: CATEGORY[0] },
    { name: 'Drug Development', institution: 'University of California San Diego', date: '27 May 2024', year: 2024, category: CATEGORY[0] },
    { name: 'Pharmacokinetics', institution: 'Novartis / Davidsson College', date: 'September 2024', year: 2024, category: CATEGORY[0] },
    { name: 'Drug Utilization: Trends, Determinants and Consequences', institution: 'Johns Hopkins University', date: '12 September 2025', year: 2025, category: CATEGORY[0] },

    { name: 'Clinical Trial Project Management', institution: 'Physis Global Academy', date: '30 August 2020', year: 2020, category: CATEGORY[1] },
    { name: 'Essential GCP for Sponsors (ICH GCP E6(R2))', institution: 'Brookwood Global', date: '1 June 2021', year: 2021, category: CATEGORY[1] },
    { name: 'AI Series: Introduction to Clinical Data', institution: 'Stanford University School of Medicine', date: '2 October 2024', year: 2024, category: CATEGORY[1] },
    { name: 'Comparative Effectiveness and Real-World Evidence', institution: 'Johns Hopkins University', date: '5 October 2025', year: 2025, category: CATEGORY[1] },

    { name: 'Lean Foundations', institution: 'LinkedIn Learning', date: 'March 2021', year: 2021, category: CATEGORY[2] },
    { name: 'Applied Project Management', institution: 'Wenell', date: '15 February 2023', year: 2023, category: CATEGORY[2] },
    { name: 'Project Management Simplified', institution: 'Project Management Institute (PMI)', date: '8 July 2024', year: 2024, category: CATEGORY[2] },
    { name: 'PMI-PMP® Certification Training Course (PMBOK® 7th Edition)', institution: 'Learnkart', date: 'April 2025', year: 2025, category: CATEGORY[2] },
    { name: 'Project Management: Healthcare Projects', institution: 'LinkedIn Learning', date: '5 May 2025', year: 2025, category: CATEGORY[2] },

    { name: 'Introduction to Data Analytics', institution: 'IBM', date: '22 October 2024', year: 2024, category: CATEGORY[3] },
    { name: 'SQL Essential Training', institution: 'LinkedIn Learning', date: 'November 2024', year: 2024, category: CATEGORY[3] },
    { name: 'Data Visualization and Dashboards with Excel and Cognos', institution: 'IBM', date: 'February 2025', year: 2025, category: CATEGORY[3] },

    { name: 'Biosafety Culture', institution: 'European Biosafety Association (EBSA)', date: '4 October 2021', year: 2021, category: CATEGORY[4] },
    { name: 'Biosafety Culture', institution: 'European Biosafety Association (EBSA)', date: '14 October 2021', year: 2021, category: CATEGORY[4] },
    { name: 'Mitigating Immunogenicity Risk: Applying Knowledge-Based Strategies from Early Assay', institution: 'Symetric', date: '12 October 2023', year: 2023, category: CATEGORY[4] },
    { name: 'Development/Validation to Clinical Monitoring', institution: 'Symetric', date: '12 October 2023', year: 2023, category: CATEGORY[4] },
    { name: 'Writing in the Sciences (with Honors)', institution: 'Stanford University', date: '23 May 2024', year: 2024, category: CATEGORY[4] }
  ];

  return { CATEGORY, CERTS };
})();
