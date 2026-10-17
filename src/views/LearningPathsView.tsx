import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { BookOpen, CheckCircle, Circle, Clock, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { LearningPath, Lesson } from '../types';

export const LearningPathsView: React.FC = () => {
  const { learningPaths, selectedPathId, setSelectedPathId, user, toggleCompleteLesson } = useDevBase();
  
  const currentPath: LearningPath =
    learningPaths.find((p) => p.id === selectedPathId) || learningPaths[0];

  const [activeLessonId, setActiveLessonId] = useState<string>(
    currentPath.lessons[0].id
  );

  const activeLesson: Lesson =
    currentPath.lessons.find((l) => l.id === activeLessonId) || currentPath.lessons[0];

  const completedCount = currentPath.lessons.filter((l) =>
    user.completedLessonIds.includes(l.id)
  ).length;

  const progressPercent = Math.round((completedCount / currentPath.lessons.length) * 100);

  const activeLessonIndex = currentPath.lessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = activeLessonIndex > 0 ? currentPath.lessons[activeLessonIndex - 1] : null;
  const nextLesson =
    activeLessonIndex < currentPath.lessons.length - 1
      ? currentPath.lessons[activeLessonIndex + 1]
      : null;

  const isCurrentCompleted = user.completedLessonIds.includes(activeLesson.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Guided Curriculum
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Structured Learning Paths
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Follow ordered pedagogical tracks with realistic code examples, key takeaways, and progress tracking.
        </p>
      </div>

      {/* Path Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningPaths.map((p) => {
          const isSelected = p.id === currentPath.id;
          const done = p.lessons.filter((l) => user.completedLessonIds.includes(l.id)).length;
          const pct = Math.round((done / p.lessons.length) * 100);

          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPathId(p.id);
                setActiveLessonId(p.lessons[0].id);
              }}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-400">{p.category}</span>
                  <span className="font-mono text-slate-400">{p.duration}</span>
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Progress ({done}/{p.lessons.length} lessons)</span>
                  <span className="font-mono font-semibold text-indigo-300">{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2-Column Split: Lesson Outline Sidebar (4 cols) + Lesson Body (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Ordered Lessons List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Track Lessons
              </h4>
              <p className="text-[11px] text-slate-500">{currentPath.lessons.length} modules</p>
            </div>
            <span className="text-xs font-mono font-semibold text-indigo-400">{progressPercent}% done</span>
          </div>

          <div className="space-y-2">
            {currentPath.lessons.map((lesson, idx) => {
              const isActive = lesson.id === activeLesson.id;
              const isCompleted = user.completedLessonIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-xs font-semibold text-slate-100 truncate">
                      {lesson.title}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.readTime}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Lesson Reader */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Lesson Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs text-indigo-400 font-medium">
                {currentPath.title} &middot; {activeLesson.readTime}
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                {activeLesson.title}
              </h2>
            </div>

            {/* Complete Button */}
            <button
              onClick={() => toggleCompleteLesson(activeLesson.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all self-start ${
                isCurrentCompleted
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isCurrentCompleted ? 'Completed' : 'Mark as Completed'}</span>
            </button>
          </div>

          {/* Lesson Summary */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {activeLesson.summary}
          </div>

          {/* Lesson Main Content */}
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
            {activeLesson.content}
          </div>

          {/* Code Example */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Annotated Code Implementation
            </h3>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              {activeLesson.codeExample}
            </pre>
          </div>

          {/* Key Takeaways */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Key Pedagogical Takeaways
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeLesson.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">&bull;</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional Practice Task */}
          {activeLesson.practiceTask && (
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-200 space-y-1">
              <span className="font-semibold block text-indigo-300">Hands-on Challenge:</span>
              <p>{activeLesson.practiceTask}</p>
            </div>
          )}

          {/* Bottom Next/Previous Navigation */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => setActiveLessonId(prevLesson.id)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: {prevLesson.title.split('.')[1] || prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => setActiveLessonId(nextLesson.id)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Next: {nextLesson.title.split('.')[1] || nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>You have reached the end of this track!</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
