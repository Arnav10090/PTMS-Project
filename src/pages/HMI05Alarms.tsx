import { TopInfoPanel } from '@/components/TopInfoPanel';
import { Bell, Search, Download, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const alarms = [
  {
    id: 1,
    timestamp: '2025-10-13 14:32:15',
    severity: 'critical',
    equipment: 'Tank #2',
    type: 'HCl Concentration',
    description: 'High HCl concentration detected',
    value: '165 g/l',
    threshold: '150 g/l',
    status: 'active',
  },
  {
    id: 2,
    timestamp: '2025-10-13 14:15:42',
    severity: 'high',
    equipment: 'Storage Tank #1',
    type: 'Level Warning',
    description: 'Low level warning',
    value: '15%',
    threshold: '20%',
    status: 'acknowledged',
  },
  {
    id: 3,
    timestamp: '2025-10-13 13:58:30',
    severity: 'critical',
    equipment: 'Pump #1',
    type: 'Equipment Failure',
    description: 'Pump failure detected - No flow',
    value: '0 L/min',
    threshold: '> 50 L/min',
    status: 'active',
  },
  {
    id: 4,
    timestamp: '2025-10-13 13:45:18',
    severity: 'medium',
    equipment: 'Hot Rinse Tank',
    type: 'Temperature',
    description: 'Temperature threshold exceeded',
    value: '72°C',
    threshold: '70°C',
    status: 'acknowledged',
  },
  {
    id: 5,
    timestamp: '2025-10-13 13:22:05',
    severity: 'high',
    equipment: 'Sensor #12',
    type: 'Communication',
    description: 'Communication loss with sensor',
    value: 'No Signal',
    threshold: 'Connected',
    status: 'cleared',
  },
];

const severityConfig = {
  critical: { color: 'text-destructive', bg: 'bg-destructive/20', border: 'border-destructive/30', icon: AlertCircle },
  high: { color: 'text-warning', bg: 'bg-warning/20', border: 'border-warning/30', icon: AlertTriangle },
  medium: { color: 'text-accent', bg: 'bg-accent/20', border: 'border-accent/30', icon: AlertTriangle },
  low: { color: 'text-info', bg: 'bg-info/20', border: 'border-info/30', icon: Info },
};

const statusConfig = {
  active: { color: 'text-destructive', bg: 'bg-destructive/20', label: 'Active', pulse: true },
  acknowledged: { color: 'text-warning', bg: 'bg-warning/20', label: 'Acknowledged', pulse: false },
  cleared: { color: 'text-success', bg: 'bg-success/20', label: 'Cleared', pulse: false },
};

const HMI05Alarms = () => {
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
            <span className="text-sm font-semibold text-destructive">2 Active Alarms</span>
          </div>
        </div>
      </div>

      <TopInfoPanel />

      <div className="hmi-card">
        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Select defaultValue="all-severity">
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

          <Select defaultValue="all-status">
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

          <Select defaultValue="24h">
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search alarms..." 
              className="pl-10 bg-card border-border"
            />
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Alarms Table */}
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
              {alarms.map((alarm) => {
                const severity = severityConfig[alarm.severity as keyof typeof severityConfig];
                const status = statusConfig[alarm.status as keyof typeof statusConfig];
                const SeverityIcon = severity.icon;

                return (
                  <tr 
                    key={alarm.id} 
                    className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${
                      alarm.status === 'active' ? 'border-l-4 border-l-destructive' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-sm font-mono">{alarm.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${severity.bg} ${severity.border} border`}>
                        <SeverityIcon className={`w-4 h-4 ${severity.color}`} />
                        <span className={`text-xs font-semibold uppercase ${severity.color}`}>
                          {alarm.severity}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{alarm.equipment}</td>
                    <td className="py-3 px-4 text-sm">{alarm.type}</td>
                    <td className="py-3 px-4 text-sm">{alarm.description}</td>
                    <td className="py-3 px-4 text-sm font-mono font-semibold">{alarm.value}</td>
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{alarm.threshold}</td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${status.bg}`}>
                        {status.pulse && <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>}
                        <span className={`text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {alarm.status === 'active' && (
                          <Button size="sm" variant="outline" className="h-8 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Info className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
          <div className="text-sm text-muted-foreground">
            Showing 1-5 of 248 alarms
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>« Prev</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">10</Button>
            <Button variant="outline" size="sm">Next »</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMI05Alarms;
