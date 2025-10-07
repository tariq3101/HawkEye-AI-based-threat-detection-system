import { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import mlApi from '@/api/mlApi'; // use your Python ML API instance

const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch user activity from Python backend ---
  useEffect(() => {
    mlApi.get('/useractivity')
      .then((res) => setUserActivities(res.data))
      .catch((err) => console.error("Error fetching user activity:", err))
      .finally(() => setLoading(false));
  }, []);

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'high', color: 'destructive' };
    if (score >= 60) return { level: 'medium', color: 'secondary' };
    return { level: 'low', color: 'outline' };
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-destructive';
    if (score >= 60) return 'text-warning';
    return 'text-success';
  };

  const filteredActivities = userActivities.filter((activity) => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = riskFilter === 'all' || 
                       (riskFilter === 'high' && activity.risk_score >= 80) ||
                       (riskFilter === 'medium' && activity.risk_score >= 60 && activity.risk_score < 80) ||
                       (riskFilter === 'low' && activity.risk_score < 60);
    
    const matchesActivity = activityFilter === 'all' || 
                           activity.activity.toLowerCase().includes(activityFilter.toLowerCase());
    
    return matchesSearch && matchesRisk && matchesActivity;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-muted-foreground">
      Loading user activity...
    </div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">User Activity Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Track and analyze user behavior patterns across your organization
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Activity Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users, activities, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
              </div>
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-48 bg-secondary/50">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk (80+)</SelectItem>
                <SelectItem value="medium">Medium Risk (60-79)</SelectItem>
                <SelectItem value="low">Low Risk (&lt;60)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-full md:w-48 bg-secondary/50">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="login">Login Events</SelectItem>
                <SelectItem value="file">File Operations</SelectItem>
                <SelectItem value="email">Email Activities</SelectItem>
                <SelectItem value="usb">USB Events</SelectItem>
                <SelectItem value="print">Print Activities</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <span>Recent User Activities</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {filteredActivities.length} activities found
            </Badge>
          </CardTitle>
          <CardDescription>
            Comprehensive log of user actions with AI-powered risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity, index) => {
                  const risk = getRiskLevel(activity.risk_score);
                  return (
                    <TableRow key={index} className="hover:bg-secondary/30">
                      <TableCell>
                        <div className="font-medium">{activity.user}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {activity.activity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={activity.details}>
                          {activity.details}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            risk.level === 'high' ? 'bg-destructive' :
                            risk.level === 'medium' ? 'bg-warning' : 'bg-success'
                          }`} />
                          <span className={`font-semibold ${getRiskColor(activity.risk_score)}`}>
                            {activity.risk_score}
                          </span>
                          <Badge variant={risk.color as any} className="text-xs">
                            {risk.level.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {activity.location}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {activity.device}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivity;
