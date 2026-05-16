"use client";

import React, { useState, useEffect } from 'react';
import { Network, ListChecks, Search } from 'lucide-react';
import { AIMatchCard, AIMatchData } from '@/components/AIMatchCard';
import ReactFlow, { Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

// Admin Orchestrator Page
export default function AdminOrchestrator() {
  const [activeTab, setActiveTab] = useState<'pending' | 'graph'>('pending');
  const [matches, setMatches] = useState<AIMatchData[]>([]);
  const [loading, setLoading] = useState(true);

  // Note: hardcoded Admin ID for MVP purposes
  const ADMIN_ID = 'uuid-admin-001';

  // In a real scenario, you'd fetch from your backend's /api/matches/pending endpoint here.
  // For the MVP, we populate with a mockup scanning process based on backend structural expectations.
  useEffect(() => {
    // Simulated fetching sequence
    setTimeout(() => {
      setMatches([
        {
          id: 'mock-rec-1',
          mentor_id: 'mock-mentor-a',
          startup_name: 'SolarGrid Analytics',
          mentor_name: 'Elena Rostova (GreenTech VC)',
          confidence_score: 0.94,
          semantic_score: 0.96,
          ranking_score: 0.91,
          recommendation_reason: "Elena's deep expertise in Series A scaling for renewable energy perfectly aligns with SolarGrid's current hurdle. The Hybrid AI model detected identical growth trajectories in her past successful engagements.",
          retrieved_context: "Retrieved Ecosystem Context:\n- Elena successfully guided 'WindFlow' from Seed to Series A in 2024.\n- SolarGrid stated need: 'We need help navigating Series A funding rounds.'",
          status: 'pending'
        },
        {
          id: 'mock-rec-2',
          mentor_id: 'mock-mentor-b',
          startup_name: 'AgriSense IoT',
          mentor_name: 'Dr. Marcus Chen',
          confidence_score: 0.88,
          semantic_score: 0.89,
          ranking_score: 0.86,
          recommendation_reason: "Marcus brings a decade of hardware IoT deployment knowledge. His experience strongly intersects with AgriSense's stated needs for manufacturing scalability in agricultural environments.",
          retrieved_context: "Retrieved Ecosystem Context:\n- Marcus specializes in low-bandwidth IoT sensor deployments.\n- AgriSense needs: 'Scale our hardware production without inflating costs.'",
          status: 'pending'
        }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleApprove = (id: string) => {
    setMatches(matches.filter(m => m.id !== id));
  };

  // Mock Graph Data for visual representation of 'Programmable Relationship Entities'
  const initialNodes: Node[] = [
    { id: '1', position: { x: 250, y: 50 }, data: { label: 'SolarGrid Analytics' }, style: { background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
    { id: '2', position: { x: 100, y: 150 }, data: { label: 'Elena Rostova' }, style: { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
    { id: '3', position: { x: 400, y: 150 }, data: { label: 'AgriSense IoT' }, style: { background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
    { id: '4', position: { x: 400, y: 250 }, data: { label: 'Dr. Marcus Chen' }, style: { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
  ];
  
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '2', target: '1', label: 'Mentoring', animated: true },
    { id: 'e3-4', source: '4', target: '3', label: 'Potential Match', style: { strokeDasharray: '5 5' } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">Orchestration Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Review and approve AI ecosystem relationships</p>
          </div>
          
          <div className="flex bg-white dark:bg-[#111] p-1 rounded-lg border border-gray-200 dark:border-[#262626] shadow-sm">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'pending' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <ListChecks className="w-4 h-4" />
              <span>Pending Reviews</span>
            </button>
            <button 
              onClick={() => setActiveTab('graph')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'graph' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Network className="w-4 h-4" />
              <span>Ecosystem Graph</span>
            </button>
          </div>
        </div>

        {/* Tab Layout Content */}
        {activeTab === 'pending' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500 dark:text-gray-400">
                <Search className="w-10 h-10 animate-pulse text-indigo-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Scanning Ecosystem...</h3>
                <p className="text-sm mt-1">AI Engine is processing embeddings and calculating HGT models.</p>
              </div>
            ) : matches.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {matches.map(match => (
                  <AIMatchCard 
                    key={match.id}
                    matchData={match}
                    adminId={ADMIN_ID}
                    onApproveSuccess={() => handleApprove(match.id!)}
                    onDecline={() => handleApprove(match.id!)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-[#111] rounded-xl border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">All pending matches have been orchestrated.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[600px] bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm relative">
            <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
              <Background color="#6366f1" gap={16} />
              <Controls />
            </ReactFlow>
            <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-xs shadow-sm">
              <div className="flex items-center space-x-2 mb-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> <span className="dark:text-gray-300">Companies</span></div>
              <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> <span className="dark:text-gray-300">Mentors</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
