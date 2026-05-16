"use client";

import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, User, Building } from 'lucide-react';
import { approveMatch } from '@/lib/api';

export interface AIMatchData {
  id?: string;
  mentor_id: string;
  mentor_name?: string;
  startup_name?: string;
  confidence_score: number;
  semantic_score: number;
  ranking_score: number;
  recommendation_reason: string;
  retrieved_context: string;
  status?: string;
}

interface AIMatchCardProps {
  matchData: AIMatchData;
  adminId: string;
  onApproveSuccess?: () => void;
  onDecline?: () => void;
}

export function AIMatchCard({ matchData, adminId, onApproveSuccess, onDecline }: AIMatchCardProps) {
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayScore = Math.round(matchData.confidence_score * 100);

  const handleApprove = async () => {
    if (!matchData.id) return;
    setIsApproving(true);
    setError(null);
    try {
      await approveMatch(matchData.id, adminId);
      if (onApproveSuccess) onApproveSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to approve match');
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111111] overflow-hidden shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-[#262626]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center divide-x divide-gray-300 dark:divide-gray-700">
            <div className="flex flex-col pr-4">
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Startup</span>
              <div className="flex items-center space-x-2 mt-1">
                <Building className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {matchData.startup_name || 'Startup'}
                </span>
              </div>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Mentor</span>
              <div className="flex items-center space-x-2 mt-1">
                <User className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {matchData.mentor_name || 'Mapped Mentor'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Score Widget */}
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{displayScore}%</span>
          </div>
          <span className="text-[10px] font-medium text-emerald-600 uppercase mt-1">Match Confidence</span>
        </div>
      </div>

      {/* The Explainability Box */}
      <div className="p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-b border-gray-100 dark:border-[#262626]">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-1">AI Rationale</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
              {matchData.recommendation_reason}
            </p>
          </div>
        </div>

        {/* Collapsible Context */}
        <div className="mt-4 ml-8">
          <button 
            onClick={() => setIsContextOpen(!isContextOpen)}
            className="flex items-center space-x-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
          >
            <span>{isContextOpen ? 'Hide' : 'View'} Retrieval Context</span>
            {isContextOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          
          {isContextOpen && (
            <div className="mt-2 p-3 bg-white/60 dark:bg-black/20 rounded-md border border-indigo-100 dark:border-indigo-800/30 text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
              {matchData.retrieved_context}
            </div>
          )}
        </div>
      </div>

      {/* Score details & Actions */}
      <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-between">
        <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <span>Semantic: {(matchData.semantic_score * 100).toFixed(1)}%</span>
          <span>Rank: {(matchData.ranking_score * 100).toFixed(1)}%</span>
        </div>
        
        <div className="flex space-x-3">
          {error && <span className="text-xs text-red-500 my-auto p-2">{error}</span>}
          <button 
            onClick={onDecline}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg dark:bg-[#222] dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#333] transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleApprove}
            disabled={isApproving}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            {isApproving ? 'Automating...' : 'Approve Match & Automate'}
          </button>
        </div>
      </div>
    </div>
  );
}
