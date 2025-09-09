import { useState } from 'react';
import { MessageSquare, AlertTriangle, Eye, Filter, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample flagged communications data
const flaggedCommunications = [
  {
    id: 1,
    sender: 'john.doe@company.com',
    recipient: 'competitor@external.com',
    subject: 'Quarterly Financial Data',
    type: 'email',
    riskLevel: 'high',
    confidence: 94,
    timestamp: '2024-01-15 14:32:15',
    suspiciousKeywords: ['confidential', 'financial data', 'quarterly results'],
    snippet: 'Attached are the confidential quarterly financial results as requested...',
    fullContent: 'Hi there, I hope this email finds you well. Attached are the confidential quarterly financial results as requested. Please ensure this information remains confidential and is not shared with unauthorized personnel.',
    intentCategory: 'Data Exfiltration',
    recommendation: 'Block email and investigate sender immediately'
  },
  {
    id: 2,
    sender: 'sarah.smith@company.com',
    recipient: 'recruiter@headhunter.com',
    subject: 'Career Opportunities',
    type: 'email',
    riskLevel: 'medium',
    confidence: 76,
    timestamp: '2024-01-15 13:45:22',
    suspiciousKeywords: ['resign', 'new position', 'notice period'],
    snippet: 'I am considering new opportunities and would like to discuss potential positions...',
    fullContent: 'Hello, I am considering new opportunities and would like to discuss potential positions. My notice period is 30 days, and I am particularly interested in senior roles.',
    intentCategory: 'Job Seeking',
    recommendation: 'Monitor for unusual activity patterns'
  },
  {
    id: 3,
    sender: 'mike.johnson@company.com',
    recipient: 'mike.johnson@personal.gmail.com',
    subject: 'Project Documentation',
    type: 'email',
    riskLevel: 'high',
    confidence: 88,
    timestamp: '2024-01-15 12:18:33',
    suspiciousKeywords: ['source code', 'proprietary', 'backup'],
    snippet: 'Sending myself a backup of the proprietary source code for the new project...',
    fullContent: 'Sending myself a backup of the proprietary source code for the new project in case something happens to my work laptop.',
    intentCategory: 'Intellectual Property Theft',
    recommendation: 'Immediate investigation and access restriction'
  },
  {
    id: 4,
    sender: 'lisa.wilson@company.com',
    recipient: 'support@personal-cloud.com',
    subject: 'Storage Upgrade',
    type: 'email',
    riskLevel: 'medium',
    confidence: 65,
    timestamp: '2024-01-15 11:55:17',
    suspiciousKeywords: ['upload', 'work files', 'cloud storage'],
    snippet: 'I need more storage space to upload my work files to your cloud service...',
    fullContent: 'I need more storage space to upload my work files to your cloud service. Can you please upgrade my account to premium?',
    intentCategory: 'Policy Violation',
    recommendation: 'Review cloud storage policy compliance'
  },
];

const IntentDetection = () => {
  const [riskFilter, setRiskFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCommunication, setSelectedCommunication] = useState<number | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const filteredCommunications = flaggedCommunications.filter((comm) => {
    const matchesRisk = riskFilter === 'all' || comm.riskLevel === riskFilter;
    const matchesCategory = categoryFilter === 'all' || comm.intentCategory === categoryFilter;
    return matchesRisk && matchesCategory;
  });

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-destructive/20 text-destructive font-semibold px-1 rounded">$1</mark>'
      );
    });
    return highlightedText;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Intent Detection (NLP)</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered analysis of communications for suspicious intent
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="pulse-ring">
            {flaggedCommunications.filter(c => c.riskLevel === 'high').length} High-Risk Communications
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Communications</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaggedCommunications.length}</div>
            <p className="text-xs text-muted-foreground">
              Detected by NLP models
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Intent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {flaggedCommunications.filter(c => c.riskLevel === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate action
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Brain className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round(flaggedCommunications.reduce((acc, comm) => acc + comm.confidence, 0) / flaggedCommunications.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              NLP model accuracy
            </p>
          </CardContent>
        </Card>

        <Card className="card-cyber">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords Detected</CardTitle>
            <Eye className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {flaggedCommunications.reduce((acc, comm) => acc + comm.suspiciousKeywords.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Suspicious terms found
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Communication List */}
      <Card className="card-cyber">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span>Flagged Communications</span>
            </div>
            <div className="flex space-x-2">
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-40 bg-secondary/50">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-secondary/50">
                  <SelectValue placeholder="Intent Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Data Exfiltration">Data Exfiltration</SelectItem>
                  <SelectItem value="Job Seeking">Job Seeking</SelectItem>
                  <SelectItem value="Intellectual Property Theft">IP Theft</SelectItem>
                  <SelectItem value="Policy Violation">Policy Violation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommunications.map((comm) => (
              <div
                key={comm.id}
                className="p-6 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          comm.riskLevel === 'high' ? 'bg-destructive' :
                          comm.riskLevel === 'medium' ? 'bg-warning' : 'bg-success'
                        } pulse-ring`} />
                        <span className="font-medium">{comm.sender}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">{comm.recipient}</span>
                        <Badge variant={getRiskColor(comm.riskLevel) as any} className="text-xs">
                          {comm.riskLevel.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {comm.intentCategory}
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">Subject: {comm.subject}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{comm.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Confidence</div>
                        <div className="text-lg font-bold text-primary">{comm.confidence}%</div>
                        <Progress value={comm.confidence} className="w-20 h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Suspicious Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {comm.suspiciousKeywords.map((keyword, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Content Preview:</h4>
                      <div 
                        className="text-sm p-3 bg-background/50 rounded border"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightKeywords(comm.snippet, comm.suspiciousKeywords) 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                    <span className="text-sm font-medium text-destructive">Recommended Action:</span>
                    <p className="text-sm mt-1">{comm.recommendation}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedCommunication(selectedCommunication === comm.id ? null : comm.id)}
                    >
                      {selectedCommunication === comm.id ? 'Hide Details' : 'View Full Content'}
                    </Button>
                    <Button size="sm" variant="default">
                      Take Action
                    </Button>
                  </div>
                  
                  {selectedCommunication === comm.id && (
                    <div className="mt-4 p-4 bg-background/30 rounded border">
                      <h4 className="font-medium mb-2">Full Communication Content:</h4>
                      <div 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightKeywords(comm.fullContent, comm.suspiciousKeywords) 
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntentDetection;