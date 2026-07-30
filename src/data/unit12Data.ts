import { VocabItem, QuizQuestion } from '../types';

export const UNIT12_VOCAB: VocabItem[] = [
  {
    id: 'v1',
    word: 'career',
    ipa: '/kəˈrɪər/',
    meaning: 'sự nghiệp, nghề nghiệp lâu dài',
    example: 'Building a successful career in medicine requires years of dedicated study.',
    category: 'General',
    workplace: 'Various',
    emoji: '🚀',
    '3dIconBg': 'from-blue-500 to-indigo-600'
  },
  {
    id: 'v2',
    word: 'career orientation',
    ipa: '/kəˈrɪər ˌɔːriənˈteɪʃn/',
    meaning: 'định hướng nghề nghiệp',
    example: 'Career orientation helps grade 9 students choose suitable educational paths.',
    category: 'Education',
    workplace: 'School',
    emoji: '🧭',
    '3dIconBg': 'from-amber-400 to-orange-500'
  },
  {
    id: 'v3',
    word: 'vocational',
    ipa: '/vəʊˈkeɪʃənl/',
    meaning: 'thuộc về hướng nghiệp, dạy nghề',
    example: 'Vocational training schools offer practical skills for technical jobs.',
    category: 'Education',
    workplace: 'Vocational School',
    emoji: '🛠️',
    '3dIconBg': 'from-emerald-400 to-teal-600'
  },
  {
    id: 'v4',
    word: 'theoretical',
    ipa: '/ˌθɪəˈretɪkl/',
    meaning: 'mang tính lý thuyết',
    example: 'University courses combine theoretical lectures with laboratory experiments.',
    category: 'Education',
    workplace: 'University',
    emoji: '📚',
    '3dIconBg': 'from-purple-500 to-violet-600'
  },
  {
    id: 'v5',
    word: 'garment worker',
    ipa: '/ˈɡɑːmənt ˈwɜːkə/',
    meaning: 'công nhân may mặc',
    example: 'The skilled garment worker operates high-speed industrial sewing machines.',
    category: 'Manufacturing',
    workplace: 'Factory',
    emoji: '🧵',
    '3dIconBg': 'from-pink-400 to-rose-600'
  },
  {
    id: 'v6',
    word: 'bartender',
    ipa: '/ˈbɑːtendə/',
    meaning: 'nhân viên pha chế đồ uống',
    example: 'The talented bartender created custom mocktails for the restaurant guests.',
    category: 'Hospitality',
    workplace: 'Restaurant',
    emoji: '🍹',
    '3dIconBg': 'from-cyan-400 to-blue-600'
  },
  {
    id: 'v7',
    word: 'architect',
    ipa: '/ˈɑːkɪtekt/',
    meaning: 'kiến trúc sư',
    example: 'The architect drew blueprints for a modern eco-friendly high-rise building.',
    category: 'Engineering',
    workplace: 'Office',
    emoji: '🏛️',
    '3dIconBg': 'from-yellow-400 to-amber-600'
  },
  {
    id: 'v8',
    word: 'flight attendant',
    ipa: '/ˈflaɪt əˌtendənt/',
    meaning: 'tiếp viên hàng không',
    example: 'The flight attendant demonstrated emergency safety procedures onboard.',
    category: 'Aviation',
    workplace: 'Airport',
    emoji: '✈️',
    '3dIconBg': 'from-sky-400 to-blue-600'
  },
  {
    id: 'v9',
    word: 'mechanic',
    ipa: '/məˈkænɪk/',
    meaning: 'thợ máy, thợ sửa chữa xe/máy móc',
    example: 'The experienced mechanic diagnosed and repaired the car engine problem.',
    category: 'Technical',
    workplace: 'Garage',
    emoji: '🔧',
    '3dIconBg': 'from-orange-500 to-red-600'
  },
  {
    id: 'v10',
    word: 'chef',
    ipa: '/ʃef/',
    meaning: 'đầu bếp trưởng',
    example: 'The executive chef prepared a signature five-course meal for diners.',
    category: 'Culinary',
    workplace: 'Restaurant',
    emoji: '👨‍🍳',
    '3dIconBg': 'from-red-400 to-amber-600'
  },
  {
    id: 'v11',
    word: 'tour guide',
    ipa: '/tʊə ɡaɪd/',
    meaning: 'hướng dẫn viên du lịch',
    example: 'Our friendly tour guide explained the rich history of Ha Long Bay.',
    category: 'Tourism',
    workplace: 'Tourist Site',
    emoji: '🚩',
    '3dIconBg': 'from-emerald-400 to-green-600'
  },
  {
    id: 'v12',
    word: 'software engineer',
    ipa: '/ˈsɒftweə ˌendʒɪˈnɪə/',
    meaning: 'kỹ sư phần mềm',
    example: 'A software engineer writes clean code to build mobile apps and websites.',
    category: 'Technology',
    workplace: 'Office',
    emoji: '💻',
    '3dIconBg': 'from-indigo-400 to-purple-600'
  },
  {
    id: 'v13',
    word: 'electrician',
    ipa: '/ɪˌlekˈtrɪʃn/',
    meaning: 'thợ điện',
    example: 'The electrician safely installed power outlets and lighting fixtures.',
    category: 'Technical',
    workplace: 'Construction Site',
    emoji: '⚡',
    '3dIconBg': 'from-amber-400 to-yellow-500'
  },
  {
    id: 'v14',
    word: 'entrepreneur',
    ipa: '/ˌɒntrəprəˈnɜː/',
    meaning: 'doanh nhân, người khởi nghiệp',
    example: 'The young entrepreneur started a successful eco-friendly tech startup.',
    category: 'Business',
    workplace: 'Office',
    emoji: '💼',
    '3dIconBg': 'from-fuchsia-400 to-purple-600'
  },
  {
    id: 'v15',
    word: 'doctor',
    ipa: '/ˈdɒktə/',
    meaning: 'bác sĩ',
    example: 'The caring doctor examined patients and prescribed effective treatment.',
    category: 'Healthcare',
    workplace: 'Hospital',
    emoji: '🩺',
    '3dIconBg': 'from-teal-400 to-cyan-600'
  },
  {
    id: 'v16',
    word: 'pilot',
    ipa: '/ˈpaɪlət/',
    meaning: 'phi công',
    example: 'The captain pilot safely flew the airliner through bad weather to land.',
    category: 'Aviation',
    workplace: 'Airport',
    emoji: '🧑‍✈️',
    '3dIconBg': 'from-blue-400 to-sky-600'
  },
  {
    id: 'v17',
    word: 'hands-on',
    ipa: '/ˌhændz ˈɒn/',
    meaning: 'thực hành, thực tế (kinh nghiệm)',
    example: 'Vocational courses focus on hands-on practice rather than long lectures.',
    category: 'Education',
    workplace: 'Workshop',
    emoji: '🤲',
    '3dIconBg': 'from-green-400 to-emerald-600'
  },
  {
    id: 'v18',
    word: 'qualification',
    ipa: '/ˌkwɒlɪfɪˈkeɪʃn/',
    meaning: 'trình độ chuyên môn, bằng cấp',
    example: 'Relevant qualifications increase your chances of landing a great job.',
    category: 'Career Development',
    workplace: 'Company',
    emoji: '🎓',
    '3dIconBg': 'from-purple-400 to-indigo-600'
  }
];

