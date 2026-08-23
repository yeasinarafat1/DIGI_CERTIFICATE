/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Mentor, StudentReview, JobPlacementRecord, CardOffer, LearningStep } from '@/types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced MS Excel & Business Analytics',
    category: 'Advanced Excel',
    price: 35,
    originalPrice: 75,
    classesCount: 16,
    hoursCount: 32,
    rating: 4.9,
    reviewsCount: 340,
    badge: 'Best Seller',
    bgColor: '#FCECD8', // Warm peach
    iconType: 'excel',
    description: 'Master VLOOKUP, XLOOKUP, Pivot Tables, Macros, Power Query, Financial Modeling, and Automated Dashboard reporting.',
    syllabus: [
      'Data Cleaning & Conditional Formatting',
      'Advanced Formulas: XLOOKUP, INDEX-MATCH, nested IFs',
      'Interactive Pivot Tables & Dynamic Charts',
      'Power Query & Data Model Integration',
      'Automated Reporting & VBA Macro Basics'
    ],
    instructorId: 'mentor-1',
    instructorName: 'Ataher Jamil',
    isPopular: true,
    level: 'Intermediate'
  },
  {
    id: 'course-2',
    title: 'Professional MS Word & Office Documentation',
    category: 'Office Documentation',
    price: 25,
    originalPrice: 50,
    classesCount: 12,
    hoursCount: 24,
    rating: 4.8,
    reviewsCount: 210,
    badge: 'Popular',
    bgColor: '#DAF4EE', // Soft Mint
    iconType: 'word',
    description: 'Create boardroom-ready corporate reports, legal contracts, automated mail merges, professional typography, and style guides.',
    syllabus: [
      'Document Hierarchy, Custom Styles & Multi-level Lists',
      'Automated Table of Contents, Citations & Indexing',
      'Mail Merge with Excel Sheets for Mass Notices & Letters',
      'Collaborative Reviewing, Track Changes & Permissions',
      'Official Letterheads, Invoices & Standard Operating Procedures'
    ],
    instructorId: 'mentor-2',
    instructorName: 'Cristian Doru Barin',
    isPopular: true,
    level: 'Beginner'
  },
  {
    id: 'course-3',
    title: 'Computerized Accounting with TallyPrime & Excel',
    category: 'Accounting & Tally',
    price: 45,
    originalPrice: 90,
    classesCount: 20,
    hoursCount: 40,
    rating: 4.9,
    reviewsCount: 185,
    badge: 'Job Ready',
    bgColor: '#D7EACB', // Soft Olive Green
    iconType: 'accounting',
    description: 'Hands-on practical accounting, voucher entries, GST/VAT calculations, inventory control, payroll management, and balance sheet preparation.',
    syllabus: [
      'Company Creation & Chart of Accounts setup',
      'Day-to-day Voucher Entries & Banking reconciliations',
      'Inventory Tracking, Purchase & Sales Orders',
      'Taxation: VAT/Tax deducted at source & GST basics',
      'Final Accounts: P&L Statements, Balance Sheets & Audit logs'
    ],
    instructorId: 'mentor-3',
    instructorName: 'Tanzeel Ur Rehman',
    isPopular: true,
    level: 'Intermediate'
  },
  {
    id: 'course-4',
    title: 'Executive MS PowerPoint & Pitch Decks',
    category: 'MS Office Suite',
    price: 29,
    originalPrice: 60,
    classesCount: 12,
    hoursCount: 24,
    rating: 4.7,
    reviewsCount: 145,
    badge: 'High Impact',
    bgColor: '#FDDCDC', // Pastel Rose
    iconType: 'powerpoint',
    description: 'Design persuasive corporate presentations, animated data infographics, executive business decks, and slide master templates.',
    syllabus: [
      'Design Principles & Visual Slide Hierarchy',
      'Master Slide Customization & Corporate Branding Kits',
      'Transforming Raw Data into Visual Charts & Infographics',
      'Morph Transitions & Professional Motion Effects',
      'Speaker Notes, Presenter View & Export formats'
    ],
    instructorId: 'mentor-4',
    instructorName: 'Andrew Williams',
    isPopular: false,
    level: 'Beginner'
  },
  {
    id: 'course-5',
    title: 'Touch Typing & Office Speed Masterclass',
    category: 'Typing & Speed',
    price: 18,
    originalPrice: 40,
    classesCount: 10,
    hoursCount: 20,
    rating: 4.9,
    reviewsCount: 290,
    badge: 'Essential',
    bgColor: '#ECE4FA', // Soft Lavender
    iconType: 'typing',
    description: 'Boost your typing speed from 20 WPM to 65+ WPM with 99% accuracy in English and Bengali typing, plus keyboard shortcut muscle memory.',
    syllabus: [
      'Home Row Foundation & Ergonomic Finger Positioning',
      'Speed Building Drills & Rhythm Techniques',
      'Bengali Unicode & Bijoy Layout Mastery',
      'Numeric Keypad Data Entry Speed training',
      'Global Typing Speed Certification preparation'
    ],
    instructorId: 'mentor-5',
    instructorName: 'Brad Schiff',
    isPopular: false,
    level: 'Beginner'
  },
  {
    id: 'course-6',
    title: 'Complete Office Application Diploma (All-in-One)',
    category: 'MS Office Suite',
    price: 65,
    originalPrice: 140,
    classesCount: 36,
    hoursCount: 72,
    rating: 5.0,
    reviewsCount: 512,
    badge: 'Career Diploma',
    bgColor: '#DCECF9', // Soft Sky Blue
    iconType: 'suite',
    description: 'Our flagship 3-month comprehensive diploma covering Word, Excel, PowerPoint, Access, Google Suite, Internet Safety & Guaranteed Job Placement.',
    syllabus: [
      'Operating System Essentials & Fast File Management',
      'Complete Microsoft Word Professional Drafting',
      'Comprehensive Excel from Basics to Macro Dashboards',
      'PowerPoint Presentations & Pitch Deck Creation',
      'MS Access Database & Record Keeping',
      'Google Docs, Sheets, Drive & Cloud Collaboration',
      'Career Prep: Resume, Mock Interviews & Job Placement'
    ],
    instructorId: 'mentor-1',
    instructorName: 'Ataher Jamil',
    isPopular: true,
    level: 'Mastery'
  }
];

