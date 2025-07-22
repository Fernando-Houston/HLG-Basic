// API utility for Houston Land Guy backend

const API_BASE_URL = 'https://website-backend-hlg-production.up.railway.app';

// For development, you can also use: 'http://localhost:3000'
// const API_BASE_URL = 'http://localhost:3000';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: string;
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}/api${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact?: 'email' | 'phone' | 'text';
  timeframe?: 'immediate' | '1-3 months' | '3-6 months' | '6+ months' | 'exploring';
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Sell land form submission
export interface SellLandFormData {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType?: string;
  acreage?: string;
  timeline?: 'ASAP' | '1-3 months' | '3-6 months' | '6+ months' | 'Just exploring';
  additionalInfo?: string;
}

export async function submitSellLandForm(data: SellLandFormData): Promise<ApiResponse> {
  return apiRequest('/contact/sell-land', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Development site inquiry
export interface DevelopmentSiteFormData {
  projectType: 'residential' | 'commercial' | 'mixed-use' | 'master-planned' | 'industrial' | 'other';
  minAcreage?: number;
  maxAcreage?: number;
  budgetRange?: '500k-1m' | '1m-5m' | '5m-10m' | '10m-25m' | '25m+';
  location?: string;
  timeline?: 'immediate' | 'short-term' | 'medium-term' | 'long-term' | 'exploring';
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalRequirements?: string;
}

export async function submitDevelopmentSiteInquiry(data: DevelopmentSiteFormData): Promise<ApiResponse> {
  return apiRequest('/contact/find-sites', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Investment inquiry
export interface InvestmentInquiryFormData {
  name: string;
  email: string;
  phone: string;
  investmentLevel: '100k-250k' | '250k-500k' | '500k-1m' | '1m+';
  experience?: 'beginner' | 'some' | 'experienced' | 'professional';
  timeline?: 'immediate' | '1-3 months' | '3-6 months' | '6+ months' | 'exploring';
  interests?: string;
}

// Legacy alias for backwards compatibility
export type InvestmentFormData = InvestmentInquiryFormData;

export async function submitInvestmentInquiry(data: InvestmentInquiryFormData): Promise<ApiResponse> {
  return apiRequest('/contact/invest', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Smart Land Finder
export interface SmartFinderCriteria {
  projectType: 'residential' | 'commercial' | 'mixed-use' | 'master-planned';
  budget: '1m-3m' | '3m-5m' | '5m-10m' | '10m+';
  minAcreage?: number;
  maxAcreage?: number;
  timeline?: 'immediate' | 'short-term' | 'medium-term' | 'long-term' | 'exploring';
  preferredLocation?: 'northwest' | 'southwest' | 'northeast' | 'southeast' | 'suburban';
  riskTolerance?: 'low' | 'medium' | 'high';
  targetROI?: number;
}

export interface LandOpportunity {
  id: string;
  title: string;
  location: string;
  acreage: number;
  pricePerAcre: number;
  totalPrice: number;
  zoning: string;
  projectedROI: string;
  marketScore: number;
  advantages: string[];
  timeline: string;
  riskLevel: string;
}

export interface SmartFinderResults {
  searchId: string;
  criteria: SmartFinderCriteria;
  opportunities: LandOpportunity[];
  marketAnalysis: {
    overallTrend: string;
    demandLevel: string;
    supplyConstraints: string;
    priceTrajectory: string;
    competitionLevel: string;
    marketDrivers: string[];
    risks: string[];
  };
  recommendations: string[];
  riskAssessment: {
    score: number;
    level: string;
    factors: string[];
  };
  generatedAt: string;
}

export async function searchLandOpportunities(criteria: SmartFinderCriteria): Promise<ApiResponse<SmartFinderResults>> {
  return apiRequest('/smart-finder', {
    method: 'POST',
    body: JSON.stringify(criteria),
  });
}

// Export timeline
export interface TimelineExportData {
  projectType: 'single-family' | 'commercial' | 'mixed-use' | 'master-planned';
  projectSize?: 'small' | 'medium' | 'large';
  customProjectName?: string;
  includeHoustonRequirements?: boolean;
  exportFormat?: 'pdf';
}

export async function exportTimeline(data: TimelineExportData): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/api/export-timeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response; // Return raw response for file download
}

// Export ROI analysis
export async function exportROIAnalysis(roiData: any): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/api/export-roi`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roiData),
  });
  
  return response; // Return raw response for file download
}

// Export Chapter 42 analysis
export async function exportChapter42Analysis(analysisData: any): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/api/export-chapter42`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(analysisData),
  });
  
  return response; // Return raw response for file download
}

// Get market insights
export async function getMarketInsights(location: string): Promise<ApiResponse> {
  return apiRequest(`/market-insights/${location}`);
}

// Health check
export async function healthCheck(): Promise<ApiResponse> {
  return apiRequest('/health');
}

// Utility function to handle file downloads
export function downloadFile(response: Response, filename: string) {
  response.blob().then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
}

export default {
  submitContactForm,
  submitSellLandForm,
  submitDevelopmentSiteInquiry,
  submitInvestmentInquiry,
  searchLandOpportunities,
  exportTimeline,
  exportROIAnalysis,
  exportChapter42Analysis,
  getMarketInsights,
  healthCheck,
  downloadFile
};

