export interface AuditInput {
  companyName: string;
  industry: string;
  companySize: string;
  challenges: string;
  aiMaturity: string;
  email?: string;
}

export interface IdentifiedLoss {
  title: string;
  description: string;
  financialImpact: string;
}

export interface StrategicAxis {
  title: string;
  description: string;
  recommendedTools: string[];
  timeToImplement: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  actions: string[];
  duration: string;
}

export interface KeyMetric {
  label: string;
  value: string;
}

export interface BilanReport {
  fallback?: boolean;
  summary: string;
  estimatedHoursSavedPerWeek: number;
  estimatedEfficiencyGainPercent: number;
  identifiedLosses: IdentifiedLoss[];
  strategicAxes: StrategicAxis[];
  roadmap: RoadmapPhase[];
  keyMetric: KeyMetric;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  reportSummary?: string;
}

export interface BilanHistoryItem {
  id: string;
  timestamp: string;
  input: AuditInput;
  report: BilanReport;
}
