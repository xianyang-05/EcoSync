"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Network, Filter, ZoomIn, ZoomOut, Maximize2, Sparkles,
  Building2, Users, Briefcase, GraduationCap
} from "lucide-react";

const nodes = [
  { id: 1, label: "NovaTech AI", type: "startup" as const, x: 400, y: 250, connections: [5, 6, 9] },
  { id: 2, label: "GreenLeaf IoT", type: "startup" as const, x: 200, y: 400, connections: [6, 10] },
  { id: 3, label: "DataForge", type: "startup" as const, x: 600, y: 400, connections: [7, 9] },
  { id: 4, label: "CloudPeak", type: "startup" as const, x: 350, y: 550, connections: [8, 10] },
  { id: 5, label: "Dr. Sarah Kim", type: "mentor" as const, x: 550, y: 150, connections: [1] },
  { id: 6, label: "James Wilson", type: "mentor" as const, x: 150, y: 250, connections: [1, 2] },
  { id: 7, label: "Priya Sharma", type: "mentor" as const, x: 700, y: 300, connections: [3] },
  { id: 8, label: "Michael Torres", type: "mentor" as const, x: 500, y: 550, connections: [4] },
  { id: 9, label: "Vertex Capital", type: "investor" as const, x: 650, y: 200, connections: [1, 3] },
  { id: 10, label: "Q4 Accelerator", type: "programme" as const, x: 250, y: 550, connections: [2, 4] },
];

const typeConfig = {
  startup: { color: "#BFF549", bg: "rgba(191,245,73,0.15)", label: "Startup" },
  mentor: { color: "#4ade80", bg: "rgba(74,222,128,0.15)", label: "Mentor" },
  investor: { color: "#fbbf24", bg: "rgba(251,191,36,0.15)", label: "Investor" },
  programme: { color: "#c7c6c6", bg: "rgba(199,198,198,0.12)", label: "Programme" },
};

export default function EcosystemGraphPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Ecosystem Graph</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Interactive relationship visualization</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter Entities</Button>
          <Button variant="ai" size="sm"><Sparkles className="h-3.5 w-3.5" /> AI Cluster Analysis</Button>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {Object.entries(typeConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{config.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon"><ZoomIn className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><ZoomOut className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Maximize2 className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="relative overflow-hidden p-0" style={{ height: "650px" }}>
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#262626"
                  strokeWidth="1"
                  opacity="0.6"
                />
              );
            })
          )}

          {nodes.map((node) => {
            const config = typeConfig[node.type];
            return (
              <g key={node.id} className="cursor-pointer" filter="url(#glow)">
                <circle cx={node.x} cy={node.y} r="28" fill={config.bg} stroke={config.color} strokeWidth="1" opacity="0.9" />
                <circle cx={node.x} cy={node.y} r="8" fill={config.color} opacity="0.9" />
                <text x={node.x} y={node.y + 45} textAnchor="middle" fill="#888888" fontSize="10" fontFamily="Geist Mono, monospace">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {[
                { label: "Entities", value: nodes.length },
                { label: "Connections", value: nodes.reduce((acc, n) => acc + n.connections.length, 0) },
                { label: "Clusters", value: 3 },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{s.label}</p>
                  <p className="text-lg font-bold font-mono text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            <Badge variant="ai"><Sparkles className="h-2.5 w-2.5" /> AI Mapped</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
