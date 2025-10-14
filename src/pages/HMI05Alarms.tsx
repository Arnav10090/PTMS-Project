import { TopInfoPanel } from '@/components/TopInfoPanel';
import { Bell, Search, Download, CheckCircle, AlertTriangle, AlertCircle, Info, ChevronsDown, ChevronsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useMemo, useState } from 'react';
import { toast } from '@/components/ui/sonner';

type Severity = 'critical' | 'high' | 'medium' | 'low';
type Status = 'active' | 'acknowledged' | 'cleared';

type Alarm = {
  id: number;
  timestamp: string; // human friendly
  severity: Severity;
  equipment: string;
  type: string;
  description: string;
  value: string;
  threshold: string;
  status: Status;
};

const initialAlarms: Alarm[] = [
  { id: 1, timestamp: '2025-10-13 14:32:15', severity: 'critical', equipment: 'Tank #2', type: 'HCl Concentration', description: 'High HCl concentration detected', value: '165 g/l', threshold: '150 g/l', status: 'active' },
  { id: 2, timestamp: '2025-10-13 14:15:42', severity: 'high', equipment: 'Storage Tank #1', type: 'Level Warning', description: 'Low level warning', value: '15%', threshold: '20%', status: 'acknowledged' },
  { id: 3, timestamp: '2025-10-13 13:58:30', severity: 'critical', equipment: 'Pump #1', type: 'Equipment Failure', description: 'Pump failure detected - No flow', value: '0 L/min', threshold: '> 50 L/min', status: 'active' },
  { id: 4, timestamp: '2025-10-13 13:45:18', severity: 'medium', equipment: 'Hot Rinse Tank', type: 'Temperature', description: 'Temperature threshold exceeded', value: '72°C', threshold: '70°C', status: 'acknowledged' },
  { id: 5, timestamp: '2025-10-13 13:22:05', severity: 'high', equipment: 'Sensor #12', type: 'Communication', description: 'Communication loss with sensor', value: 'No Signal', threshold: 'Connected', status: 'cleared' },
  { id: 6, timestamp: '2025-10-13 12:55:11', severity: 'low', equipment: 'Pump #2', type: 'Vibration', description: 'Slight vibration increase', value: '1.2 g', threshold: '1.5 g', status: 'cleared' },
  { id: 7, timestamp: '2025-10-13 12:40:02', severity: 'medium', equipment: 'Tank #1', type: 'pH', description: 'pH above nominal', value: '2.6', threshold: '2.2', status: 'acknowledged' },
  { id: 8, timestamp: '2025-10-13 12:10:44', severity: 'high', equipment: 'Vent Scrubber', type: 'Pressure', description: 'High pressure detected', value: '1.9 bar', threshold: '1.5 bar', status: 'active' },
  { id: 9, timestamp: '2025-10-13 11:55:27', severity: 'critical', equipment: 'Pump #3', type: 'Overcurrent', description: 'Motor overcurrent', value: '42 A', threshold: '35 A', status: 'active' },
  { id: 10, timestamp: '2025-10-13 11:40:10', severity: 'low', equipment: 'Storage Tank #2', type: 'Level', description: 'Level trending low', value: '30%', threshold: '25%', status: 'cleared' },
  { id: 11, timestamp: '2025-10-13 11:15:33', severity: 'medium', equipment: 'Heat Exchanger', type: 'Temperature', description: 'Outlet temp rise', value: '68°C', threshold: '65°C', status: 'acknowledged' },
  { id: 12, timestamp: '2025-10-13 10:55:19', severity: 'high', equipment: 'Tank #3', type: 'HCl Concentration', description: 'Concentration near limit', value: '148 g/l', threshold: '150 g/l', status: 'acknowledged' },
  { id: 13, timestamp: '2025-10-13 10:35:42', severity: 'low', equipment: 'Sensor #5', type: 'Calibration', description: 'Calibration due soon', value: 'N/A', threshold: 'Scheduled', status: 'cleared' },
  { id: 14, timestamp: '2025-10-13 10:05:08', severity: 'medium', equipment: 'Pump #1', type: 'Vibration', description: 'Vibration trend rising', value: '1.4 g', threshold: '1.5 g', status: 'active' },
  { id: 15, timestamp: '2025-10-13 09:45:59', severity: 'high', equipment: 'Hot Rinse Tank', type: 'Temperature', description: 'Temperature high warning', value: '71°C', threshold: '70°C', status: 'acknowledged' },
  { id: 16, timestamp: '2025-10-13 09:20:21', severity: 'low', equipment: 'Storage Tank #1', type: 'Level', description: 'Level oscillations detected', value: '45%', threshold: '—', status: 'cleared' },
  { id: 17, timestamp: '2025-10-13 08:58:15', severity: 'critical', equipment: 'Pump #2', type: 'Equipment Failure', description: 'Seal failure suspected', value: 'Leak rate high', threshold: 'No leaks', status: 'active' },
  { id: 18, timestamp: '2025-10-13 08:30:05', severity: 'medium', equipment: 'Tank #2', type: 'pH', description: 'pH below nominal', value: '1.8', threshold: '2.0', status: 'acknowledged' },
  { id: 19, timestamp: '2025-10-13 08:05:47', severity: 'high', equipment: 'Vent Scrubber', type: 'Pressure', description: 'Pressure spike recorded', value: '2.1 bar', threshold: '1.5 bar', status: 'cleared' },
  { id: 20, timestamp: '2025-10-13 07:50:23', severity: 'low', equipment: 'Sensor #9', type: 'Battery', description: 'Battery low', value: '18%', threshold: '15%', status: 'active' },
  { id: 21, timestamp: '2025-10-14 00:12:42', severity: 'medium', equipment: 'Tank #4', type: 'Level', description: 'Level high warning', value: '87%', threshold: '85%', status: 'acknowledged' },
  { id: 22, timestamp: '2025-10-14 01:05:16', severity: 'high', equipment: 'Pump #4', type: 'Overcurrent', description: 'Current draw elevated', value: '38 A', threshold: '35 A', status: 'active' },
  { id: 23, timestamp: '2025-10-14 02:22:09', severity: 'low', equipment: 'Sensor #3', type: 'Signal', description: 'Intermittent signal', value: 'Drops observed', threshold: 'Stable', status: 'cleared' },
  { id: 24, timestamp: '2025-10-14 03:40:31', severity: 'medium', equipment: 'Heat Exchanger', type: 'Temperature', description: 'Inlet temp high', value: '75°C', threshold: '72°C', status: 'active' },
  { id: 25, timestamp: '2025-10-14 04:10:55', severity: 'critical', equipment: 'Tank #5', type: 'HCl Concentration', description: 'Critical concentration', value: '170 g/l', threshold: '150 g/l', status: 'active' },
];

