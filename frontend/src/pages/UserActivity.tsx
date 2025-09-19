import { useState } from 'react';
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

// Sample user activity data
const userActivities = [
  {
    id: 1,
    user: 'john.doe@company.com',
    activity: 'File Download',
    details: 'Downloaded sensitive_data.xlsx (2.1MB)',
    timestamp: '2024-01-15 14:32:15',
    riskScore: 85,
    location: 'New York, US',
    device: 'Windows Laptop'
  },
  {
    id: 2,
    user: 'sarah.smith@company.com',
    activity: 'USB Connect',
    details: 'Connected external storage device',
    timestamp: '2024-01-15 14:28:42',
    riskScore: 65,
    location: 'San Francisco, US',
    device: 'MacBook Pro'
  },
  {
    id: 3,
    user: 'mike.johnson@company.com',
    activity: 'Login',
    details: 'Successful login from new location',
    timestamp: '2024-01-15 14:15:23',
    riskScore: 45,
    location: 'London, UK',
    device: 'Mobile Device'
  },
  {
    id: 4,
    user: 'lisa.wilson@company.com',
    activity: 'Email Send',
    details: 'Sent email with 3 attachments to external domain',
    timestamp: '2024-01-15 13:58:17',
    riskScore: 70,
    location: 'Berlin, DE',
    device: 'Windows Desktop'
  },
  {
    id: 5,
    user: 'david.brown@company.com',
    activity: 'File Access',
    details: 'Accessed HR directory outside working hours',
    timestamp: '2024-01-15 22:45:33',
    riskScore: 90,
    location: 'Tokyo, JP',
    device: 'Linux Workstation'
  },
  {
    id: 6,
    user: 'anna.garcia@company.com',
    activity: 'Print',
    details: 'Printed 45 pages of confidential documents',
    timestamp: '2024-01-15 11:22:08',
    riskScore: 55,
    location: 'Madrid, ES',
    device: 'Windows Laptop'
  },
];

const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');

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
                       (riskFilter === 'high' && activity.riskScore >= 80) ||
                       (riskFilter === 'medium' && activity.riskScore >= 60 && activity.riskScore < 80) ||
                       (riskFilter === 'low' && activity.riskScore < 60);
    
    const matchesActivity = activityFilter === 'all' || 
                           activity.activity.toLowerCase().includes(activityFilter.toLowerCase());
    
    return matchesSearch && matchesRisk && matchesActivity;
  });

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
                  {/* <TableHead>Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => {
                  const risk = getRiskLevel(activity.riskScore);
                  return (
                    <TableRow key={activity.id} className="hover:bg-secondary/30">
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
                          <span className={`font-semibold ${getRiskColor(activity.riskScore)}`}>
                            {activity.riskScore}
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
                      {/* <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {activity.riskScore >= 80 && (
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <AlertTriangle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell> */}
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