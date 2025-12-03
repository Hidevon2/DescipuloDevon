"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Rocket, RotateCcw, Plus } from 'lucide-react';

// Window Component (retro style - matching resume)
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
          <span className={`text-yellow-400 font-bold text-xs uppercase font-mono`}>{title}</span>
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

interface Process {
  id: number;
  arrivalTime: number;
  burstTime: number;
}

interface ProcessResult {
  process: string;
  arrivalTime: number;
  burstTime: number;
  startTime: number;
  finishTime: number;
  waitingTime: number;
  turnaroundTime: number;
}

export default function FCFSPage() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, arrivalTime: 0, burstTime: 5 },
    { id: 2, arrivalTime: 1, burstTime: 3 },
    { id: 3, arrivalTime: 2, burstTime: 8 }
  ]);
  const [results, setResults] = useState<ProcessResult[]>([]);
  const [ganttChart, setGanttChart] = useState<Array<{process: string, start: number, end: number}>>([]);
  const [avgWaitingTime, setAvgWaitingTime] = useState(0);
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState(0);

  const updateProcess = (id: number, field: 'arrivalTime' | 'burstTime', value: number) => {
    setProcesses(prev => 
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const addProcess = () => {
    const newId = Math.max(...processes.map(p => p.id), 0) + 1;
    setProcesses([...processes, { id: newId, arrivalTime: 0, burstTime: 1 }]);
  };

  const removeProcess = (id: number) => {
    if (processes.length > 1) {
      setProcesses(processes.filter(p => p.id !== id));
    }
  };

  const reset = () => {
    setProcesses([
      { id: 1, arrivalTime: 0, burstTime: 5 },
      { id: 2, arrivalTime: 1, burstTime: 3 },
      { id: 3, arrivalTime: 2, burstTime: 8 }
    ]);
    setResults([]);
    setGanttChart([]);
    setAvgWaitingTime(0);
    setAvgTurnaroundTime(0);
  };

  const simulateFCFS = () => {
    // Sort processes by arrival time
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    const newResults: ProcessResult[] = [];
    const newGanttChart: Array<{process: string, start: number, end: number}> = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    sorted.forEach((process, index) => {
      const startTime = Math.max(currentTime, process.arrivalTime);
      const finishTime = startTime + process.burstTime;
      const waitingTime = startTime - process.arrivalTime;
      const turnaroundTime = finishTime - process.arrivalTime;

      newResults.push({
        process: `P${process.id}`,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        startTime,
        finishTime,
        waitingTime,
        turnaroundTime
      });

      newGanttChart.push({
        process: `P${process.id}`,
        start: startTime,
        end: finishTime
      });

      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;
      currentTime = finishTime;
    });

    setResults(newResults);
    setGanttChart(newGanttChart);
    setAvgWaitingTime(totalWaitingTime / sorted.length);
    setAvgTurnaroundTime(totalTurnaroundTime / sorted.length);
  };

  const maxTime = ganttChart.length > 0 
    ? Math.max(...ganttChart.map(g => g.end))
    : processes.reduce((sum, p) => sum + p.burstTime + p.arrivalTime, 0);

  return (
    <main className="min-h-screen bg-purple-950 p-4 font-mono" style={{ background: '#1a0d2e' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-yellow-400 font-bold text-3xl uppercase tracking-wider pixel-text">
              FCFS Scheduling Simulator
            </h1>
            <Link
              href="/"
              className="px-4 py-1 border-2 border-purple-950 font-bold text-sm uppercase bg-yellow-400 text-purple-900 hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={14} /> HOME
            </Link>
          </div>
          <div className="h-1 bg-purple-700"></div>
        </div>

        {/* Input Parameters Window */}
        <Window title="⚙ Input Parameters" bgColor="bg-purple-200" textColor="text-purple-900">
          <div className="space-y-4">
            <div className="text-purple-700 text-sm font-mono">
              <p><strong>Algorithm:</strong> First Come, First Served (FCFS)</p>
              <p><strong>Max Time Unit:</strong> 500ms</p>
              <p className="text-purple-600">FCFS is inherently non-preemptive.</p>
            </div>

            {/* Process Table */}
            <div className="bg-white border-2 border-purple-900">
              <div className="grid grid-cols-5 gap-2 p-2 bg-purple-900 text-yellow-400 text-xs font-bold uppercase">
                <div>P</div>
                <div>Arrival Time (ms)</div>
                <div>Burst Time (ms)</div>
                <div>Action</div>
              </div>
              {processes.map((process) => (
                <div key={process.id} className="grid grid-cols-5 gap-2 p-2 border-t-2 border-purple-900 items-center bg-purple-50">
                  <div className="text-purple-900 font-bold">P{process.id}</div>
                  <input
                    type="number"
                    value={process.arrivalTime}
                    onChange={(e) => updateProcess(process.id, 'arrivalTime', parseInt(e.target.value) || 0)}
                    className="bg-white text-purple-900 px-2 py-1 border-2 border-purple-800 text-sm font-mono"
                    placeholder="e.g., 0"
                    min="0"
                  />
                  <input
                    type="number"
                    value={process.burstTime}
                    onChange={(e) => updateProcess(process.id, 'burstTime', parseInt(e.target.value) || 1)}
                    className="bg-white text-purple-900 px-2 py-1 border-2 border-purple-800 text-sm font-mono"
                    placeholder="e.g., 5"
                    min="1"
                  />
                  <button
                    onClick={() => removeProcess(process.id)}
                    disabled={processes.length === 1}
                    className="bg-red-600 text-white px-3 py-1 border-2 border-red-800 text-xs font-bold uppercase hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={simulateFCFS}
                className="bg-purple-600 text-white px-6 py-2 border-2 border-purple-900 font-bold text-sm uppercase flex items-center gap-2 hover:bg-purple-700 transition-colors"
              >
                <Rocket size={16} /> SIMULATE FCFS
              </button>
              <button
                onClick={addProcess}
                className="bg-yellow-400 text-purple-900 px-4 py-2 border-2 border-purple-900 font-bold text-sm uppercase flex items-center gap-2 hover:bg-yellow-500 transition-colors"
              >
                <Plus size={16} /> Add Process
              </button>
              <button
                onClick={reset}
                className="bg-yellow-400 text-purple-900 px-4 py-2 border-2 border-purple-900 font-bold text-sm uppercase flex items-center gap-2 hover:bg-yellow-500 transition-colors"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </Window>

        {/* Results Window */}
        {results.length > 0 && (
          <>
            <Window title="📊 Simulation Results" bgColor="bg-purple-200" textColor="text-purple-900">
              <div className="space-y-4">
                {/* Results Table */}
                <div className="bg-white border-2 border-purple-900 overflow-x-auto">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="bg-purple-900 text-yellow-400">
                        <th className="p-2 border-2 border-purple-950">Process</th>
                        <th className="p-2 border-2 border-purple-950">Arrival</th>
                        <th className="p-2 border-2 border-purple-950">Burst</th>
                        <th className="p-2 border-2 border-purple-950">Start</th>
                        <th className="p-2 border-2 border-purple-950">Finish</th>
                        <th className="p-2 border-2 border-purple-950">Waiting</th>
                        <th className="p-2 border-2 border-purple-950">Turnaround</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                          <td className="p-2 border-2 border-purple-900 text-center font-bold text-purple-900">{result.process}</td>
                          <td className="p-2 border-2 border-purple-900 text-center text-purple-900">{result.arrivalTime}</td>
                          <td className="p-2 border-2 border-purple-900 text-center text-purple-900">{result.burstTime}</td>
                          <td className="p-2 border-2 border-purple-900 text-center text-purple-900">{result.startTime}</td>
                          <td className="p-2 border-2 border-purple-900 text-center text-purple-900">{result.finishTime}</td>
                          <td className="p-2 border-2 border-purple-900 text-center text-purple-900">{result.waitingTime}</td>
                          <td className="p-2 border-2 border-purple-900 text-center text-purple-900">{result.turnaroundTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Average Times */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-purple-900 p-4">
                    <div className="text-purple-700 text-xs uppercase mb-1 font-bold">Average Waiting Time</div>
                    <div className="text-2xl font-bold text-purple-900">{avgWaitingTime.toFixed(2)} ms</div>
                  </div>
                  <div className="bg-white border-2 border-purple-900 p-4">
                    <div className="text-purple-700 text-xs uppercase mb-1 font-bold">Average Turnaround Time</div>
                    <div className="text-2xl font-bold text-purple-900">{avgTurnaroundTime.toFixed(2)} ms</div>
                  </div>
                </div>
              </div>
            </Window>

            {/* Gantt Chart Window */}
            <Window title="📈 Gantt Chart" bgColor="bg-purple-200" textColor="text-purple-900">
              <div className="space-y-4">
                <div className="bg-white border-2 border-purple-900 p-4 overflow-x-auto">
                  <div className="flex items-center gap-1 min-w-max">
                    {ganttChart.map((item, index) => {
                      const colors = ['bg-purple-600', 'bg-yellow-400', 'bg-green-500', 'bg-cyan-500', 'bg-pink-500'];
                      const color = colors[index % colors.length];
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`${color} border-2 border-purple-900 text-white text-xs font-bold px-2 py-1 min-w-[60px] text-center`}>
                            {item.process}
                          </div>
                          <div className="text-xs text-purple-700 mt-1 font-mono">{item.start}</div>
                        </div>
                      );
                    })}
                    {ganttChart.length > 0 && (
                      <div className="text-xs text-purple-700 mt-6 ml-1 font-mono">
                        {ganttChart[ganttChart.length - 1].end}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-purple-700 font-mono">
                  <p><strong>Total Execution Time:</strong> {maxTime} ms</p>
                </div>
              </div>
            </Window>
          </>
        )}
      </div>
    </main>
  );
}
