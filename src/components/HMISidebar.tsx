import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Droplets, Power, TrendingUp, Bell, FileText, Database } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Overview' },
  { path: '/pickling', icon: Droplets, label: 'Pickling Section' },
  { path: '/pump-operation', icon: Power, label: 'Pump Operation' },
  { path: '/trends', icon: TrendingUp, label: 'Trends/Graphs' },
  { path: '/alarms', icon: Bell, label: 'Alarms/Alerts' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/historical', icon: Database, label: 'Historical Data' },
];

export const HMISidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 glass-panel border-r border-border/50 flex flex-col items-center py-6 z-50">
      <div className="mb-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Droplets className="w-7 h-7 text-white" />
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 w-full px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-warning text-warning-foreground shadow-lg'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium text-center leading-tight">{item.label.split(' ')[0]}</span>
            
            <div className="absolute left-full ml-4 px-3 py-2 bg-popover border border-border rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="w-10 h-10 rounded border border-border/50 bg-muted/20 flex items-center justify-center">
          <div className="text-xs font-bold text-primary">HMI</div>
        </div>
      </div>
    </aside>
  );
};
