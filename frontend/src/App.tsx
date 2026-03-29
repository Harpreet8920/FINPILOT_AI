/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  TrendingUp, 
  Terminal, 
  Settings, 
  HelpCircle,
  Bell,
  User,
  Search,
  ChevronRight,
  ArrowUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Cloud,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  Play,
  Download,
  Filter,
  ArrowRight
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Views
import DashboardView from './components/DashboardView';
import WorkflowView from './components/WorkflowView';
import InsightsView from './components/InsightsView';
import AuditLogsView from './components/AuditLogsView';

type View = 'dashboard' | 'workflow' | 'insights' | 'audit';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workflow', label: 'AI Workflow', icon: GitBranch },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'audit', label: 'Audit Logs', icon: Terminal },
  ];

  return (
    <div className="flex min-h-screen bg-surface text-white font-sans overflow-hidden">
      {/* Architectural Background */}
      <div className="fixed inset-0 architectural-grid pointer-events-none z-0 opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-tr from-surface via-surface to-surface-container-low opacity-50 pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900/70 backdrop-blur-lg border-r border-white/10 tonal-transition z-50 flex flex-col shadow-[20px_0_40px_rgba(0,251,251,0.05)]">
        <div className="p-8">
          <div className="text-xl font-bold text-white tracking-tighter font-headline mb-1">FinPilot AI</div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-headline">Enterprise FinOps</div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg group",
                  isActive 
                    ? "bg-white/10 text-primary-fixed border-r-2 border-primary-fixed" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary-fixed" : "group-hover:text-primary-fixed")} />
                <span className="font-headline tracking-tight text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 mb-8">
          <button className="w-full py-3 bg-primary-fixed text-surface font-bold rounded-xl shadow-[0_0_20px_rgba(0,251,251,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 text-sm uppercase tracking-widest">
            Deploy Agent
          </button>
        </div>

        <div className="px-4 pb-8 space-y-2 border-t border-white/5 pt-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors text-xs font-headline">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors text-xs font-headline">
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        {/* TopBar */}
        <header className="h-16 border-b border-white/10 bg-slate-900/70 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-8 font-headline text-[10px] uppercase tracking-widest">
            <div className="text-primary-fixed flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
              <span>AI Connection</span>
            </div>
            <button className="text-slate-300 hover:text-primary-fixed transition-colors">Total Saved (₹)</button>
            <button className="text-slate-300 hover:text-primary-fixed transition-colors">Active Agents</button>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-surface-container-low border-none rounded-full px-10 py-1.5 text-xs focus:ring-1 focus:ring-primary-fixed w-64 text-on-surface-variant outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary-fixed rounded-full" />
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-slate-400 leading-none uppercase tracking-widest">Admin</p>
                  <p className="text-xs font-bold">K. Sharma</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 p-8 pb-24 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeView === 'dashboard' && <DashboardView />}
              {activeView === 'workflow' && <WorkflowView />}
              {activeView === 'insights' && <InsightsView />}
              {activeView === 'audit' && <AuditLogsView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="h-10 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm fixed bottom-0 left-64 right-0 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4 text-[10px] tracking-tight">
            <div className="flex items-center gap-2 text-secondary-fixed">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
              <span>System Status: Operational v2.4.1</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Latency: 14ms</span>
          </div>
          <div className="flex gap-6 text-[10px] tracking-tight text-slate-500">
            <button className="hover:text-slate-300 transition-colors">API</button>
            <button className="hover:text-slate-300 transition-colors">Privacy</button>
            <span className="text-slate-700">© 2024 FINPILOT CORE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
