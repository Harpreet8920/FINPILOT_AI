import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Cloud, 
  Cpu, 
  Database 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function DashboardView() {
  // 🌟 ANIMATION VARIANTS (For smooth staggered loading)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white mb-2">Operations Overview</h1>
          <p className="text-on-surface-variant font-label text-sm tracking-wide">Real-time intelligence from FinPilot AI clusters.</p>
        </div>
        <div className="flex gap-4">
          {/* 🌟 TRICK: Added onClick alert for video demo */}
          <button 
            onClick={() => alert("✅ All Systems Operational. Running quick diagnostic...")}
            className="glass-card px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3 hover:bg-white/5 transition-all"
          >
            <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-headline">System Status</span>
            <span className="text-secondary-fixed text-xs font-bold uppercase font-headline flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              Optimal
            </span>
          </button>
        </div>
      </motion.header>

      {/* Bento Grid Metrics */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Metric 1: Total Cost */}
        <motion.div variants={item} className="glass-card p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-primary-fixed/20 transition-all duration-500">
          <div className="flex justify-between items-start mb-8">
            <span className="text-xs font-headline uppercase tracking-widest text-on-surface-variant">Total Cloud Expenditure</span>
            <TrendingUp className="w-4 h-4 text-on-surface-variant" />
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-white mb-1">₹4.2M</h2>
            <p className="text-[10px] text-error flex items-center gap-1 font-label font-bold">
              <TrendingUp className="w-3 h-3" />
              +2.4% FROM LAST MONTH
            </p>
          </div>
          {/* Mock Area Chart */}
          <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30 group-hover:opacity-50 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00fbfb" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20 L400,100 L0,100 Z" fill="url(#chartGradient)" />
              <path d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20" fill="none" stroke="#00fbfb" strokeWidth="2" />
            </svg>
          </div>
        </motion.div>

        {/* Metric 2: Total Savings */}
        <motion.div variants={item} className="glass-card p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-secondary-fixed/20 transition-all duration-500">
          <div className="flex justify-between items-start mb-8">
            <span className="text-xs font-headline uppercase tracking-widest text-on-surface-variant">AI-Optimized Savings</span>
            <div className="w-4 h-4 text-secondary-fixed animate-pulse">✨</div>
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-secondary-fixed mb-1">₹842k</h2>
            <p className="text-[10px] text-secondary-fixed flex items-center gap-1 font-label font-bold">
              <CheckCircle className="w-3 h-3" />
              14 AGENTS DEPLOYED
            </p>
          </div>
          {/* Abstract Glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary-fixed/10 blur-[40px] rounded-full group-hover:bg-secondary-fixed/20 transition-all duration-700" />
        </motion.div>

        {/* Metric 3: Efficiency Ratio */}
        <motion.div variants={item} className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center relative group hover:border-primary-fixed/30 transition-all">
          <div className="absolute top-6 left-6">
            <span className="text-xs font-headline uppercase tracking-widest text-on-surface-variant">Efficiency Ratio</span>
          </div>
          <div className="relative w-32 h-32 mb-2 mt-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle 
                initial={{ strokeDashoffset: 212 }}
                animate={{ strokeDashoffset: 70 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" fill="none" r="45" 
                stroke="url(#cyanGradient)" strokeWidth="8" 
                strokeDasharray="212"
                className="drop-shadow-[0_0_8px_rgba(0,251,251,0.5)]"
              />
              <defs>
                <linearGradient id="cyanGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#007070" />
                  <stop offset="100%" stopColor="#00fbfb" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline text-2xl font-bold text-white leading-none">67%</span>
              <span className="text-[8px] text-on-surface-variant uppercase tracking-tighter font-headline">Reduced</span>
            </div>
          </div>
          <p className="text-[10px] text-on-surface-variant font-label max-w-[140px]">Resource utilization optimized across 4 clusters.</p>
        </motion.div>
      </motion.section>

      {/* Dynamic Insights & Infrastructure Visualization */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Insights Panel */}
        <section className="lg:col-span-1 glass-card p-6 rounded-xl border border-white/5">
          <h3 className="font-headline text-lg font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-4 bg-primary-fixed rounded-full" />
            Recent Insights
          </h3>
          <div className="space-y-4">
            <InsightItem 
              type="error" 
              label="Unused Resource" 
              time="2M AGO" 
              content={<>Cluster <span className="text-primary-fixed">AP-SOUTH-1</span> has 3 idle t3.xlarge instances.</>}
              footer="Waste: ₹12k/mo"
            />
            <InsightItem 
              type="success" 
              label="Optimization Ready" 
              time="1H AGO" 
              content={<>Storage lifecycle policy can be applied to 1.2TB of S3 Standard.</>}
              action="APPLY POLICY"
              // 🌟 TRICK: Action button alert
              onAction={() => alert("⚡ Simulating policy application... S3 Storage optimized!")}
            />
            <InsightItem 
              type="info" 
              label="Agent Activity" 
              time="3H AGO" 
              content={<>Agent <span className="italic text-slate-300">"Void-Runner"</span> completed spot instance migration.</>}
            />
          </div>
        </section>

        {/* Infrastructure Map */}
        <section className="lg:col-span-2 glass-card p-6 rounded-xl border border-white/5 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-4 bg-primary-fixed rounded-full" />
              Deployment Topology
            </h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface rounded text-[9px] text-slate-400 border border-white/5 uppercase tracking-widest font-headline hover:text-white cursor-pointer transition-colors">Global View</span>
            </div>
          </div>
          <div className="relative flex-1 min-h-[300px] w-full flex items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest/50">
            {/* Abstract Network Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none blueprint-grid" />
            
            {/* Floating Data Nodes */}
            <div className="relative z-10 w-full h-full">
              <TopologyNode 
                icon="cloud" 
                label="US-East" 
                status="Active" 
                color="primary" 
                position="top-[20%] left-[15%]" 
              />
              <TopologyNode 
                icon="cpu" 
                label="Central AI Hub" 
                status="Optimal" 
                color="secondary" 
                position="bottom-[30%] left-[45%]" 
                large
              />
              <TopologyNode 
                icon="database" 
                label="India-West" 
                status="Warning" 
                color="error" 
                position="top-[40%] right-[15%]" 
              />

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-30">
                <line x1="15%" y1="20%" x2="45%" y2="70%" stroke="#00fbfb" strokeWidth="0.5" strokeDasharray="4 4" className="animate-pulse" />
                <line x1="45%" y1="70%" x2="85%" y2="40%" stroke="#00fbfb" strokeWidth="0.5" strokeDasharray="4 4" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

// 🌟 Added onAction prop to handle the fake clicks
function InsightItem({ type, label, time, content, footer, action, onAction }: any) {
  const colors = {
    error: "border-error text-error",
    success: "border-secondary-fixed text-secondary-fixed",
    info: "border-primary-fixed text-primary-fixed"
  };

  return (
    <div className={cn(
      "p-3 bg-white/5 rounded-lg border-l-2 group hover:bg-white/10 transition-all cursor-pointer",
      colors[type as keyof typeof colors]
    )}>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-bold tracking-widest uppercase font-headline">{label}</span>
        <span className="text-[8px] text-slate-500 font-label">{time}</span>
      </div>
      <p className="text-xs text-on-surface mb-2 leading-relaxed">{content}</p>
      {footer && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-on-surface-variant px-1.5 py-0.5 border border-white/10 rounded font-label">{footer}</span>
          {type === 'error' && <AlertCircle className="w-3 h-3 text-error" />}
        </div>
      )}
      {action && (
        <button 
          onClick={onAction}
          className="text-[10px] font-bold flex items-center gap-1 hover:text-white transition-colors uppercase tracking-widest font-headline mt-1"
        >
          {action} <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
}

// 🌟 Made nodes clickable for demo
function TopologyNode({ icon, label, status, color, position, large }: any) {
  const colors = {
    primary: "border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10 hover:shadow-[0_0_15px_rgba(0,251,251,0.3)]",
    secondary: "border-secondary-fixed/30 text-secondary-fixed hover:bg-secondary-fixed/10 hover:shadow-[0_0_20px_rgba(47,248,1,0.3)]",
    error: "border-error/30 text-error hover:bg-error/10 hover:shadow-[0_0_15px_rgba(255,180,171,0.3)]"
  };

  return (
    <div 
      className={cn("absolute group transition-all z-10", position)}
      onClick={() => alert(`📡 Pinging ${label} node... Status: ${status}`)}
    >
      <div className={cn(
        "rounded-lg bg-surface border flex items-center justify-center transition-all cursor-pointer",
        large ? "w-16 h-16 rounded-full" : "w-12 h-12",
        colors[color as keyof typeof colors]
      )}>
        {icon === 'cloud' && <Cloud className={large ? "w-8 h-8" : "w-5 h-5"} />}
        {icon === 'cpu' && <Cpu className={large ? "w-8 h-8" : "w-5 h-5"} />}
        {icon === 'database' && <Database className={large ? "w-8 h-8" : "w-5 h-5"} />}
      </div>
      <div className="mt-2 text-center opacity-70 group-hover:opacity-100 transition-opacity">
        <p className="text-[8px] font-headline uppercase text-slate-400 tracking-tighter leading-none">{label}</p>
        <p className="text-[10px] font-bold text-white">{status}</p>
      </div>
    </div>
  );
}