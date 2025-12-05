"use client";
import React from 'react';
import Link from 'next/link';

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
  // ---------------------------------------------------------
  // EDIT YOUR DETAILS HERE
  // ---------------------------------------------------------
  const resumeData = {
    name: "Devon T, Descipulo",
    email: "devondescipulo10@gmail.com",
    address: "Purok Atabay, Poblacion Cordova Cebu",
    phone: "09927906590",
    profileImage: "https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/550673593_777286871582996_4927051170355230655_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEtkwiZTI0bthoXcS6XmS8_pmfaCtivLuKmZ9oK2K8u4n9j6_E00NGOE2rkZ_unP5I5K5mk7aN3jvsl_vjcwW6f&_nc_ohc=-YB71gTir-YQ7kNvwHN5yGj&_nc_oc=AdktQj0lfhFfOWfZKtDEBFG_qOkWYRV6Zc0VjYLB_9Nirj7gu7vcnlBUlZoI4UlCVtvrGPrv0jnE57WuMr_ljT2l&_nc_zt=23&_nc_ht=scontent.fceb1-1.fna&_nc_gid=ezPGvofHQqLPaPn7ob1amg&oh=00_AfnrbJcKAOWbC1UK4dMcJXdbG3b9hiqojrIooOJ5_D7zCQ&oe=693532E2",
    aboutMe: "I am passionate about music which I sing, in the afternoons I do physical activity and listen to music. In my free time I dance as I had the opportunity to be in several dance schools, although I am no longer part of any, I do it at home.",
    certificates: [
      { id: 1, name: "Creative web Design Certificate", issuer: "TESDA", year: "2023" },
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
    ],
    education: [
      { id: 1, startYear: "2023", endYear: "Present", institution: "Cordova Public College" },
      { id: 2, startYear: "2022", endYear: "2023", institution: "Cordova National High School (SHS)" },
      { id: 3, startYear: "2018", endYear: "2020", institution: "Cordova National High School (JHS)" },
      { id: 4, startYear: "2011", endYear: "2016", institution: "Yati Elementary School" }
    ],
    workExperience: [
      { id: 1, company: "CASADYA", startYear: "2025", endYear: "Present" },
      { id: 2, company: "UBEST", startYear: "2024", endYear: "2025" }
    ]
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
          {/* Edit button removed */}
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
                      {resumeData.name}
                    </h2>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✉</span>
                      <span className="flex-1">{resumeData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏠</span>
                      <span className="flex-1">{resumeData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📞</span>
                      <span className="flex-1">{resumeData.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
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
              <span className="text-sm leading-relaxed whitespace-pre-wrap">
                {resumeData.aboutMe}
              </span>
            </Window>

            {/* Certificates Window */}
            <Window title="CERTIFICATES" bgColor="bg-yellow-300" textColor="text-purple-900">
              <div className="space-y-3">
                {resumeData.certificates.map((cert) => (
                  <div key={cert.id} className="bg-white border-2 border-purple-900 p-3 relative">
                    <div className="space-y-2">
                      <div className="font-bold text-sm">{cert.name}</div>
                      <div className="text-xs">{cert.issuer}</div>
                      <div className="text-xs">{cert.year}</div>
                    </div>
                  </div>
                ))}
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
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="relative">
                      <div className="bg-gray-700 border border-gray-500 rounded-full px-3 py-2 flex items-center gap-2 hover:bg-gray-600 transition-colors">
                        <span className="text-sm">{skill.icon}</span>
                        <span className="text-white text-sm font-medium">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Window>

            {/* Projects Window */}
            <Window title="PROJECTS" bgColor="bg-yellow-300" textColor="text-purple-900">
              <div className="space-y-4">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="bg-white border-2 border-purple-900 p-3 relative">
                    <div className="space-y-2">
                      <div className="font-bold text-sm">{project.name}</div>
                      <div className="text-xs whitespace-pre-wrap">{project.description}</div>
                      
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
                      {project.link && (
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
              </div>
            </Window>
          </div>
        </div>

        {/* Education and Work Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Education Window */}
          <Window title="EDUCATION" bgColor="bg-purple-200" textColor="text-purple-900">
            <div className="space-y-3">
              {(resumeData.education || []).map((edu) => (
                <div key={edu.id} className="relative">
                  <div className="bg-purple-600 text-white px-3 py-2 border-2 border-purple-900 mb-2">
                    <span className="font-bold text-sm uppercase">
                      {edu.startYear} - {edu.endYear} - {edu.institution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Window>

          {/* Work Experience Window */}
          <Window title="WORK EXPERIENCE" bgColor="bg-purple-200" textColor="text-purple-900">
            <div className="space-y-3">
              {(resumeData.workExperience || []).map((work) => (
                <div key={work.id} className="relative">
                  <div className="bg-purple-600 text-white px-3 py-2 border-2 border-purple-900 mb-2">
                    <span className="font-bold text-sm uppercase">
                        {work.company} | {work.startYear} - {work.endYear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Window>
        </div>
      </div>
    </main>
  );
}