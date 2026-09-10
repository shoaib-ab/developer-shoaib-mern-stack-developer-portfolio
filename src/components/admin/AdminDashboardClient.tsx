"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteData, Project, ExperienceItem, EducationItem } from "@/lib/types"

interface AdminDashboardClientProps {
  initialData: SiteData
}

type TabType = "profile" | "projects" | "experience" | "seo"

export function AdminDashboardClient({ initialData }: AdminDashboardClientProps) {
  const [data, setData] = useState<SiteData>(initialData)
  const [activeTab, setActiveTab] = useState<TabType>("projects")
  const [saving, setSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isNewProject, setIsNewProject] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const router = useRouter()

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleSave = async (updatedData: Partial<SiteData>) => {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      const resData = await res.json()
      if (!res.ok) throw new Error(resData.error || "Save failed.")

      setData(resData.data)
      showToast("Saved! Public portfolio cache revalidated.")
      router.refresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving changes."
      alert(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  // Handle project image upload directly from computer
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProject) return

    setUploadingImage(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const uploadData = await res.json()
      if (!res.ok) throw new Error(uploadData.error || "Upload failed.")

      setEditingProject({ ...editingProject, image: uploadData.url })
      showToast("Image uploaded successfully!")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload error."
      alert(msg)
    } finally {
      setUploadingImage(false)
    }
  }

  // Save single project (create or edit)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    let updatedList: Project[]
    if (isNewProject) {
      updatedList = [editingProject, ...data.projects]
    } else {
      updatedList = data.projects.map((p) => (p.id === editingProject.id ? editingProject : p))
    }

    handleSave({ projects: updatedList })
    setEditingProject(null)
  }

  // Delete project
  const handleDeleteProject = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    const updatedList = data.projects.filter((p) => p.id !== id)
    handleSave({ projects: updatedList })
  }

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#111110] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111110] text-[#F9F8F5] text-xs font-mono px-4 py-3 rounded shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="text-[#14A800]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E5E3DE] px-6 md:px-12 h-[68px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-sans text-base font-bold tracking-tight text-[#111110] flex items-center gap-1.5">
            <span>Shoaib</span>
            <span className="text-[#14A800]">.</span>
            <span className="font-mono text-xs font-normal text-[#8C8B87] ml-1 bg-[#F2F1ED] px-2 py-0.5 rounded border border-[#E5E3DE]">
              Admin Studio
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#14A800] bg-[#14A800]/10 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14A800] animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-sans font-medium text-[#54534F] hover:text-[#111110] px-3 py-1.5 rounded border border-[#E5E3DE] hover:bg-[#F2F1ED] transition-colors inline-flex items-center gap-1"
          >
            <span>Live Portfolio</span>
            <span className="font-mono text-[10px]">↗</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-mono text-[#8C8B87] hover:text-red-600 px-3 py-1.5 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Subnav Tabs */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E3DE] px-6 md:px-12 sticky top-[68px] z-30 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("projects")}
          className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "projects"
              ? "border-[#111110] text-[#111110]"
              : "border-transparent text-[#54534F] hover:text-[#111110]"
          }`}
        >
          <span>Projects Showcase</span>
          <span className="font-mono text-[10px] bg-[#F2F1ED] px-1.5 py-0.5 rounded text-[#706E68]">
            {data.projects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "profile"
              ? "border-[#111110] text-[#111110]"
              : "border-transparent text-[#54534F] hover:text-[#111110]"
          }`}
        >
          Profile & Hero Section
        </button>

        <button
          onClick={() => setActiveTab("experience")}
          className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "experience"
              ? "border-[#111110] text-[#111110]"
              : "border-transparent text-[#54534F] hover:text-[#111110]"
          }`}
        >
          Experience & Education
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "seo"
              ? "border-[#111110] text-[#111110]"
              : "border-transparent text-[#54534F] hover:text-[#111110]"
          }`}
        >
          SEO & Social Metadata
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        {/* TAB 1: PROJECTS SHOWCASE */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DE]">
              <div>
                <h2 className="text-xl font-semibold text-[#111110]">Projects Library</h2>
                <p className="text-xs text-[#54534F] mt-0.5">
                  Manage commercial projects, upload screenshots, and toggle featured status for the homepage.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsNewProject(true)
                  setEditingProject({
                    id: `project-${Date.now()}`,
                    title: "",
                    category: "Full-Stack",
                    year: new Date().getFullYear().toString(),
                    featured: false,
                    description: "",
                    about: "",
                    features: [],
                    tags: ["Next.js", "TypeScript"],
                    image: "/projects/nexus-commerce.jpg",
                    liveUrl: "",
                    githubUrl: "",
                  })
                }}
                className="btn-primary text-xs py-2 px-4 cursor-pointer"
              >
                + Add New Project
              </button>
            </div>

            {/* Projects Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#FFFFFF] border border-[#E3E1DB] rounded-[3px] overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Thumbnail preview */}
                    <div className="aspect-[16/10] bg-[#1E1E1C] overflow-hidden border-b border-[#E3E1DB] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                      />
                      {project.featured && (
                        <span className="absolute top-2 right-2 bg-[#14A800] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#706E68]">
                        <span className="text-[#14A800] font-semibold uppercase">{project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="font-semibold text-base text-[#111110]">{project.title}</h3>
                      <p className="text-xs text-[#54534F] line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-mono bg-[#F2F1ED] px-1.5 py-0.5 rounded text-[#3D3C38]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 border-t border-[#EAE8E2] bg-[#FAF9F6] flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setIsNewProject(false)
                        setEditingProject({ ...project })
                      }}
                      className="font-medium text-[#111110] hover:text-[#14A800] transition-colors cursor-pointer"
                    >
                      Edit Project ✎
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id, project.title)}
                      className="text-xs text-[#8C8B87] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      Delete ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & HERO */}
        {activeTab === "profile" && (
          <ProfileTabForm
            initialProfile={data.profile}
            saving={saving}
            onSave={(updatedProfile) => handleSave({ profile: updatedProfile })}
            showToast={showToast}
          />
        )}

        {/* TAB 3: EXPERIENCE & EDUCATION */}
        {activeTab === "experience" && (
          <ExperienceTabForm
            experiences={data.experiences}
            education={data.education}
            saving={saving}
            onSave={(experiences, education) => handleSave({ experiences, education })}
          />
        )}

        {/* TAB 4: SEO & SOCIAL METADATA */}
        {activeTab === "seo" && (
          <SEOTabForm
            initialSEO={data.seo}
            saving={saving}
            onSave={(updatedSEO) => handleSave({ seo: updatedSEO })}
          />
        )}
      </main>

      {/* Project Edit / Add Modal Drawer */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111110]/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#FFFFFF] text-[#111110] max-h-[90vh] rounded-[4px] border border-[#E3E1DB] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E3E1DB] flex items-center justify-between bg-[#F9F8F5]">
              <h3 className="font-semibold text-base">
                {isNewProject ? "Add New Project" : `Edit Project: ${editingProject.title}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-[#706E68] hover:text-[#111110] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as "Full-Stack" | "Frontend" | "API & Backend",
                      })
                    }
                    className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="API & Backend">API & Backend</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Release Year</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 text-[#14A800] rounded accent-[#14A800]"
                  />
                  <label htmlFor="featured-check" className="font-medium text-[#111110] cursor-pointer">
                    Feature on Homepage (Flagship)
                  </label>
                </div>
              </div>

              {/* Screenshot Upload / URL */}
              <div>
                <label className="font-mono text-[#54534F] block mb-1">Project Screenshot Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="flex-1 p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                    placeholder="/projects/your-screenshot.jpg"
                  />
                  <label className="btn-primary text-xs py-2 px-3 cursor-pointer">
                    {uploadingImage ? "Uploading..." : "Upload New File ⇪"}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* One-Sentence Summary */}
              <div>
                <label className="font-mono text-[#54534F] block mb-1">Summary (1-2 sentences for card)</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                />
              </div>

              {/* Detailed Narrative */}
              <div>
                <label className="font-mono text-[#54534F] block mb-1">About the Project (Detailed modal overview)</label>
                <textarea
                  rows={3}
                  value={editingProject.about}
                  onChange={(e) => setEditingProject({ ...editingProject, about: e.target.value })}
                  className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                />
              </div>

              {/* Tech Stack Tags */}
              <div>
                <label className="font-mono text-[#54534F] block mb-1">Tech Stack Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                  placeholder="Next.js, TypeScript, Stripe, MongoDB"
                />
              </div>

              {/* Key Features */}
              <div>
                <label className="font-mono text-[#54534F] block mb-1">Key Features (one per line)</label>
                <textarea
                  rows={3}
                  value={editingProject.features.join("\n")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      features: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
                  placeholder="Stripe payment checkout integration&#10;Real-time inventory sync&#10;Admin management dashboard"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                    placeholder="https://my-app.com"
                  />
                </div>
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                    placeholder="https://github.com/shoaib/my-app"
                  />
                </div>
              </div>

              {/* Modal Submit Footer */}
              <div className="pt-4 border-t border-[#EAE8E2] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-[#54534F] hover:text-[#111110] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary text-xs py-2 px-4 cursor-pointer">
                  {saving ? "Saving..." : "Save Project ✓"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Profile & Hero Section Form ─── */
function ProfileTabForm({
  initialProfile,
  saving,
  onSave,
  showToast,
}: {
  initialProfile: SiteData["profile"]
  saving: boolean
  onSave: (p: SiteData["profile"]) => void
  showToast: (msg: string) => void
}) {
  const [profile, setProfile] = useState(initialProfile)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [showManualUrl, setShowManualUrl] = useState(false)
  const resumeFileInputRef = useRef<HTMLInputElement | null>(null)

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingResume(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "resume")

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const uploadData = await res.json()
      if (!res.ok) throw new Error(uploadData.error || "Resume upload failed.")

      setProfile((prev) => ({ ...prev, resumeUrl: uploadData.url }))
      showToast("Resume uploaded successfully! Click Save to apply.")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload resume file."
      alert(msg)
    } finally {
      setUploadingResume(false)
      if (resumeFileInputRef.current) {
        resumeFileInputRef.current.value = ""
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(profile)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 bg-[#FFFFFF] border border-[#E3E1DB] p-8 rounded-[4px] shadow-sm">
      <div className="border-b border-[#EAE8E2] pb-4">
        <h2 className="text-xl font-semibold text-[#111110]">Hero & Profile Content</h2>
        <p className="text-xs text-[#54534F] mt-0.5">
          Update headline, bio paragraph, social media links, and availability badge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="font-mono text-[#54534F] block mb-1">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          />
        </div>

        <div>
          <label className="font-mono text-[#54534F] block mb-1">Role Title (Eyebrow)</label>
          <input
            type="text"
            value={profile.roleTitle}
            onChange={(e) => setProfile({ ...profile, roleTitle: e.target.value })}
            className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          />
        </div>
      </div>

      <div className="text-xs">
        <label className="font-mono text-[#54534F] block mb-1">Hero Tagline</label>
        <input
          type="text"
          value={profile.heroTagline}
          onChange={(e) => setProfile({ ...profile, heroTagline: e.target.value })}
          className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
        />
      </div>

      <div className="text-xs">
        <label className="font-mono text-[#54534F] block mb-1">Hero Bio</label>
        <textarea
          rows={3}
          value={profile.heroBio}
          onChange={(e) => setProfile({ ...profile, heroBio: e.target.value })}
          className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
        />
      </div>

      <div className="text-xs">
        <label className="font-mono text-[#54534F] block mb-1">Availability Status Badge</label>
        <input
          type="text"
          value={profile.statusBadge}
          onChange={(e) => setProfile({ ...profile, statusBadge: e.target.value })}
          className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          placeholder="Open for Opportunities"
        />
      </div>

      {/* About Section Custom Content */}
      <div className="pt-4 border-t border-[#EAE8E2] space-y-4 text-xs">
        <h3 className="font-semibold text-sm text-[#111110]">About Section Paragraphs</h3>
        <div>
          <label className="font-mono text-[#54534F] block mb-1">About Paragraph 1</label>
          <textarea
            rows={3}
            value={profile.aboutParagraph1 || ""}
            onChange={(e) => setProfile({ ...profile, aboutParagraph1: e.target.value })}
            className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          />
        </div>
        <div>
          <label className="font-mono text-[#54534F] block mb-1">About Paragraph 2</label>
          <textarea
            rows={3}
            value={profile.aboutParagraph2 || ""}
            onChange={(e) => setProfile({ ...profile, aboutParagraph2: e.target.value })}
            className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          />
        </div>
      </div>

      {/* Social and Contact Links */}
      <div className="pt-4 border-t border-[#EAE8E2] space-y-4 text-xs">
        <h3 className="font-semibold text-sm text-[#111110]">Contact & Social Profiles</h3>
        
        {/* Dedicated Resume Upload Section */}
        <div className="p-4 rounded-[4px] border border-[#E0DCD3] bg-[#FAF9F6]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#111110]">
                  Resume Document
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#14A800]/10 text-[#14A800] font-medium">
                  PDF / DOC
                </span>
              </div>
              <p className="text-xs text-[#54534F] flex flex-wrap items-center gap-2">
                <span>Active File:</span>
                <code className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#E0DCD3] text-[#111110]">
                  {profile.resumeUrl || "None configured"}
                </code>
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#14A800] hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>View / Test Resume</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input
                type="file"
                ref={resumeFileInputRef}
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx,application/pdf"
                className="hidden"
              />
              <button
                type="button"
                disabled={uploadingResume}
                onClick={() => resumeFileInputRef.current?.click()}
                className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {uploadingResume ? (
                  <>
                    <span className="animate-spin text-sm">↻</span>
                    <span>Uploading Resume...</span>
                  </>
                ) : (
                  <>
                    <span>⬆</span>
                    <span>Upload New Resume</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowManualUrl((v) => !v)}
                className="text-xs font-mono text-[#787772] hover:text-[#111110] px-2 py-1 underline cursor-pointer"
              >
                {showManualUrl ? "Hide URL" : "Edit URL"}
              </button>
            </div>
          </div>

          {/* Optional manual URL override input */}
          {showManualUrl && (
            <div className="mt-3 pt-3 border-t border-[#E8E6E0]">
              <label className="font-mono text-[11px] text-[#54534F] block mb-1">
                Manual URL / External Link
              </label>
              <input
                type="text"
                value={profile.resumeUrl}
                onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                placeholder="/resume.pdf or https://..."
                className="w-full p-2 bg-[#FFFFFF] border border-[#E3E1DB] rounded text-xs font-mono text-[#111110]"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[#54534F] block mb-1">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
            />
          </div>
          <div>
            <label className="font-mono text-[#54534F] block mb-1">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
            />
          </div>
          <div>
            <label className="font-mono text-[#54534F] block mb-1">GitHub Profile URL</label>
            <input
              type="url"
              value={profile.githubUrl}
              onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
              className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
            />
          </div>
          <div>
            <label className="font-mono text-[#54534F] block mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={profile.linkedinUrl}
              onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
              className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#EAE8E2] flex justify-end">
        <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 px-5 cursor-pointer">
          {saving ? "Saving Changes..." : "Save Profile & Hero Changes ✓"}
        </button>
      </div>
    </form>
  )
}

/* ─── Experience & Education Tab ─── */
function ExperienceTabForm({
  experiences,
  education,
  saving,
  onSave,
}: {
  experiences: ExperienceItem[]
  education: EducationItem[]
  saving: boolean
  onSave: (exp: ExperienceItem[], edu: EducationItem[]) => void
}) {
  const [expList, setExpList] = useState(experiences)
  const [eduList, setEduList] = useState(education)

  const handleAddExperience = () => {
    setExpList([
      {
        company: "New Company",
        role: "Full-Stack Developer",
        period: "2024 — Present",
        description: "Built scalable web architectures and client-facing digital products.",
        highlightBullet: "Engineered core APIs and improved application latency.",
        contributions: ["Architected microservices", "Implemented responsive UI"],
      },
      ...expList,
    ])
  }

  const handleDeleteExp = (index: number) => {
    setExpList(expList.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Experience History */}
      <div className="bg-[#FFFFFF] border border-[#E3E1DB] p-6 sm:p-8 rounded-[4px] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE8E2] pb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111110]">Work Experience Timeline</h2>
            <p className="text-xs text-[#54534F] mt-0.5">Edit commercial roles, company names, and bullet points.</p>
          </div>
          <button onClick={handleAddExperience} className="btn-primary text-xs py-1.5 px-3 cursor-pointer">
            + Add Role
          </button>
        </div>

        <div className="space-y-6">
          {expList.map((item, idx) => (
            <div key={idx} className="p-4 bg-[#F9F8F5] border border-[#E3E1DB] rounded space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#14A800]">Role #{idx + 1}</span>
                <button
                  onClick={() => handleDeleteExp(idx)}
                  className="text-xs text-red-600 hover:underline cursor-pointer"
                >
                  Delete Role
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Company</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => {
                      const updated = [...expList]
                      updated[idx].company = e.target.value
                      setExpList(updated)
                    }}
                    className="w-full p-2 bg-[#FFFFFF] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Role Title</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => {
                      const updated = [...expList]
                      updated[idx].role = e.target.value
                      setExpList(updated)
                    }}
                    className="w-full p-2 bg-[#FFFFFF] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[#54534F] block mb-1">Period (e.g. 2023 — Present)</label>
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) => {
                      const updated = [...expList]
                      updated[idx].period = e.target.value
                      setExpList(updated)
                    }}
                    className="w-full p-2 bg-[#FFFFFF] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[#54534F] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...expList]
                    updated[idx].description = e.target.value
                    setExpList(updated)
                  }}
                  className="w-full p-2 bg-[#FFFFFF] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                />
              </div>

              <div>
                <label className="font-mono text-[#54534F] block mb-1">Highlight Bullet</label>
                <input
                  type="text"
                  value={item.highlightBullet}
                  onChange={(e) => {
                    const updated = [...expList]
                    updated[idx].highlightBullet = e.target.value
                    setExpList(updated)
                  }}
                  className="w-full p-2 bg-[#FFFFFF] border border-[#E3E1DB] rounded text-xs text-[#111110]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#EAE8E2] flex justify-end">
          <button
            onClick={() => onSave(expList, eduList)}
            disabled={saving}
            className="btn-primary text-xs py-2.5 px-5 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Experience & Education ✓"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── SEO & Social Metadata Tab ─── */
function SEOTabForm({
  initialSEO,
  saving,
  onSave,
}: {
  initialSEO: SiteData["seo"]
  saving: boolean
  onSave: (seo: SiteData["seo"]) => void
}) {
  const [seo, setSeo] = useState(initialSEO)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(seo)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl">
      {/* Form Column */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#FFFFFF] border border-[#E3E1DB] p-6 sm:p-8 rounded-[4px] shadow-sm space-y-5 text-xs">
        <div className="border-b border-[#EAE8E2] pb-4">
          <h2 className="text-lg font-semibold text-[#111110]">SEO & Meta Tags</h2>
          <p className="text-xs text-[#54534F] mt-0.5">
            Optimize how your portfolio ranks on Google and displays when shared on LinkedIn or Twitter.
          </p>
        </div>

        <div>
          <label className="font-mono text-[#54534F] block mb-1">Global Meta Title</label>
          <input
            type="text"
            required
            value={seo.siteTitle}
            onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
            className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          />
        </div>

        <div>
          <label className="font-mono text-[#54534F] block mb-1">Meta Description (150-160 characters)</label>
          <textarea
            rows={3}
            required
            value={seo.metaDescription}
            onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
            className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-sm text-[#111110]"
          />
        </div>

        <div>
          <label className="font-mono text-[#54534F] block mb-1">SEO Keywords (comma-separated)</label>
          <input
            type="text"
            value={seo.keywords.join(", ")}
            onChange={(e) =>
              setSeo({
                ...seo,
                keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            className="w-full p-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[#54534F] block mb-1">Canonical URL</label>
            <input
              type="url"
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
            />
          </div>
          <div>
            <label className="font-mono text-[#54534F] block mb-1">Twitter / X Handle</label>
            <input
              type="text"
              value={seo.twitterHandle}
              onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
              className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[#54534F] block mb-1">OpenGraph Social Share Image Path</label>
          <input
            type="text"
            value={seo.ogImage}
            onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
            className="w-full p-2 bg-[#F9F8F5] border border-[#E3E1DB] rounded text-xs text-[#111110]"
          />
        </div>

        <div className="pt-4 border-t border-[#EAE8E2] flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 px-5 cursor-pointer">
            {saving ? "Saving SEO..." : "Save SEO Settings ✓"}
          </button>
        </div>
      </form>

      {/* Live Previews Column */}
      <div className="lg:col-span-5 space-y-6">
        {/* Google Snippet Live Preview */}
        <div className="bg-[#FFFFFF] border border-[#E3E1DB] p-6 rounded-[4px] shadow-sm space-y-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#14A800] font-semibold block">
            Google Search Preview
          </span>
          <div className="p-4 bg-[#F9F8F5] rounded border border-[#EAE8E2] space-y-1">
            <div className="text-[11px] font-mono text-[#1a0dab] truncate">
              {seo.canonicalUrl}
            </div>
            <div className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium line-clamp-1">
              {seo.siteTitle}
            </div>
            <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
              {seo.metaDescription}
            </div>
          </div>
        </div>

        {/* Social Card Preview */}
        <div className="bg-[#FFFFFF] border border-[#E3E1DB] p-6 rounded-[4px] shadow-sm space-y-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#14A800] font-semibold block">
            Social Share Card Preview
          </span>
          <div className="rounded border border-[#EAE8E2] overflow-hidden bg-[#F9F8F5]">
            <div className="aspect-[1.91/1] bg-[#1E1E1C] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={seo.ogImage}
                alt="Social Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-[#FFFFFF] space-y-1">
              <div className="text-[10px] font-mono text-[#706E68] uppercase">
                {new URL(seo.canonicalUrl || "https://shoaibdeve.me").hostname}
              </div>
              <div className="text-xs font-semibold text-[#111110] line-clamp-1">
                {seo.siteTitle}
              </div>
              <div className="text-[11px] text-[#54534F] line-clamp-2">
                {seo.metaDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
