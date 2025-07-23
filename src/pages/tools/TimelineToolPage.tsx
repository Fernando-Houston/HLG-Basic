import { useState } from 'react';
import { Clock, Download, CheckCircle, ArrowRight, Play, Pause, Loader2 } from 'lucide-react';
import { exportTimeline, downloadFile, TimelineExportData } from '../../utils/api';
import { usePageSEO, pageSEO } from '../../utils/seo';

export function TimelineToolPage() {
  usePageSEO(pageSEO.timelineTool);
  const [projectType, setProjectType] = useState('');
  const [projectSize, setProjectSize] = useState('');
  const [timeline, setTimeline] = useState<any>(null);
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const projectTimelines = {
    'single-family': {
      name: 'Single Family Development',
      totalDuration: '18-24 months',
      phases: [
        {
          name: 'Market Research & Site Selection',
          duration: '2-4 weeks',
          description: 'Analyze market conditions, demographics, and site suitability',
          tasks: [
            'Market demand analysis',
            'Demographic research',
            'Site evaluation',
            'Preliminary feasibility study'
          ],
          houstonSpecific: [
            'Review Houston market trends',
            'Analyze school district ratings',
            'Check flood plain maps'
          ]
        },
        {
          name: 'Due Diligence',
          duration: '30-60 days',
          description: 'Comprehensive property and regulatory analysis',
          tasks: [
            'Title search and survey',
            'Environmental assessment',
            'Geotechnical study',
            'Utility availability study'
          ],
          houstonSpecific: [
            'Chapter 42 compliance review',
            'Houston Public Works coordination',
            'HCFCD consultation for drainage'
          ]
        },
        {
          name: 'Land Acquisition',
          duration: '30-45 days',
          description: 'Negotiate and close on the property',
          tasks: [
            'Purchase agreement negotiation',
            'Financing arrangement',
            'Closing preparation',
            'Property transfer'
          ],
          houstonSpecific: [
            'Harris County deed recording',
            'Property tax prorations',
            'MUD district considerations'
          ]
        },
        {
          name: 'Design & Planning',
          duration: '60-120 days',
          description: 'Create development plans and architectural designs',
          tasks: [
            'Site planning and layout',
            'Architectural design',
            'Engineering plans',
            'Landscape design'
          ],
          houstonSpecific: [
            'Chapter 42 density calculations',
            'Houston drainage requirements',
            'Tree preservation ordinance compliance'
          ]
        },
        {
          name: 'Financing',
          duration: '45-90 days',
          description: 'Secure construction and development financing',
          tasks: [
            'Lender selection',
            'Loan application',
            'Financial documentation',
            'Loan approval and closing'
          ],
          houstonSpecific: [
            'Houston-area lender relationships',
            'Local market comps for appraisal',
            'Texas homestead exemption considerations'
          ]
        },
        {
          name: 'Permitting & Approvals',
          duration: '30-60 days',
          description: 'Obtain all necessary permits and approvals',
          tasks: [
            'Building permit applications',
            'Utility connection permits',
            'Environmental clearances',
            'Final approvals'
          ],
          houstonSpecific: [
            'City of Houston permit process',
            'HCFCD stormwater permits',
            'Chapter 42 final review'
          ]
        },
        {
          name: 'Pre-Construction',
          duration: '2-4 weeks',
          description: 'Prepare for construction activities',
          tasks: [
            'Contractor selection',
            'Site preparation',
            'Utility connections',
            'Construction mobilization'
          ],
          houstonSpecific: [
            'Houston contractor licensing verification',
            'Local subcontractor coordination',
            'Houston inspection scheduling'
          ]
        },
        {
          name: 'Construction',
          duration: '6-8 months',
          description: 'Build homes and complete infrastructure',
          tasks: [
            'Site work and utilities',
            'Foundation and framing',
            'Mechanical and electrical',
            'Finishing and landscaping'
          ],
          houstonSpecific: [
            'Houston building code compliance',
            'Hurricane-resistant construction',
            'Local inspection requirements'
          ]
        },
        {
          name: 'Marketing & Sales',
          duration: '3-12 months',
          description: 'Market and sell completed homes',
          tasks: [
            'Marketing strategy development',
            'Sales center setup',
            'Buyer qualification',
            'Sales completion'
          ],
          houstonSpecific: [
            'Houston MLS listing',
            'Local realtor partnerships',
            'Texas disclosure requirements'
          ]
        },
        {
          name: 'Project Completion',
          duration: '2-4 weeks',
          description: 'Final inspections and project closeout',
          tasks: [
            'Final inspections',
            'Certificate of occupancy',
            'Warranty setup',
            'Project documentation'
          ],
          houstonSpecific: [
            'City of Houston final inspections',
            'Texas Residential Construction Commission requirements',
            'Local utility final connections'
          ]
        }
      ]
    },
    'commercial': {
      name: 'Commercial Development',
      totalDuration: '24-36 months',
      phases: [
        {
          name: 'Market Research & Site Selection',
          duration: '4-8 weeks',
          description: 'Comprehensive market analysis for commercial viability',
          tasks: [
            'Market demand analysis',
            'Competition assessment',
            'Traffic and accessibility study',
            'Economic feasibility analysis'
          ],
          houstonSpecific: [
            'Houston Economic Development Department consultation',
            'Major thoroughfare accessibility analysis',
            'Houston employment center proximity'
          ]
        },
        {
          name: 'Due Diligence',
          duration: '45-90 days',
          description: 'Extended due diligence for commercial complexities',
          tasks: [
            'Environmental Phase I & II',
            'Traffic impact study',
            'Utility capacity analysis',
            'Zoning and land use review'
          ],
          houstonSpecific: [
            'Houston Planning Commission review',
            'Chapter 42 commercial provisions',
            'METRO accessibility considerations'
          ]
        },
        {
          name: 'Land Acquisition',
          duration: '45-60 days',
          description: 'Commercial property acquisition process',
          tasks: [
            'Commercial purchase agreement',
            'Financing coordination',
            'Due diligence completion',
            'Closing execution'
          ],
          houstonSpecific: [
            'Harris County commercial recording',
            'Business district considerations',
            'Tax increment financing opportunities'
          ]
        },
        {
          name: 'Design & Planning',
          duration: '120-180 days',
          description: 'Complex commercial design and planning phase',
          tasks: [
            'Architectural design development',
            'Engineering and MEP design',
            'Site planning and parking',
            'Landscape and hardscape design'
          ],
          houstonSpecific: [
            'Houston commercial design standards',
            'Parking ratio requirements',
            'ADA compliance verification'
          ]
        },
        {
          name: 'Financing',
          duration: '60-120 days',
          description: 'Commercial construction and permanent financing',
          tasks: [
            'Construction loan procurement',
            'Permanent financing arrangement',
            'Equity partner coordination',
            'Financial structuring'
          ],
          houstonSpecific: [
            'Houston commercial lender network',
            'Texas economic incentive programs',
            'Local investment opportunities'
          ]
        },
        {
          name: 'Permitting & Approvals',
          duration: '60-120 days',
          description: 'Comprehensive commercial permitting process',
          tasks: [
            'Site plan approval',
            'Building permit issuance',
            'Utility permits',
            'Special use permits if required'
          ],
          houstonSpecific: [
            'Houston Development Services review',
            'Planning Commission approval',
            'HCFCD commercial drainage review'
          ]
        },
        {
          name: 'Pre-Construction',
          duration: '4-8 weeks',
          description: 'Commercial pre-construction preparation',
          tasks: [
            'General contractor selection',
            'Subcontractor procurement',
            'Site mobilization',
            'Long-lead item ordering'
          ],
          houstonSpecific: [
            'Houston commercial contractor vetting',
            'Local supplier relationships',
            'Houston inspection coordination'
          ]
        },
        {
          name: 'Construction',
          duration: '10-16 months',
          description: 'Commercial construction execution',
          tasks: [
            'Site work and foundations',
            'Structural construction',
            'MEP installation',
            'Interior finish and landscaping'
          ],
          houstonSpecific: [
            'Houston commercial building codes',
            'Hurricane and flood resilience',
            'Energy efficiency requirements'
          ]
        },
        {
          name: 'Leasing & Occupancy',
          duration: '6-18 months',
          description: 'Commercial leasing and tenant coordination',
          tasks: [
            'Leasing strategy implementation',
            'Tenant improvements',
            'Certificate of occupancy',
            'Property management setup'
          ],
          houstonSpecific: [
            'Houston commercial real estate market',
            'Local tenant mix optimization',
            'Texas commercial lease requirements'
          ]
        },
        {
          name: 'Project Completion',
          duration: '4-6 weeks',
          description: 'Commercial project finalization',
          tasks: [
            'Final inspections and approvals',
            'Warranty coordination',
            'Property management transition',
            'Project documentation'
          ],
          houstonSpecific: [
            'City of Houston commercial occupancy',
            'Property tax assessment finalization',
            'Local property management coordination'
          ]
        }
      ]
    }
  };

  const generateTimeline = () => {
    if (!projectType) {
      alert('Please select a project type');
      return;
    }

    const timelineData = projectTimelines[projectType as keyof typeof projectTimelines];
    setTimeline(timelineData);
    setSelectedPhase(0);
  };

  const getPhaseColor = (index: number) => {
    if (index === selectedPhase) return 'bg-green-500 text-white';
    if (index < selectedPhase) return 'bg-green-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  const getConnectorColor = (index: number) => {
    if (index < selectedPhase) return 'bg-green-500';
    if (index === selectedPhase) return 'bg-green-500';
    return 'bg-gray-300';
  };

  const handleExportTimeline = async () => {
    if (!timeline || !projectType) {
      alert('Please generate a timeline first');
      return;
    }

    setIsExporting(true);
    try {
      const exportData: TimelineExportData = {
        projectType: projectType as 'single-family' | 'commercial' | 'mixed-use' | 'master-planned',
        projectSize: projectSize as 'small' | 'medium' | 'large' | undefined,
        customProjectName: timeline.name,
        includeHoustonRequirements: true,
        exportFormat: 'pdf'
      };

      const response = await exportTimeline(exportData);
      
      if (response.ok) {
        const filename = `${timeline.name.replace(/\s+/g, '_')}_Timeline.pdf`;
        downloadFile(response, filename);
      } else {
        // If PDF generation fails, create a downloadable HTML version
        const htmlContent = generateTimelineHTML();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${timeline.name.replace(/\s+/g, '_')}_Timeline.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again later.');
    } finally {
      setIsExporting(false);
    }
  };

  const generateTimelineHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${timeline.name} - Development Timeline</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; }
        .phase { margin-bottom: 30px; page-break-inside: avoid; }
        .phase-header { background: #f0f9ff; padding: 15px; border-left: 4px solid #3b82f6; }
        .tasks { margin: 15px 0; }
        .task { margin: 5px 0; padding-left: 20px; }
        .houston-specific { background: #fef3c7; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .duration { color: #059669; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${timeline.name}</h1>
        <p><strong>Total Duration:</strong> ${timeline.totalDuration}</p>
        <p><strong>Project Size:</strong> ${projectSize || 'Not specified'}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    
    ${timeline.phases.map((phase: any, index: number) => `
        <div class="phase">
            <div class="phase-header">
                <h2>Phase ${index + 1}: ${phase.name}</h2>
                <p class="duration">Duration: ${phase.duration}</p>
                <p>${phase.description}</p>
            </div>
            
            <div class="tasks">
                <h3>Key Tasks:</h3>
                ${phase.tasks.map((task: string) => `<div class="task">• ${task}</div>`).join('')}
            </div>
            
            <div class="houston-specific">
                <h3>Houston-Specific Requirements:</h3>
                ${phase.houstonSpecific.map((item: string) => `<div class="task">• ${item}</div>`).join('')}
            </div>
        </div>
    `).join('')}
</body>
</html>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Clock className="h-12 w-12 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Development Timeline Tool</h1>
            </div>
            <p className="text-xl mb-8">
              Plan your Houston development project with realistic timelines and Houston-specific requirements
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Project Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Project Type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                >
                  <option value="">Select project type</option>
                  <option value="single-family">Single Family Development</option>
                  <option value="commercial">Commercial Development</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Size
                </label>
                <select
                  value={projectSize}
                  onChange={(e) => setProjectSize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                >
                  <option value="">Select project size</option>
                  <option value="small">Small (5-20 units/acres)</option>
                  <option value="medium">Medium (21-50 units/acres)</option>
                  <option value="large">Large (50+ units/acres)</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={generateTimeline}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all flex items-center justify-center"
            >
              Generate Timeline <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Timeline Display */}
        {timeline && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{timeline.name}</h2>
                  <p className="text-gray-600">Total Duration: {timeline.totalDuration}</p>
                </div>
                <button 
                  onClick={handleExportTimeline}
                  disabled={isExporting}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export Timeline
                    </>
                  )}
                </button>
              </div>
              
              {/* Phase Navigation */}
              <div className="relative mb-8">
                <div className="flex items-center justify-between">
                  {timeline.phases.map((phase: any, index: number) => (
                    <div key={index} className="flex flex-col items-center relative z-10">
                      <button
                        onClick={() => setSelectedPhase(index)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          getPhaseColor(index)
                        }`}
                      >
                        {index + 1}
                      </button>
                      <span className="text-xs text-center mt-2 max-w-20">
                        {phase.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 -z-10">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-500"
                    style={{ width: `${(selectedPhase / (timeline.phases.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Phase Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Phase Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    getPhaseColor(selectedPhase)
                  }`}>
                    {selectedPhase + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {timeline.phases[selectedPhase].name}
                    </h3>
                    <p className="text-green-600 font-medium">
                      Duration: {timeline.phases[selectedPhase].duration}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {timeline.phases[selectedPhase].description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Tasks</h4>
                  <ul className="space-y-2">
                    {timeline.phases[selectedPhase].tasks.map((task: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">
                    Houston-Specific Requirements
                  </h4>
                  <ul className="space-y-2">
                    {timeline.phases[selectedPhase].houstonSpecific.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-amber-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Timeline Overview */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Complete Timeline</h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {timeline.phases.map((phase: any, index: number) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                        index === selectedPhase 
                          ? 'border-green-600 bg-amber-50' 
                          : index < selectedPhase 
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                      onClick={() => setSelectedPhase(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                        <span className="text-sm font-medium text-gray-600">{phase.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">{phase.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-medium">
                      Phase {selectedPhase + 1} of {timeline.phases.length}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-700 h-2 rounded-full transition-all"
                      style={{ width: `${((selectedPhase + 1) / timeline.phases.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setSelectedPhase(Math.max(0, selectedPhase - 1))}
                disabled={selectedPhase === 0}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Phase
              </button>
              
              <button
                onClick={() => setSelectedPhase(Math.min(timeline.phases.length - 1, selectedPhase + 1))}
                disabled={selectedPhase === timeline.phases.length - 1}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Phase <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}