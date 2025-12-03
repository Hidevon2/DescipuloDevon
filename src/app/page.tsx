"use client";
import React, { useState, useEffect } from 'react';
import { Edit3, Save } from 'lucide-react';
import Link from 'next/link';

// Editable Field Component
const EditableField = ({ 
  isEditing, 
  value, 
  onChange, 
  className = "", 
  type = "text",
  placeholder = "",
  multiline = false 
}: {
  isEditing: boolean;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
}) => {
  if (!isEditing) {
    return <span className={className}>{value || placeholder}</span>;
  }
  
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white border-2 border-purple-800 text-purple-900 px-2 py-1 w-full font-mono text-sm ${className}`}
        rows={4}
        placeholder={placeholder}
      />
    );
  }
  
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-white border-2 border-purple-800 text-purple-900 px-2 py-1 w-full font-mono text-sm ${className}`}
      placeholder={placeholder}
    />
  );
};

// Window Component (retro style)
const Window = ({ 
  title, 
  children, 
  bgColor = "bg-purple-200",
  textColor = "text-purple-900"
}: {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <div className={`${bgColor} border-4 border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] mb-4`}>
      {/* Window Title Bar */}
      <div className="bg-purple-900 px-2 py-1 flex items-center justify-between border-b-4 border-purple-950">
        <div className="flex items-center gap-2">
          <span className={`text-yellow-400 font-bold text-xs uppercase font-mono pixel-text`} style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)', letterSpacing: '0.05em' }}>{title}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 border-2 border-red-700"></div>
          <div className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600"></div>
          <div className="w-3 h-3 bg-green-500 border-2 border-green-700"></div>
        </div>
      </div>
      {/* Window Content */}
      <div className={`p-4 ${textColor}`}>
        {children}
      </div>
    </div>
  );
};

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "Devon T, Descipulo",
    email: "devondescipulo10@gmail.com",
    address: "Purok Atabay, Poblacion Cordova Cebu",
    phone: "09927906590",
    profileImage: "https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/550673593_777286871582996_4927051170355230655_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEtkwiZTI0bthoXcS6XmS8_pmfaCtivLuKmZ9oK2K8u4n9j6_E00NGOE2rkZ_unP5I5K5mk7aN3jvsl_vjcwW6f&_nc_ohc=-YB71gTir-YQ7kNvwHN5yGj&_nc_oc=AdktQj0lfhFfOWfZKtDEBFG_qOkWYRV6Zc0VjYLB_9Nirj7gu7vcnlBUlZoI4UlCVtvrGPrv0jnE57WuMr_ljT2l&_nc_zt=23&_nc_ht=scontent.fceb1-1.fna&_nc_gid=ezPGvofHQqLPaPn7ob1amg&oh=00_AfnrbJcKAOWbC1UK4dMcJXdbG3b9hiqojrIooOJ5_D7zCQ&oe=693532E2",
    aboutMe: "Currently studying fourth semester of Graphic Design, I am passionate about music which I sing, in the afternoons I do physical activity and listen to music. In my free time I dance as I had the opportunity to be in several dance schools, although I am no longer part of any, I do it at home.",
    certificates: [
      { id: 1, name: "Graphic Design Certificate", issuer: "", year: "2022" },
      { id: 2, name: "Web Design Fundamentals", issuer: "", year: "2023" }
    ],
    skills: [
      { id: 1, name: "HTML", icon: "🔶" },
      { id: 2, name: "CSS", icon: "🔵" },
      { id: 3, name: "JavaScript", icon: "🟡" },
      { id: 4, name: "React", icon: "⚛️" },
      { id: 5, name: "Next.js", icon: "▲" },
      { id: 6, name: "Tailwind CSS", icon: "💨" },
      { id: 7, name: "GitHub", icon: "🐙" },
      { id: 8, name: "Git", icon: "💎" }
    ],
    projects: [
      { 
        id: 1, 
        name: "E-commerce Website", 
        description: "E-commerce website for a local business",
        image: "https://i.pinimg.com/736x/20/14/5c/20145c8255cb6bf01e30ddcf9a790985.jpg",
        link: "https://lazappyv3.vercel.app/"
      },
      
    ]
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setResumeData(data);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isEditing) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData, isEditing]);

  const updateField = (field: string, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    const updated = [...resumeData.certificates];
    updated[index] = { ...updated[index], [field]: value };
    updateField('certificates', updated);
  };

  const addCertificate = () => {
    const newCert = { id: Date.now(), name: "", issuer: "", year: "" };
    updateField('certificates', [...resumeData.certificates, newCert]);
  };

  const removeCertificate = (id: number) => {
    updateField('certificates', resumeData.certificates.filter(c => c.id !== id));
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...resumeData.projects];
    updated[index] = { ...updated[index], [field]: value };
    updateField('projects', updated);
  };

  const addProject = () => {
    const newProject = { id: Date.now(), name: "", description: "", image: "", link: "" };
    updateField('projects', [...resumeData.projects, newProject]);
  };

  const removeProject = (id: number) => {
    updateField('projects', resumeData.projects.filter(p => p.id !== id));
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updated = [...resumeData.skills];
    updated[index] = { ...updated[index], [field]: value };
    updateField('skills', updated);
  };

  const addSkill = () => {
    const newSkill = { id: Date.now(), name: "", icon: "🔷" };
    updateField('skills', [...resumeData.skills, newSkill]);
  };

  const removeSkill = (id: number) => {
    updateField('skills', resumeData.skills.filter(s => s.id !== id));
  };

  return (
    <main className="min-h-screen bg-purple-950 p-4 font-mono" style={{ background: '#1a0d2e' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title Bar */}
        <div className="bg-purple-900 px-4 py-2 mb-4 border-4 border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-yellow-400 font-bold text-xl uppercase tracking-wider pixel-text" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)', letterSpacing: '0.05em' }}>MY RESUME</h1>
            <Link
              href="/fcfs"
              className="px-3 py-1 border-2 border-purple-950 font-bold text-xs uppercase bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            >
              FCFS SIMULATOR
            </Link>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-1 border-2 border-purple-950 font-bold text-sm uppercase ${
              isEditing 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-yellow-400 text-purple-900 hover:bg-yellow-500'
            } transition-colors`}
          >
            {isEditing ? <><Save size={14} className="inline mr-1" /> SAVE</> : <><Edit3 size={14} className="inline mr-1" /> EDIT</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* About Me Window */}
            <Window title="WWW.ABOUTME.COM" bgColor="bg-purple-200" textColor="text-purple-900">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-yellow-600 mb-2 uppercase">
                      <EditableField
                        isEditing={isEditing}
                        value={resumeData.name}
                        onChange={(val) => updateField('name', val)}
                        className="text-2xl font-bold text-yellow-600"
                      />
                    </h2>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✉</span>
                      <EditableField
                        isEditing={isEditing}
                        value={resumeData.email}
                        onChange={(val) => updateField('email', val)}
                        type="email"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏠</span>
                      <EditableField
                        isEditing={isEditing}
                        value={resumeData.address}
                        onChange={(val) => updateField('address', val)}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📞</span>
                      <EditableField
                        isEditing={isEditing}
                        value={resumeData.phone}
                        onChange={(val) => updateField('phone', val)}
                        type="tel"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  {isEditing && (
                    <div className="mb-2 w-full">
                      <input
                        type="text"
                        value={resumeData.profileImage}
                        onChange={(e) => updateField('profileImage', e.target.value)}
                        placeholder="Image URL"
                        className="w-full bg-white border-2 border-purple-800 text-purple-900 px-2 py-1 text-xs"
                      />
                    </div>
                  )}
                    <div className="border-4 border-purple-900 p-2 bg-white">
                    <img
                      src={resumeData.profileImage}
                      alt="Profile"
                      className="w-full h-auto object-cover pixelated"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
              </div>
            </Window>

            {/* About Me Text Window */}
            <Window title="ABOUT ME" bgColor="bg-purple-200" textColor="text-purple-900">
              <EditableField
                isEditing={isEditing}
                value={resumeData.aboutMe}
                onChange={(val) => updateField('aboutMe', val)}
                multiline={true}
                className="text-sm leading-relaxed"
                placeholder="Write about yourself here..."
              />
            </Window>

            {/* Certificates Window */}
            <Window title="CERTIFICATES" bgColor="bg-yellow-300" textColor="text-purple-900">
              <div className="space-y-3">
                {resumeData.certificates.map((cert, index) => (
                  <div key={cert.id} className="bg-white border-2 border-purple-900 p-3 relative">
                    {isEditing && (
                      <button
                        onClick={() => removeCertificate(cert.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                    <div className="space-y-2">
                      <EditableField
                        isEditing={isEditing}
                        value={cert.name}
                        onChange={(val) => updateCertificate(index, 'name', val)}
                        className="font-bold text-sm"
                        placeholder="Certificate Name"
                      />
                      <EditableField
                        isEditing={isEditing}
                        value={cert.issuer}
                        onChange={(val) => updateCertificate(index, 'issuer', val)}
                        className="text-xs"
                        placeholder="Issuing Organization"
                      />
                      <EditableField
                        isEditing={isEditing}
                        value={cert.year}
                        onChange={(val) => updateCertificate(index, 'year', val)}
                        className="text-xs"
                        placeholder="Year"
                      />
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addCertificate}
                    className="w-full bg-purple-600 text-white py-2 font-bold text-sm uppercase border-2 border-purple-900 hover:bg-purple-700"
                  >
                    + ADD CERTIFICATE
                  </button>
                )}
              </div>
            </Window>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Skills Window */}
            <Window title="🔧 SKILLS" bgColor="bg-purple-200" textColor="text-purple-900">
              <div className="rounded-lg p-4 border-2 border-purple-800" style={{ background: '#2d1b4e' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 text-xl">🔧</span>
                  <h3 className="text-white font-bold text-lg pixel-text" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)', letterSpacing: '0.05em' }}>Skills</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="relative">
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full z-10"
                        >
                          ×
                        </button>
                      )}
                      <div className="bg-gray-700 border border-gray-500 rounded-full px-3 py-2 flex items-center gap-2 hover:bg-gray-600 transition-colors">
                        {isEditing ? (
                          <div className="flex items-center gap-2 w-full">
                            <input
                              type="text"
                              value={skill.icon}
                              onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                              className="w-6 bg-gray-600 text-white text-xs border border-gray-500 rounded px-1"
                              placeholder="🔷"
                            />
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkill(index, 'name', e.target.value)}
                              className="flex-1 bg-gray-600 text-white text-xs border border-gray-500 rounded px-2 py-1"
                              placeholder="Skill Name"
                            />
                          </div>
                        ) : (
                          <>
                            <span className="text-sm">{skill.icon}</span>
                            <span className="text-white text-sm font-medium">{skill.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <button
                    onClick={addSkill}
                    className="mt-4 w-full bg-gray-700 text-white py-2 font-bold text-sm uppercase border border-gray-500 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    + ADD SKILL
                  </button>
                )}
              </div>
            </Window>

            {/* Projects Window */}
            <Window title="PROJECTS" bgColor="bg-yellow-300" textColor="text-purple-900">
              <div className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={project.id} className="bg-white border-2 border-purple-900 p-3 relative">
                    {isEditing && (
                      <button
                        onClick={() => removeProject(project.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                    <div className="space-y-2">
                      <EditableField
                        isEditing={isEditing}
                        value={project.name}
                        onChange={(val) => updateProject(index, 'name', val)}
                        className="font-bold text-sm"
                        placeholder="Project Name"
                      />
                      <EditableField
                        isEditing={isEditing}
                        value={project.description}
                        onChange={(val) => updateProject(index, 'description', val)}
                        multiline={true}
                        className="text-xs"
                        placeholder="Project Description"
                      />
                      {isEditing && (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={project.image}
                            onChange={(e) => updateProject(index, 'image', e.target.value)}
                            placeholder="Project Image URL"
                            className="w-full bg-white border-2 border-purple-800 text-purple-900 px-2 py-1 text-xs"
                          />
                          <input
                            type="text"
                            value={project.link}
                            onChange={(e) => updateProject(index, 'link', e.target.value)}
                            placeholder="Project Link (use /projects for internal page)"
                            className="w-full bg-white border-2 border-purple-800 text-purple-900 px-2 py-1 text-xs"
                          />
                        </div>
                      )}
                      {project.image && (
                        <div className="border-2 border-purple-900 p-1 bg-white">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-32 object-cover pixelated"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                      )}
                      {project.link && !isEditing && (
                        <Link
                          href={project.link}
                          className="inline-block bg-purple-600 text-white px-3 py-1 text-xs font-bold uppercase border-2 border-purple-900 hover:bg-purple-700 transition-colors"
                        >
                          VIEW PROJECT →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addProject}
                    className="w-full bg-purple-600 text-white py-2 font-bold text-sm uppercase border-2 border-purple-900 hover:bg-purple-700"
                  >
                    + ADD PROJECT
                  </button>
                )}
              </div>
            </Window>
          </div>
        </div>
      </div>
    </main>
  );
}
