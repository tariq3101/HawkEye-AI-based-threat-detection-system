import { useState } from 'react';
import { Settings as SettingsIcon, Users, AlertTriangle, Database, Shield, Save, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [alertThreshold, setAlertThreshold] = useState([75]);
  const [autoResponse, setAutoResponse] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackIntegration, setSlackIntegration] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings & Management</h1>
          <p className="text-muted-foreground mt-1">
            Configure system parameters and manage administrative settings
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </Button>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-secondary/50">
          <TabsTrigger value="alerts">Alert Thresholds</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Alert Thresholds */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <span>Risk Score Thresholds</span>
              </CardTitle>
              <CardDescription>
                Configure the risk score levels that trigger different alert severities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="high-risk">High Risk Threshold</Label>
                  <div className="mt-2">
                    <Slider
                      value={alertThreshold}
                      onValueChange={setAlertThreshold}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>0</span>
                      <span className="font-medium text-primary">{alertThreshold[0]}</span>
                      <span>100</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Users with risk scores above {alertThreshold[0]} will trigger high-priority alerts
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="medium-risk">Medium Risk Threshold</Label>
                    <Input
                      id="medium-risk"
                      type="number"
                      defaultValue="50"
                      className="mt-2 bg-secondary/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="low-risk">Low Risk Threshold</Label>
                    <Input
                      id="low-risk"
                      type="number"
                      defaultValue="25"
                      className="mt-2 bg-secondary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Automatic Response</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically restrict access for high-risk users
                  </p>
                </div>
                <Switch
                  checked={autoResponse}
                  onCheckedChange={setAutoResponse}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <span>System Integrations</span>
              </CardTitle>
              <CardDescription>
                Configure connections to external systems and data sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Kafka Configuration</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="kafka-host">Kafka Host</Label>
                      <Input
                        id="kafka-host"
                        defaultValue="localhost:9092"
                        className="mt-1 bg-secondary/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kafka-topic">Topic Name</Label>
                      <Input
                        id="kafka-topic"
                        defaultValue="security-events"
                        className="mt-1 bg-secondary/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">MongoDB Configuration</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="mongo-uri">Connection URI</Label>
                      <Input
                        id="mongo-uri"
                        type="password"
                        defaultValue="mongodb://localhost:27017"
                        className="mt-1 bg-secondary/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mongo-db">Database Name</Label>
                      <Input
                        id="mongo-db"
                        defaultValue="threat_detection"
                        className="mt-1 bg-secondary/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Agent Configuration</h4>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Email Monitor Agent</p>
                    <p className="text-sm text-muted-foreground">Status: Connected</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">File Access Agent</p>
                    <p className="text-sm text-muted-foreground">Status: Connected</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">USB Monitor Agent</p>
                    <p className="text-sm text-muted-foreground">Status: Disconnected</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how and when you receive security alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email for high-priority incidents
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Slack Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Send alerts to your Slack channel
                    </p>
                  </div>
                  <Switch
                    checked={slackIntegration}
                    onCheckedChange={setSlackIntegration}
                  />
                </div>
              </div>

              {emailNotifications && (
                <div className="space-y-3">
                  <Label htmlFor="email-recipients">Email Recipients</Label>
                  <Input
                    id="email-recipients"
                    placeholder="admin@company.com, security@company.com"
                    className="bg-secondary/50"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple email addresses with commas
                  </p>
                </div>
              )}

              {slackIntegration && (
                <div className="space-y-3">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    type="password"
                    placeholder="https://hooks.slack.com/services/..."
                    className="bg-secondary/50"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Security Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="30"
                    className="mt-2 bg-secondary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    defaultValue="5"
                    className="mt-2 bg-secondary/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">IP Whitelist</h4>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Audit Logging</h4>
                    <p className="text-sm text-muted-foreground">
                      Log all administrative actions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;