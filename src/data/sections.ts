export interface Section {
  id: string
  label: string
  num: string
}

export const SECTIONS: Section[] = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "work", label: "Work", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "education", label: "Education", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
]
