import { Activity, Cpu, Database, Network, Server, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample system metrics data
const systemMetrics = {
  cpu: { usage: 68, status: 'healthy', trend: '+2%' },
  memory: { usage: 74, status: 'healthy', trend: '+5%' },
  disk: { usage: 45, status: 'healthy', trend: '-1%' },
  network: { usage: 32, status: 'healthy', trend: '+8%' },
};

const serviceStatus = [
  { name: 'AI Detection Engine', status: 'operational', uptime: '99.8%', lastCheck: '2 min ago' },
  { name: 'Database Cluster', status: 'operational', uptime: '99.9%', lastCheck: '1 min ago' },
  { name: 'Kafka Message Queue', status: 'operational', uptime: '99.7%', lastCheck: '3 min ago' },
  { name: 'MongoDB Storage', status: 'operational', uptime: '99.9%', lastCheck: '1 min ago' },
  { name: 'NLP Processing', status: 'warning', uptime: '97.2%', lastCheck: '5 min ago' },
  { name: 'Data Collection Agents', status: 'operational', uptime: '99.5%', lastCheck: '2 min ago' },
];

const performanceData = [
  { time: '00:00', cpu: 45, memory: 62, network: 28 },
  { time: '04:00', cpu: 38, memory: 58, network: 22 },
  { time: '08:00', cpu: 65, memory: 71, network: 45 },
  { time: '12:00', cpu: 78, memory: 85, network: 62 },
  { time: '16:00', cpu: 72, memory: 79, network: 58 },
  { time: '20:00', cpu: 68, memory: 74, network: 32 },
];

const recentEvents = [
  {
    id: 1,
    type: 'info',
    message: 'System backup completed successfully',
    timestamp: '2024-01-15 14:30:00',
    component: 'Backup Service'
  },
  {
    id: 2,
    type: 'warning',
    message: 'High memory usage detected on NLP processing node',
    timestamp: '2024-01-15 14:15:22',
    component: 'NLP Engine'
  },
  {
    id: 3,
    type: 'info',
    message: 'Security patch applied to detection engine',
    timestamp: '2024-01-15 13:45:10',
    component: 'AI Engine'
  },
  {
    id: 4,
    type: 'success',
    message: 'Database optimization completed',
    timestamp: '2024-01-15 12:30:45',
    component: 'MongoDB'
  },
];

const SystemHealth = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="outline" className="text-success border-success">Operational</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="text-warning">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">System Health</h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of system performance and service status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full pulse-ring" />
            <span className="text-success font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* System Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.cpu.usage}%</div>
            <Progress value={systemMetrics.cpu.usage} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-warning">{systemMetrics.cpu.trend} from last hour</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.memory.usage}%</div>
            <Progress value={systemMetrics.memory.usage} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-warning">{systemMetrics.memory.trend} from last hour</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.disk.usage}%</div>
            <Progress value={systemMetrics.disk.usage} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-success">{systemMetrics.disk.trend} from last hour</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Usage</CardTitle>
            <Network className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.network.usage}%</div>
            <Progress value={systemMetrics.network.usage} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-warning">{systemMetrics.network.trend} from last hour</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>System Performance (24h)</span>
          </CardTitle>
          <CardDescription>
            Real-time system resource utilization trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="CPU Usage"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Memory Usage"
              />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Network Usage"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-primary" />
              <span>Service Status</span>
            </CardTitle>
            <CardDescription>
              Current status of all system components and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStatus.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Uptime: {service.uptime} • Last check: {service.lastCheck}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Events</span>
            </CardTitle>
            <CardDescription>
              Latest system events and maintenance activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-secondary/30 border border-border"
                >
                  {getEventIcon(event.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {event.component}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {event.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealth;