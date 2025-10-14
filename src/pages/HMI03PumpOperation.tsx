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
  const [manual1Run, setManual1Run] = useState<'RUN' | 'STOP'>('STOP');
  const [manual2Run, setManual2Run] = useState<'RUN' | 'STOP'>('STOP');

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
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold">Pump Mode and Operation Selection</h2>
          </div>

          <div className="border-2 border-foreground p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Non PL TANK */}
              <div>
                <h3 className="text-sm font-semibold text-center mb-4">Non PL TANK (n:1,2,3)</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => setTankMode('FULL')}
                    className={`w-full h-16 border-2 border-foreground ${tankMode === 'FULL' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : 'hover:bg-background hover:text-foreground'}`}
                  >
                    FULL
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTankMode('MID_CIRC')}
                    className={`w-full h-16 border-2 border-foreground ${tankMode === 'MID_CIRC' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : 'hover:bg-background hover:text-foreground'}`}
                  >
                    MID. CIRC.
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTankMode('STOP')}
                    className={`w-full h-16 border-2 border-foreground ${tankMode === 'STOP' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : 'hover:bg-background hover:text-foreground'}`}
                  >
                    STOP
                  </Button>
                </div>
              </div>

              {/* Right Column - Acid Pump Operation */}
              <div>
                <h3 className="text-sm font-semibold text-center mb-4">ACID PUMP OPERATION</h3>
                
                <div className="space-y-4">
                  {/* Operation Place */}
                  <div>
                    <label className="text-xs font-semibold block text-center mb-2">OPE. PLACE:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setOperationPlace('LOCAL')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${operationPlace === 'LOCAL' ? 'bg-warning text-warning-foreground hover:bg-warning hover:text-warning-foreground' : 'hover:bg-background hover:text-foreground'}`}
                      >
                        LOCAL
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setOperationPlace('REMOTE')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${operationPlace === 'REMOTE' ? 'bg-warning text-warning-foreground hover:bg-warning hover:text-warning-foreground' : 'hover:bg-background hover:text-foreground'}`}
                      >
                        REMOTE
                      </Button>
                    </div>
                  </div>

                  {/* Pump Mode */}
                  <div>
                    <label className="text-xs font-semibold block text-center mb-2">PUMP MODE:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setPumpMode('AUTO')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${pumpMode === 'AUTO' ? 'bg-warning text-warning-foreground hover:bg-warning hover:text-warning-foreground' : 'hover:bg-background hover:text-foreground'}`}
                      >
                        AUTO
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setPumpMode('MAN')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${pumpMode === 'MAN' ? 'bg-warning text-warning-foreground hover:bg-warning hover:text-warning-foreground' : 'hover:bg-background hover:text-foreground'}`}
                      >
                        MAN
                      </Button>
                    </div>
                  </div>

                  {/* Pump Controls */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.1 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setPump1Status('RUN')}
                          size="sm"
                          className={`h-8 border-2 border-foreground text-xs ${pump1Status === 'RUN' ? 'bg-success hover:bg-success' : 'hover:bg-background hover:text-foreground'}`}
                        >
                          RUN
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPump1Status('STOP')}
                          size="sm"
                          className={`h-8 border-2 border-foreground text-xs ${pump1Status === 'STOP' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : 'hover:bg-background hover:text-foreground'}`}
                        >
                          STOP
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.2 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setPump2Status('RUN')}
                          size="sm"
                          className={`h-8 border-2 border-foreground text-xs ${pump2Status === 'RUN' ? 'bg-success hover:bg-success' : 'hover:bg-background hover:text-foreground'}`}
                        >
                          RUN
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPump2Status('STOP')}
                          size="sm"
                          className={`h-8 border-2 border-foreground text-xs ${pump2Status === 'STOP' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : 'hover:bg-background hover:text-foreground'}`}
                        >
                          STOP
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setManual1Run('RUN')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${manual1Run === 'RUN' ? 'bg-success hover:bg-success' : ''}`}
                      >
                        RUN
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setManual1Run('STOP')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${manual1Run === 'STOP' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : ''}`}
                      >
                        STOP
                      </Button>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setManual2Run('RUN')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${manual2Run === 'RUN' ? 'bg-success hover:bg-success' : ''}`}
                      >
                        RUN
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setManual2Run('STOP')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${manual2Run === 'STOP' ? 'bg-red-500 text-white hover:bg-red-500 hover:text-white' : ''}`}
                      >
                        STOP
                      </Button>
                    </div>
                  </div>

                  {/* Lead Pump Select */}
                  <div className="pt-2">
                    <label className="text-xs font-semibold block text-center mb-2">LEAD PUMP SELECT:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setLeadPump('No.1')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${leadPump === 'No.1' ? 'bg-warning text-warning-foreground hover:bg-warning hover:text-warning-foreground' : ''}`}
                      >
                        No.1
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setLeadPump('No.2')}
                        size="sm"
                        className={`h-8 border-2 border-foreground text-xs ${leadPump === 'No.2' ? 'bg-warning text-warning-foreground hover:bg-warning hover:text-warning-foreground' : ''}`}
                      >
                        No.2
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Initial Condition */}
        <div className="hmi-card">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold">Initial Condition</h2>
          </div>

          <div className="border-2 border-foreground p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Non PL TANK */}
              <div>
                <h3 className="text-sm font-semibold text-center mb-4">Non PL TANK (n:1,2,3)</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-16 bg-white text-black hover:bg-white/90 border-2 border-foreground"
                  >
                    FULL
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-16 border-2 border-foreground"
                  >
                    MID. CIRC.
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-16 border-2 border-foreground bg-red-300 text-foreground"
                  >
                    STOP
                  </Button>
                </div>
              </div>

              {/* Right Column - Acid Pump Operation */}
              <div>
                <h3 className="text-sm font-semibold text-center mb-4">ACID PUMP OPERATION</h3>
                
                <div className="space-y-4">
                  {/* Operation Place */}
                  <div>
                    <label className="text-xs font-semibold block text-center mb-2">OPE. PLACE:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        LOCAL
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs bg-warning text-warning-foreground"
                      >
                        REMOTE
                      </Button>
                    </div>
                  </div>

                  {/* Pump Mode */}
                  <div>
                    <label className="text-xs font-semibold block text-center mb-2">PUMP MODE:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs bg-warning text-warning-foreground"
                      >
                        AUTO
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        MAN
                      </Button>
                    </div>
                  </div>

                  {/* Pump Controls */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.1 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-2 border-foreground text-xs"
                        >
                          RUN
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-2 border-foreground text-xs bg-success"
                        >
                          STOP
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.2 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-2 border-foreground text-xs"
                        >
                          RUN
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-2 border-foreground text-xs bg-success"
                        >
                          STOP
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        RUN
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        STOP
                      </Button>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        RUN
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        STOP
                      </Button>
                    </div>
                  </div>

                  {/* Lead Pump Select */}
                  <div className="pt-2">
                    <label className="text-xs font-semibold block text-center mb-2">LEAD PUMP SELECT:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs bg-warning text-warning-foreground"
                      >
                        No.1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-2 border-foreground text-xs"
                      >
                        No.2
                      </Button>
                    </div>
                  </div>
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