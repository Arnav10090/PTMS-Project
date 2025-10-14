import { Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isCollapsed: boolean;
}

export const Navbar = ({ isCollapsed }: NavbarProps) => {
  return (
    <header
      className={`fixed top-0 right-0 ${isCollapsed ? 'left-20' : 'left-64'} h-16 glass-panel border-b border-border/50 flex items-center justify-between px-6 z-40`}
    >
      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-lg font-bold">Pickling Tank Monitoring System</h1>
          <p className="text-xs text-muted-foreground">Industrial HMI Control Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/20 border border-success/30">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-xs font-semibold text-success">SYSTEM ONLINE</span>
        </div>

        <div className="text-sm font-mono text-muted-foreground">
          {new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
};
