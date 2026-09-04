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
    degree: "Bachelors in Computer Science",
    institution: "The Islamia University of Bahawalpur (IUB)",
    location: "Bahawalpur, Pakistan",
    period: "2020 — 2024",
    details: "Focused on Software Engineering, Data Structures, Database Systems, and Modern Web Technologies.",
    honors: "Graduated with Computer Science Honors",
  },
  {
    degree: "Intermediate in Computer Science (ICS)",
    institution: "Govt. Graduate College (G.G.C)",
    location: "Bahawalpur, Pakistan",
    period: "2018 — 2020",
    details: "Core foundations in programming logic, computer systems, and mathematics.",
    honors: "High First Division",
  },
  {
    degree: "Matriculation (Science)",
    institution: "H/S TMP",
    location: "Punjab, Pakistan",
    period: "2016 — 2018",
    details: "Solid academic foundation in mathematics, science, and analytical thinking.",
  },
]
