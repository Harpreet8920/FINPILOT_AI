import { 
  TrendingDown, 
  AlertTriangle, 
  BrainCircuit,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: 'Week 1', baseline: 4000, optimized: 4000 },
  { name: 'Week 2', baseline: 4200, optimized: 3800 },
  { name: 'Week 3', baseline: 4500, optimized: 3500 },
  { name: 'Week 4', baseline: 4800, optimized: 3100 },
  { name: 'Week 5', baseline: 5000, optimized: 2800 },
];

export default function InsightsView() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-white mb-2 uppercase">
          Analysis <span className="text-primary-fixed">&amp;</span> Insights
        </h1>
        <p className="text-on-surface-variant font-body">Cost trajectories: Baseline vs. AI Optimized</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Big Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/5 bg-surface-container-lowest/50 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary-fixed" />
              Spend Projection Analysis
            </h3>
            <div className="flex gap-4 text-xs font-bold">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-slate-600"></span> Baseline</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-[#00fbfb]"></span> FinPilot AI</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00fbfb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00fbfb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151b2d', border: '1px solid #33394c', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#00fbfb' }}
                />
                <Area type="monotone" dataKey="baseline" stroke="#475569" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="optimized" stroke="#00fbfb" strokeWidth={3} fillOpacity={1} fill="url(#colorOptimized)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <div className="glass-card p-5 rounded-xl border border-error/20 bg-error/5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-error" />
              <h4 className="font-bold text-white text-sm">Critical Inefficiency</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">Project Hydra is running 12 over-provisioned m5.xlarge instances during off-peak hours.</p>
            <button className="w-full py-2 bg-error/10 hover:bg-error/20 text-error text-xs font-bold rounded-lg transition-colors border border-error/20">
              Review Action Plan
            </button>
          </div>

          <div className="glass-card p-5 rounded-xl border border-primary-fixed/20 bg-primary-fixed/5">
            <div className="flex items-center gap-3 mb-2">
              <BrainCircuit className="w-5 h-5 text-primary-fixed" />
              <h4 className="font-bold text-white text-sm">AI Suggestion</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">Switching to Spot Instances for background batch processing will save $820/week.</p>
            <button 
              onClick={() => alert("Simulating AI Auto-Remediation...")}
              className="w-full py-2 bg-primary-fixed text-surface text-xs font-bold rounded-lg transition-colors hover:bg-white"
            >
              Auto-Remediate
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}