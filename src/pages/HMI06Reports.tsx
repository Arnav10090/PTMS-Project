import { TopInfoPanel } from '@/components/TopInfoPanel';
import { FileText, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HMI06Reports = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HMI-06 Reports
          </h1>
          <p className="text-sm text-muted-foreground">Production and Performance Reports</p>
        </div>
      </div>

      <TopInfoPanel />

      {/* Coil Report */}
      <div className="hmi-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">COIL REPORT</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Refer Sheet 'Field Data' for legibility</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="py-2 px-3 text-left font-semibold">SN</th>
                <th className="py-2 px-3 text-left font-semibold">Coil ID</th>
                <th className="py-2 px-3 text-left font-semibold">Grade</th>
                <th className="py-2 px-3 text-left font-semibold">Width</th>
                <th className="py-2 px-3 text-left font-semibold">Weight</th>
                <th className="py-2 px-3 text-left font-semibold">Thick</th>
                <th className="py-2 px-3 text-left font-semibold">Line Speed</th>
                <th className="py-2 px-3 text-left font-semibold">Start Time</th>
                <th className="py-2 px-3 text-left font-semibold">End Time</th>
                <th className="py-2 px-3 text-left font-semibold">Total Time</th>
                <th className="py-2 px-3 text-left font-semibold">Output</th>
                <th className="py-2 px-3 text-left font-semibold">Prodn Rate</th>
                <th className="py-2 px-3 text-left font-semibold">KWH/Ton</th>
                <th className="py-2 px-3 text-left font-semibold">Yield %</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="border-b border-border/30 hover:bg-muted/10">
                  <td className="py-2 px-3 font-mono">{row}</td>
                  <td className="py-2 px-3 font-mono">C-{2540 + row}-A</td>
                  <td className="py-2 px-3">SS-304</td>
                  <td className="py-2 px-3 font-mono">1250</td>
                  <td className="py-2 px-3 font-mono">12.5</td>
                  <td className="py-2 px-3 font-mono">2.5</td>
                  <td className="py-2 px-3 font-mono">45.2</td>
                  <td className="py-2 px-3 font-mono">08:15</td>
                  <td className="py-2 px-3 font-mono">10:42</td>
                  <td className="py-2 px-3 font-mono">2:27</td>
                  <td className="py-2 px-3 font-mono">12.1</td>
                  <td className="py-2 px-3 font-mono">12.8</td>
                  <td className="py-2 px-3 font-mono">285</td>
                  <td className="py-2 px-3 font-mono text-success">96.8%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Report */}
      <div className="hmi-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">DAILY REPORT</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="w-4 h-4" />
            Print Report
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Refer Sheet 'Field Data' for legibility</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="py-2 px-3 text-left font-semibold">SN</th>
                <th className="py-2 px-3 text-left font-semibold">Date</th>
                <th className="py-2 px-3 text-left font-semibold">No. Coils</th>
                <th className="py-2 px-3 text-left font-semibold">I/P Wt (T)</th>
                <th className="py-2 px-3 text-left font-semibold">O/P Wt (T)</th>
                <th className="py-2 px-3 text-left font-semibold">Yield %</th>
                <th className="py-2 px-3 text-left font-semibold">Tank-1 Temp</th>
                <th className="py-2 px-3 text-left font-semibold">Tank-1 Conc</th>
                <th className="py-2 px-3 text-left font-semibold">FA Cons.</th>
                <th className="py-2 px-3 text-left font-semibold">RA Cons.</th>
                <th className="py-2 px-3 text-left font-semibold">Run Hrs</th>
                <th className="py-2 px-3 text-left font-semibold">Prod Rate</th>
                <th className="py-2 px-3 text-left font-semibold">Utilzn %</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="border-b border-border/30 hover:bg-muted/10">
                  <td className="py-2 px-3 font-mono">{row}</td>
                  <td className="py-2 px-3 font-mono">2025-10-{13 - row}</td>
                  <td className="py-2 px-3 font-mono text-center">18</td>
                  <td className="py-2 px-3 font-mono">245.5</td>
                  <td className="py-2 px-3 font-mono">237.2</td>
                  <td className="py-2 px-3 font-mono text-success">96.6%</td>
                  <td className="py-2 px-3 font-mono">85°C</td>
                  <td className="py-2 px-3 font-mono">18.2%</td>
                  <td className="py-2 px-3 font-mono">125 L</td>
                  <td className="py-2 px-3 font-mono">340 L</td>
                  <td className="py-2 px-3 font-mono">22.5</td>
                  <td className="py-2 px-3 font-mono">10.5 T/Hr</td>
                  <td className="py-2 px-3 font-mono text-warning">87.5%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consumption Report */}
      <div className="hmi-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">CONSUMPTION REPORT</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
        
        <div className="glass-panel p-4 mb-4 inline-block">
          <label className="text-sm font-semibold text-muted-foreground mr-3">Time Period:</label>
          <select className="bg-card border border-border rounded px-3 py-1 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="py-3 px-4 text-left font-semibold">SN</th>
                <th className="py-3 px-4 text-left font-semibold">Parameter Name</th>
                <th className="py-3 px-4 text-left font-semibold">UOM</th>
                <th className="py-3 px-4 text-left font-semibold">Day</th>
                <th className="py-3 px-4 text-left font-semibold">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30 hover:bg-muted/10">
                <td className="py-3 px-4 font-mono">1</td>
                <td className="py-3 px-4 font-medium">Fresh Acid (FA)</td>
                <td className="py-3 px-4 font-mono">M³</td>
                <td className="py-3 px-4 font-mono text-lg font-semibold text-primary">2.5</td>
                <td className="py-3 px-4 font-mono text-lg font-semibold">45.8</td>
              </tr>
              <tr className="border-b border-border/30 hover:bg-muted/10">
                <td className="py-3 px-4 font-mono">2</td>
                <td className="py-3 px-4 font-medium">Regenerated Acid (RA)</td>
                <td className="py-3 px-4 font-mono">M³</td>
                <td className="py-3 px-4 font-mono text-lg font-semibold text-secondary">5.8</td>
                <td className="py-3 px-4 font-mono text-lg font-semibold">128.4</td>
              </tr>
              <tr className="border-b border-border/30 hover:bg-muted/10">
                <td className="py-3 px-4 font-mono">3</td>
                <td className="py-3 px-4 font-medium">Demineralized Water</td>
                <td className="py-3 px-4 font-mono">M³</td>
                <td className="py-3 px-4 font-mono text-lg font-semibold text-info">12.3</td>
                <td className="py-3 px-4 font-mono text-lg font-semibold">287.6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HMI06Reports;
