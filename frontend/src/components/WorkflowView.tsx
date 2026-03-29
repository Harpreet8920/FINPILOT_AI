import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Eye, 
  Radar, 
  Brain, 
  Zap, 
  ShieldCheck, 
  Play, 
  ChevronDown, 
  AlertTriangle,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Step = 'monitor' | 'detect' | 'decide' | 'act' | 'audit';

export default function WorkflowView() {
  const [activeStep, setActiveStep] = useState<Step | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runPipeline = async () => {
  if (isSimulating) return;
  setIsSimulating(true);
  
  // Real Backend API call to start agents
  console.log("Triggering backend monitoring...");
  const response = await api.runMonitoring();
  
  if (response.status === "error") {
     alert("Backend is not running. Starting UI simulation only.");
  } else {
     console.log("Backend agent started processing!");
  }

  setActiveStep('monitor');
  setConfidence(0);
  setProgress(0);
};

  useEffect(() => {
    if (!isSimulating) return;

    const timers = [
      setTimeout(() => setActiveStep('detect'), 3000),
      setTimeout(() => {
        setActiveStep('decide');
        let start = 0;
        const interval = setInterval(() => {
          start += 2;
          if (start >= 98.4) {
            setConfidence(98.4);
            clearInterval(interval);
          } else {
            setConfidence(start);
          }
        }, 50);
      }, 6000),
      setTimeout(() => {
        setActiveStep('act');
        let start = 0;
        const interval = setInterval(() => {
          start += 2.5;
          if (start >= 100) {
            setProgress(100);
            clearInterval(interval);
          } else {
            setProgress(start);
          }
        }, 70);
      }, 9000),
      setTimeout(() => {
        setActiveStep('audit');
        setIsSimulating(false);
      }, 12000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isSimulating]);

  const isStepCompleted = (step: Step) => {
    const order: Step[] = ['monitor', 'detect', 'decide', 'act', 'audit'];
    if (!activeStep) return false;
    return order.indexOf(step) < order.indexOf(activeStep);
  };

  return (
    <div className="relative min-h-full">
      {/* Parallax Background Grid */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-primary-fixed"></span>
              <span className="text-primary-fixed font-label text-xs tracking-widest uppercase">Autonomous Operations</span>
            </div>
            <h1 className="font-headline text-5xl font-extrabold text-white tracking-tighter mb-4">Cloud Optimization Pipeline</h1>
            <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed">
              Visualizing the active decision flow for global resource management. FinPilot is currently analyzing 4,200 nodes across 3 regions.
            </p>
          </div>
          <div>
            <button 
              onClick={runPipeline}
              disabled={isSimulating}
              className={cn(
                "px-8 py-4 rounded-xl font-headline font-bold text-lg tracking-wider flex items-center gap-3 transition-all duration-300",
                isSimulating 
                  ? "bg-surface-container-highest text-white/40 cursor-not-allowed border border-white/10" 
                  : "bg-primary-fixed text-surface hover:shadow-[0_0_30px_rgba(0,251,251,0.4)] active:scale-95 hover:bg-white"
              )}
            >
              <Zap className={cn("w-5 h-5", isSimulating && "animate-pulse")} />
              {isSimulating ? 'RUNNING PIPELINE...' : 'RUN PIPELINE'}
            </button>
          </div>
        </header>

        {/* Pipeline Visualizer */}
        <div className="relative flex flex-col gap-16 lg:gap-24">
          {/* Data Pulse Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 hidden lg:block -translate-x-1/2 overflow-hidden">
            <div className="data-pulse"></div>
          </div>

          {/* Steps */}
          <PipelineStep 
            id="monitor"
            label="MONITOR"
            title="Monitoring Agent"
            subtitle="Continuous Scan Engine"
            icon={Eye}
            activeStep={activeStep}
            isCompleted={isStepCompleted('monitor')}
            side="left"
          >
            <div className="bg-surface-container-lowest/50 rounded-lg p-4 font-mono text-[10px] text-primary-fixed/70 border border-white/5 space-y-1">
              <div className="flex gap-2">
                <span className="text-white/20">[14:02:11]</span>
                <span>SCANNING us-east-1.aws.infrastructure...</span>
              </div>
              <div className="flex gap-2">
                <span className="text-white/20">[14:02:12]</span>
                <span className="text-secondary-fixed">METRICS PULLED: CPU(42%), RAM(68%), IOPS(1.2k)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-white/20">[14:02:14]</span>
                <span>LOG STREAM STABLE. NO INTERRUPTIONS.</span>
              </div>
            </div>
          </PipelineStep>

          <PipelineStep 
            id="detect"
            label="DETECT"
            title="Spend Analysis"
            subtitle="Anomaly Detection Layer"
            icon={Radar}
            activeStep={activeStep}
            isCompleted={isStepCompleted('detect')}
            side="right"
          >
            <div className="flex items-center gap-3 p-3 bg-error-container/10 border border-error/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-error" />
              <div>
                <div className="text-white text-xs font-medium">Anomaly Detected: m5.xlarge Spike</div>
                <p className="text-white/50 text-[10px]">Spend velocity +22% above baseline in Project: Hydra</p>
              </div>
            </div>
          </PipelineStep>

          <PipelineStep 
            id="decide"
            label="DECIDE"
            title="LLM Decision Engine"
            subtitle="Architectural Logic Core"
            icon={Brain}
            activeStep={activeStep}
            isCompleted={isStepCompleted('decide')}
            side="left"
          >
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-highest/40 rounded-lg border border-white/5 italic text-xs text-on-surface-variant leading-relaxed">
                "Based on the detected spike in Project Hydra, I have analyzed the workload patterns. The spike is driven by redundant staging tests. I recommend downgrading 4 instances to t3.medium to maintain performance while reducing cost by $450/mo."
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] text-white/40 font-label uppercase tracking-widest">Confidence Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-secondary-fixed font-bold text-xs">{confidence.toFixed(1)}%</span>
                  <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary-fixed shadow-[0_0_8px_rgba(47,248,1,0.5)]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PipelineStep>

          <PipelineStep 
            id="act"
            label="ACT"
            title="Action Agent"
            subtitle="Automated Execution Handler"
            icon={Zap}
            activeStep={activeStep}
            isCompleted={isStepCompleted('act')}
            side="right"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] px-1">
                <span className="text-white/60">Execution: Downgrading i-0x45a...</span>
                <span className="text-primary-fixed font-mono">{progress >= 100 ? 'COMPLETED' : 'IN PROGRESS'}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-fixed" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </PipelineStep>

          <PipelineStep 
            id="audit"
            label="AUDIT"
            title="Audit Agent"
            subtitle="Financial Compliance Ledger"
            icon={ShieldCheck}
            activeStep={activeStep}
            isCompleted={isStepCompleted('audit')}
            side="left"
          >
            <div className="flex items-center justify-between p-4 bg-secondary-fixed/5 border border-secondary-fixed/20 rounded-lg">
              <div>
                <div className="text-white/40 text-[8px] uppercase tracking-widest font-bold">Confirmed Savings</div>
                <div className="text-xl font-headline font-bold text-secondary-fixed">$452.18 <span className="text-[10px] font-normal text-white/60">/mo</span></div>
              </div>
              <div className="text-right">
                <div className="text-white/40 text-[8px] uppercase tracking-widest font-bold">ROI Impact</div>
                <div className="text-lg font-headline font-bold text-white">+12.4%</div>
              </div>
            </div>
          </PipelineStep>
        </div>

        {/* Footer Stats Overlay */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-4 pb-12">
          <StatBox label="Active Workflows" value="12,482" />
          <StatBox label="Savings (24h)" value="$14.2k" color="secondary" />
          <StatBox label="Decision Latency" value="142ms" color="primary" />
          <StatBox label="System Health" value="99.9%" />
        </div>
      </div>
    </div>
  );
}

function PipelineStep({ id, label, title, subtitle, icon: Icon, activeStep, isCompleted, side, children }: any) {
  const isActive = activeStep === id;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 group">
      {/* Card Container */}
      <div className={cn(
        "w-full lg:w-5/12 order-2",
        side === 'left' ? "lg:order-1" : "lg:order-3"
      )}>
        <div className={cn(
          "glass-card p-6 rounded-xl border transition-all duration-500 shadow-2xl",
          isActive ? "border-primary-fixed/60 active-agent-glow translate-y-[-4px]" : "border-white/5 opacity-60 scale-[0.98]"
        )}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center border border-primary-fixed/20 relative overflow-hidden">
                {isActive && <div className="scan-beam"></div>}
                <Icon className={cn("w-6 h-6", isActive ? "text-primary-fixed" : "text-white/40")} />
              </div>
              <div>
                <h3 className={cn("font-bold text-lg", isActive ? "text-white" : "text-white/60")}>{title}</h3>
                <p className="text-white/40 text-xs">{subtitle}</p>
              </div>
            </div>
            <ChevronDown className={cn("w-5 h-5 transition-colors cursor-pointer", isActive ? "text-primary-fixed rotate-180" : "text-white/20")} />
          </div>
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Indicator */}
      <div className="order-1 lg:order-2 flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-full border-4 border-surface z-20 transition-all duration-500 flex items-center justify-center",
          isActive ? "bg-primary-fixed shadow-[0_0_20px_rgba(0,251,251,0.8)]" : 
          isCompleted ? "bg-secondary-fixed shadow-[0_0_15px_rgba(47,248,1,0.5)]" : "bg-surface-container-high shadow-none"
        )}>
          {isCompleted && <CheckCircle2 className="w-5 h-5 text-surface" />}
          {isActive && <Activity className="w-5 h-5 text-surface animate-pulse" />}
        </div>
        <div className={cn(
          "font-headline font-bold text-[10px] mt-2 tracking-widest uppercase transition-colors duration-500",
          isActive ? "text-primary-fixed" : "text-white/20"
        )}>
          {label}
        </div>
      </div>

      {/* Empty Spacer for desktop */}
      <div className={cn(
        "hidden lg:block w-5/12",
        side === 'left' ? "order-3" : "order-1"
      )}></div>
    </div>
  );
}

function StatBox({ label, value, color }: any) {
  const colors = {
    primary: "text-primary-fixed hover:border-primary-fixed/20",
    secondary: "text-secondary-fixed hover:border-secondary-fixed/20",
    default: "text-white hover:border-white/10"
  };

  return (
    <div className={cn(
      "bg-surface-container-low border border-white/5 p-6 rounded-xl transition-colors",
      colors[color as keyof typeof colors] || colors.default
    )}>
      <div className="text-white/40 text-[10px] uppercase tracking-widest font-label mb-1">{label}</div>
      <div className="text-3xl font-headline font-bold">{value}</div>
    </div>
  );
}
