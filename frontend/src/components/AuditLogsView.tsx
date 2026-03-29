import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User,
  Shield,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';
// API service import (Ensure you have created src/services/api.ts as discussed)
import { api } from '../services/api'; 

// Yeh fallback data hai agar backend API down ho ya run na ho rahi ho
const fallbackLogs = [
  { id: 'TX-9021', action: 'Instance Right-sizing', resource: 'i-0a12bcd...', user: 'FinPilot AI', status: 'success', time: '2 mins ago', impact: '-₹1,420/mo' },
  { id: 'TX-9020', action: 'Policy Update', resource: 'IAM: Production-Admin', user: 'guptaaayush5678', status: 'success', time: '14 mins ago', impact: 'Security' },
  { id: 'TX-9019', action: 'S3 Lifecycle Rule', resource: 'bucket-logs-prod', user: 'FinPilot AI', status: 'warning', time: '1 hour ago', impact: '-₹450/mo' },
  { id: 'TX-9018', action: 'Cluster Scaling', resource: 'EKS-Main-Cluster', user: 'guptaaayush5678', status: 'success', time: '3 hours ago', impact: 'Performance' },
  { id: 'TX-9017', action: 'Database Snapshot', resource: 'RDS-Postgres-01', user: 'System', status: 'success', time: '5 hours ago', impact: 'Backup' },
  { id: 'TX-9016', action: 'Anomaly Alert', resource: 'Project: Hydra', user: 'FinPilot AI', status: 'error', time: '6 hours ago', impact: 'Critical' },
  { id: 'TX-9015', action: 'Reserved Instance Purchase', resource: 't3.medium (x12)', user: 'guptaaayush5678', status: 'success', time: '1 day ago', impact: '-₹8,200/mo' },
  { id: 'TX-9014', action: 'VPC Peering', resource: 'vpc-0921-prod', user: 'System', status: 'success', time: '1 day ago', impact: 'Network' },
];

export default function AuditLogsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState(fallbackLogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API Call to fetch real logs from backend
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const data = await api.getLogs();
        if (data && data.length > 0) {
          setLogs(data); // Real data set karo
        }
      } catch (error) {
        console.log("Using fallback data for Audit Logs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Search filter logic
  const filteredLogs = logs.filter(log => 
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.resource.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-white mb-2 uppercase">
            Audit <span className="text-primary-fixed">Ledger</span>
          </h1>
          <p className="text-on-surface-variant font-body max-w-xl">
            Immutable record of all autonomous actions and manual overrides. Compliant with SOC2 and GDPR standards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-white text-xs font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-fixed text-surface text-xs font-bold flex items-center gap-2 hover:bg-white transition-colors">
            <Shield className="w-4 h-4" />
            Compliance Report
          </button>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary-fixed transition-colors" />
          <input 
            type="text" 
            placeholder="Search by Transaction ID, Resource, or User..."
            className="w-full bg-surface-container-low border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary-fixed/30 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <FilterButton label="All Events" active />
          <FilterButton label="AI Actions" />
          <FilterButton label="Manual" />
          <FilterButton label="Errors" />
        </div>
      </div>

      {/* Audit Table */}
      <div className="glass-card rounded-xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-highest/50 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Transaction</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Action & Resource</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Initiated By</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Impact</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-primary-fixed animate-pulse font-mono text-sm">
                    Fetching secure logs from backend...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40 font-mono text-sm">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-primary-fixed font-bold">{log.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-primary-fixed transition-colors">{log.action}</span>
                        <span className="text-[10px] text-white/40 font-mono">{log.resource}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold",
                          log.user === 'FinPilot AI' ? "bg-primary-fixed/10 text-primary-fixed border border-primary-fixed/20" : "bg-surface-container-highest text-white/60 border border-white/10"
                        )}>
                          {log.user === 'FinPilot AI' ? 'AI' : <User className="w-3 h-3" />}
                        </div>
                        <span className="text-xs text-white/60">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "text-xs font-bold",
                        log.impact.startsWith('-') ? "text-secondary-fixed" : 
                        log.impact === 'Critical' ? "text-error" : "text-white/60"
                      )}>
                        {log.impact}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-white/40 text-xs">
                        <Clock className="w-3 h-3" />
                        {log.time}
                        <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary-fixed" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-surface-container-low/50 px-6 py-4 flex items-center justify-between border-t border-white/5">
          <div className="text-xs text-white/40">
            Showing <span className="text-white font-bold">1-{filteredLogs.length}</span> of <span className="text-white font-bold">{logs.length}</span> transactions
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-primary-fixed/30 text-primary-fixed bg-primary-fixed/5">
              <span className="text-xs font-bold px-2">1</span>
            </button>
            <button className="p-2 rounded-lg border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all">
              <span className="text-xs font-bold px-2">2</span>
            </button>
            <button className="p-2 rounded-lg border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all">
              <span className="text-xs font-bold px-2">3</span>
            </button>
            <button className="p-2 rounded-lg border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, active }: any) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
      active 
        ? "bg-primary-fixed/10 text-primary-fixed border-primary-fixed/30 shadow-[0_0_15px_rgba(0,251,251,0.1)]" 
        : "bg-surface-container-low text-white/40 border-white/5 hover:border-white/20"
    )}>
      {label}
    </button>
  );
}

function StatusBadge({ status }: any) {
  const configs = {
    success: { icon: CheckCircle2, text: 'Success', color: 'text-secondary-fixed bg-secondary-fixed/10 border-secondary-fixed/20' },
    warning: { icon: AlertCircle, text: 'Warning', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
    error: { icon: AlertCircle, text: 'Failed', color: 'text-error bg-error/10 border-error/20' },
  };

  const config = configs[status as keyof typeof configs] || configs.success;
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider", config.color)}>
      <Icon className="w-3 h-3" />
      {config.text}
    </div>
  );
}