const severityConfig = {
  critical: { color: 'text-destructive', bg: 'bg-destructive/20', border: 'border-destructive/30', icon: AlertCircle },
  high: { color: 'text-warning', bg: 'bg-warning/20', border: 'border-warning/30', icon: AlertTriangle },
  medium: { color: 'text-accent', bg: 'bg-accent/20', border: 'border-accent/30', icon: AlertTriangle },
  low: { color: 'text-info', bg: 'bg-info/20', border: 'border-info/30', icon: Info },
} as const;

const statusConfig = {
  active: { color: 'text-destructive', bg: 'bg-destructive/20', label: 'Active', pulse: true },
  acknowledged: { color: 'text-warning', bg: 'bg-warning/20', label: 'Acknowledged', pulse: false },
  cleared: { color: 'text-success', bg: 'bg-success/20', label: 'Cleared', pulse: false },
} as const;

const FOOTER_LIMIT = 10;

const HMI05Alarms = () => {
  const [data, setData] = useState<Alarm[]>(initialAlarms);
  const [severity, setSeverity] = useState<'all-severity' | Severity>('all-severity');
  const [status, setStatus] = useState<'all-status' | Status>('all-status');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | 'custom'>('24h');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [footerIds, setFooterIds] = useState<number[]>(() =>
    // initialize footer with most recent acknowledged alarms (by id desc)
    initialAlarms.filter((a) => a.status === 'acknowledged').slice(-FOOTER_LIMIT).map((a) => a.id).reverse(),
  );

  // popup tracks ids of generated alarms that should appear in the popup and remain until acknowledged
  const [popupAlarmIds, setPopupAlarmIds] = useState<number[]>([]);
  const [footerCollapsed, setFooterCollapsed] = useState(false);

  const pageSize = 10;

  const activeCount = useMemo(() => data.filter((a) => a.status === 'active').length, [data]);

  // filtered includes all alarms but we will exclude footer IDs from the table view
  const filtered = useMemo(() => {
    const now = new Date();
    const cutoff = ((): Date | null => {
      if (timeRange === '1h') return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      if (timeRange === '24h') return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      if (timeRange === '7d') return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return null; // custom -> no time filter for now
    })();

    const q = query.trim().toLowerCase();

    return data.filter((a) => {
      if (footerIds.includes(a.id)) return false; // footer items not shown in the table
      if (severity !== 'all-severity' && a.severity !== severity) return false;
      if (status !== 'all-status' && a.status !== status) return false;
      if (cutoff) {
        const ts = new Date(a.timestamp.replace(' ', 'T'));
        if (!(ts instanceof Date) || isNaN(ts.getTime())) return false;
        if (ts < cutoff) return false;
      }
      if (q) {
        const hay = `${a.equipment} ${a.type} ${a.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data, severity, status, timeRange, query, footerIds]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filtered.length);
  const pageRows = filtered.slice(start, end);

  const resetToFirstPage = () => setPage(1);

  const handleExport = () => {
    const rows = filtered;
    const headers = ['timestamp', 'severity', 'equipment', 'type', 'description', 'value', 'threshold', 'status'] as const;
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [headers.join(',')]
      .concat(
        rows.map((r) =>
          [r.timestamp, r.severity, r.equipment, r.type, r.description, r.value, r.threshold, r.status]
            .map(escape)
            .join(','),
        ),
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alarms.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  // acknowledge: update alarm status, add to footer (most recent at front), and remove from popup list
  const acknowledge = (id: number) => {
    setData((prev) => prev.map((a) => (a.id === id && a.status === 'active' ? { ...a, status: 'acknowledged' } : a)));

    setFooterIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)];
      // if more than FOOTER_LIMIT, drop the last entries (those go back into the table)
      return next.slice(0, FOOTER_LIMIT);
    });

    setPopupAlarmIds((prev) => prev.filter((x) => x !== id));
    toast.info('Alarm acknowledged');
  };

  const info = (a: Alarm) => {
    toast(a.description, { description: `${a.equipment} • ${a.type} • ${a.value} (threshold ${a.threshold})` });
  };

  const closeAlarm = (id: number) => {
    // Permanently remove alarm from data and any lists
    setData((prev) => prev.filter((a) => a.id !== id));
    setPopupAlarmIds((prev) => prev.filter((x) => x !== id));
    setFooterIds((prev) => prev.filter((x) => x !== id));
    toast.success('Alarm closed');
  };

  const renderPageButtons = () => {
    const items: number[] = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) items.push(i);
    } else {
      items.push(1, 2, 3);
      if (currentPage > 4 && currentPage < pageCount - 2) {
        items.push(currentPage - 1, currentPage, currentPage + 1);
      }
      items.push(pageCount - 2, pageCount - 1, pageCount);
    }
    const unique = Array.from(new Set(items.filter((n) => n >= 1 && n <= pageCount))).sort((a, b) => a - b);

    const withEllipsis: (number | '...')[] = [];
    unique.forEach((n, i) => {
      if (i === 0) withEllipsis.push(n);
      else {
        const prev = unique[i - 1];
        if (n - prev > 1) withEllipsis.push('...');
        withEllipsis.push(n);
      }
    });

    return withEllipsis.map((n, idx) =>
      n === '...'
        ? (
            <span key={`e-${idx}`} className="px-2 select-none">
              ...
            </span>
          )
        : (
            <Button
              key={n}
              variant="outline"
              size="sm"
              className={currentPage === n ? 'bg-primary text-primary-foreground' : ''}
              onClick={() => setPage(n)}
            >
              {n}
            </Button>
          ),
    );
  };

  // generate a synthetic alarm
  const generateAlarm = (override?: Partial<Alarm>) => {
    setData((prev) => {
      const maxId = prev.reduce((m, a) => Math.max(m, a.id), 0);
      const id = maxId + 1;
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const severities: Severity[] = ['critical', 'high', 'medium', 'low'];
      const severity = (override?.severity || severities[Math.floor(Math.random() * severities.length)]) as Severity;
      const equipment = override?.equipment || `Sensor #${Math.ceil(Math.random() * 20)}`;
      const type = override?.type || (severity === 'critical' ? 'Equipment Failure' : 'Alert');
      const description = override?.description || `${type} detected on ${equipment}`;
      const value = override?.value || (severity === 'low' ? 'N/A' : `${Math.ceil(Math.random() * 100)} units`);
      const threshold = override?.threshold || '—';

      const alarm: Alarm = {
        id,
        timestamp: ts,
        severity,
        equipment,
        type,
        description,
        value,
        threshold,
        status: 'active',
        ...override,
      };

      // add to popup list so the popup appears until acknowledged
      setPopupAlarmIds((p) => [...p, id]);

      return [alarm, ...prev];
    });
  };

  // every 1 minute generate a new alarm
  useEffect(() => {
    const id = setInterval(() => {
      generateAlarm();
    }, 60 * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // popup is visible if any popupAlarmIds still refer to active alarms
  const popupActiveAlarms = useMemo(() => {
    return popupAlarmIds
      .map((id) => data.find((a) => a.id === id))
      .filter((a): a is Alarm => !!a && a.status === 'active');
  }, [popupAlarmIds, data]);

  // footer alarms details
  const footerAlarms = footerIds.map((id) => data.find((a) => a.id === id)).filter((a): a is Alarm => !!a);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-destructive animate-pulse-glow" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent">
              HMI-05 Alarms & Alerts
            </h1>
            <p className="text-sm text-muted-foreground">Real-time System Monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-lg bg-destructive/20 border border-destructive/30">
            <span className="text-sm font-semibold text-destructive">{activeCount} Active Alarms</span>
          </div>
        </div>
      </div>

      <TopInfoPanel />

      <div className="hmi-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Select value={severity} onValueChange={(v) => { setSeverity(v as any); resetToFirstPage(); }}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="all-severity">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(v) => { setStatus(v as any); resetToFirstPage(); }}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="cleared">Cleared</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={(v) => { setTimeRange(v as any); resetToFirstPage(); }}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="custom">All Time</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => { setQuery(e.target.value); resetToFirstPage(); }}
              placeholder="Search alarms..."
              className="pl-10 bg-card border-border"
            />
          </div>

          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Severity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Equipment</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Threshold</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((alarm) => {
                const sev = severityConfig[alarm.severity];
                const st = statusConfig[alarm.status];
                const SeverityIcon = sev.icon;

                return (
                  <tr
                    key={alarm.id}
                    className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${alarm.status === 'active' ? 'border-l-4 border-l-destructive' : ''}`}
                  >
                    <td className="py-3 px-4 text-sm font-mono">{alarm.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${sev.bg} ${sev.border} border`}>
                        <SeverityIcon className={`w-4 h-4 ${sev.color}`} />
                        <span className={`text-xs font-semibold uppercase ${sev.color}`}>{alarm.severity}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{alarm.equipment}</td>
                    <td className="py-3 px-4 text-sm">{alarm.type}</td>
                    <td className="py-3 px-4 text-sm">{alarm.description}</td>
                    <td className="py-3 px-4 text-sm font-mono font-semibold">{alarm.value}</td>
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{alarm.threshold}</td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${st.bg}`}>
                        {st.pulse && <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>}
                        <span className={`text-xs font-semibold ${st.color}`}>{st.label}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => closeAlarm(alarm.id)}>
                          Close
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => info(alarm)}>
                          <Info className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pageRows.length === 0 && (
                <tr>
                  <td className="py-8 px-4 text-center text-sm text-muted-foreground" colSpan={9}>
                    No alarms match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
          <div className="text-sm text-muted-foreground">
            {filtered.length === 0 ? 'Showing 0 of 0 alarms' : `Showing ${start + 1}-${end} of ${filtered.length} alarms`}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              « Prev
            </Button>
            {renderPageButtons()}
            <Button variant="outline" size="sm" disabled={currentPage === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
              Next »
            </Button>
          </div>
        </div>
      </div>

      {/* Footer: recent acknowledged alarms (collapsible) */}
      <div className="fixed bottom-0 z-40 pointer-events-none" style={{ left: 'var(--content-left)', right: 0 as any }}>
        <div className={`max-w-full mx-auto px-6 py-3 bg-card/90 border-t border-border backdrop-blur-sm shadow-lg pointer-events-auto transition-all duration-300 ${footerCollapsed ? 'h-12' : 'h-auto'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-semibold">Recent Acknowledged Alarms</div>
                <div className="text-xs text-muted-foreground">Most recent {FOOTER_LIMIT} acknowledged</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground mr-2">Footer shows latest acknowledged alarms</div>
              <Button size="sm" variant="ghost" onClick={() => setFooterCollapsed((s) => !s)}>
                {footerCollapsed ? <><ChevronsUp className="w-4 h-4" /> Expand</> : <><ChevronsDown className="w-4 h-4" /> Collapse</>}
              </Button>
            </div>
          </div>

          {/* collapsed -> hide list, show compact bar only */}
          {!footerCollapsed && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
              {footerAlarms.length === 0 && (
                <div className="text-sm text-muted-foreground">No acknowledged alarms yet</div>
              )}
              {footerAlarms.map((a) => (
                <div key={a.id} className="flex items-center gap-3 bg-muted/5 p-2 rounded-md border border-border">
                  <div className={`w-2.5 h-2.5 rounded-full ${severityConfig[a.severity].color}`} />
                  <div className="text-xs">
                    <div className="font-medium">{a.equipment} • {a.type}</div>
                    <div className="text-muted-foreground">{a.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {footerCollapsed && (
            <div className="mt-2 flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Footer collapsed — {footerAlarms.length} acknowledged</div>
            </div>
          )}
        </div>
      </div>

      {/* Popup for new alarms - remains until those alarms are acknowledged via table */}
      {popupActiveAlarms.length > 0 && (
        <div className="fixed right-6 bottom-28 z-50 w-96">
          <div className="bg-card border border-border shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-destructive" />
                <div>
                  <div className="text-sm font-semibold">New Alarms</div>
                  <div className="text-xs text-muted-foreground">These will remain until acknowledged</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{popupActiveAlarms.length} unacknowledged</div>
            </div>

            <div className="max-h-64 overflow-auto">
              {popupActiveAlarms.map((a) => (
                <div key={a.id} className="px-4 py-3 hover:bg-muted/10 flex items-start gap-3">
                  <div className={`mt-1 ${severityConfig[a.severity].color}`}>●</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.equipment} — {a.type}</div>
                    <div className="text-xs text-muted-foreground">{a.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{a.timestamp} • {a.value}</div>
                  </div>
                  <div className="ml-2">
                    <Button size="sm" variant="outline" onClick={() => acknowledge(a.id)}>
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-border flex items-center justify-end gap-2">
              <div className="text-xs text-muted-foreground mr-auto">Acknowledge alarms from the table to dismiss</div>
              <Button size="sm" variant="ghost" onClick={() => {
                // user can dismiss popup only if there are no active popup alarms (protective measure)
                if (popupActiveAlarms.length === 0) setPopupAlarmIds([]);
              }}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HMI05Alarms;
