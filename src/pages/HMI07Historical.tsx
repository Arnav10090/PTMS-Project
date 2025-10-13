import { TopInfoPanel } from '@/components/TopInfoPanel';
import { Database, Download, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const generateHistoricalData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      id: i + 1,
      timestamp: `2025-10-13 ${String(14 - Math.floor(i / 6)).padStart(2, '0')}:${String((i * 10) % 60).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`,
      equipmentId: `Tank #${(i % 3) + 1}`,
      parameter: ['Temperature', 'Density', 'HCl Level', 'Flow Rate'][i % 4],
      value: (Math.random() * 100 + 50).toFixed(2),
      unit: ['°C', 'g/cm³', 'g/l', 'L/min'][i % 4],
      min: (Math.random() * 50 + 40).toFixed(2),
      max: (Math.random() * 150 + 100).toFixed(2),
      avg: (Math.random() * 100 + 70).toFixed(2),
      status: ['valid', 'valid', 'valid', 'warning', 'valid'][i % 5],
      operator: ['John D.', 'Sarah M.', 'Mike R.'][i % 3],
    });
  }
  return data;
};

const historicalData = generateHistoricalData();

const HMI07Historical = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Database className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HMI-07 Historical Data
          </h1>
          <p className="text-sm text-muted-foreground">Archive and Analysis (Last 6 Months)</p>
        </div>
      </div>

      <TopInfoPanel />

      <div className="hmi-card">
        {/* Advanced Filter Panel */}
        <div className="glass-panel p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Advanced Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" className="pl-10 bg-card border-border" defaultValue="2025-10-01" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" className="pl-10 bg-card border-border" defaultValue="2025-10-13" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Equipment</label>
              <Select defaultValue="all-equipment">
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="all-equipment">All Equipment</SelectItem>
                  <SelectItem value="tank-1">Tank #1</SelectItem>
                  <SelectItem value="tank-2">Tank #2</SelectItem>
                  <SelectItem value="tank-3">Tank #3</SelectItem>
                  <SelectItem value="pumps">Pumps</SelectItem>
                  <SelectItem value="sensors">Sensors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Parameter</label>
              <Select defaultValue="all-params">
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="all-params">All Parameters</SelectItem>
                  <SelectItem value="temp">Temperature</SelectItem>
                  <SelectItem value="density">Density</SelectItem>
                  <SelectItem value="hcl">HCl Level</SelectItem>
                  <SelectItem value="flow">Flow Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Shift Filter</label>
              <Select defaultValue="all-shifts">
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="all-shifts">All Shifts</SelectItem>
                  <SelectItem value="shift-a">Shift A</SelectItem>
                  <SelectItem value="shift-b">Shift B</SelectItem>
                  <SelectItem value="shift-c">Shift C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Data Quality</label>
              <Select defaultValue="all-quality">
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="all-quality">All Data</SelectItem>
                  <SelectItem value="valid">Valid Only</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button className="flex-1 bg-primary text-primary-foreground">
                Apply Filters
              </Button>
              <Button variant="outline">Reset</Button>
            </div>

            <div className="flex items-end gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="ghost" size="sm">Today</Button>
            <Button variant="ghost" size="sm">Yesterday</Button>
            <Button variant="ghost" size="sm">Last 7 Days</Button>
            <Button variant="ghost" size="sm">Last 30 Days</Button>
            <Button variant="ghost" size="sm">This Month</Button>
            <Button variant="ghost" size="sm">Last Month</Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-card/95 backdrop-blur-sm">
              <tr className="border-b border-border/50">
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Timestamp</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Equipment ID</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Parameter</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Value</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Unit</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Min</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Max</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Avg</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground">Operator</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((record) => (
                <tr 
                  key={record.id} 
                  className="border-b border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="py-2 px-4 text-xs font-mono">{record.timestamp}</td>
                  <td className="py-2 px-4 text-xs font-medium">{record.equipmentId}</td>
                  <td className="py-2 px-4 text-xs">{record.parameter}</td>
                  <td className={`py-2 px-4 text-xs font-mono font-semibold ${
                    record.status === 'warning' ? 'text-warning' : 'text-success'
                  }`}>
                    {record.value}
                  </td>
                  <td className="py-2 px-4 text-xs font-mono text-muted-foreground">{record.unit}</td>
                  <td className="py-2 px-4 text-xs font-mono">{record.min}</td>
                  <td className="py-2 px-4 text-xs font-mono">{record.max}</td>
                  <td className="py-2 px-4 text-xs font-mono">{record.avg}</td>
                  <td className="py-2 px-4">
                    {record.status === 'valid' ? (
                      <span className="inline-flex items-center gap-1 text-xs text-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        Valid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-warning">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
                        Warning
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-xs">{record.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advanced Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing 1-50 of 175,234 records
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Rows per page:</label>
              <Select defaultValue="50">
                <SelectTrigger className="w-20 h-8 bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="250">250</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">First</Button>
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <span className="px-2 text-sm">...</span>
              <Button variant="outline" size="sm">3505</Button>
            </div>
            <Button variant="outline" size="sm">Next</Button>
            <Button variant="outline" size="sm">Last</Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex items-center gap-2 mt-4 p-4 glass-panel">
          <span className="text-sm font-semibold text-muted-foreground">Export Options:</span>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3 h-3" />
            Visible Data (CSV)
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3 h-3" />
            All Filtered (CSV)
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3 h-3" />
            Excel (XLSX)
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3 h-3" />
            PDF Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HMI07Historical;
