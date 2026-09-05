import { Course, StudentReview, LearningStep } from '@/types';

export const INITIAL_COURSES: Course[] = [
{
    id: 'course-1',
    title: 'Basic Complete Office Application ',
    category: 'MS Office Suite',
    price: 6000,
    originalPrice: 8000,
    classesCount: 36,
    hoursCount: 54,
    rating: 4.7,
    reviewsCount: 90,
    badge: ' Essential  for Career',
    bgColor: '#DAF4EE', // Soft Mint
    iconType: 'suite',
    description: 'Our flagship 3-month comprehensive diploma covering Word, Excel, PowerPoint, Access, Google Suite, Internet Safety & Guaranteed Job Placement.',
    syllabus: [
      'Operating System Essentials & Fast File Management',
      'Complete Microsoft Word Professional Drafting',
      'Comprehensive Excel from Basics to Macro Dashboards',
      'PowerPoint Presentations & Pitch Deck Creation',
      'MS Access Database & Record Keeping', 
      'Email & Internet Browsing',
      'Google Docs, Sheets, Drive & Cloud Collaboration',
      'Career Prep: Resume, Mock Interviews & Job Placement'
    ],
    instructorId: 'mentor-1',
    instructorName: 'Ataher Jamil',
    isPopular: true,
    level: 'Mastery'
  },
  {
  id: 'course-2',
  title: 'Basic Graphics Design with Photoshop & Illustrator',
  category: 'Graphics Design',
  price: 7000,
  originalPrice: 9000,
  classesCount: 40,
  hoursCount: 60,
  rating: 4.5,
  reviewsCount: 8,
  badge: 'Beginner Friendly',
  bgColor: '#DDE7F7', // Soft Blue
  iconType: 'graphics',
  description: 'Learn the fundamentals of graphic design through hands-on practice with Adobe Photoshop and Illustrator, including design principles, image editing, typography, social media graphics, and print-ready designs.',
  syllabus: [
    'Graphic Design Fundamentals, Color Theory & Typography',
    'Adobe Photoshop: Tools, Layers, Selection, Masking & Image Editing',
    'Adobe Illustrator: Shapes, Pen Tool, Paths, Typography & Vector Design',
    'Practical Design: Social Media Posts, Posters, Banners & Promotional Graphics',
    'Final Projects: Logo, Business Card, Flyer & Print-Ready Design Preparation'
  ],
  instructorId: 'mentor-1',
  instructorName: 'Ataher Jamil',
  isPopular: false,
  level: 'Beginner'
},
{
    id: 'course-3',
    title: 'Executive MS PowerPoint & Pitch Decks',
    category: 'MS Office Suite',
    price: 1500,
    originalPrice: 2500,
    classesCount: 10,
    hoursCount: 16,
    rating: 4.2,
    reviewsCount: 14,
    badge: 'High Impact',
    bgColor: '#FCECD8', // Warm peach
    iconType: 'powerpoint',
    description: 'Design persuasive corporate presentations, animated data infographics, executive business decks, and slide master templates.',
    syllabus: [
      'Design Principles & Visual Slide Hierarchy',
      'Master Slide Customization & Corporate Branding Kits',
      'Transforming Raw Data into Visual Charts & Infographics',
      'Morph Transitions & Professional Motion Effects',
      'Speaker Notes, Presenter View & Export formats'
    ],
    instructorId: 'mentor-1',
    instructorName: 'Ataher Jamil',
    isPopular: false,
    level: 'Beginner'
  },
{
    id: 'course-4',
    title: 'Touch Typing & Office Speed Masterclass',
    category: 'Typing & Speed',
    price: 3000,
    originalPrice: 4000,
    classesCount: 11,
    hoursCount: 17,
    rating: 4.5,
    reviewsCount: 40,
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
    instructorId: 'mentor-1',
    instructorName: ' Ataher Jamil',
    isPopular: false,
    level: 'Beginner'
  },


];



export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    name: 'Nazim Uddin Niloy',
    role: 'Senior Teacher',
    company: 'Suagonj Model School',
    avatarUrl: '/avatar1.jpeg',
    rating: 5,
    courseName: 'Basic Complete Office Application',
    reviewText: 'DigiLearning made learning Word and Excel much easier for me. The practical classes helped me improve my computer skills, and I can now confidently handle reports and Excel tasks at work.',
    date: 'August 2023',
    verifiedGraduate: true
  },
  {
    id: 'rev-2',
    name: 'MD Ibrahim Khalil',
    role: 'Diploma Engineering Student',
    company: 'Cumilla Govt. Polytechnic Institute',
    avatarUrl: '/avatar2.jpeg',
    rating: 5,
    courseName: ' Basic Complete Office Application ',
    reviewText: ' The practical classes helped me improve my Word and Excel skills. These skills have been very useful for preparing reports and handling everyday office tasks after completing my diploma.',
    date: 'July 2026',
    verifiedGraduate: true
  }
];

export const LEARNING_STEPS: LearningStep[] = [
  {
    step: 1,
title: 'Visit & Admit',
subtitle: 'Easy Admission',
description:
  'Visit our center, discuss your preferred course with our team, complete the admission process, and secure your seat.',

details: [
  'Visit our center and choose your preferred course',
  'Get guidance from our experienced trainers',
  'Complete the admission process and secure your seat'
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
  graduatedStudents: '100+',
  placementRate: '70.4%',
  averageSalaryHike: '65%',
  hiringPartners: '3+',
  
};

export const HIRING_PARTNERS = [
  { name: ' Page Development Center', logoText: ' Page Development ' },
  { name: ' Virtual IT ', logoText: ' Virtual IT ' },
  { name: ' Unique IT ', logoText: ' Unique IT ' },
  { name: ' Mohammad Technology ', logoText: ' Mohammad Technology ' }
];

export const FAQ_LIST = [
  {
    question: 'Who can enroll in DigiLearning office application courses?',
    answer: 'Anyone! Our courses are structured for absolute beginners as well as working professionals looking to level up their speed, advanced Excel capabilities, and computerized accounting.'
  },
  {
    question: 'Do I get a verifiable certificate upon graduation?',
    answer: 'Yes! Every graduate receives an official certificate embedded with a unique QR code and credential ID that employers can verify instantly on our online verification system.'
  }
];