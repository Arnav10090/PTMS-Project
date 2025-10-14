import React, { useEffect, useState } from 'react';
import { Bell, ChevronsDown, ChevronsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Alarm = {
  id: number;
  timestamp: string;
  severity: string;
  equipment: string;
  type: string;
  description: string;
  value: string;
  threshold: string;
  status: string;
};

const FOOTER_LIMIT = 10;

const AlarmsFooter: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    try {
      const raw = localStorage.getItem('alarms_footer');
      if (!raw) return [];
      return JSON.parse(raw) as Alarm[];
    } catch (e) {
      return [];
    }
  });
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem('alarms_footer_collapsed');
      return raw === '1';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'alarms_footer') {
        try {
          setAlarms(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setAlarms([]);
        }
      }
      if (e.key === 'alarms_footer_collapsed') {
        setCollapsed(e.newValue === '1');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('alarms_footer', JSON.stringify(alarms.slice(0, FOOTER_LIMIT)));
    } catch {}
  }, [alarms]);

  useEffect(() => {
    try {
      localStorage.setItem('alarms_footer_collapsed', collapsed ? '1' : '0');
    } catch {}
  }, [collapsed]);

  // expose a small listener for other parts of app to push into footer
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<Alarm>;
      if (custom?.detail) {
        setAlarms((prev) => {
          const next = [custom.detail, ...prev.filter((a) => a.id !== custom.detail.id)];
          return next.slice(0, FOOTER_LIMIT);
        });
      }
    };
    window.addEventListener('alarms-footer:add', handler as EventListener);
    return () => window.removeEventListener('alarms-footer:add', handler as EventListener);
  }, []);

  // left offset var used by App
  return (
    <div className="fixed bottom-0 z-40 pointer-events-none" style={{ left: 'var(--content-left)', right: 0 as any }}>
      <div className={`max-w-full mx-auto px-6 py-3 bg-card/90 border-t border-border backdrop-blur-sm shadow-lg pointer-events-auto transition-all duration-300 ${collapsed ? 'h-12' : 'h-auto'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-semibold">Recent Alarms &amp; Alerts</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => setCollapsed((s) => !s)}>
              {collapsed ? <><ChevronsUp className="w-4 h-4" /> Expand</> : <><ChevronsDown className="w-4 h-4" /> Collapse</>}
            </Button>
          </div>
        </div>

        {!collapsed && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            {alarms.length === 0 && (
              <div className="text-sm text-muted-foreground">No acknowledged alarms yet</div>
            )}
            {alarms.map((a) => (
              <div key={a.id} className="flex items-center gap-3 bg-muted/5 p-2 rounded-md border border-border">
                <div className={`w-2.5 h-2.5 rounded-full`} />
                <div className="text-xs">
                  <div className="font-medium">{a.equipment} • {a.type}</div>
                  <div className="text-muted-foreground">{a.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {collapsed && (
          <div className="mt-2 flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Footer collapsed — {alarms.length} acknowledged</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmsFooter;
