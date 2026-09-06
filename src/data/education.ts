export interface EducationItem {
  degree: string
  institution: string
  location: string
  period: string
  details?: string
  honors?: string
}

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Science - BS, Computer Science",
    institution: "The Islamia University of Bahawalpur",
    location: "Bahawalpur, Punjab, Pakistan",
    period: "Jan 2021 — Jan 2025",
    details:
      "Graduated with a 3.60/4.0 CGPA. Core subjects: Object-Oriented Programming, Data Structures, Databases, Operating Systems, Algorithm Design & Analysis, and Compiler Construction. Final Year Project: 'Handi' — a full-stack platform connecting home-based kitchens with customers, including a related charity donation module.",
    honors: "3.60 / 4.0 CGPA",
  },
  {
    degree: "ICS, Computer Science",
    institution: "Punjab Group Of Colleges",
    location: "Bahawalpur, Punjab, Pakistan",
    period: "Jan 2019 — Jan 2021",
    details:
      "Graduated with 1048/1100 (95.3%) marks. Achieved 1st Position in pre-exam preparation test series. Built strong grounding in programming logic, mathematics, data structures basics, computer networks, and operating systems.",
    honors: "1048 / 1100 (95.3%) • 1st Position",
  },
  {
    degree: "Matriculation (Science)",
    institution: "H/S TMP",
    location: "Punjab, Pakistan",
    period: "2017 — 2019",
    details: "Solid academic foundation in mathematics, science, and analytical thinking.",
  },
]