export const WORKPLACE_MAPPING = [
  { job: 'Doctor', workplace: 'Hospital', emoji: '🏥', icon: '🩺' },
  { job: 'Nurse', workplace: 'Hospital', emoji: '🏥', icon: '💉' },
  { job: 'Pilot', workplace: 'Airport', emoji: '🛫', icon: '✈️' },
  { job: 'Flight Attendant', workplace: 'Airport', emoji: '🛫', icon: '🧳' },
  { job: 'Teacher', workplace: 'School', emoji: '🏫', icon: '📖' },
  { job: 'Librarian', workplace: 'School', emoji: '🏫', icon: '📚' },
  { job: 'Garment Worker', workplace: 'Factory', emoji: '🏭', icon: '🧵' },
  { job: 'Assembly Worker', workplace: 'Factory', emoji: '🏭', icon: '🤖' },
  { job: 'Software Engineer', workplace: 'Office', emoji: '🏢', icon: '💻' },
  { job: 'Architect', workplace: 'Office', emoji: '🏢', icon: '📐' },
  { job: 'Chef', workplace: 'Restaurant', emoji: '🍽️', icon: '👨‍🍳' },
  { job: 'Bartender', workplace: 'Restaurant', emoji: '🍽️', icon: '🍸' },
  { job: 'Mechanic', workplace: 'Garage', emoji: '🚘', icon: '🔧' },
  { job: 'Tour Guide', workplace: 'Tourist Site', emoji: '🗿', icon: '🚩' }
];

