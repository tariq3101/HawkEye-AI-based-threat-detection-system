import {
  Users,
  Activity,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const riskTrendData = [
  { time: '00:00', highRisk: 2, mediumRisk: 5, lowRisk: 8 },
  { time: '04:00', highRisk: 1, mediumRisk: 7, lowRisk: 12 },
  { time: '08:00', highRisk: 4, mediumRisk: 15, lowRisk: 25 },
  { time: '12:00', highRisk: 6, mediumRisk: 20, lowRisk: 30 },
  { time: '16:00', highRisk: 8, mediumRisk: 18, lowRisk: 28 },
  { time: '20:00', highRisk: 3, mediumRisk: 10, lowRisk: 15 },
];

const threatTypeData = [
  { name: 'Data Exfiltration', value: 35, color: 'hsl(var(--destructive))' },
  { name: 'Policy Violations', value: 25, color: 'hsl(var(--warning))' },
  { name: 'Suspicious Access', value: 20, color: 'hsl(var(--primary))' },
  { name: 'Unusual Behavior', value: 20, color: 'hsl(var(--muted-foreground))' },
];

const recentAlerts = [
  {
    id: 1,
    user: 'john.doe@company.com',
    type: 'Data Exfiltration',
    risk: 'high',
    time: '2 minutes ago',
    description: 'Large file download outside business hours'
  },
  {
    id: 2,
    user: 'sarah.smith@company.com',
    type: 'Policy Violation',
    risk: 'medium',
    time: '15 minutes ago',
    description: 'USB device usage without authorization'
  },
  {
    id: 3,
    user: 'mike.johnson@company.com',
    type: 'Suspicious Access',
    risk: 'medium',
    time: '1 hour ago',
    description: 'Access to restricted directories'
  },
  {
    id: 4,
    user: 'lisa.wilson@company.com',
    type: 'Unusual Behavior',
    risk: 'low',
    time: '2 hours ago',
    description: 'Login from new device location'
  },
];

const Dashboard = () => {
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Security Operations Center</h1>
          <p className="text-muted-foreground mt-1">
            Real-time threat monitoring and insider risk analysis
          </p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full pulse-ring" />
            <span className="text-success font-medium">System Operational</span>
          </div>
        </div> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users Monitored</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">8</div>
            <p className="text-xs text-muted-foreground">

            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Risk Score Trends (24h)</span>
            </CardTitle>
            <CardDescription>
              Real-time risk level distribution across monitored users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendData}>
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
                  dataKey="highRisk"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="High Risk"
                />
                <Line
                  type="monotone"
                  dataKey="mediumRisk"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  name="Medium Risk"
                />
                <Line
                  type="monotone"
                  dataKey="lowRisk"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  name="Low Risk"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Types Chart */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span>Threat Distribution</span>
            </CardTitle>
            <CardDescription>
              Classification of detected threats by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatTypeData}
                  cx="52%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  nameKey="name"
                  // label={({ name, value }) => `${name}: ${value}%`}
                  // labelLine={false}
                >
                  {threatTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}

                  labelStyle={{ color: 'white' }}   // fixes label text
                  itemStyle={{ color: 'white' }}    // fixes value text
                  // labelStyle={{ color: 'hsl(var(--foreground))' }}
                  // itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Recent Security Alerts</span>
          </CardTitle>
          <CardDescription>
            Latest threats detected by AI monitoring systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${alert.risk === 'high' ? 'bg-destructive' :
                    alert.risk === 'medium' ? 'bg-warning' : 'bg-success'
                    }`} />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{alert.user}</span>
                      <Badge variant={getRiskBadgeVariant(alert.risk)} className="text-xs">
                        {alert.risk.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.type} • {alert.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Investigate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;