export const MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Ataher Jamil',
    role: 'Lead Office Specialist',
    title: 'Founder & Lead Trainer',
    experience: '12+ Years Experience',
    specialties: ['Advanced Excel', 'Office Automation', 'Data Analysis'],
    studentsTaught: 2400,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bgColor: '#FCECD8',
    bio: 'Certified Microsoft Office Specialist with over a decade of hands-on coaching experience training corporate teams, bank staff, and fresh graduates.',
    companyTag: 'Microsoft Certified'
  },
  {
    id: 'mentor-2',
    name: 'Cristian Doru Barin',
    role: 'Documentation Expert',
    title: 'Senior Office Instructor',
    experience: '9+ Years Experience',
    specialties: ['MS Word', 'Corporate Reporting', 'Typography'],
    studentsTaught: 1850,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bgColor: '#DAF4EE',
    bio: 'Dedicated technical trainer specializing in structured office documents, institutional drafting, and streamlined clerical operations.',
    companyTag: 'Corporate Specialist'
  },
  {
    id: 'mentor-3',
    name: 'Tanzeel Ur Rehman',
    role: 'Accounting Instructor',
    title: 'Computerized Accounting Trainer',
    experience: '8+ Years Experience',
    specialties: ['TallyPrime', 'Financial Excel', 'Payroll'],
    studentsTaught: 1520,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bgColor: '#D7EACB',
    bio: 'Financial analyst and accounting software consultant who has helped hundreds of students transition into commercial accountant roles.',
    companyTag: 'Finance Coach'
  },
  {
    id: 'mentor-4',
    name: 'Andrew Williams',
    role: 'Presentation Designer',
    title: 'Executive Deck Specialist',
    experience: '7+ Years Experience',
    specialties: ['PowerPoint', 'Infographics', 'Visual Data'],
    studentsTaught: 1200,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bgColor: '#FDDCDC',
    bio: 'Expert at turning complex spreadsheets into engaging executive slides for boardroom presentations, investors, and clients.',
    companyTag: 'Presentation Pro'
  },
  {
    id: 'mentor-5',
    name: 'Brad Schiff',
    role: 'Typing & Speed Coach',
    title: 'Data Entry Master Trainer',
    experience: '6+ Years Experience',
    specialties: ['Speed Typing', 'Keyboard Ergonomics', 'Shortcuts'],
    studentsTaught: 1680,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    bgColor: '#ECE4FA',
    bio: 'Trained over 1,500 students to exceed 60+ WPM typing benchmarks with flawless numerical keypad and shortcut precision.',
    companyTag: 'Speed Specialist'
  },
  {
    id: 'mentor-6',
    name: 'Daniel Walter Scott',
    role: 'Cloud Office Instructor',
    title: 'Google Workspace & IT Coach',
    experience: '10+ Years Experience',
    specialties: ['Google Workspace', 'MS 365', 'Data Security'],
    studentsTaught: 2100,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bgColor: '#DCECF9',
    bio: 'Passionate about modern digital workplace tools, remote collaboration software, and automated clerical workflows.',
    companyTag: 'Cloud Certified'
  }
];

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    name: 'Farhana Akter',
    role: 'Office Executive',
    company: 'Apex Healthcare Ltd',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    courseName: 'Complete Office Application Diploma',
    reviewText: 'Before joining DigiLearning, I struggled with basic spreadsheets and formatting reports. Within 2 months, I mastered Advanced Excel and Word. The placement team connected me directly with my current employer!',
    date: 'August 2026',
    verifiedGraduate: true
  },
  {
    id: 'rev-2',
    name: 'Shahedul Islam',
    role: 'Accounts Assistant',
    company: 'Meghna Group of Industries',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    courseName: 'Computerized Accounting & TallyPrime',
    reviewText: 'The practical approach of doing real voucher entries and preparing balance sheets gave me immense confidence during the job interview test. DigiLearning is the best institute for practical office skills.',
    date: 'July 2026',
    verifiedGraduate: true
  },
  {
    id: 'rev-3',
    name: 'Mst. Tania Sultana',
    role: 'Data Entry Specialist',
    company: 'Standard Global Logistics',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    courseName: 'Touch Typing & Office Speed Masterclass',
    reviewText: 'My typing speed jumped from 22 WPM to 64 WPM! In the typing assessment, I cleared the test with 99.4% accuracy. I received an offer letter within two weeks of graduation.',
    date: 'June 2026',
    verifiedGraduate: true
  },
  {
    id: 'rev-4',
    name: 'Mahmudur Rahman',
    role: 'Administrative Officer',
    company: 'City Bank Branch Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    courseName: 'Advanced MS Excel & Business Analytics',
    reviewText: 'VLOOKUP, Pivot Tables, and automated templates completely transformed how I handle branch reports. Ataher Sir explained every formula with patience and real office scenarios.',
    date: 'May 2026',
    verifiedGraduate: true
  }
];

