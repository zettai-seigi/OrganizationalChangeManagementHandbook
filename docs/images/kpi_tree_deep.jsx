import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, DollarSign, Target, Truck, Fuel, Users, Settings, Clock, BarChart3, Shield, Wrench, Route, Zap, Mountain, Gauge, AlertTriangle } from 'lucide-react';

const TreeNode = ({ node, level = 0, expandedNodes, toggleNode }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  
  const levelColors = [
    'bg-slate-800 border-slate-600 text-white',
    'bg-blue-700 border-blue-500 text-white',
    'bg-emerald-600 border-emerald-400 text-white',
    'bg-amber-500 border-amber-400 text-slate-900',
    'bg-orange-400 border-orange-300 text-slate-900',
    'bg-slate-300 border-slate-400 text-slate-800',
    'bg-slate-200 border-slate-300 text-slate-700',
  ];
  
  const bgColor = levelColors[Math.min(level, levelColors.length - 1)];
  
  return (
    <div className="flex flex-col">
      <div 
        className={`flex items-center gap-2 p-2 rounded-lg border-2 ${bgColor} cursor-pointer hover:opacity-90 transition-all mb-1 shadow-sm`}
        onClick={() => hasChildren && toggleNode(node.id)}
      >
        {hasChildren && (
          <span className="w-4 h-4 flex items-center justify-center">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        {!hasChildren && <span className="w-4" />}
        {node.icon && <node.icon size={14} />}
        <div className="flex flex-col">
          <span className="font-semibold text-xs">{node.name}</span>
          {node.unit && <span className="text-xs opacity-75">{node.unit}</span>}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="ml-4 pl-3 border-l-2 border-slate-300 flex flex-col gap-0.5">
          {node.children.map((child) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function KPITree() {
  const [activeView, setActiveView] = useState('financial');
  const [expandedNodes, setExpandedNodes] = useState(new Set(['ebitda', 'fcf', 'roic', 'volume-ob', 'volume-coal', 'safety']));
  
  const toggleNode = (id) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  const expandAll = () => {
    const allIds = [];
    const collectIds = (nodes) => {
      nodes.forEach(node => {
        allIds.push(node.id);
        if (node.children) collectIds(node.children);
      });
    };
    const data = activeView === 'financial' ? financialKPIs : operationalKPIs;
    collectIds(data);
    setExpandedNodes(new Set(allIds));
  };
  
  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // ==================== FINANCIAL VIEW ====================
  const financialKPIs = [
    {
      id: 'ebitda',
      name: 'EBITDA',
      icon: DollarSign,
      unit: 'USD/IDR',
      children: [
        {
          id: 'revenue',
          name: 'Revenue',
          icon: TrendingUp,
          children: [
            {
              id: 'ob-revenue',
              name: 'OB Removal Revenue',
              unit: 'Rate × BCM',
              children: [
                { id: 'ob-base-rate', name: 'Base Rate', unit: '$/BCM' },
                { id: 'ob-escalation', name: 'Escalation/Index Adjustment', unit: '%' },
                { id: 'ob-distance-adj', name: 'Distance Adjustment', unit: '$/BCM/100m' },
                { id: 'ob-volume-achieved', name: 'Volume Achieved', unit: 'BCM' },
              ]
            },
            {
              id: 'coal-revenue',
              name: 'Coal Getting Revenue',
              unit: 'Rate × Ton',
              children: [
                { id: 'coal-base-rate', name: 'Base Rate', unit: '$/Ton' },
                { id: 'coal-cv-adj', name: 'CV Adjustment', unit: '$/Ton' },
                { id: 'coal-quality-bonus', name: 'Quality Bonus/Penalty', unit: '$/Ton' },
                { id: 'coal-volume-achieved', name: 'Volume Achieved', unit: 'Tons' },
              ]
            },
            {
              id: 'rehandle-revenue',
              name: 'Rehandle Revenue',
              unit: '$/BCM',
            },
            {
              id: 'ancillary-revenue',
              name: 'Ancillary Services',
              children: [
                { id: 'drill-blast-rev', name: 'Drill & Blast', unit: '$/BCM' },
                { id: 'dewatering-rev', name: 'Dewatering', unit: '$/month' },
                { id: 'road-maint-rev', name: 'Road Maintenance', unit: '$/month' },
              ]
            },
          ]
        },
        {
          id: 'opex',
          name: 'Operating Costs (OPEX)',
          icon: Settings,
          children: [
            {
              id: 'fuel-cost',
              name: 'Fuel Cost',
              icon: Fuel,
              children: [
                { id: 'fuel-price', name: 'Fuel Price', unit: '$/liter' },
                { id: 'fuel-volume', name: 'Total Fuel Volume', unit: 'liters/month' },
                { id: 'fuel-ratio-ob', name: 'Fuel Ratio - OB', unit: 'L/BCM' },
                { id: 'fuel-ratio-coal', name: 'Fuel Ratio - Coal', unit: 'L/Ton' },
                { id: 'fuel-idling', name: 'Idling Fuel Loss', unit: 'L/hr' },
              ]
            },
            {
              id: 'labor-cost',
              name: 'Labor Cost',
              icon: Users,
              children: [
                {
                  id: 'direct-labor',
                  name: 'Direct Labor',
                  children: [
                    { id: 'operator-cost', name: 'Equipment Operators', unit: 'FTE × $/month' },
                    { id: 'mechanic-cost', name: 'Mechanics', unit: 'FTE × $/month' },
                    { id: 'helper-cost', name: 'Helpers/Laborers', unit: 'FTE × $/month' },
                  ]
                },
                {
                  id: 'indirect-labor',
                  name: 'Indirect Labor',
                  children: [
                    { id: 'supervisor-cost', name: 'Supervisors', unit: 'FTE × $/month' },
                    { id: 'engineer-cost', name: 'Engineers', unit: 'FTE × $/month' },
                    { id: 'admin-cost', name: 'Admin Staff', unit: 'FTE × $/month' },
                  ]
                },
                { id: 'overtime-cost', name: 'Overtime Premium', unit: '$/month' },
                { id: 'allowances', name: 'Allowances (Remote/Shift)', unit: '$/month' },
              ]
            },
            {
              id: 'maintenance-cost',
              name: 'Maintenance Cost',
              icon: Wrench,
              children: [
                {
                  id: 'parts-cost',
                  name: 'Parts & Components',
                  children: [
                    { id: 'undercarriage', name: 'Undercarriage', unit: '$/hr' },
                    { id: 'engine-parts', name: 'Engine Components', unit: '$/hr' },
                    { id: 'hydraulic-parts', name: 'Hydraulic Components', unit: '$/hr' },
                    { id: 'electrical-parts', name: 'Electrical Components', unit: '$/hr' },
                  ]
                },
                {
                  id: 'tyres-cost',
                  name: 'Tyres',
                  children: [
                    { id: 'tyre-price', name: 'Tyre Unit Price', unit: '$/tyre' },
                    { id: 'tyre-life', name: 'Tyre Life', unit: 'hours' },
                    { id: 'cpkm', name: 'Cost per km (CPKM)', unit: '$/km' },
                    { id: 'tyre-damage', name: 'Damage/Scrap Rate', unit: '%' },
                  ]
                },
                {
                  id: 'get-cost',
                  name: 'GET (Ground Engaging Tools)',
                  children: [
                    { id: 'bucket-teeth', name: 'Bucket Teeth', unit: '$/hr' },
                    { id: 'bucket-lip', name: 'Bucket Lip Shrouds', unit: '$/hr' },
                    { id: 'ripper-tips', name: 'Ripper Tips', unit: '$/hr' },
                    { id: 'blade-edge', name: 'Blade Cutting Edge', unit: '$/hr' },
                  ]
                },
                { id: 'lube-cost', name: 'Lubricants & Filters', unit: '$/hr' },
                { id: 'service-labor', name: 'Service Labor', unit: '$/hr' },
              ]
            },
            {
              id: 'equipment-cost',
              name: 'Equipment Ownership',
              icon: Truck,
              children: [
                { id: 'depreciation', name: 'Depreciation', unit: '$/hr' },
                { id: 'interest', name: 'Interest/Financing', unit: '$/month' },
                { id: 'insurance', name: 'Insurance', unit: '$/year' },
                { id: 'rental', name: 'Rental Equipment', unit: '$/month' },
              ]
            },
            {
              id: 'site-costs',
              name: 'Site Overhead',
              children: [
                { id: 'camp-cost', name: 'Camp & Mess', unit: '$/person/day' },
                { id: 'transport', name: 'Personnel Transport', unit: '$/month' },
                { id: 'utilities', name: 'Utilities (Power/Water)', unit: '$/month' },
                { id: 'workshop', name: 'Workshop Operations', unit: '$/month' },
              ]
            },
          ]
        },
      ]
    },
    {
      id: 'fcf',
      name: 'Free Cash Flow (FCF)',
      icon: BarChart3,
      unit: 'USD/IDR',
      children: [
        { id: 'fcf-ebitda', name: 'EBITDA', unit: '(see above)' },
        {
          id: 'capex',
          name: 'CAPEX',
          children: [
            {
              id: 'growth-capex',
              name: 'Growth CAPEX',
              children: [
                { id: 'new-equipment', name: 'New Equipment', unit: '$' },
                { id: 'fleet-expansion', name: 'Fleet Expansion', unit: '$ units' },
              ]
            },
            {
              id: 'sustaining-capex',
              name: 'Sustaining CAPEX',
              children: [
                { id: 'major-rebuild', name: 'Major Component Rebuild', unit: '$' },
                { id: 'mid-life-rebuild', name: 'Mid-Life Rebuild', unit: '$' },
                { id: 'component-exchange', name: 'Component Exchange', unit: '$' },
              ]
            },
          ]
        },
        {
          id: 'working-capital',
          name: 'Working Capital',
          children: [
            { id: 'ar-days', name: 'AR Days', unit: 'days' },
            { id: 'ap-days', name: 'AP Days', unit: 'days' },
            { id: 'inventory-parts', name: 'Parts Inventory', unit: '$' },
            { id: 'inventory-fuel', name: 'Fuel Inventory', unit: '$' },
          ]
        },
        { id: 'tax-paid', name: 'Tax Paid', unit: '$' },
        { id: 'debt-service', name: 'Debt Service', unit: '$' },
      ]
    },
    {
      id: 'roic',
      name: 'ROIC',
      icon: TrendingUp,
      unit: '%',
      children: [
        {
          id: 'nopat',
          name: 'NOPAT',
          children: [
            { id: 'ebit', name: 'EBIT', unit: 'EBITDA - D&A' },
            { id: 'tax-rate', name: 'Effective Tax Rate', unit: '%' },
          ]
        },
        {
          id: 'invested-capital',
          name: 'Invested Capital',
          children: [
            { id: 'ppe-net', name: 'PP&E (Net)', unit: '$' },
            { id: 'nwc', name: 'Net Working Capital', unit: '$' },
          ]
        },
        {
          id: 'efficiency-ratios',
          name: 'Efficiency Ratios',
          children: [
            { id: 'asset-turnover', name: 'Asset Turnover', unit: 'x' },
            { id: 'revenue-per-bcm', name: 'Revenue per BCM', unit: '$/BCM' },
            { id: 'cost-per-bcm', name: 'Cost per BCM', unit: '$/BCM' },
          ]
        },
      ]
    },
  ];

  // ==================== OPERATIONAL VIEW ====================
  const operationalKPIs = [
    {
      id: 'volume-ob',
      name: 'Target Volume - Overburden',
      icon: Mountain,
      unit: 'BCM',
      children: [
        {
          id: 'ob-production-formula',
          name: 'Production = Fleet × PA × UA × Productivity',
          icon: Target,
          children: [
            {
              id: 'ob-fleet',
              name: 'Fleet Configuration',
              icon: Truck,
              children: [
                {
                  id: 'ob-loading-fleet',
                  name: 'Loading Fleet',
                  children: [
                    { id: 'ob-exc-count', name: 'Excavator Count', unit: 'units' },
                    { id: 'ob-exc-class', name: 'Excavator Class', unit: 'PC2000/PC3000/PC4000' },
                    { id: 'ob-bucket-cap', name: 'Bucket Capacity', unit: 'm³' },
                    { id: 'ob-shovel-count', name: 'Shovel Count (if any)', unit: 'units' },
                  ]
                },
                {
                  id: 'ob-hauling-fleet',
                  name: 'Hauling Fleet',
                  children: [
                    { id: 'ob-truck-count', name: 'Dump Truck Count', unit: 'units' },
                    { id: 'ob-truck-class', name: 'Truck Class', unit: 'HD785/CAT777/CAT789' },
                    { id: 'ob-truck-payload', name: 'Rated Payload', unit: 'tons' },
                    { id: 'ob-match-factor', name: 'Match Factor', unit: 'ratio' },
                  ]
                },
                {
                  id: 'ob-support-fleet',
                  name: 'Support Fleet',
                  children: [
                    { id: 'ob-dozer-count', name: 'Dozers', unit: 'units' },
                    { id: 'ob-grader-count', name: 'Graders', unit: 'units' },
                    { id: 'ob-water-truck', name: 'Water Trucks', unit: 'units' },
                    { id: 'ob-fuel-truck', name: 'Fuel/Lube Trucks', unit: 'units' },
                    { id: 'ob-light-vehicle', name: 'Light Vehicles', unit: 'units' },
                  ]
                },
              ]
            },
            {
              id: 'ob-pa',
              name: 'Physical Availability (PA)',
              icon: Wrench,
              unit: '%',
              children: [
                {
                  id: 'ob-reliability',
                  name: 'Reliability Metrics',
                  children: [
                    { id: 'ob-mtbf', name: 'MTBF', unit: 'hours' },
                    { id: 'ob-mttr', name: 'MTTR', unit: 'hours' },
                    { id: 'ob-mttf', name: 'MTTF', unit: 'hours' },
                  ]
                },
                {
                  id: 'ob-maintenance-perf',
                  name: 'Maintenance Performance',
                  children: [
                    { id: 'ob-pm-compliance', name: 'PM Compliance', unit: '%' },
                    { id: 'ob-pm-overdue', name: 'PM Overdue Units', unit: 'count' },
                    { id: 'ob-backlog-hrs', name: 'Maintenance Backlog', unit: 'hours' },
                    { id: 'ob-wrench-time', name: 'Wrench Time', unit: '%' },
                  ]
                },
                {
                  id: 'ob-breakdown-analysis',
                  name: 'Breakdown Analysis',
                  children: [
                    { id: 'ob-bd-hours', name: 'Breakdown Hours', unit: 'hours' },
                    { id: 'ob-bd-frequency', name: 'Breakdown Frequency', unit: 'count/month' },
                    {
                      id: 'ob-bd-pareto',
                      name: 'Breakdown Pareto',
                      children: [
                        { id: 'ob-bd-engine', name: 'Engine Related', unit: '%' },
                        { id: 'ob-bd-hydraulic', name: 'Hydraulic System', unit: '%' },
                        { id: 'ob-bd-electrical', name: 'Electrical System', unit: '%' },
                        { id: 'ob-bd-transmission', name: 'Transmission/Drivetrain', unit: '%' },
                        { id: 'ob-bd-structural', name: 'Structural', unit: '%' },
                        { id: 'ob-bd-tyres', name: 'Tyre Related', unit: '%' },
                      ]
                    },
                  ]
                },
                {
                  id: 'ob-component-life',
                  name: 'Component Life Tracking',
                  children: [
                    { id: 'ob-engine-hrs', name: 'Engine Hours to Rebuild', unit: 'hours' },
                    { id: 'ob-trans-hrs', name: 'Transmission Life', unit: 'hours' },
                    { id: 'ob-final-drive', name: 'Final Drive Life', unit: 'hours' },
                    { id: 'ob-hydraulic-pump', name: 'Hydraulic Pump Life', unit: 'hours' },
                    { id: 'ob-swing-motor', name: 'Swing Motor Life', unit: 'hours' },
                    { id: 'ob-track-life', name: 'Track/Undercarriage Life', unit: 'hours' },
                  ]
                },
                {
                  id: 'ob-condition-monitoring',
                  name: 'Condition Monitoring',
                  children: [
                    { id: 'ob-oil-analysis', name: 'Oil Analysis Compliance', unit: '%' },
                    { id: 'ob-vibration', name: 'Vibration Monitoring', unit: 'mm/s' },
                    { id: 'ob-temp-monitoring', name: 'Temperature Alerts', unit: 'count' },
                    { id: 'ob-particle-count', name: 'Particle Count Trend', unit: 'ppm' },
                  ]
                },
                { id: 'ob-parts-avail', name: 'Parts Availability', unit: '%' },
              ]
            },
            {
              id: 'ob-ua',
              name: 'Utilization (UA)',
              icon: Clock,
              unit: '%',
              children: [
                {
                  id: 'ob-time-model',
                  name: 'Time Model',
                  children: [
                    { id: 'ob-calendar-hrs', name: 'Calendar Hours', unit: 'hrs/month' },
                    { id: 'ob-scheduled-hrs', name: 'Scheduled Hours', unit: 'hrs/month' },
                    { id: 'ob-available-hrs', name: 'Available Hours', unit: 'hrs/month' },
                    { id: 'ob-operating-hrs', name: 'Operating Hours', unit: 'hrs/month' },
                    { id: 'ob-effective-hrs', name: 'Effective Working Hours', unit: 'hrs/month' },
                  ]
                },
                {
                  id: 'ob-delay-analysis',
                  name: 'Delay Analysis',
                  children: [
                    {
                      id: 'ob-standby',
                      name: 'Standby Time',
                      children: [
                        { id: 'ob-no-operator', name: 'No Operator', unit: 'hours' },
                        { id: 'ob-no-fuel', name: 'No Fuel', unit: 'hours' },
                        { id: 'ob-shift-change', name: 'Shift Change', unit: 'hours' },
                        { id: 'ob-meal-break', name: 'Meal Break', unit: 'hours' },
                        { id: 'ob-safety-meeting', name: 'Safety Meeting/Training', unit: 'hours' },
                      ]
                    },
                    {
                      id: 'ob-ops-delay',
                      name: 'Operational Delays',
                      children: [
                        { id: 'ob-no-face', name: 'No Face/Dig Face Prep', unit: 'hours' },
                        { id: 'ob-no-dump', name: 'No Dump Point', unit: 'hours' },
                        { id: 'ob-blast-delay', name: 'Blasting Clearance', unit: 'hours' },
                        { id: 'ob-survey-delay', name: 'Survey/Grade Control', unit: 'hours' },
                        { id: 'ob-road-maint', name: 'Road Under Maintenance', unit: 'hours' },
                      ]
                    },
                    {
                      id: 'ob-external-delay',
                      name: 'External Delays',
                      children: [
                        { id: 'ob-weather', name: 'Weather (Rain/Storm)', unit: 'hours' },
                        { id: 'ob-client-delay', name: 'Client Instructions', unit: 'hours' },
                        { id: 'ob-permit-delay', name: 'Permit/Compliance', unit: 'hours' },
                      ]
                    },
                  ]
                },
              ]
            },
            {
              id: 'ob-productivity',
              name: 'Productivity',
              icon: Gauge,
              children: [
                {
                  id: 'ob-exc-productivity',
                  name: 'Excavator Productivity',
                  unit: 'BCM/hr',
                  children: [
                    {
                      id: 'ob-dig-rate',
                      name: 'Dig Rate',
                      children: [
                        { id: 'ob-bucket-size', name: 'Bucket Size', unit: 'm³' },
                        { id: 'ob-fill-factor', name: 'Fill Factor', unit: '%' },
                        { id: 'ob-swell-factor', name: 'Swell Factor', unit: 'ratio' },
                        { id: 'ob-material-density', name: 'Material Density', unit: 'tons/BCM' },
                      ]
                    },
                    {
                      id: 'ob-dig-cycle',
                      name: 'Dig Cycle Time',
                      children: [
                        { id: 'ob-dig-time', name: 'Digging Time', unit: 'sec' },
                        { id: 'ob-swing-load', name: 'Swing Loaded', unit: 'sec' },
                        { id: 'ob-dump-time', name: 'Dump in Truck', unit: 'sec' },
                        { id: 'ob-swing-empty', name: 'Swing Empty', unit: 'sec' },
                        { id: 'ob-spot-truck', name: 'Truck Spotting', unit: 'sec' },
                      ]
                    },
                    {
                      id: 'ob-dig-factors',
                      name: 'Digging Factors',
                      children: [
                        { id: 'ob-bench-height', name: 'Bench Height', unit: 'm' },
                        { id: 'ob-face-angle', name: 'Face Angle', unit: 'degrees' },
                        { id: 'ob-material-hardness', name: 'Material Hardness (UCS)', unit: 'MPa' },
                        { id: 'ob-fragmentation', name: 'Fragmentation Quality', unit: 'P80' },
                        { id: 'ob-dig-direction', name: 'Dig Direction', unit: '°' },
                      ]
                    },
                    { id: 'ob-operator-skill', name: 'Operator Skill Rating', unit: '1-5' },
                    { id: 'ob-dig-plan-compliance', name: 'Dig Plan Compliance', unit: '%' },
                  ]
                },
                {
                  id: 'ob-truck-productivity',
                  name: 'Truck Productivity',
                  unit: 'BCM/hr',
                  children: [
                    {
                      id: 'ob-truck-cycle',
                      name: 'Truck Cycle Time',
                      unit: 'minutes',
                      children: [
                        {
                          id: 'ob-load-segment',
                          name: 'Loading Segment',
                          children: [
                            { id: 'ob-queue-load', name: 'Queue at Excavator', unit: 'min' },
                            { id: 'ob-spot-load', name: 'Spotting Time', unit: 'min' },
                            { id: 'ob-loading-time', name: 'Loading Time', unit: 'min' },
                            { id: 'ob-first-bucket', name: 'First Bucket Wait', unit: 'min' },
                          ]
                        },
                        {
                          id: 'ob-haul-segment',
                          name: 'Hauling Segment',
                          children: [
                            { id: 'ob-haul-loaded', name: 'Haul Loaded', unit: 'min' },
                            { id: 'ob-haul-empty', name: 'Haul Empty', unit: 'min' },
                            { id: 'ob-total-distance', name: 'Total Haul Distance', unit: 'km' },
                          ]
                        },
                        {
                          id: 'ob-dump-segment',
                          name: 'Dumping Segment',
                          children: [
                            { id: 'ob-queue-dump', name: 'Queue at Dump', unit: 'min' },
                            { id: 'ob-spot-dump', name: 'Spotting at Dump', unit: 'min' },
                            { id: 'ob-tip-time', name: 'Tipping Time', unit: 'min' },
                            { id: 'ob-maneuver', name: 'Maneuvering', unit: 'min' },
                          ]
                        },
                      ]
                    },
                    {
                      id: 'ob-payload-analysis',
                      name: 'Payload Analysis',
                      children: [
                        { id: 'ob-rated-payload', name: 'Rated Payload', unit: 'tons' },
                        { id: 'ob-avg-payload', name: 'Average Payload', unit: 'tons' },
                        { id: 'ob-payload-variance', name: 'Payload Variance', unit: '%' },
                        { id: 'ob-overload-pct', name: 'Overload %', unit: '%' },
                        { id: 'ob-underload-pct', name: 'Underload %', unit: '%' },
                        { id: 'ob-10-10-20', name: '10/10/20 Compliance', unit: '%' },
                      ]
                    },
                    {
                      id: 'ob-haul-analysis',
                      name: 'Haul Road Analysis',
                      children: [
                        { id: 'ob-haul-grade', name: 'Average Grade', unit: '%' },
                        { id: 'ob-rolling-resist', name: 'Rolling Resistance', unit: '%' },
                        { id: 'ob-road-condition', name: 'Road Condition Score', unit: '1-5' },
                        { id: 'ob-speed-loaded', name: 'Speed Loaded', unit: 'km/hr' },
                        { id: 'ob-speed-empty', name: 'Speed Empty', unit: 'km/hr' },
                        { id: 'ob-rimpull', name: 'Rimpull Utilization', unit: '%' },
                      ]
                    },
                  ]
                },
                {
                  id: 'ob-fleet-efficiency',
                  name: 'Fleet Efficiency',
                  children: [
                    { id: 'ob-match-factor-actual', name: 'Actual Match Factor', unit: 'ratio' },
                    { id: 'ob-bunching-index', name: 'Bunching Index', unit: '%' },
                    { id: 'ob-dispatch-eff', name: 'Dispatch Efficiency', unit: '%' },
                    { id: 'ob-empty-haul-pct', name: 'Empty Haul %', unit: '%' },
                    { id: 'ob-double-handle', name: 'Double Handling', unit: '%' },
                    { id: 'ob-rehandle-pct', name: 'Rehandle %', unit: '%' },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
    {
      id: 'volume-coal',
      name: 'Target Volume - Coal',
      icon: Zap,
      unit: 'Tons',
      children: [
        {
          id: 'coal-production-formula',
          name: 'Production = Fleet × PA × UA × Productivity',
          icon: Target,
          children: [
            {
              id: 'coal-fleet',
              name: 'Coal Fleet Configuration',
              icon: Truck,
              children: [
                {
                  id: 'coal-loading-fleet',
                  name: 'Coal Loading Fleet',
                  children: [
                    { id: 'coal-exc-count', name: 'Excavator Count', unit: 'units' },
                    { id: 'coal-exc-class', name: 'Excavator Class', unit: 'PC1250/PC2000' },
                    { id: 'coal-bucket-cap', name: 'Bucket Capacity', unit: 'm³' },
                  ]
                },
                {
                  id: 'coal-hauling-fleet',
                  name: 'Coal Hauling Fleet',
                  children: [
                    { id: 'coal-truck-count', name: 'Coal Truck Count', unit: 'units' },
                    { id: 'coal-truck-class', name: 'Truck Class', unit: 'ADT/Rigid' },
                    { id: 'coal-truck-payload', name: 'Payload', unit: 'tons' },
                  ]
                },
                {
                  id: 'coal-support-fleet',
                  name: 'Support Equipment',
                  children: [
                    { id: 'coal-dozer', name: 'Coal Dozers', unit: 'units' },
                    { id: 'coal-grader', name: 'Graders', unit: 'units' },
                    { id: 'coal-compactor', name: 'Compactors (Stockpile)', unit: 'units' },
                  ]
                },
              ]
            },
            {
              id: 'coal-pa',
              name: 'Physical Availability (PA)',
              icon: Wrench,
              unit: '%',
              children: [
                { id: 'coal-mtbf', name: 'MTBF', unit: 'hours' },
                { id: 'coal-mttr', name: 'MTTR', unit: 'hours' },
                { id: 'coal-pm-compliance', name: 'PM Compliance', unit: '%' },
                { id: 'coal-parts-avail', name: 'Parts Availability', unit: '%' },
              ]
            },
            {
              id: 'coal-ua',
              name: 'Utilization (UA)',
              icon: Clock,
              unit: '%',
              children: [
                { id: 'coal-scheduled-hrs', name: 'Scheduled Hours', unit: 'hours' },
                { id: 'coal-operating-hrs', name: 'Operating Hours', unit: 'hours' },
                {
                  id: 'coal-delays',
                  name: 'Delay Analysis',
                  children: [
                    { id: 'coal-weather-delay', name: 'Weather Delays', unit: 'hours' },
                    { id: 'coal-stockpile-full', name: 'Stockpile Full', unit: 'hours' },
                    { id: 'coal-barging-delay', name: 'Barging/Shipping Delay', unit: 'hours' },
                    { id: 'coal-quality-hold', name: 'Quality Hold', unit: 'hours' },
                  ]
                },
              ]
            },
            {
              id: 'coal-productivity',
              name: 'Coal Productivity',
              icon: Gauge,
              children: [
                {
                  id: 'coal-exc-prod',
                  name: 'Excavator Productivity',
                  unit: 'Tons/hr',
                  children: [
                    { id: 'coal-bucket', name: 'Bucket Capacity', unit: 'm³' },
                    { id: 'coal-fill', name: 'Fill Factor', unit: '%' },
                    { id: 'coal-density', name: 'Coal Density', unit: 'tons/m³' },
                    { id: 'coal-cycle', name: 'Cycle Time', unit: 'seconds' },
                    { id: 'coal-seam-thick', name: 'Seam Thickness', unit: 'm' },
                  ]
                },
                {
                  id: 'coal-truck-prod',
                  name: 'Truck Productivity',
                  unit: 'Tons/hr',
                  children: [
                    { id: 'coal-truck-payload', name: 'Payload', unit: 'tons' },
                    { id: 'coal-truck-cycle', name: 'Cycle Time', unit: 'minutes' },
                    { id: 'coal-haul-dist', name: 'Haul to Stockpile', unit: 'km' },
                  ]
                },
              ]
            },
          ]
        },
        {
          id: 'coal-quality',
          name: 'Coal Quality & Recovery',
          children: [
            {
              id: 'coal-mining-metrics',
              name: 'Mining Metrics',
              children: [
                { id: 'coal-sr', name: 'Strip Ratio (SR)', unit: 'BCM:Ton' },
                { id: 'coal-recovery', name: 'Coal Recovery Rate', unit: '%' },
                { id: 'coal-dilution', name: 'Dilution', unit: '%' },
                { id: 'coal-loss', name: 'Coal Loss', unit: '%' },
              ]
            },
            {
              id: 'coal-quality-metrics',
              name: 'Quality Metrics',
              children: [
                { id: 'coal-cv-gar', name: 'CV (GAR)', unit: 'kcal/kg' },
                { id: 'coal-cv-adb', name: 'CV (ADB)', unit: 'kcal/kg' },
                { id: 'coal-tm', name: 'Total Moisture', unit: '%' },
                { id: 'coal-im', name: 'Inherent Moisture', unit: '%' },
                { id: 'coal-ash', name: 'Ash Content', unit: '%' },
                { id: 'coal-sulfur', name: 'Sulfur Content', unit: '%' },
              ]
            },
          ]
        },
      ]
    },
    {
      id: 'drill-blast',
      name: 'Drill & Blast Performance',
      icon: Mountain,
      children: [
        {
          id: 'drilling',
          name: 'Drilling',
          children: [
            { id: 'drill-meters', name: 'Drilled Meters', unit: 'm/month' },
            { id: 'drill-rate', name: 'Penetration Rate', unit: 'm/hr' },
            { id: 'drill-pattern', name: 'Pattern (Burden × Spacing)', unit: 'm × m' },
            { id: 'drill-depth', name: 'Hole Depth', unit: 'm' },
            { id: 'drill-availability', name: 'Drill Availability', unit: '%' },
          ]
        },
        {
          id: 'blasting',
          name: 'Blasting',
          children: [
            { id: 'powder-factor', name: 'Powder Factor', unit: 'kg/BCM' },
            { id: 'fragmentation', name: 'Fragmentation P80', unit: 'cm' },
            { id: 'blast-bcm', name: 'BCM per Blast', unit: 'BCM' },
            { id: 'blast-frequency', name: 'Blast Frequency', unit: 'blasts/week' },
            { id: 'dig-rate-post', name: 'Post-Blast Dig Rate', unit: 'BCM/hr' },
            { id: 'explosive-cost', name: 'Explosive Cost', unit: '$/BCM' },
          ]
        },
      ]
    },
    {
      id: 'road-infra',
      name: 'Road & Infrastructure',
      icon: Route,
      children: [
        {
          id: 'haul-road',
          name: 'Haul Road Management',
          children: [
            { id: 'road-length', name: 'Total Road Length', unit: 'km' },
            { id: 'road-width', name: 'Road Width', unit: 'm' },
            { id: 'road-grade-max', name: 'Maximum Grade', unit: '%' },
            { id: 'road-condition-avg', name: 'Average Condition Score', unit: '1-5' },
            { id: 'road-maint-freq', name: 'Maintenance Frequency', unit: 'days' },
            { id: 'pothole-count', name: 'Pothole Count', unit: 'count/km' },
          ]
        },
        {
          id: 'water-suppress',
          name: 'Dust Suppression',
          children: [
            { id: 'water-truck-coverage', name: 'Water Truck Coverage', unit: '%' },
            { id: 'water-consumption', name: 'Water Consumption', unit: 'kL/day' },
            { id: 'dust-level', name: 'Dust Level', unit: 'mg/m³' },
          ]
        },
        {
          id: 'dewatering',
          name: 'Dewatering',
          children: [
            { id: 'pump-capacity', name: 'Pump Capacity', unit: 'm³/hr' },
            { id: 'water-inflow', name: 'Water Inflow', unit: 'm³/day' },
            { id: 'sump-level', name: 'Sump Level', unit: 'm' },
            { id: 'pump-availability', name: 'Pump Availability', unit: '%' },
          ]
        },
      ]
    },
    {
      id: 'safety',
      name: 'Safety & Compliance',
      icon: Shield,
      children: [
        {
          id: 'safety-metrics',
          name: 'Safety Metrics',
          children: [
            { id: 'trir', name: 'TRIR', unit: 'per 200k hrs' },
            { id: 'ltifr', name: 'LTIFR', unit: 'per 1M hrs' },
            { id: 'fatality', name: 'Fatalities', unit: 'count' },
            { id: 'near-miss', name: 'Near Miss Frequency', unit: 'per month' },
            { id: 'first-aid', name: 'First Aid Cases', unit: 'count' },
            { id: 'mtc', name: 'Medical Treatment Cases', unit: 'count' },
          ]
        },
        {
          id: 'compliance',
          name: 'Compliance',
          children: [
            { id: 'training-compliance', name: 'Training Compliance', unit: '%' },
            { id: 'permit-compliance', name: 'Permit to Work Compliance', unit: '%' },
            { id: 'hazard-report', name: 'Hazard Reports', unit: 'count/month' },
            { id: 'audit-score', name: 'Safety Audit Score', unit: '%' },
          ]
        },
        {
          id: 'fatigue',
          name: 'Fatigue Management',
          children: [
            { id: 'fatigue-events', name: 'Fatigue Events', unit: 'count' },
            { id: 'hours-worked', name: 'Avg Hours Worked', unit: 'hrs/week' },
            { id: 'roster-compliance', name: 'Roster Compliance', unit: '%' },
          ]
        },
      ]
    },
    {
      id: 'people',
      name: 'People & Workforce',
      icon: Users,
      children: [
        {
          id: 'workforce-metrics',
          name: 'Workforce Metrics',
          children: [
            { id: 'total-headcount', name: 'Total Headcount', unit: 'FTE' },
            { id: 'turnover', name: 'Turnover Rate', unit: '%' },
            { id: 'absenteeism', name: 'Absenteeism Rate', unit: '%' },
            { id: 'operator-ratio', name: 'Operator per Equipment', unit: 'ratio' },
          ]
        },
        {
          id: 'operator-perf',
          name: 'Operator Performance',
          children: [
            { id: 'operator-productivity', name: 'Productivity by Operator', unit: 'BCM/hr' },
            { id: 'operator-fuel', name: 'Fuel Efficiency by Operator', unit: 'L/BCM' },
            { id: 'operator-payload', name: 'Payload Accuracy', unit: '%' },
            { id: 'operator-cycle', name: 'Cycle Time Variance', unit: '%' },
            { id: 'skill-matrix', name: 'Skill Matrix Completion', unit: '%' },
          ]
        },
        {
          id: 'training',
          name: 'Training & Development',
          children: [
            { id: 'training-hrs', name: 'Training Hours', unit: 'hrs/person' },
            { id: 'cert-compliance', name: 'Certification Compliance', unit: '%' },
            { id: 'sim-training', name: 'Simulator Training Hours', unit: 'hours' },
          ]
        },
      ]
    },
  ];

  const activeData = activeView === 'financial' ? financialKPIs : operationalKPIs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-slate-800 mb-1">
            Open Cut Coal Mining Contractor - KPI Tree
          </h1>
          <p className="text-slate-600 text-xs mb-3">
            Complete hierarchy from top-level financial KPIs to granular operational drivers
          </p>
          
          {/* View Toggle */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button 
              onClick={() => setActiveView('financial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'financial' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              💰 Financial View
            </button>
            <button 
              onClick={() => setActiveView('operational')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'operational' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              ⚙️ Operational View
            </button>
            <div className="flex-1" />
            <button 
              onClick={expandAll}
              className="px-3 py-1.5 bg-slate-700 text-white rounded-lg text-xs hover:bg-slate-800 transition-colors"
            >
              Expand All
            </button>
            <button 
              onClick={collapseAll}
              className="px-3 py-1.5 bg-slate-500 text-white rounded-lg text-xs hover:bg-slate-600 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-200 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {activeData.map((node) => (
              <TreeNode 
                key={node.id} 
                node={node} 
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
          <h2 className="font-bold text-slate-800 mb-2 text-sm">Legend</h2>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-slate-800"></div>
              <span>L1</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-700"></div>
              <span>L2</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-emerald-600"></div>
              <span>L3</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber-500"></div>
              <span>L4</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-orange-400"></div>
              <span>L5</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-slate-300"></div>
              <span>L6</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-slate-200"></div>
              <span>L7</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-slate-500 space-y-1">
          <p><strong>Volume Formula:</strong> BCM/Tons = Fleet Count × PA × UA × Productivity</p>
          <p><strong>Financial Links:</strong> EBITDA = Revenue - OPEX | FCF = EBITDA - CAPEX - ΔWC - Tax | ROIC = NOPAT / Invested Capital</p>
          <p><strong>Truck Productivity:</strong> BCM/hr = (Payload / Swell Factor) × (60 / Cycle Time)</p>
        </div>
      </div>
    </div>
  );
}
