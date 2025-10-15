import { NavLink, Outlet } from 'react-router-dom';
import { TopInfoPanel } from '@/components/TopInfoPanel';
import { StatusBadge } from '@/components/StatusBadge';
import { LayoutDashboard } from 'lucide-react';

const linkBase = 'px-4 py-2 rounded-md text-sm font-medium transition-colors border';

const HMI01Tabs = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Pickling Tank Concentration Monitoring System</p>
          </div>
        </div>
      </div>

      <TopInfoPanel />
      
      <div className="flex items-center gap-2">
        <NavLink
          to="tank"
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'}`
          }
        >
          Tank Section
        </NavLink>
        <NavLink
          to="pickling"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'}`
          }
        >
          Pickling Section
        </NavLink>
      </div>

      <div className="glass-panel p-6 min-h-[300px]">
        <Outlet />
      </div>
    </div>
  );
};

export default HMI01Tabs;
