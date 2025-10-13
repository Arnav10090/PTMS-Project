import { TopInfoPanel } from '@/components/TopInfoPanel';
import { useState } from 'react';
import { Power, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HMI03PumpOperation = () => {
  const [tankMode, setTankMode] = useState<'FULL' | 'MID_CIRC' | 'STOP'>('FULL');
  const [operationPlace, setOperationPlace] = useState<'LOCAL' | 'REMOTE'>('REMOTE');
  const [pumpMode, setPumpMode] = useState<'AUTO' | 'MAN'>('AUTO');
  const [pump1Status, setPump1Status] = useState<'RUN' | 'STOP'>('STOP');
  const [pump2Status, setPump2Status] = useState<'RUN' | 'STOP'>('STOP');
  const [leadPump, setLeadPump] = useState<'No.1' | 'No.2'>('No.1');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Power className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HMI-03 Pump Operation
          </h1>
          <p className="text-sm text-muted-foreground">Pump Mode and Operation Control</p>
        </div>
      </div>

      <TopInfoPanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pump Mode and Operation Selection */}
        <div className="hmi-card">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Pump Mode and Operation Selection</h2>
          </div>

          {/* Non PL TANK Section */}
          <div className="glass-panel p-4 mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">NON PL TANK (n:1,2,3)</h3>
            <div className="flex gap-3">
              <Button
                variant={tankMode === 'FULL' ? 'default' : 'outline'}
                onClick={() => setTankMode('FULL')}
                className={tankMode === 'FULL' ? 'bg-white text-black hover:bg-white/90' : ''}
              >
                FULL
              </Button>
              <Button
                variant={tankMode === 'MID_CIRC' ? 'default' : 'outline'}
                onClick={() => setTankMode('MID_CIRC')}
                className={tankMode === 'MID_CIRC' ? 'bg-destructive text-destructive-foreground' : ''}
              >
                MID. CIRC.
              </Button>
              <Button
                variant={tankMode === 'STOP' ? 'default' : 'outline'}
                onClick={() => setTankMode('STOP')}
                className={tankMode === 'STOP' ? 'bg-success' : ''}
              >
                STOP
              </Button>
            </div>
          </div>

          {/* Acid Pump Operation Section */}
          <div className="glass-panel p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">ACID PUMP OPERATION</h3>
            
            <div className="space-y-4">
              {/* Operation Place */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">OPE. PLACE:</label>
                <div className="flex gap-3">
                  <Button
                    variant={operationPlace === 'LOCAL' ? 'default' : 'outline'}
                    onClick={() => setOperationPlace('LOCAL')}
                    size="sm"
                  >
                    LOCAL
                  </Button>
                  <Button
                    variant={operationPlace === 'REMOTE' ? 'default' : 'outline'}
                    onClick={() => setOperationPlace('REMOTE')}
                    size="sm"
                    className={operationPlace === 'REMOTE' ? 'bg-warning text-warning-foreground' : ''}
                  >
                    REMOTE
                  </Button>
                </div>
              </div>

              {/* Pump Mode */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">PUMP MODE:</label>
                <div className="flex gap-3">
                  <Button
                    variant={pumpMode === 'AUTO' ? 'default' : 'outline'}
                    onClick={() => setPumpMode('AUTO')}
                    size="sm"
                    className={pumpMode === 'AUTO' ? 'bg-warning text-warning-foreground' : ''}
                  >
                    AUTO
                  </Button>
                  <Button
                    variant={pumpMode === 'MAN' ? 'default' : 'outline'}
                    onClick={() => setPumpMode('MAN')}
                    size="sm"
                  >
                    MAN
                  </Button>
                </div>
              </div>

              {/* Pump Controls */}
              <div className="border-t border-border/30 pt-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">No.1 PUMP:</span>
                    <div className="flex gap-2">
                      <Button
                        variant={pump1Status === 'RUN' ? 'default' : 'outline'}
                        onClick={() => setPump1Status('RUN')}
                        size="sm"
                        className={pump1Status === 'RUN' ? 'bg-success' : ''}
                      >
                        RUN
                      </Button>
                      <Button
                        variant={pump1Status === 'STOP' ? 'default' : 'outline'}
                        onClick={() => setPump1Status('STOP')}
                        size="sm"
                        className={pump1Status === 'STOP' ? 'bg-success' : ''}
                      >
                        STOP
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">No.2 PUMP:</span>
                    <div className="flex gap-2">
                      <Button
                        variant={pump2Status === 'RUN' ? 'default' : 'outline'}
                        onClick={() => setPump2Status('RUN')}
                        size="sm"
                        className={pump2Status === 'RUN' ? 'bg-success' : ''}
                      >
                        RUN
                      </Button>
                      <Button
                        variant={pump2Status === 'STOP' ? 'default' : 'outline'}
                        onClick={() => setPump2Status('STOP')}
                        size="sm"
                        className={pump2Status === 'STOP' ? 'bg-success' : ''}
                      >
                        STOP
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Pump Select */}
              <div className="border-t border-border/30 pt-4 mt-4">
                <label className="text-xs text-muted-foreground mb-2 block">LEAD PUMP SELECT:</label>
                <div className="flex gap-3">
                  <Button
                    variant={leadPump === 'No.1' ? 'default' : 'outline'}
                    onClick={() => setLeadPump('No.1')}
                    size="sm"
                    className={leadPump === 'No.1' ? 'bg-warning text-warning-foreground' : ''}
                  >
                    No.1
                  </Button>
                  <Button
                    variant={leadPump === 'No.2' ? 'default' : 'outline'}
                    onClick={() => setLeadPump('No.2')}
                    size="sm"
                    className={leadPump === 'No.2' ? 'bg-warning text-warning-foreground' : ''}
                  >
                    No.2
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Initial Condition - Visual Representation */}
        <div className="hmi-card">
          <h2 className="text-lg font-bold mb-6">Initial Condition</h2>
          
          <div className="glass-panel p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/20 border border-warning/30">
                  <div className="w-3 h-3 rounded-full bg-warning animate-pulse"></div>
                  <span className="text-sm font-semibold text-warning">REMOTE MODE</span>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/20 border border-warning/30">
                  <div className="w-3 h-3 rounded-full bg-warning animate-pulse"></div>
                  <span className="text-sm font-semibold text-warning">AUTO MODE</span>
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">Pump Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 glass-panel">
                    <span className="font-medium">Pump No.1</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-sm font-semibold text-success">STOPPED</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-panel">
                    <span className="font-medium">Pump No.2</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-sm font-semibold text-success">STOPPED</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <div className="flex items-center justify-between p-3 glass-panel bg-warning/10">
                  <span className="font-medium">Lead Pump</span>
                  <span className="text-lg font-bold text-warning">No.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMI03PumpOperation;
