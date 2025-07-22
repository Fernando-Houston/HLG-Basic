import { useState } from 'react';
import { Calculator, Download, ArrowRight, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { exportROIAnalysis, downloadFile } from '../../utils/api';
import { usePageSEO, pageSEO } from '../../utils/seo';
import { useToast } from '../../contexts/ToastContext';
import { LoadingButton } from '../../components/LoadingSpinner';

export function ROICalculatorPage() {
  usePageSEO(pageSEO.roiCalculator);
  const { success, error } = useToast();
  const [inputs, setInputs] = useState({
    landCost: '',
    landAcres: '',
    unitsPlanned: '',
    avgHomeSize: '',
    avgSalePrice: '',
    constructionCostOverride: '',
    softCostsOverride: '',
    realtorFeesOverride: '',
    closingCostsOverride: '',
    buyerConcessionsOverride: ''
  });

  const [results, setResults] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Default assumptions from the specification
  const defaults = {
    constructionCostPerSqFt: 115,
    softCostsPerUnit: 37857,
    realtorFees: 0.06, // 6%
    closingCostsPerUnit: 5235,
    buyerConcessionsPerUnit: 10000
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleExportROI = async () => {
    if (!results) {
      error('Please calculate ROI first');
      return;
    }

    setIsExporting(true);
    try {
      const exportData = {
        inputs,
        results,
        projectName: `ROI Analysis - ${new Date().toLocaleDateString()}`,
        exportFormat: 'pdf'
      };

      const response = await exportROIAnalysis(exportData);
      
      if (response.ok) {
        const filename = `ROI_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
        downloadFile(response, filename);
        success('ROI analysis exported successfully!');
      } else {
        // If PDF generation fails, create a downloadable HTML version
        const htmlContent = generateROIHTML();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ROI_Analysis_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        success('Exported as HTML (PDF service temporarily unavailable)');
      }
    } catch (error) {
      console.error('Export failed:', error);
      error('Export failed. Please try again later.');
    } finally {
      setIsExporting(false);
    }
  };

  const generateROIHTML = () => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatPercentage = (decimal: number) => {
      return `${(decimal * 100).toFixed(1)}%`;
    };

    return `
<!DOCTYPE html>
<html>
<head>
    <title>ROI Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section-header { background: #f0f9ff; padding: 15px; border-left: 4px solid #3b82f6; margin-bottom: 15px; }
        .metric { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #e5e7eb; }
        .metric-label { font-weight: bold; }
        .highlight { background: #fef3c7; padding: 15px; border-radius: 5px; }
        .positive { color: #059669; }
        .negative { color: #dc2626; }
    </style>
</head>
<body>
    <div class="header">
        <h1>ROI Analysis Report</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Project:</strong> ${inputs.landAcres} acre development with ${inputs.unitsPlanned} units</p>
    </div>
    
    <div class="section">
        <div class="section-header">
            <h2>Key Metrics</h2>
        </div>
        <div class="metric">
            <span class="metric-label">Net Profit:</span>
            <span class="${results.netProfit >= 0 ? 'positive' : 'negative'}">${formatCurrency(results.netProfit)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">ROI:</span>
            <span class="${results.roi >= 0 ? 'positive' : 'negative'}">${formatPercentage(results.roi)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Profit Margin:</span>
            <span>${formatPercentage(results.profitMargin)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Profit per Unit:</span>
            <span>${formatCurrency(results.profitPerUnit)}</span>
        </div>
    </div>
    
    <div class="section">
        <div class="section-header">
            <h2>Revenue Analysis</h2>
        </div>
        <div class="metric">
            <span class="metric-label">Total Revenue:</span>
            <span>${formatCurrency(results.totalRevenue)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Revenue per Unit:</span>
            <span>${formatCurrency(results.totalRevenue / parseFloat(inputs.unitsPlanned))}</span>
        </div>
    </div>
    
    <div class="section">
        <div class="section-header">
            <h2>Cost Breakdown</h2>
        </div>
        <div class="metric">
            <span class="metric-label">Total Development Cost:</span>
            <span>${formatCurrency(results.totalCost)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Land Cost:</span>
            <span>${formatCurrency(parseFloat(inputs.landCost))}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Construction Cost:</span>
            <span>${formatCurrency(results.constructionCost)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Soft Costs:</span>
            <span>${formatCurrency(results.softCosts)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Sales Costs:</span>
            <span>${formatCurrency(results.salesCosts)}</span>
        </div>
    </div>
    
    <div class="highlight">
        <h3>Investment Summary</h3>
        <p><strong>Total Investment Required:</strong> ${formatCurrency(results.totalCost)}</p>
        <p><strong>Expected Return:</strong> ${formatCurrency(results.netProfit)} (${formatPercentage(results.roi)} ROI)</p>
        <p><strong>Analysis Date:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>
    `;
  };

  const calculateROI = () => {
    const landCost = parseFloat(inputs.landCost) || 0;
    const landAcres = parseFloat(inputs.landAcres) || 0;
    const unitsPlanned = parseInt(inputs.unitsPlanned) || 0;
    const avgHomeSize = parseFloat(inputs.avgHomeSize) || 0;
    const avgSalePrice = parseFloat(inputs.avgSalePrice) || 0;

    if (landCost === 0 || unitsPlanned === 0 || avgHomeSize === 0 || avgSalePrice === 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Use overrides or defaults
    const constructionCostPerSqFt = parseFloat(inputs.constructionCostOverride) || defaults.constructionCostPerSqFt;
    const softCostsPerUnit = parseFloat(inputs.softCostsOverride) || defaults.softCostsPerUnit;
    const realtorFeesRate = parseFloat(inputs.realtorFeesOverride) || defaults.realtorFees;
    const closingCostsPerUnit = parseFloat(inputs.closingCostsOverride) || defaults.closingCostsPerUnit;
    const buyerConcessionsPerUnit = parseFloat(inputs.buyerConcessionsOverride) || defaults.buyerConcessionsPerUnit;

    // Calculate costs
    const totalConstructionCosts = unitsPlanned * avgHomeSize * constructionCostPerSqFt;
    const totalSoftCosts = unitsPlanned * softCostsPerUnit;
    const totalRevenue = unitsPlanned * avgSalePrice;
    const totalRealtorFees = totalRevenue * realtorFeesRate;
    const totalClosingCosts = unitsPlanned * closingCostsPerUnit;
    const totalBuyerConcessions = unitsPlanned * buyerConcessionsPerUnit;

    const totalCosts = landCost + totalConstructionCosts + totalSoftCosts + totalRealtorFees + totalClosingCosts + totalBuyerConcessions;
    const grossProfit = totalRevenue - totalCosts;
    const profitMargin = (grossProfit / totalRevenue) * 100;
    const roi = (grossProfit / (landCost + totalConstructionCosts + totalSoftCosts)) * 100;
    const densityPerAcre = landAcres > 0 ? unitsPlanned / landAcres : 0;

    setResults({
      landCost,
      landAcres,
      unitsPlanned,
      avgHomeSize,
      avgSalePrice,
      densityPerAcre,
      totalRevenue,
      totalCosts,
      grossProfit,
      profitMargin,
      roi,
      breakdown: {
        landCost,
        constructionCosts: totalConstructionCosts,
        softCosts: totalSoftCosts,
        realtorFees: totalRealtorFees,
        closingCosts: totalClosingCosts,
        buyerConcessions: totalBuyerConcessions
      },
      assumptions: {
        constructionCostPerSqFt,
        softCostsPerUnit,
        realtorFeesRate: realtorFeesRate * 100,
        closingCostsPerUnit,
        buyerConcessionsPerUnit
      },
      netProfit: grossProfit,
      totalCost: totalCosts,
      constructionCost: totalConstructionCosts,
      softCosts: totalSoftCosts,
      salesCosts: totalRealtorFees + totalClosingCosts + totalBuyerConcessions,
      profitPerUnit: grossProfit / unitsPlanned    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-accent-500 p-3 rounded-full shadow-lg shadow-accent-500/30">
                <Calculator className="h-8 w-8 text-gray-900" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">ROI Calculator</h1>
            <p className="text-xl mb-8">
              Calculate potential returns on your Houston land development project with industry-specific assumptions
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Cost *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="landCost"
                      value={inputs.landCost}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600 hover:border-green-400 transition-colors"
                      placeholder="500000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Size (Acres) *
                  </label>
                  <input
                    type="number"
                    name="landAcres"
                    value={inputs.landAcres}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="10"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Units Planned *
                  </label>
                  <input
                    type="number"
                    name="unitsPlanned"
                    value={inputs.unitsPlanned}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avg Home Size (Sq Ft) *
                  </label>
                  <input
                    type="number"
                    name="avgHomeSize"
                    value={inputs.avgHomeSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="2000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Sale Price *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="avgSalePrice"
                    value={inputs.avgSalePrice}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="350000"
                  />
                </div>
              </div>
              
              {/* Advanced Options */}
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="cursor-pointer font-medium text-gray-900 mb-4">
                  Advanced Assumptions (Optional)
                </summary>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Construction Cost/Sq Ft (${defaults.constructionCostPerSqFt})
                      </label>
                      <input
                        type="number"
                        name="constructionCostOverride"
                        value={inputs.constructionCostOverride}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder={defaults.constructionCostPerSqFt.toString()}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soft Costs/Unit (${defaults.softCostsPerUnit.toLocaleString()})
                      </label>
                      <input
                        type="number"
                        name="softCostsOverride"
                        value={inputs.softCostsOverride}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder={defaults.softCostsPerUnit.toString()}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Realtor Fees % ({(defaults.realtorFees * 100)}%)
                      </label>
                      <input
                        type="number"
                        name="realtorFeesOverride"
                        value={inputs.realtorFeesOverride}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder={(defaults.realtorFees * 100).toString()}
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Closing Costs/Unit (${defaults.closingCostsPerUnit.toLocaleString()})
                      </label>
                      <input
                        type="number"
                        name="closingCostsOverride"
                        value={inputs.closingCostsOverride}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder={defaults.closingCostsPerUnit.toString()}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buyer Concessions/Unit (${defaults.buyerConcessionsPerUnit.toLocaleString()})
                      </label>
                      <input
                        type="number"
                        name="buyerConcessionsOverride"
                        value={inputs.buyerConcessionsOverride}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                        placeholder={defaults.buyerConcessionsPerUnit.toString()}
                      />
                    </div>
                  </div>
                </div>
              </details>
              
              <button
                onClick={calculateROI}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:shadow-green-600/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center group"
              >
                Calculate ROI <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              {results && (
                <LoadingButton
                  onClick={handleExportROI}
                  isLoading={isExporting}
                  disabled={isExporting}
                  className="px-4 py-2 bg-accent-100 text-accent-900 rounded-lg hover:bg-accent-200 hover:shadow-md hover:shadow-accent-200/50 transition-all font-medium"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </LoadingButton>
              )}
            </div>
            
            {!results ? (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter project details to see ROI analysis</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-2">
                      <div className="bg-green-600 p-1.5 rounded-full mr-2">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-green-800">ROI</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">{formatPercent(results.roi)}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-2">
                      <div className="bg-accent-500 p-1.5 rounded-full mr-2">
                        <DollarSign className="h-4 w-4 text-gray-900" />
                      </div>
                      <span className="text-sm font-medium text-accent-900">Gross Profit</span>
                    </div>
                    <div className="text-2xl font-bold text-accent-700">{formatCurrency(results.grossProfit)}</div>
                  </div>
                </div>
                
                {/* Project Summary */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Land Size:</span>
                      <span className="font-medium">{results.landAcres} acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units Planned:</span>
                      <span className="font-medium">{results.unitsPlanned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Density:</span>
                      <span className="font-medium">{results.densityPerAcre.toFixed(1)} units/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Home Size:</span>
                      <span className="font-medium">{results.avgHomeSize.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
                
                {/* Financial Summary */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue:</span>
                      <span className="font-medium text-green-600">{formatCurrency(results.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Costs:</span>
                      <span className="font-medium text-red-600">{formatCurrency(results.totalCosts)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span className="text-gray-900">Gross Profit:</span>
                      <span className={results.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(results.grossProfit)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit Margin:</span>
                      <span className="font-medium">{formatPercent(results.profitMargin)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Cost Breakdown */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Land Cost:</span>
                      <span className="font-medium">{formatCurrency(results.breakdown.landCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Construction Costs:</span>
                      <span className="font-medium">{formatCurrency(results.breakdown.constructionCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soft Costs:</span>
                      <span className="font-medium">{formatCurrency(results.breakdown.softCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Realtor Fees:</span>
                      <span className="font-medium">{formatCurrency(results.breakdown.realtorFees)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Costs:</span>
                      <span className="font-medium">{formatCurrency(results.breakdown.closingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Buyer Concessions:</span>
                      <span className="font-medium">{formatCurrency(results.breakdown.buyerConcessions)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Warning for Chapter 42 */}
                {results.densityPerAcre > 27 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-300 rounded-lg p-4 shadow-md">
                    <div className="flex items-start">
                      <div className="bg-amber-500 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-900">Chapter 42 Density Warning</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Your planned density ({results.densityPerAcre.toFixed(1)} units/acre) exceeds Houston's Chapter 42 
                          maximum of 27 units/acre for single-family developments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}