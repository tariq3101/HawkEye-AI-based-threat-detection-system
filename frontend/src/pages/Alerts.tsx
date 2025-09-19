import { useState } from 'react';
import { AlertTriangle, Clock, User, TrendingUp, Filter, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Sample alert data
const alerts = [
  {
    id: 1,
    userId: 'john.doe@company.com',
    eventType: 'Data Exfiltration',
    severity: 'high',
    confidence: 92,
    timestamp: '2024-01-15 14:32:15',
    description: 'Large volume data transfer detected outside business hours',
    recommendedAction: 'Immediate investigation required',
    mlModel: 'Isolation Forest',
    status: 'open'
  },
  {
    id: 2,
    userId: 'sarah.smith@company.com',
    eventType: 'Policy Violation',
    severity: 'medium',
    confidence: 78,
    timestamp: '2024-01-15 14:28:42',
    description: 'Unauthorized USB device usage detected',
    recommendedAction: 'Review device policy compliance',
    mlModel: 'XGBoost',
    status: 'investigating'
  },
  {
    id: 3,
    userId: 'mike.johnson@company.com',
    eventType: 'Anomalous Login',
    severity: 'medium',
    confidence: 85,
    timestamp: '2024-01-15 14:15:23',
    description: 'Login from unusual geographic location',
    recommendedAction: 'Verify user identity',
    mlModel: 'Isolation Forest',
    status: 'open'
  },
  {
    id: 4,
    userId: 'lisa.wilson@company.com',
    eventType: 'Suspicious Communication',
    severity: 'high',
    confidence: 88,
    timestamp: '2024-01-15 13:58:17',
    description: 'Email with sensitive keywords to external domain',
    recommendedAction: 'Review email content and recipient',
    mlModel: 'NLP Classifier',
    status: 'resolved'
  },
];

// Sample trend data
const alertTrendData = [
  { time: '00:00', high: 1, medium: 2, low: 1 },
  { time: '04:00', high: 0, medium: 3, low: 2 },
  { time: '08:00', high: 2, medium: 5, low: 3 },
  { time: '12:00', high: 3, medium: 8, low: 4 },
  { time: '16:00', high: 4, medium: 6, low: 5 },
  { time: '20:00', high: 2, medium: 4, low: 2 },
];

const Alerts = () => {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'investigating': return 'secondary';
      case 'resolved': return 'outline';
      default: return 'outline';
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Alerts & Risk Analysis</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered threat detection and anomaly analysis
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {alerts.filter(a => a.severity === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round(alerts.reduce((acc, alert) => acc + alert.confidence, 0) / alerts.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              ML model accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Trend Chart */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Alert Trends (24h)</span>
          </CardTitle>
          <CardDescription>
            Real-time distribution of security alerts by severity level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={alertTrendData}>
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
                dataKey="high" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="High Severity"
              />
              <Line 
                type="monotone" 
                dataKey="medium" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Medium Severity"
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Low Severity"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters and Alert List */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span>Security Alerts</span>
            </div>
            <div className="flex space-x-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40 bg-secondary/50">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-6 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.severity === 'high' ? 'bg-destructive' :
                        alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                      } pulse-ring`} />
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{alert.userId}</span>
                      </div>
                      <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{alert.eventType}</h3>
                      <p className="text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className="ml-2 font-medium text-primary">{alert.confidence}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ML Model:</span>
                        <span className="ml-2 font-medium">{alert.mlModel}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timestamp:</span>
                        <span className="ml-2 font-medium">{alert.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <span className="text-sm font-medium text-primary">Recommended Action:</span>
                      <p className="text-sm mt-1">{alert.recommendedAction}</p>
                    </div>
                  </div>
                  
                  {/* <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;