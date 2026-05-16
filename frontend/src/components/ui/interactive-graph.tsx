"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";

interface GraphData {
  nodes: any[];
  links: any[];
}

interface InteractiveGraphProps {
  data: GraphData;
  onNodeClick: (node: any) => void;
  hoveredNode: any;
  setHoveredNode: (node: any) => void;
  selectedNode?: any;
}

export default function InteractiveGraph({ data, onNodeClick, hoveredNode, setHoveredNode, selectedNode }: InteractiveGraphProps) {
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize observer to keep canvas responsive
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Configure force engine for greater distance
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-400); // Repel nodes more strongly
      fgRef.current.d3Force('link').distance(150); // Make links longer
    }
  }, []);

  const handleNodeHover = useCallback((node: any) => {
    document.body.style.cursor = node ? 'pointer' : 'default';
    setHoveredNode(node || null);
  }, [setHoveredNode]);

  // Compute highlights
  const highlightNodes = useMemo(() => new Set(), []);
  const highlightLinks = useMemo(() => new Set(), []);

  useEffect(() => {
    highlightNodes.clear();
    highlightLinks.clear();

    const activeNode = hoveredNode || selectedNode;

    if (activeNode) {
      highlightNodes.add(activeNode.id);
      data.links.forEach(link => {
        if (link.source.id === activeNode.id || link.target.id === activeNode.id) {
          highlightLinks.add(link);
          highlightNodes.add(link.source.id === activeNode.id ? link.target.id : link.source.id);
        }
      });
    }
  }, [hoveredNode, selectedNode, data.links, highlightNodes, highlightLinks]);

  // Custom Node Drawing
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const activeNode = hoveredNode || selectedNode;
    const isHovered = activeNode?.id === node.id;
    const isHighlighted = highlightNodes.has(node.id);
    const isMuted = activeNode && !isHighlighted;
    
    const size = node.val * (isHovered ? 1.5 : 1) / (globalScale < 1 ? 1 : Math.sqrt(globalScale));
    
    // Define neon colors
    const colors: Record<string, string> = {
      startup: "#00e5ff", // Cyan
      mentor: "#b388ff", // Purple
      investor: "#ffd54f", // Gold
      programme: "#69f0ae" // Green
    };

    const baseColor = colors[node.type] || "#ffffff";
    
    // Draw outer glow
    if (isHighlighted || !hoveredNode) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, size * 2.5, 0, 2 * Math.PI, false);
      ctx.fillStyle = `${baseColor}${isHovered ? '40' : '15'}`; // Hex alpha
      ctx.fill();
    }

    // Draw node core
    ctx.beginPath();
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
    ctx.fillStyle = isMuted ? '#333333' : baseColor;
    ctx.fill();

    // Node Outline
    ctx.lineWidth = 1.5 / globalScale;
    ctx.strokeStyle = isMuted ? '#222222' : '#ffffff';
    ctx.stroke();

    // Text Label
    if (!isMuted && globalScale > 1.5) {
      const label = node.name;
      const fontSize = 12 / globalScale;
      ctx.font = `${isHovered ? 'bold ' : ''}${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // text background
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth + 4/globalScale, fontSize + 4/globalScale];
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + size + 2/globalScale, bckgDimensions[0], bckgDimensions[1]);
      
      ctx.fillStyle = isHovered ? '#ffffff' : '#aaaaaa';
      ctx.fillText(label, node.x, node.y + size + 2/globalScale + bckgDimensions[1]/2);
    }
  }, [hoveredNode, selectedNode, highlightNodes]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="" // Disabled default tooltip since we draw text/custom UI
        nodeRelSize={6}
        nodeCanvasObject={paintNode}
        onNodeHover={handleNodeHover}
        onNodeClick={(node) => {
          onNodeClick(node);
          // center map
          fgRef.current?.centerAt(node.x, node.y, 1000);
          fgRef.current?.zoom(1.5, 1000);
        }}
        linkColor={(link: any) => highlightLinks.has(link) ? "#ffffff" : "rgba(255,255,255,0.1)"}
        linkWidth={(link: any) => highlightLinks.has(link) ? 2 : 1}
        linkDirectionalParticles={(link: any) => highlightLinks.has(link) ? 4 : 0}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleColor={() => "#ffffff"}
        backgroundColor="transparent"
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />
    </div>
  );
}
