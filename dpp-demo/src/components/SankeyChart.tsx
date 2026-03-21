'use client';

import React, { useMemo } from 'react';
import { sankey, sankeyLinkHorizontal, sankeyJustify } from 'd3-sankey';

const data = {
  nodes: [
    { name: 'Organic Cotton (Turkey)', category: 'raw' },
    { name: 'Recycled Denim (Bangladesh)', category: 'raw' },
    { name: 'rPET (Vietnam)', category: 'raw' },
    { name: 'Spinning & Weaving', category: 'process' },
    { name: 'Dyeing & Finishing', category: 'process' },
    { name: 'Garment Assembly', category: 'manufacturing' },
    { name: 'EU Distribution Hub', category: 'distribution' },
    { name: 'Retail (Stockholm)', category: 'retail' },
  ],
  links: [
    { source: 0, target: 3, value: 35 },
    { source: 1, target: 3, value: 45 },
    { source: 3, target: 4, value: 80 },
    { source: 4, target: 5, value: 75 }, // 5% waste
    { source: 2, target: 5, value: 20 },
    { source: 5, target: 6, value: 95 },
    { source: 6, target: 7, value: 95 },
  ]
};

const colors = {
  raw: '#10b981', // emerald
  process: '#3b82f6', // blue
  manufacturing: '#6366f1', // indigo
  distribution: '#f59e0b', // amber
  retail: '#ec4899', // pink
};

export default function SankeyChart({ width = 800, height = 400 }) {
  const { nodes, links } = useMemo(() => {
    const sankeyGenerator = sankey<any, any>()
      .nodeWidth(15)
      .nodePadding(20)
      .extent([[10, 10], [width - 10, height - 10]])
      .nodeAlign(sankeyJustify); // force right alignment for sinks

    return sankeyGenerator({
      nodes: data.nodes.map(d => Object.assign({}, d)),
      links: data.links.map(d => Object.assign({}, d))
    });
  }, [width, height]);

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden">
      <svg width={width} height={height} className="min-w-[600px] w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Draw Links */}
        <g strokeOpacity={0.2}>
          {links.map((link: any, i) => {
            const path = sankeyLinkHorizontal()(link);
            return (
               <path
                  key={`link-${i}`}
                  d={path || undefined}
                  fill="none"
                  stroke={`url(#gradient-${link.source.category}-${link.target.category})`}
                  strokeWidth={Math.max(1, link.width)}
                  className="hover:stroke-opacity-40 transition-all duration-300"
               >
                  <title>{`${link.source.name} → ${link.target.name}\n${link.value}% Volume Flow`}</title>
               </path>
            );
          })}
        </g>

        {/* Draw Nodes */}
        <g stroke="#fff" strokeWidth={2}>
          {nodes.map((node: any, i) => (
             <g key={`node-${i}`}>
                <rect
                  x={node.x0}
                  y={node.y0}
                  height={Math.max(node.y1 - node.y0, 2)}
                  width={node.x1 - node.x0}
                  fill={(colors as any)[node.category] || '#94a3b8'}
                  rx={2}
                >
                  <title>{`${node.name}\nValue: ${node.value}%`}</title>
                </rect>
                <text
                  x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
                  y={(node.y1 + node.y0) / 2}
                  dy="0.35em"
                  textAnchor={node.x0 < width / 2 ? 'start' : 'end'}
                  fontSize={10}
                  fontWeight="bold"
                  fill="#475569"
                  stroke="none"
                >
                  {node.name}
                </text>
             </g>
          ))}
        </g>

        {/* Define Gradients for links */}
        <defs>
          {links.map((link: any, i) => (
             <linearGradient key={`gradient-${link.source.category}-${link.target.category}`} id={`gradient-${link.source.category}-${link.target.category}`} gradientUnits="userSpaceOnUse" x1={link.source.x1} x2={link.target.x0}>
                <stop offset="0%" stopColor={(colors as any)[link.source.category]} />
                <stop offset="100%" stopColor={(colors as any)[link.target.category]} />
             </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