export const JOB_PLACEMENT_RECORDS: JobPlacementRecord[] = [
  {
    id: 'job-1',
    studentName: 'Md. Ibrahim Khalil',
    placedCompany: 'Square Pharmaceuticals',
    role: 'MIS & Office Executive',
    batch: 'Batch 28',
    packageRange: '৳32,000 - ৳38,000 / mo',
    hiredDate: 'July 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote: 'DigiLearning conducted 3 mock interviews and arranged my placement directly.'
  },
  {
    id: 'job-2',
    studentName: 'Anika Rahman',
    placedCompany: 'BRAC Enterprise',
    role: 'Senior Data Coordinator',
    batch: 'Batch 27',
    packageRange: '৳28,000 - ৳34,000 / mo',
    hiredDate: 'June 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote: 'The diploma certificate with online QR verification made background checks instantaneous.'
  },
  {
    id: 'job-3',
    studentName: 'Tariqul Islam',
    placedCompany: 'Pran-RFL Group',
    role: 'Commercial Accounts Officer',
    batch: 'Batch 26',
    packageRange: '৳30,000 - ৳36,000 / mo',
    hiredDate: 'May 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote: 'Hands-on Tally and Excel training gave me the exact competitive edge I needed.'
  },
  {
    id: 'job-4',
    studentName: 'Nusrat Jahan',
    placedCompany: 'Beximco Communications',
    role: 'Executive Secretary',
    batch: 'Batch 25',
    packageRange: '৳35,000 - ৳42,000 / mo',
    hiredDate: 'April 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    quote: 'DigiLearning transformed me from a total computer novice into a confident corporate professional.'
  }
];

