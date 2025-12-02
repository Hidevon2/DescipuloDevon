"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    <div className={`${bgColor} border-4 border-purple-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] mb-4`}>
      {/* Window Title Bar */}
      <div className="bg-purple-900 px-2 py-1 flex items-center justify-between border-b-4 border-purple-950">
        <div className="flex items-center gap-2">
          <span className={`${textColor} font-bold text-xs uppercase font-mono`}>{title}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600"></div>
          <div className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600"></div>
          <div className="w-3 h-3 bg-red-500 border-2 border-red-700"></div>
        </div>
      </div>
      {/* Window Content */}
      <div className={`p-4 ${textColor}`}>
        {children}
      </div>
    </div>
  );
};

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setProjects(data.projects || []);
      } catch (e) {
        console.error('Error loading projects:', e);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-purple-950 p-4 font-mono" style={{ background: '#1a0d2e' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title Bar */}
        <div className="bg-purple-900 px-4 py-2 mb-4 border-4 border-purple-950 flex items-center justify-between">
          <h1 className="text-yellow-400 font-bold text-xl uppercase tracking-wider">MY WORKS</h1>
          <Link
            href="/"
            className="px-4 py-1 border-2 border-purple-950 font-bold text-sm uppercase bg-yellow-400 text-purple-900 hover:bg-yellow-500 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} /> BACK
          </Link>
        </div>

        {projects.length === 0 ? (
          <Window title="NO PROJECTS" bgColor="bg-yellow-300" textColor="text-purple-900">
            <p className="text-center text-lg">No projects found. Go back to add some projects!</p>
          </Window>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Window key={project.id} title={project.name.toUpperCase()} bgColor="bg-yellow-300" textColor="text-purple-900">
                <div className="space-y-3">
                  {project.image && (
                    <div className="border-2 border-purple-900 p-1 bg-white">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover pixelated"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{project.description}</p>
                </div>
              </Window>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