export const GETTING_STARTED_DIALOGUE = [
  { speaker: 'Mai', text: "Hey Nick and Mark! Have you thought about what career path you want to follow after grade 9?" },
  { speaker: 'Nick', text: "I love fixing electronics and assembling PC hardware! I prefer taking a vocational course to studying theoretical subjects." },
  { speaker: 'Mark', text: "That sounds cool! I love traveling and speaking foreign languages, so I want to become a international tour guide." },
  { speaker: 'Mai', text: "Awesome! I'm interested in architecture. I prefer going to university to get a formal degree because I want to design skyscrapers." }
];

export const ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  // Part A: Multiple Choice (10 Qs)
  {
    id: 'a1',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'A person who designs buildings and homes is called an ______.',
    options: ['architect', 'electrician', 'bartender', 'garment worker'],
    correctAnswer: 'architect',
    explanation: 'Architect (Kiến trúc sư) là người thiết kế các tòa nhà và công trình.'
  },
  {
    id: 'a2',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'Which word refers to practical, real-world work experience?',
    options: ['hands-on', 'theoretical', 'vocational', 'qualification'],
    correctAnswer: 'hands-on',
    explanation: 'Hands-on (thực hành, thực tế) là kinh nghiệm làm việc thực tế.'
  },
  {
    id: 'a3',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'Nick prefers ______ hands-on skills to studying pure theory.',
    options: ['learning', 'learn', 'learned', 'to learn'],
    correctAnswer: 'learning',
    explanation: 'Cấu trúc: prefer + V-ing + to + V-ing.'
  },
  {
    id: 'a4',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'Where does a flight attendant usually work?',
    options: ['Airport & Plane', 'Hospital', 'Factory', 'School'],
    correctAnswer: 'Airport & Plane',
    explanation: 'Flight attendant (Tiếp viên hàng không) làm việc ở sân bay và trên máy bay.'
  },
  {
    id: 'a5',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'A ______ repairs car engines and mechanical machinery in a garage.',
    options: ['mechanic', 'bartender', 'chef', 'tour guide'],
    correctAnswer: 'mechanic',
    explanation: 'Mechanic (thợ máy) chuyên sửa chữa động cơ xe cộ.'
  },
  {
    id: 'a6',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'She would rather ______ a vocational course than go to university.',
    options: ['take', 'taking', 'to take', 'took'],
    correctAnswer: 'take',
    explanation: 'Cấu trúc: would rather + V(bare) + than + V(bare).'
  },
  {
    id: 'a7',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'The school offers career ______ to guide students in choosing jobs.',
    options: ['orientation', 'qualification', 'prospect', 'vocational'],
    correctAnswer: 'orientation',
    explanation: 'Career orientation = Định hướng nghề nghiệp.'
  },
  {
    id: 'a8',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'A garment worker works primarily in a ______.',
    options: ['factory', 'hospital', 'restaurant', 'airport'],
    correctAnswer: 'factory',
    explanation: 'Garment worker (công nhân may) làm việc trong nhà máy (factory).'
  },
  {
    id: 'a9',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'A software engineer spends most of their time working on a ______.',
    options: ['computer', 'sewing machine', 'airplane', 'stethoscope'],
    correctAnswer: 'computer',
    explanation: 'Kỹ sư phần mềm làm việc với máy tính.'
  },
  {
    id: 'a10',
    partName: 'Part A: Multiple Choice',
    type: 'mc',
    question: 'An entrepreneur is someone who ______ a new business enterprise.',
    options: ['starts', 'destroys', 'avoids', 'cancels'],
    correctAnswer: 'starts',
    explanation: 'Entrepreneur (doanh nhân) là người khởi nghiệp, thành lập doanh nghiệp mới.'
  },

  // Part B: Fill in the Blank (5 Qs)
  {
    id: 'b1',
    partName: 'Part B: Fill in the Blank',
    type: 'blank',
    question: 'A doctor works in a __________ to treat sick people.',
    correctAnswer: 'hospital',
    explanation: 'Bác sĩ làm việc tại bệnh viện (hospital).'
  },
  {
    id: 'b2',
    partName: 'Part B: Fill in the Blank',
    type: 'blank',
    question: 'A __________ mixes drinks and beverages behind the bar in a restaurant.',
    correctAnswer: 'bartender',
    explanation: 'Bartender là nhân viên pha chế đồ uống.'
  },
  {
    id: 'b3',
    partName: 'Part B: Fill in the Blank',
    type: 'blank',
    question: 'A pilot flies airplanes at the __________.',
    correctAnswer: 'airport',
    explanation: 'Phi công làm việc liên quan đến sân bay (airport).'
  },
  {
    id: 'b4',
    partName: 'Part B: Fill in the Blank',
    type: 'blank',
    question: 'University education focuses heavily on __________ knowledge.',
    correctAnswer: 'theoretical',
    explanation: 'Giáo dục đại học nhấn mạnh kiến thức lý thuyết (theoretical).'
  },
  {
    id: 'b5',
    partName: 'Part B: Fill in the Blank',
    type: 'blank',
    question: 'Having good skills improves your job __________ in the future.',
    correctAnswer: 'prospects',
    explanation: 'Job prospects = triển vọng công việc.'
  },

  // Part C: Drag and Drop / Matching
  {
    id: 'c1',
    partName: 'Part C: Job to Workplace Match',
    type: 'match',
    question: 'Match Chef to its workplace',
    options: ['Restaurant', 'Hospital', 'Airport', 'School'],
    correctAnswer: 'Restaurant',
    explanation: 'Chef (Đầu bếp) -> Restaurant (Nhà hàng).'
  },

  // Part D: Listening
  {
    id: 'd1',
    partName: 'Part D: Listening Quiz',
    type: 'listening',
    question: 'Listen to the audio prompt: "I design software programs and mobile applications in a high-tech office." Who am I?',
    audioText: 'I design software programs and mobile applications in a high-tech office.',
    options: ['Software Engineer', 'Garment Worker', 'Tour Guide', 'Chef'],
    correctAnswer: 'Software Engineer',
    explanation: 'Mô tả công việc của Kỹ sư phần mềm (Software Engineer).'
  },

  // Part E: Picture Quiz
  {
    id: 'e1',
    partName: 'Part E: Picture Quiz',
    type: 'picture',
    question: 'Which profession uses a stethoscope 🩺 and works in a hospital 🏥?',
    options: ['Doctor', 'Pilot', 'Architect', 'Bartender'],
    correctAnswer: 'Doctor',
    explanation: 'Bác sĩ (Doctor) sử dụng ống nghe và làm việc ở bệnh viện.'
  },

  // Part F: Read & Choose
  {
    id: 'f1',
    partName: 'Part F: Read & Choose',
    type: 'read',
    question: 'Read the text: "Anna loves traveling to foreign countries, introducing historical sites to tourists, and leading tour groups." What is Anna\'s ideal job?',
    options: ['Tour Guide', 'Garment Worker', 'Electrician', 'Librarian'],
    correctAnswer: 'Tour Guide',
    explanation: 'Anna thích dẫn tour du lịch -> Hướng dẫn viên du lịch (Tour Guide).'
  },

  // Part G: True / False
  {
    id: 'g1',
    partName: 'Part G: True or False',
    type: 'tf',
    question: 'A pilot works in a hospital and treats patients.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'False! A pilot flies aircraft from the airport, while a doctor works in a hospital.'
  },

  // Part H: Odd One Out
  {
    id: 'h1',
    partName: 'Part H: Odd One Out',
    type: 'odd',
    question: 'Find the odd one out among these options:',
    options: ['Teacher', 'Doctor', 'Engineer', 'Apple'],
    correctAnswer: 'Apple',
    explanation: 'Apple (Quả táo) là trái cây, 3 từ còn lại là tên nghề nghiệp (Teacher, Doctor, Engineer).'
  },

  // Part I: Complete Dialogue
  {
    id: 'i1',
    partName: 'Part I: Dialogue Completion',
    type: 'dialogue',
    question: 'Mai: "Do you prefer studying at university or taking a vocational course?" -> Nick: "I prefer __________ hands-on skills at a vocational school."',
    options: ['learning', 'learn', 'learned', 'to learn'],
    correctAnswer: 'learning',
    explanation: 'Sau prefer + V-ing.'
  },

  // Part J: Speed Challenge
  {
    id: 'j1',
    partName: 'Part J: Speed Challenge',
    type: 'speed',
    question: 'An electrician fixes electrical systems safely. (True or False?)',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Electrician (Thợ điện) lắp đặt và sửa chữa hệ thống điện.'
  }
];
