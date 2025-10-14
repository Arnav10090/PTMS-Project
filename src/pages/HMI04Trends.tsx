import { TopInfoPanel } from '@/components/TopInfoPanel';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Toggle } from '@/components/ui/toggle';
import { useMemo, useState } from 'react';

const daysInCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const genSeriesValue = (t: number, count: number, base: number, amp: number, phase: number) => {
  const s = Math.sin(((t + phase) / count) * 2 * Math.PI);
  return Number((base + amp * s).toFixed(2));
};

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
  const [selectedParam, setSelectedParam] = useState<{ group: string; label: string }>({
    group: 'picklingTank',
    label: parameters.picklingTank[0],
  });
  const [timeframe, setTimeframe] = useState<'hour' | 'day' | 'month'>('hour');

  const { chartData, xLabel, xDomain, xTicks } = useMemo(() => {
    let count = 25; // 0..24
    let start = 0;
    let label = 'Time (Hour)';
    if (timeframe === 'day') {
      count = daysInCurrentMonth();
      start = 1;
      label = 'Time (Day)';
    }
    if (timeframe === 'month') {
      count = 12;
      start = 1;
      label = 'Time (Month)';
    }

    const data = Array.from({ length: count }, (_, i) => {
      const t = start + i;
      return {
        time: t,
        tank1: genSeriesValue(i, count, 100, 12, 0),
        tank2: genSeriesValue(i, count, 120, 10, 4),
        tank3: genSeriesValue(i, count, 140, 14, 8),
      };
    });

    const ticks = Array.from({ length: count }, (_, i) => start + i);
    const domain: [number, number] = [start, start + count - 1];
    return { chartData: data, xLabel: label, xDomain: domain, xTicks: ticks };
  }, [timeframe]);

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
                {parameters.picklingTank.map((param) => (
                  <Toggle
                    key={param}
                    pressed={selectedParam.group === 'picklingTank' && selectedParam.label === param}
                    onPressedChange={() => setSelectedParam({ group: 'picklingTank', label: param })}
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    {param}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Rinse Tank Parameters */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Rinse Tank (n=1,2,3,4)</h3>
              <div className="space-y-2">
                {parameters.rinseTank.map((param) => (
                  <Toggle
                    key={param}
                    pressed={selectedParam.group === 'rinseTank' && selectedParam.label === param}
                    onPressedChange={() => setSelectedParam({ group: 'rinseTank', label: param })}
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    {param}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Hot Rinse Tank */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Hot Rinse Tank</h3>
              <div className="space-y-2">
                {parameters.hotRinseTank.map((param) => (
                  <Toggle
                    key={param}
                    pressed={selectedParam.group === 'hotRinseTank' && selectedParam.label === param}
                    onPressedChange={() => setSelectedParam({ group: 'hotRinseTank', label: param })}
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    {param}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Rinse Water Storage */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Rinse Water Storage</h3>
              <div className="space-y-2">
                {parameters.rinseWaterStorage.map((param) => (
                  <Toggle
                    key={param}
                    pressed={selectedParam.group === 'rinseWaterStorage' && selectedParam.label === param}
                    onPressedChange={() => setSelectedParam({ group: 'rinseWaterStorage', label: param })}
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    {param}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Hot Air Drier */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Hot Air Drier</h3>
              <div className="space-y-2">
                {parameters.hotAirDrier.map((param) => (
                  <Toggle
                    key={param}
                    pressed={selectedParam.group === 'hotAirDrier' && selectedParam.label === param}
                    onPressedChange={() => setSelectedParam({ group: 'hotAirDrier', label: param })}
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    {param}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Storage Tank */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Storage Tank (n=1,2,3)</h3>
              <div className="space-y-2">
                {parameters.storageTank.map((param) => (
                  <Toggle
                    key={param}
                    pressed={selectedParam.group === 'storageTank' && selectedParam.label === param}
                    onPressedChange={() => setSelectedParam({ group: 'storageTank', label: param })}
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    {param}
                  </Toggle>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Graph Panel */}
        <div className="lg:col-span-2 hmi-card">
          <h2 className="panel-title">Parameter Trend</h2>
          
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
                  label={{ value: selectedParam.label, angle: -90, position: 'insideLeft' }}
                  domain={["auto", "auto"]}
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
