import { TopInfoPanel } from '@/components/TopInfoPanel';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';

const chartData = Array.from({ length: 29 }, (_, i) => ({
  time: i,
  tank1: 75 + Math.random() * 10,
  tank2: 145 + Math.random() * 8,
  tank3: 120 + Math.random() * 12,
}));

const parameters = {
  picklingTank: [
    'Tank Level', 'Tank Temperature', 'Density', 'Cond.', 'FeCl2', 
    'Total HCL', 'HCL - PV', 'HCL - SV', 'Flow (HCL/DM)'
  ],
  rinseTank: [
    'Level', 'Temp (#4 Only)', 'pH (#4 Only)', 'DM Water'
  ],
  hotRinseTank: ['Level', 'Temp'],
  rinseWaterStorage: ['Level'],
  hotAirDrier: ['Temp'],
  storageTank: ['Level', 'Density']
};

const HMI04Trends = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HMI-04 Trends / Graphs
          </h1>
          <p className="text-sm text-muted-foreground">Real-time Parameter Monitoring and Analysis</p>
        </div>
      </div>

      <TopInfoPanel />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameter Selection Panel */}
        <div className="hmi-card">
          <h2 className="panel-title">List of Parameters</h2>
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {/* Pickling Tank Parameters */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Pickling Tank (n=1,2,3)</h3>
              <div className="space-y-2">
                {parameters.picklingTank.map((param, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors">
                    <Checkbox defaultChecked={idx < 2} />
                    <span className="text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rinse Tank Parameters */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Rinse Tank (n=1,2,3,4)</h3>
              <div className="space-y-2">
                {parameters.rinseTank.map((param, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors">
                    <Checkbox />
                    <span className="text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hot Rinse Tank */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Hot Rinse Tank</h3>
              <div className="space-y-2">
                {parameters.hotRinseTank.map((param, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors">
                    <Checkbox />
                    <span className="text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rinse Water Storage */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Rinse Water Storage</h3>
              <div className="space-y-2">
                {parameters.rinseWaterStorage.map((param, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors">
                    <Checkbox />
                    <span className="text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hot Air Drier */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Hot Air Drier</h3>
              <div className="space-y-2">
                {parameters.hotAirDrier.map((param, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors">
                    <Checkbox />
                    <span className="text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Storage Tank */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Storage Tank (n=1,2,3)</h3>
              <div className="space-y-2">
                {parameters.storageTank.map((param, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors">
                    <Checkbox />
                    <span className="text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Graph Panel */}
        <div className="lg:col-span-2 hmi-card">
          <h2 className="panel-title">Multiple Parameter Selection Option</h2>
          
          <div className="glass-panel p-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Time (hours)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'HCl concentration (g/l)', angle: -90, position: 'insideLeft' }}
                  domain={[60, 160]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="tank1" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="#1 Tank"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="tank2" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="#2 Tank"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="tank3" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="#3 Tank"
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-4 mt-6">
              <button className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold text-sm transition-colors">
                Hour
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-muted/30 text-muted-foreground font-semibold text-sm transition-colors">
                Day
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-muted/30 text-muted-foreground font-semibold text-sm transition-colors">
                Period
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMI04Trends;