export const CARD_OFFERS: CardOffer[] = [
  {
    id: 'offer-1',
    code: 'DIGI40',
    title: 'New Student Admission Grant',
    discount: '40% OFF',
    description: 'Valid for all single module enrollments including Advanced Excel, MS Word, and Computerized Accounting.',
    badge: 'MOST POPULAR',
    bgColor: 'from-[#0E2954] to-[#1E40AF]',
    validUntil: 'Limited time for next 50 seats'
  },
  {
    id: 'offer-2',
    code: 'DIPLOMA60',
    title: 'Complete Career Bundle Scholarship',
    discount: '60% OFF',
    description: 'Get all 6 office applications + Free Touch Typing speed booster + 100% Job Placement Assistance.',
    badge: 'BEST VALUE',
    bgColor: 'from-[#E5252A] to-[#B91C1C]',
    validUntil: 'Valid for Upcoming Batch'
  },
  {
    id: 'offer-3',
    code: 'GROUP25',
    title: 'Buddy / Corporate Group Pass',
    discount: 'EXTRA 25% OFF',
    description: 'Enroll with 2 or more colleagues or friends to unlock an extra discount plus complimentary lab practice hours.',
    badge: 'GROUP PERK',
    bgColor: 'from-slate-800 to-[#0E2954]',
    validUntil: 'Always available'
  }
];

export const LEARNING_STEPS: LearningStep[] = [
  {
    step: 1,
    title: 'Claim Card Offer & Enroll',
    subtitle: 'Instant Registration',
    description: 'Choose your desired office application track or complete diploma. Apply instant scholarship coupons to secure your discounted seat.',
    details: [
      'Flexible morning, evening, and weekend batches',
      'Access to interactive student portal',
      'Free starter office shortcut guide and PDF kits'
    ]
  },
  {
    step: 2,
    title: 'Hands-On Practical Lab Training',
    subtitle: '100% Computer Practice',
    description: 'Every student gets dedicated high-speed PC workstations. No dry theory — learn by creating live invoices, sheets, and reports.',
    details: [
      '1-on-1 instructor guidance at every step',
      'Real-world business case studies and scenarios',
      'Speed typing benchmarks and daily exercises'
    ]
  },
  {
    step: 3,
    title: 'Capstone Office Projects',
    subtitle: 'Portfolio Development',
    description: 'Build a tangible corporate portfolio containing automated financial sheets, formal documentation templates, and pitch decks.',
    details: [
      'Real corporate data modeling & cleansing',
      'Presentation drills and verbal pitch practice',
      'Document design standards and audit checks'
    ]
  },
  {
    step: 4,
    title: 'Official Certification & Job Placement',
    subtitle: 'Career Launch',
    description: 'Receive your verified credential with unique QR code verification. Our dedicated placement cell arranges corporate interviews until you are hired.',
    details: [
      'Verifiable QR-enabled digital certificate',
      'Professional resume & LinkedIn makeover',
      'Direct interview calls with 45+ hiring partners'
    ]
  }
];

export const INSTITUTE_STATS = {
  graduatedStudents: '3,850+',
  placementRate: '98.4%',
  averageSalaryHike: '65%',
  hiringPartners: '45+',
  googleRating: '4.9/5',
  totalReviews: '1,280+'
};

export const HIRING_PARTNERS = [
  { name: 'Microsoft Partner', logoText: 'Microsoft' },
  { name: 'Google Cloud', logoText: 'Google' },
  { name: 'HubSpot Academy', logoText: 'HubSpot' },
  { name: 'Walmart Global', logoText: 'Walmart' },
  { name: 'Amazon Web Services', logoText: 'Amazon' },
  { name: 'City Bank', logoText: 'City Bank' },
  { name: 'Square Corp', logoText: 'Square' },
  { name: 'BRAC International', logoText: 'BRAC' }
];

export const FAQ_LIST = [
  {
    question: 'Who can enroll in DigiLearning office application courses?',
    answer: 'Anyone! Our courses are structured for absolute beginners as well as working professionals looking to level up their speed, advanced Excel capabilities, and computerized accounting.'
  },
  {
    question: 'How does the Job Placement Assistance work?',
    answer: 'Upon completing 80% of practical assignments and the final capstone project, our career counselors review your resume, conduct mock interviews, and share your profile directly with our network of 45+ corporate hiring partners.'
  },
  {
    question: 'Do I get a verifiable certificate upon graduation?',
    answer: 'Yes! Every graduate receives an official certificate embedded with a unique QR code and credential ID that employers can verify instantly on our online verification system.'
  },
  {
    question: 'Can I pay in installments or use discount card offers?',
    answer: 'Yes, we offer convenient 2-part installment plans as well as instant coupon vouchers (like DIGI40 and DIPLOMA60) during special enrollment cycles.'
  }
];
