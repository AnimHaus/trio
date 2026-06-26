export interface Character {
  id: string
  name: string
  role: string
  glbModel?: string
  class: string
  year: string
  studentId: string
  age: number
  height: string
  accentColor: string
  bio: string
  fullBio: string
  abilities: string[]
  isProtagonist: boolean
  tags: string[]
  stats: {
    strength: number
    speed: number
    intelligence: number
    endurance: number
    technique: number
  }
}

export const characters: Character[] = [
  {
    id: 'kai',
    name: 'Kai Mura',
    role: 'The Brawler',
    glbModel: '/GE_SCHOOL_DRESS.glb',
    class: '2-A',
    year: '2nd Year',
    studentId: 'THS-0042',
    age: 16,
    height: "5'10\"",
    accentColor: '#9CFE08',
    bio: 'Hot-headed and fearless, Kai charges into every fight with reckless intensity. His raw talent and unbreakable spirit make him the muscle of the trio.',
    fullBio: `Hot-headed and fearless, Kai Mura charges into every fight with reckless intensity. 
His raw talent and unbreakable spirit make him the indisputable muscle of the trio, though his impulsive nature often lands them in impossible situations.

Raised in the shadows of Trio City's lower district, Kai learned to survive by fighting. His unconventional combat style draws from street brawling, self-taught martial arts, and an instinctive ability to read an opponent's next move mid-battle.

Despite his rough exterior, Kai harbors a deep loyalty to those he calls friends — a loyalty forged in hardship and tested at every turn.`,
    abilities: ['Aura Strike', 'Berserker Mode', 'Battle Instinct', 'Enhanced Strength', 'Impact Burst'],
    isProtagonist: true,
    tags: ['Combat', 'Power', 'Impulsive'],
    stats: { strength: 95, speed: 72, intelligence: 55, endurance: 88, technique: 63 },
  },
  {
    id: 'ren',
    name: 'Ren Aoki',
    role: 'The Strategist',
    glbModel: '/sootra.glb',
    class: '2-B',
    year: '2nd Year',
    studentId: 'THS-0043',
    age: 16,
    height: "5'9\"",
    accentColor: '#00CFFF',
    bio: 'Calm, calculated, and always three steps ahead. Ren is the intellectual core of the trio, able to analyze any situation and devise a winning strategy in seconds.',
    fullBio: `Calm, calculated, and always three steps ahead — Ren Aoki is the intellectual core of the trio. His ability to analyze any situation and devise a winning strategy in seconds is almost supernatural.

From a prestigious academic family, Ren entered Trio Academy as the top-ranked student of his year. Behind the cold, analytical exterior lies a fierce loyalty and a past that fuels every decision he makes.

His combat style is a reflection of his mind: precise, efficient, and devastating. He never takes a step he hasn't already calculated.`,
    abilities: ['Tactical Analysis', 'Shadow Clone', 'Speed Burst', 'Mind Sync', 'Void Step'],
    isProtagonist: true,
    tags: ['Strategy', 'Speed', 'Calculated'],
    stats: { strength: 65, speed: 90, intelligence: 98, endurance: 70, technique: 92 },
  },
  {
    id: 'sora',
    name: 'Sora Hane',
    role: 'The Mediator',
    glbModel: '/SO_SCHOOL_DRESS.glb',
    class: '2-A',
    year: '2nd Year',
    studentId: 'THS-0044',
    age: 16,
    height: "5'7\"",
    accentColor: '#FF6B9D',
    bio: 'The heart of the trio. Sora\'s unwavering optimism and empathy keep the group together. Beneath the cheerful surface lies a hidden power she hasn\'t fully mastered.',
    fullBio: `The undeniable heart of the trio, Sora Hane's unwavering optimism and deep empathy have kept the group united through their darkest moments. She is the reason Kai and Ren are still a team.

Sora appears carefree and approachable, but beneath that cheerful surface lies a power that frightens even her. On three separate occasions, that power has surfaced uninvited — and each time, it changed everything around her.

She enrolled at Trio Academy not knowing what she was, and she may leave knowing even less. But she will leave stronger.`,
    abilities: ['Healing Aura', 'Barrier Shield', 'Empathy Sense', 'Radiant Burst', 'Soul Resonance'],
    isProtagonist: true,
    tags: ['Support', 'Hidden Power', 'Empathy'],
    stats: { strength: 48, speed: 76, intelligence: 82, endurance: 85, technique: 79 },
  },
  {
    id: 'hiro',
    name: 'Takeshi Hiro',
    role: 'The Mentor',
    glbModel: '/SALIM_CHACHA.glb',
    class: 'Faculty',
    year: 'Advisor',
    studentId: 'THS-STAFF-01',
    age: 34,
    height: "6'1\"",
    accentColor: '#FFB347',
    bio: 'The mysterious homeroom teacher who knows far more than he lets on. His past is shrouded in secrecy, but his guidance has been crucial to the trio\'s growth.',
    fullBio: `The homeroom teacher of Class 2-A, Takeshi Hiro is one of the most enigmatic figures at Trio Academy. He is unfailingly calm, suspiciously knowledgeable, and perpetually unhelpful in a way that somehow always helps.

His record before joining the faculty is classified. His combat ability has never been officially measured. Students whisper that he once stopped a catastrophe with a single gesture — but no one can agree on what the gesture was.

He watches the trio with an interest that goes beyond professional curiosity. He is waiting for something.`,
    abilities: ['Unknown', 'Suppression Field', 'Absolute Read'],
    isProtagonist: false,
    tags: ['Mentor', 'Mystery', 'Faculty'],
    stats: { strength: 85, speed: 88, intelligence: 99, endurance: 90, technique: 97 },
  },
  {
    id: 'naizen',
    name: 'Kuro Naizen',
    role: 'The Antagonist',
    class: '3-S',
    year: '3rd Year',
    studentId: 'THS-0001',
    age: 17,
    height: "6'0\"",
    accentColor: '#CC3333',
    bio: 'Student council president with an iron grip on the academy. His ambitions extend far beyond school politics, threatening the very fabric of the trio\'s world.',
    fullBio: `Student council president. Top-ranked student for three consecutive years. Kuro Naizen is everything the academy celebrates — and everything the trio fears.

His ambitions have never been limited to Trio Academy. He sees the school as a proving ground, his classmates as assets or obstacles, and the trio as the first genuine obstacle he has encountered.

Behind the model-student facade is a ruthless architect of control. He has been preparing for something long before the trio arrived — and their presence has accelerated his timeline.`,
    abilities: ['Domination', 'Shadow Weave', 'Absolute Control', 'Null Field'],
    isProtagonist: false,
    tags: ['Antagonist', 'Elite', 'Ruthless'],
    stats: { strength: 82, speed: 85, intelligence: 95, endurance: 86, technique: 91 },
  },
  {
    id: 'yuki',
    name: 'Yuki Shiro',
    role: 'The Wildcard',
    class: '2-C',
    year: '2nd Year',
    studentId: 'THS-0067',
    age: 16,
    height: "5'6\"",
    accentColor: '#B388FF',
    bio: 'A second-year student whose loyalties are impossible to pin down. She appears to help the trio — until she doesn\'t.',
    fullBio: `No one at Trio Academy can agree on what Yuki Shiro actually wants. She has saved the trio on two separate occasions and tried to undermine them on at least three others.

She operates on a logic no one else can follow, motivated by principles she never explains and goals that seem to shift with the wind. The trio have learned one thing: when Yuki shows up, something is about to change.

What is certain is that she is extraordinarily capable. And that she has been watching everyone far longer than anyone has been watching her.`,
    abilities: ['Mirage Step', 'Disruption Field', 'Adaptation', 'Read Reversal'],
    isProtagonist: false,
    tags: ['Wildcard', 'Unpredictable', 'Enigmatic'],
    stats: { strength: 68, speed: 88, intelligence: 90, endurance: 72, technique: 86 },
  },
]

export const protagonists = characters.filter((c) => c.isProtagonist)
