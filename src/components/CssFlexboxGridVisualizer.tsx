import React, { useState } from 'react';
import { Copy, Check, Sparkles, Sliders } from 'lucide-react';

export const CssFlexboxGridVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'flex' | 'grid'>('flex');

  // Flexbox state
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('space-between');
  const [alignItems, setAlignItems] = useState<string>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap'>('nowrap');
  const [gap, setGap] = useState<number>(16);
  const [itemCount, setItemCount] = useState<number>(4);

  // Grid state
  const [gridCols, setGridCols] = useState<string>('repeat(3, 1fr)');
  const [gridGap, setGridGap] = useState<number>(16);

  const [copied, setCopied] = useState(false);

  const generatedCss = mode === 'flex'
    ? `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`
    : `.container {
  display: grid;
  grid-template-columns: ${gridCols};
  gap: ${gridGap}px;
}`;

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Top Header Mode Toggle */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Interactive Layout Visualizer
          </h3>
        </div>

        {/* Mode Selector Tabs (functional buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setMode('flex')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'flex' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            CSS Flexbox
          </button>
          <button
            onClick={() => setMode('grid')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            CSS Grid
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        
        {/* Left / Controls Deck (4 cols) */}
        <div className="lg:col-span-4 p-5 space-y-4 bg-slate-950/40 text-xs">
          {mode === 'flex' ? (
            <>
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">flex-direction</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setFlexDirection(dir)}
                      className={`px-2 py-1.5 rounded border text-left font-mono transition-colors ${
                        flexDirection === dir
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">justify-content</label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                >
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                  <option value="space-evenly">space-evenly</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">align-items</label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                >
                  <option value="stretch">stretch</option>
                  <option value="center">center</option>
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">flex-wrap</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['nowrap', 'wrap'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setFlexWrap(w)}
                      className={`px-2 py-1.5 rounded border text-center font-mono transition-colors ${
                        flexWrap === w
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>gap ({gap}px)</span>
                  <span className="font-mono">{gap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Items Count</span>
                  <span className="font-mono">{itemCount}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="7"
                  value={itemCount}
                  onChange={(e) => setItemCount(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">grid-template-columns</label>
                <div className="space-y-1.5">
                  {[
                    'repeat(3, 1fr)',
                    'repeat(auto-fit, minmax(140px, 1fr))',
                    '1fr 2fr 1fr',
                    '200px 1fr'
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setGridCols(preset)}
                      className={`w-full px-2.5 py-1.5 rounded border text-left font-mono text-[11px] transition-colors ${
                        gridCols === preset
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>gap ({gridGap}px)</span>
                  <span className="font-mono">{gridGap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={gridGap}
                  onChange={(e) => setGridGap(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </>
          )}

          {/* Generated CSS Box */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">CSS Rules</span>
              <button
                onClick={handleCopyCss}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {generatedCss}
            </pre>
          </div>
        </div>

        {/* Right / Visual Canvas (8 cols) */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-center min-h-[380px] bg-slate-950/20">
          <div
            className="w-full min-h-[300px] border border-dashed border-slate-700/60 rounded-xl p-4 bg-slate-950/60 transition-all overflow-hidden"
            style={
              mode === 'flex'
                ? {
                    display: 'flex',
                    flexDirection: flexDirection,
                    justifyContent: justifyContent,
                    alignItems: alignItems,
                    flexWrap: flexWrap,
                    gap: `${gap}px`
                  }
                : {
                    display: 'grid',
                    gridTemplateColumns: gridCols,
                    gap: `${gridGap}px`
                  }
            }
          >
            {Array.from({ length: mode === 'flex' ? itemCount : 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[70px] min-h-[70px] px-4 py-3 rounded-lg bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 border border-indigo-500/30 text-indigo-200 font-mono text-xs flex flex-col items-center justify-center font-semibold shadow-sm transition-all"
              >
                <span>Item {i + 1}</span>
                <span className="text-[10px] text-indigo-400/80 font-normal">flex-item</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-3">
            Dashed boundary shows container frame. Change sliders on the left to see instant updates.
          </p>
        </div>

      </div>
    </div>
  );
};
