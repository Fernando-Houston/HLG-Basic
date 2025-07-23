import { useState } from 'react';
import { MapPin, Calculator, AlertTriangle, CheckCircle, Download, Loader2, RefreshCw } from 'lucide-react';
import { usePageSEO, pageSEO } from '../../utils/seo';
import { SitePlanVisualization } from '../../components/chapter42/SitePlanVisualization';
import { QuickCalculator } from '../../components/chapter42/QuickCalculator';
import { generateSitePlan, optimizeSitePlan } from '../../utils/chapter42/lotGenerator';
import { 
  CHAPTER42_CONSTANTS, 
  getMinLotSize, 
  AreaType,
  StreetType,
  DevelopmentType 
} from '../../utils/chapter42/constants';
import type { Chapter42Analysis, SitePlan } from '../../utils/chapter42/types';
import { exportChapter42Analysis, downloadFile } from '../../utils/api';
import { useToast } from '../../contexts/ToastContext';

export function Chapter42ToolPage() {
  usePageSEO(pageSEO.chapter42Tool);
  const { success, error } = useToast();
  
  const [inputs, setInputs] = useState({
    landArea: '',
    developmentType: DevelopmentType.SINGLE_FAMILY,
    proposedUnits: '',
    lotWidth: '',
    setbackMajor: '',
    setbackLocal: '',
    lotSize: '',
    siteWidth: '',
    siteDepth: '',
    streetType: StreetType.LOCAL,
    isUrban: false,
    targetLotSize: '5000'
  });

  const [analysis, setAnalysis] = useState<Chapter42Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [sitePlan, setSitePlan] = useState<SitePlan | null>(null);

  // Chapter 42 Regulations from specification
  const chapter42Rules = {
    maxDensity: 27, // Max 27 dwelling units per acre for single-family
    minUnitSize: 9000, // 9,000 sq ft per unit
    minLotSizes: {
      suburban: 5000, // 5,000 sq ft minimum in suburban areas
      urban: 3500 // 3,500 sq ft minimum in urban areas
    },
    minLotWidth: 50, // Minimum 50 feet for standard lots
    setbacks: {
      majorThoroughfare: 25, // 25 feet from major thoroughfares
      localStreet: 10 // 10 feet from local streets
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setInputs({
      ...inputs,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const analyzeCompliance = async () => {
    setIsAnalyzing(true);
    
    try {
      const landArea = parseFloat(inputs.landArea) || 0;
      const proposedUnits = parseInt(inputs.proposedUnits) || 0;
      const lotWidth = parseFloat(inputs.lotWidth) || 0;
      const setbackMajor = parseFloat(inputs.setbackMajor) || 0;
      const setbackLocal = parseFloat(inputs.setbackLocal) || 0;
      const lotSize = parseFloat(inputs.lotSize) || 0;
      const siteWidth = parseFloat(inputs.siteWidth) || landArea * 43560 / 300; // Estimate if not provided
      const siteDepth = parseFloat(inputs.siteDepth) || 300; // Default depth

      if (landArea === 0 || proposedUnits === 0) {
        error('Please fill in land area and proposed units');
        setIsAnalyzing(false);
        return;
      }

      // Calculate density
      const proposedDensity = proposedUnits / landArea;
      const maxAllowedUnits = Math.floor(landArea * chapter42Rules.maxDensity);
      
      // Analyze compliance
      const densityCompliant = proposedDensity <= chapter42Rules.maxDensity;
      const lotWidthCompliant = lotWidth === 0 || lotWidth >= chapter42Rules.minLotWidth;
      const setbackMajorCompliant = setbackMajor === 0 || setbackMajor >= chapter42Rules.setbacks.majorThoroughfare;
      const setbackLocalCompliant = setbackLocal === 0 || setbackLocal >= chapter42Rules.setbacks.localStreet;
      
      // Determine lot size compliance based on development type
      const minLotSize = inputs.isUrban 
        ? chapter42Rules.minLotSizes.urban 
        : chapter42Rules.minLotSizes.suburban;
      const lotSizeCompliant = lotSize === 0 || lotSize >= minLotSize;

      // Calculate optimized layout
      const optimizedUnits = Math.min(proposedUnits, maxAllowedUnits);
      const optimizedDensity = optimizedUnits / landArea;
      const recommendedLotSize = Math.max(minLotSize, Math.ceil((landArea * 43560) / optimizedUnits));

      // Generate site plan
      const planParams = {
        area: landArea,
        width: siteWidth,
        depth: siteDepth,
        isUrban: inputs.isUrban,
        streetType: inputs.streetType,
        developmentType: inputs.developmentType,
        targetLotSize: parseFloat(inputs.targetLotSize) || recommendedLotSize
      };

      const generatedPlan = generateSitePlan(planParams);
      setSitePlan(generatedPlan);

      const results: Chapter42Analysis = {
        inputs: {
          landArea,
          proposedUnits,
          lotWidth,
          setbackMajor,
          setbackLocal,
          lotSize,
          developmentType: inputs.developmentType,
          siteWidth,
          siteDepth,
          streetType: inputs.streetType,
          isUrban: inputs.isUrban
        },
        compliance: {
          density: {
            compliant: densityCompliant,
            proposed: proposedDensity,
            maximum: chapter42Rules.maxDensity,
            maxUnits: maxAllowedUnits
          },
          lotWidth: {
            compliant: lotWidthCompliant,
            proposed: lotWidth,
            minimum: chapter42Rules.minLotWidth
          },
          setbacks: {
            major: {
              compliant: setbackMajorCompliant,
              proposed: setbackMajor,
              minimum: chapter42Rules.setbacks.majorThoroughfare
            },
            local: {
              compliant: setbackLocalCompliant,
              proposed: setbackLocal,
              minimum: chapter42Rules.setbacks.localStreet
            }
          },
          lotSize: {
            compliant: lotSizeCompliant,
            proposed: lotSize,
            minimum: minLotSize
          }
        },
        optimization: {
          recommendedUnits: optimizedUnits,
          recommendedDensity: optimizedDensity,
          recommendedLotSize: recommendedLotSize,
          totalSqFt: landArea * 43560
        },
        overallCompliant: densityCompliant && lotWidthCompliant && setbackMajorCompliant && setbackLocalCompliant && lotSizeCompliant,
        sitePlan: generatedPlan
      };

      setAnalysis(results);
      success('Analysis complete! Site plan generated.');
    } catch (error) {
      error('Error analyzing compliance. Please check your inputs.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const optimizeLayout = async () => {
    if (!sitePlan) return;
    
    setIsOptimizing(true);
    
    try {
      const optimizedPlan = optimizeSitePlan(sitePlan);
      setSitePlan(optimizedPlan);
      
      if (analysis) {
        setAnalysis({
          ...analysis,
          sitePlan: optimizedPlan
        });
      }
      
      success('Layout optimized for maximum efficiency!');
    } catch (error) {
      error('Error optimizing layout');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleExport = async () => {
    if (!analysis) return;
    
    setIsExporting(true);
    
    try {
      const response = await exportChapter42Analysis(analysis);
      await downloadFile(response, `chapter42-analysis-${Date.now()}.pdf`);
      success('Report exported successfully!');
    } catch (error) {
      error('Error exporting report');
    } finally {
      setIsExporting(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  const updateTargetLotSize = (value: string) => {
    setInputs({ ...inputs, targetLotSize: value });
  };

  const updateSiteDepth = () => {
    const area = parseFloat(inputs.landArea);
    const width = parseFloat(inputs.siteWidth);
    
    if (area && width) {
      const sqFt = area * 43560;
      const depth = sqFt / width;
      setInputs({ ...inputs, siteDepth: depth.toFixed(0) });
    }
  };

  const ComplianceItem = ({ title, compliant, proposed, minimum, unit = '' }: any) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      compliant ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="flex items-center">
          {compliant ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>
      <div className="text-sm space-y-1">
        {proposed > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Proposed:</span>
            <span className="font-medium">{formatNumber(proposed)} {unit}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Required:</span>
          <span className="font-medium">{formatNumber(minimum)} {unit}</span>
        </div>
        <div className={`text-xs font-medium ${
          compliant ? 'text-green-700' : 'text-red-700'
        }`}>
          {compliant ? 'Compliant' : 'Non-Compliant'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-12 w-12 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Chapter 42 Planning Tool</h1>
            </div>
            <p className="text-xl mb-8">
              Professional site planning with visual layouts, automated compliance checking, and optimization
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Calculator */}
            <QuickCalculator />

            {/* Main Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Site Parameters</h2>
              
              <div className="space-y-6">
                {/* Basic Parameters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Area (Acres) *
                  </label>
                  <input
                    type="number"
                    name="landArea"
                    value={inputs.landArea}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="2.5"
                    step="0.1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width (ft)
                    </label>
                    <input
                      type="number"
                      name="siteWidth"
                      value={inputs.siteWidth}
                      onChange={(e) => {
                        handleInputChange(e);
                        updateSiteDepth();
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Depth (ft)
                    </label>
                    <input
                      type="number"
                      name="siteDepth"
                      value={inputs.siteDepth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="363"
                    />
                  </div>
                </div>

                {/* Location Type Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type
                  </label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className={`font-medium ${!inputs.isUrban ? 'text-gray-900' : 'text-gray-500'}`}>
                      Suburban (5,000 sq ft min)
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isUrban"
                        checked={inputs.isUrban}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                    <span className={`font-medium ${inputs.isUrban ? 'text-gray-900' : 'text-gray-500'}`}>
                      Urban (3,500 sq ft min)
                    </span>
                  </div>
                </div>

                {/* Street Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Type
                  </label>
                  <select
                    name="streetType"
                    value={inputs.streetType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                  >
                    <option value={StreetType.MAJOR_THOROUGHFARE}>Major Thoroughfare (25ft setback)</option>
                    <option value={StreetType.COLLECTOR}>Collector Street (10ft setback)</option>
                    <option value={StreetType.LOCAL}>Local Street (10ft setback)</option>
                    <option value={StreetType.SHARED_DRIVEWAY}>Shared Driveway (3ft setback)</option>
                  </select>
                </div>

                {/* Development Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Development Type
                  </label>
                  <select
                    name="developmentType"
                    value={inputs.developmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                  >
                    <option value={DevelopmentType.SINGLE_FAMILY}>Single-Family (27 units/acre)</option>
                    <option value={DevelopmentType.MULTI_FAMILY}>Multi-Family (30 units/acre)</option>
                  </select>
                </div>

                {/* Proposed Units */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposed Units *
                  </label>
                  <input
                    type="number"
                    name="proposedUnits"
                    value={inputs.proposedUnits}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="50"
                  />
                </div>

                {/* Target Lot Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Lot Size: <span className="font-bold text-green-600">{formatNumber(parseFloat(inputs.targetLotSize))}</span> sq ft
                  </label>
                  <input
                    type="range"
                    value={inputs.targetLotSize}
                    onChange={(e) => updateTargetLotSize(e.target.value)}
                    min="1400"
                    max="8000"
                    step="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1,400</span>
                    <span>8,000</span>
                  </div>
                </div>

                {/* Optional Setbacks */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700">Optional: Specific Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Lot Width (ft)
                      </label>
                      <input
                        type="number"
                        name="lotWidth"
                        value={inputs.lotWidth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder="60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Lot Size (sq ft)
                      </label>
                      <input
                        type="number"
                        name="lotSize"
                        value={inputs.lotSize}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder="7200"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={analyzeCompliance}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Compliance <Calculator className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>

                  {sitePlan && (
                    <button
                      onClick={optimizeLayout}
                      disabled={isOptimizing}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isOptimizing ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          Optimize Layout <RefreshCw className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results and Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* Site Plan Visualization */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Site Plan Visualization</h2>
                {analysis && (
                  <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <SitePlanVisualization plan={sitePlan} />
            </div>

            {/* Compliance Analysis */}
            {analysis && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Compliance Analysis</h2>
                
                <div className="space-y-6">
                  {/* Overall Status */}
                  <div className={`p-6 rounded-lg border-2 ${
                    analysis.overallCompliant 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Overall Compliance</h3>
                        <p className={`text-sm ${
                          analysis.overallCompliant ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {analysis.overallCompliant 
                            ? 'Your development meets all Chapter 42 requirements' 
                            : 'Your development has compliance issues that need to be addressed'
                          }
                        </p>
                      </div>
                      {analysis.overallCompliant ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  {/* Site Statistics */}
                  {sitePlan && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Total Lots</div>
                        <div className="text-xl font-bold text-gray-900">{sitePlan.statistics.totalLots}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Density</div>
                        <div className="text-xl font-bold text-gray-900">{sitePlan.statistics.density.toFixed(1)}</div>
                        <div className="text-xs text-gray-500">units/acre</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Avg Lot Size</div>
                        <div className="text-xl font-bold text-gray-900">{formatNumber(sitePlan.statistics.avgLotSize)}</div>
                        <div className="text-xs text-gray-500">sq ft</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Coverage</div>
                        <div className="text-xl font-bold text-gray-900">{sitePlan.statistics.coverage.toFixed(0)}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Open Space</div>
                        <div className="text-xl font-bold text-gray-900">{formatNumber(sitePlan.statistics.openSpaceArea)}</div>
                        <div className="text-xs text-gray-500">sq ft</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Efficiency</div>
                        <div className="text-xl font-bold text-gray-900">{sitePlan.statistics.efficiency.toFixed(0)}%</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Compliance Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Detailed Compliance Check</h3>
                    
                    <ComplianceItem
                      title="Density Limit"
                      compliant={analysis.compliance.density.compliant}
                      proposed={analysis.compliance.density.proposed}
                      minimum={analysis.compliance.density.maximum}
                      unit="units/acre"
                    />
                    
                    {analysis.inputs.lotWidth > 0 && (
                      <ComplianceItem
                        title="Lot Width"
                        compliant={analysis.compliance.lotWidth.compliant}
                        proposed={analysis.compliance.lotWidth.proposed}
                        minimum={analysis.compliance.lotWidth.minimum}
                        unit="feet"
                      />
                    )}
                    
                    {analysis.inputs.lotSize > 0 && (
                      <ComplianceItem
                        title="Lot Size"
                        compliant={analysis.compliance.lotSize.compliant}
                        proposed={analysis.compliance.lotSize.proposed}
                        minimum={analysis.compliance.lotSize.minimum}
                        unit="sq ft"
                      />
                    )}
                  </div>
                  
                  {/* Optimization Recommendations */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Optimization Recommendations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Recommended Units:</span>
                        <span className="font-medium">{formatNumber(analysis.optimization.recommendedUnits)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Optimal Density:</span>
                        <span className="font-medium">{analysis.optimization.recommendedDensity.toFixed(1)} units/acre</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Recommended Lot Size:</span>
                        <span className="font-medium">{formatNumber(analysis.optimization.recommendedLotSize)} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Total Land Area:</span>
                        <span className="font-medium">{formatNumber(analysis.optimization.totalSqFt)} sq ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}