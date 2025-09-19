import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, BarChart3, Calendar, Users } from 'lucide-react';

// Sample data for analytics
const weeklyIncidents = [
  { week: 'Week 1', incidents: 12, resolved: 8, pending: 4 },
  { week: 'Week 2', incidents: 15, resolved: 12, pending: 3 },
  { week: 'Week 3', incidents: 8, resolved: 7, pending: 1 },
  { week: 'Week 4', incidents: 18, resolved: 14, pending: 4 },
];

const departmentRisk = [
  { department: 'IT', riskScore: 75, users: 45 },
  { department: 'Finance', riskScore: 85, users: 32 },
  { department: 'HR', riskScore: 45, users: 28 },
  { department: 'Sales', riskScore: 65, users: 67 },
  { department: 'Marketing', riskScore: 55, users: 34 },
  { department: 'Operations', riskScore: 70, users: 52 },
];

const threatDistribution = [
  { name: 'Data Exfiltration', value: 35, color: 'hsl(var(--destructive))' },
  { name: 'Policy Violations', value: 25, color: 'hsl(var(--warning))' },
  { name: 'Unusual Access', value: 20, color: 'hsl(var(--primary))' },
  { name: 'Communication Anomalies', value: 15, color: 'hsl(var(--secondary))' },
  { name: 'Others', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const monthlyTrends = [
  { month: 'Jan', incidents: 45, riskScore: 68 },
  { month: 'Feb', incidents: 52, riskScore: 72 },
  { month: 'Mar', incidents: 38, riskScore: 65 },
  { month: 'Apr', incidents: 61, riskScore: 78 },
  { month: 'May', incidents: 44, riskScore: 70 },
  { month: 'Jun', incidents: 37, riskScore: 62 },
];

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">System Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Historical trends and comprehensive security reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Users</CardTitle>
            <Users className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Incidents Trend */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle>Weekly Incident Trends</CardTitle>
            <CardDescription>
              Security incidents and resolution rates over the past month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyIncidents}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="incidents" fill="hsl(var(--primary))" name="Total Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Risk Distribution */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle>Department Risk Analysis</CardTitle>
            <CardDescription>
              Risk scores and user counts by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentRisk} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="department" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="riskScore" fill="hsl(var(--warning))" name="Risk Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Type Distribution */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle>Threat Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of security threats by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }} // uses variable
                  itemStyle={{ color: "hsl(var(--foreground))" }}  // uses variable
                />

              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="card-cyber">
          <CardHeader>
            <CardTitle>Monthly Security Trends</CardTitle>
            <CardDescription>
              6-month overview of incidents and risk scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Incidents"
                />
                <Line
                  type="monotone"
                  dataKey="riskScore"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="Risk Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details Table */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle>Department Risk Details</CardTitle>
          <CardDescription>
            Detailed risk assessment by organizational department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">Department</th>
                  <th className="text-left p-3">Users</th>
                  <th className="text-left p-3">Risk Score</th>
                  <th className="text-left p-3">Risk Level</th>
                  <th className="text-left p-3">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {departmentRisk.map((dept, index) => {
                  const riskLevel = dept.riskScore >= 80 ? 'high' : dept.riskScore >= 60 ? 'medium' : 'low';
                  const riskColor = riskLevel === 'high' ? 'destructive' : riskLevel === 'medium' ? 'secondary' : 'outline';

                  return (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="p-3 font-medium">{dept.department}</td>
                      <td className="p-3">{dept.users}</td>
                      <td className="p-3">
                        <span className={`font-semibold ${riskLevel === 'high' ? 'text-destructive' :
                            riskLevel === 'medium' ? 'text-warning' : 'text-success'
                          }`}>
                          {dept.riskScore}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge variant={riskColor as any} className="text-xs">
                          {riskLevel.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {riskLevel === 'high' ? 'Enhanced monitoring required' :
                          riskLevel === 'medium' ? 'Regular review recommended' :
                            'Continue standard monitoring'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;