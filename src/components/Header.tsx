import React from 'react';
import { Database, Plus, Sparkles, BookOpen, Download } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'directory' | 'comparison' | 'code';
  setActiveTab: (tab: 'search' | 'directory' | 'comparison' | 'code') => void;
  datasetSize: number;
  onSetDatasetSize: (size: number) => void;
  onOpenAddModal: () => void;
  onRunDemo: () => void;
  onDownloadZip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  datasetSize,
  onSetDatasetSize,
  onOpenAddModal,
  onRunDemo,
  onDownloadZip
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs font-semibold text-lg">
            S
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight block leading-tight">
              Student Record Lookup
            </span>
            <span className="text-xs text-slate-500 font-medium">
              University Search System
            </span>
          </div>
        </div>

        {/* Zone 2: 4 Clean Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'search'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Search & Trace
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Algorithm Comparison
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'directory'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student Directory
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Algorithm Code
          </button>
        </nav>

        {/* Zone 3: Dataset Control & Actions */}
        <div className="flex items-center gap-2">
          {/* Dataset scale selector */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-600 border border-slate-200 rounded-lg p-1 bg-white">
            <span className="px-1.5 text-slate-400 font-medium">Dataset:</span>
            {[24, 100, 1000].map((size) => (
              <button
                key={size}
                onClick={() => onSetDatasetSize(size)}
                className={`px-2 py-0.5 rounded text-xs font-semibold tabular-nums transition-colors ${
                  datasetSize === size
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={`Load ${size} sorted records`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={onDownloadZip}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            title="Download complete project files as ZIP for GitHub"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Export ZIP</span>
            <span className="sm:hidden">ZIP</span>
          </button>

          <button
            onClick={onRunDemo}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title="Run interactive visual demo"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Quick Demo</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Mobile nav tab row */}
      <div className="md:hidden flex border-t border-slate-200 px-4 py-2 bg-slate-50 gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
            activeTab === 'search' ? 'bg-indigo-600 text-white' : 'text-slate-600'
          }`}
        >
          Search & Trace
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
            activeTab === 'comparison' ? 'bg-indigo-600 text-white' : 'text-slate-600'
          }`}
        >
          Comparisons
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
            activeTab === 'directory' ? 'bg-indigo-600 text-white' : 'text-slate-600'
          }`}
        >
          Directory ({datasetSize})
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
            activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-600'
          }`}
        >
          Code
        </button>
      </div>
    </header>
  );
};
