import React from 'react';
import { InteractiveCodePlayground } from '../components/InteractiveCodePlayground';
import { CssFlexboxGridVisualizer } from '../components/CssFlexboxGridVisualizer';
import { Code2, Sliders } from 'lucide-react';

export const PlaygroundView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Interactive Sandboxes
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Live Code Playground & Layout Visualizer
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Experiment with HTML5, CSS3, and JavaScript in an isolated real-time sandbox. Export code, toggle presets, or tweak Flexbox & CSS Grid parameters.
        </p>
      </div>

      {/* 1. Live Multi-Tab Code Sandbox */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span>Interactive HTML/CSS/JS Sandbox</span>
        </h2>
        <InteractiveCodePlayground />
      </div>

      {/* 2. Visual Layout Tuner */}
      <div className="space-y-4 pt-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <span>CSS Flexbox & Grid Visualizer</span>
        </h2>
        <CssFlexboxGridVisualizer />
      </div>
    </div>
  );
};
