import { useState } from 'react';
import { Power } from 'lucide-react';

const TopInfoPanel = () => (
  <div className="bg-card border-2 border-foreground p-4 rounded-lg">
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <div className="text-xs text-muted-foreground">Status</div>
        <div className="text-sm font-semibold">OPERATIONAL</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">System</div>
        <div className="text-sm font-semibold">ACID PUMP</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Mode</div>
        <div className="text-sm font-semibold">ACTIVE</div>
      </div>
    </div>
  </div>
);

const HMI03PumpOperation = () => {
  const [tankMode, setTankMode] = useState('FULL');
  const [operationPlace, setOperationPlace] = useState('REMOTE');
  const [pumpMode, setPumpMode] = useState('AUTO');
  const [pump1Status, setPump1Status] = useState('STOP');
  const [pump2Status, setPump2Status] = useState('STOP');
  const [leadPump, setLeadPump] = useState('No.1');
  const [manual1Run, setManual1Run] = useState('STOP');
  const [manual2Run, setManual2Run] = useState('STOP');

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      <div className="flex items-center gap-3">
        <Power className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HMI-03 Pump Operation
          </h1>
          <p className="text-sm text-muted-foreground">Pump Mode and Operation Control</p>
        </div>
      </div>

      <TopInfoPanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pump Mode and Operation Selection */}
        <div className="bg-card border-2 border-foreground rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold">Pump Mode and Operation Selection</h2>
          </div>

          <div className="border-2 border-foreground p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Non PL TANK */}
              <div>
                <h3 className="text-sm font-semibold text-center mb-4">Non PL TANK (n:1,2,3)</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setTankMode('FULL')}
                    className={`w-full h-16 border-2 border-foreground rounded ${
                      tankMode === 'FULL' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-background hover:bg-gray-100'
                    }`}
                  >
                    FULL
                  </button>
                  <button
                    onClick={() => setTankMode('MID_CIRC')}
                    className={`w-full h-16 border-2 border-foreground rounded ${
                      tankMode === 'MID_CIRC' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-background hover:bg-gray-100'
                    }`}
                  >
                    MID. CIRC.
                  </button>
                  <button
                    onClick={() => setTankMode('STOP')}
                    className={`w-full h-16 border-2 border-foreground rounded ${
                      tankMode === 'STOP' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-background hover:bg-gray-100'
                    }`}
                  >
                    STOP
                  </button>
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
                      <button
                        onClick={() => setOperationPlace('LOCAL')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          operationPlace === 'LOCAL' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        LOCAL
                      </button>
                      <button
                        onClick={() => setOperationPlace('REMOTE')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          operationPlace === 'REMOTE' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        REMOTE
                      </button>
                    </div>
                  </div>

                  {/* Pump Mode */}
                  <div>
                    <label className="text-xs font-semibold block text-center mb-2">PUMP MODE:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPumpMode('AUTO')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          pumpMode === 'AUTO' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        AUTO
                      </button>
                      <button
                        onClick={() => setPumpMode('MAN')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          pumpMode === 'MAN' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        MAN
                      </button>
                    </div>
                  </div>

                  {/* Pump Controls */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.1 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPump1Status('RUN')}
                          className={`h-8 border-2 border-foreground text-xs rounded ${
                            pump1Status === 'RUN' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-background hover:bg-gray-100'
                          }`}
                        >
                          RUN
                        </button>
                        <button
                          onClick={() => setPump1Status('STOP')}
                          className={`h-8 border-2 border-foreground text-xs rounded ${
                            pump1Status === 'STOP' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-background hover:bg-gray-100'
                          }`}
                        >
                          STOP
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.2 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPump2Status('RUN')}
                          className={`h-8 border-2 border-foreground text-xs rounded ${
                            pump2Status === 'RUN' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-background hover:bg-gray-100'
                          }`}
                        >
                          RUN
                        </button>
                        <button
                          onClick={() => setPump2Status('STOP')}
                          className={`h-8 border-2 border-foreground text-xs rounded ${
                            pump2Status === 'STOP' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-background hover:bg-gray-100'
                          }`}
                        >
                          STOP
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setManual1Run('RUN')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          manual1Run === 'RUN' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        RUN
                      </button>
                      <button
                        onClick={() => setManual1Run('STOP')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          manual1Run === 'STOP' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        STOP
                      </button>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setManual2Run('RUN')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          manual2Run === 'RUN' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        RUN
                      </button>
                      <button
                        onClick={() => setManual2Run('STOP')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          manual2Run === 'STOP' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        STOP
                      </button>
                    </div>
                  </div>

                  {/* Lead Pump Select */}
                  <div className="pt-2">
                    <label className="text-xs font-semibold block text-center mb-2">LEAD PUMP SELECT:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setLeadPump('No.1')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          leadPump === 'No.1' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        No.1
                      </button>
                      <button
                        onClick={() => setLeadPump('No.2')}
                        className={`h-8 border-2 border-foreground text-xs rounded ${
                          leadPump === 'No.2' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-background hover:bg-gray-100'
                        }`}
                      >
                        No.2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Initial Condition */}
        <div className="bg-card border-2 border-foreground rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold">Initial Condition</h2>
          </div>

          <div className="border-2 border-foreground p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Non PL TANK */}
              <div>
                <h3 className="text-sm font-semibold text-center mb-4">Non PL TANK (n:1,2,3)</h3>
                <div className="space-y-3">
                  <button className="w-full h-16 border-2 border-foreground rounded bg-background hover:bg-gray-100">
                    FULL
                  </button>
                  <button className="w-full h-16 border-2 border-foreground rounded bg-background hover:bg-gray-100">
                    MID. CIRC.
                  </button>
                  <button className="w-full h-16 border-2 border-foreground rounded bg-red-500 text-white">
                    STOP
                  </button>
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
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        LOCAL
                      </button>
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-yellow-500 text-black">
                        REMOTE
                      </button>
                    </div>
                  </div>

                  {/* Pump Mode */}
                  <div>
                    <label className="text-xs font-semibold block text-center mb-2">PUMP MODE:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-yellow-500 text-black">
                        AUTO
                      </button>
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        MAN
                      </button>
                    </div>
                  </div>

                  {/* Pump Controls */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.1 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                          RUN
                        </button>
                        <button className="h-8 border-2 border-foreground text-xs rounded bg-green-500 text-white">
                          STOP
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-center mb-2">
                        <span className="text-xs font-semibold">No.2 PUMP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                          RUN
                        </button>
                        <button className="h-8 border-2 border-foreground text-xs rounded bg-green-500 text-white">
                          STOP
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        RUN
                      </button>
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        STOP
                      </button>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      MANNUAL OPERATION
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        RUN
                      </button>
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        STOP
                      </button>
                    </div>
                  </div>

                  {/* Lead Pump Select */}
                  <div className="pt-2">
                    <label className="text-xs font-semibold block text-center mb-2">LEAD PUMP SELECT:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-yellow-500 text-black">
                        No.1
                      </button>
                      <button className="h-8 border-2 border-foreground text-xs rounded bg-background hover:bg-gray-100">
                        No.2
                      </button>
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