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
    degree: "B.S. in Computer Science",
    institution: "University of Computer & Emerging Sciences",
    location: "Lahore, Pakistan",
    period: "2017 — 2021",
    details: "Specialized in Software Engineering, Distributed Systems, and Web Architectures.",
    honors: "Dean's Honor List • Merit Scholarship Recipient",
  },
]
