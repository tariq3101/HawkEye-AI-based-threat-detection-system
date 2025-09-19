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

      <Tabs defaultValue="alerts" className="space-y-2">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
          <TabsTrigger value="alerts">Alert Thresholds</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default Settings;