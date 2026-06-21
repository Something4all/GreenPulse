import { FootprintProgress, CommitLog } from '../types';
import { motion } from 'motion/react';
import { 
  Flame, 
  Award, 
  TrendingDown, 
  Heart, 
  DollarSign, 
  Clock, 
  Compass, 
  Zap, 
  PartyPopper,
  BookmarkCheck,
  BarChart2,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  CartesianGrid,
  Legend
} from 'recharts';

interface ProgressUIProps {
  progress: FootprintProgress;
  commits: CommitLog[];
  categoryBreakdown: Record<string, number>;
}

export default function ProgressUI({ progress, commits, categoryBreakdown }: ProgressUIProps) {
  // Compute co-benefit summaries
  let totalCash = 0;
  let healthyMeals = 0;
  let activeMinutes = 0;
  let mindfulnessCount = 0;

  commits.forEach(c => {
    if (c.coBenefitType === 'money') {
      // Parse numerical savings from e.g. "$18.50 saved" or "$5.50 saved"
      const match = c.coBenefitValue.match(/[\d.]+/);
      if (match) totalCash += parseFloat(match[0]);
    } else if (c.coBenefitType === 'health') {
      healthyMeals += 1;
    } else if (c.coBenefitType === 'time') {
      const match = c.coBenefitValue.match(/\d+/);
      if (match) activeMinutes += parseInt(match[0]);
    } else if (c.coBenefitType === 'mindfulness') {
       mindfulnessCount += 1;
    }
  });

  // Calculate projected run rate (baseline minus annualized savings from commitments)
  // Each commit is assumed to be a daily choice. If practiced regularly,
  // 1 kg CO2 saved per day equals 0.365 metric tons saved per year.
  const annualSavingsFromCommits = (progress.totalSavedKg * 365) / 1000;
  const projectedRunRate = Math.max(0.5, progress.baseline - annualSavingsFromCommits);

  // 1. Runway comparison data (Recharts Bar Chart)
  const runwayChartData = [
    {
      name: 'Initial Baseline',
      value: Number(progress.baseline.toFixed(1)),
      fill: '#1E293B', // Slate
    },
    {
      name: 'Current Run-rate',
      value: Number(projectedRunRate.toFixed(1)),
      fill: '#10B981', // Emerald
    },
    {
      name: 'UN Target Path',
      value: 2.0,
      fill: '#EA580C', // Amber-Orange
    }
  ];

  // 2. Category emission share (Pie Chart)
  const categoryNames: Record<string, string> = {
    commute: 'Commuting',
    diet: 'Dietary Choices',
    home: 'Home Energy',
    shopping: 'Consumer Goods',
    travel: 'Aviation Habits'
  };

  const categoryPieData = Object.entries(categoryBreakdown || {}).map(([key, value]) => ({
    name: categoryNames[key] || key,
    value: Number(value.toFixed(1)),
  }));

  const PIE_COLORS = ['#10B981', '#1E293B', '#EA580C', '#3B82F6', '#8B5CF6'];

  // 3. Savings accumulation timeline (Area Chart)
  const chronCommits = [...commits].reverse();
  let cumulativeSum = 0;
  const rawTimeline = chronCommits.map((c) => {
    cumulativeSum += c.co2Saved;
    return {
      dateStr: new Date(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      co2Saved: Number(cumulativeSum.toFixed(2)),
      nudge: c.nudgeTitle
    };
  });

  const isDemo = rawTimeline.length === 0;
  const timelineData = isDemo 
    ? [
        { dateStr: 'Warmup', co2Saved: 0, nudge: 'Init' },
        { dateStr: 'Day 2 Proj', co2Saved: 1.5, nudge: 'Eco Seedling' },
        { dateStr: 'Day 4 Proj', co2Saved: 4.8, nudge: 'Green Sprout' },
        { dateStr: 'Day 6 Proj', co2Saved: 8.2, nudge: 'Habit Oak' },
        { dateStr: 'Day 8 Proj', co2Saved: 12.0, nudge: 'Progress' },
        { dateStr: 'Day 10 Proj', co2Saved: 15.6, nudge: '巴黎 Alignment' },
      ]
    : rawTimeline;

  const getMilestoneLevel = (streak: number) => {
    if (streak === 0) return { title: 'Budding Citizen', color: 'text-brand-muted bg-brand-light border border-brand-border' };
    if (streak < 3) return { title: 'Eco Seedling', color: 'text-brand-green bg-brand-light border border-brand-border' };
    if (streak < 7) return { title: 'Green Sprout', color: 'text-brand-green bg-brand-extralight border border-brand-border/60' };
    if (streak < 14) return { title: 'Habit Oak Tree', color: 'text-white bg-brand-green border border-brand-green animate-pulse' };
    return { title: 'Redwood Forest Guardian', color: 'text-white bg-brand-dark border border-brand-dark' };
  };

  const currentLevelInfo = getMilestoneLevel(progress.streak);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 14 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 90, 
        damping: 13 
      } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Overview Cards Row */}
      <motion.div variants={cardVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div id="metric-streak" className="bg-white border border-brand-border rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-brand-green transition-colors">
          <div className="p-3.5 bg-brand-light text-brand-orange rounded-xl border border-brand-border/30">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle">Current Streak</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-brand-dark">{progress.streak}</span>
              <span className="text-xs text-brand-muted font-medium">days committed</span>
            </div>
            <span className={`inline-block text-[10px] px-2.5 py-1 font-bold rounded-full mt-1.5 ${currentLevelInfo.color}`}>
              {currentLevelInfo.title}
            </span>
          </div>
        </div>

        <div id="metric-savings" className="bg-white border border-brand-border rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-brand-green transition-colors">
          <div className="p-3.5 bg-brand-light text-brand-green rounded-xl border border-brand-border/30">
            <TrendingDown className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle">Total Averted CO₂</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-brand-green">{progress.totalSavedKg.toFixed(1)}</span>
              <span className="text-xs text-brand-green font-bold">kg CO₂</span>
            </div>
            <p className="text-[10px] text-brand-muted mt-1.5 leading-tight">
              Equivalent to planting {Math.max(1, Math.round(progress.totalSavedKg * 0.1))} sapling seedlings today.
            </p>
          </div>
        </div>

        <div id="metric-rewards" className="bg-white border border-brand-border rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-brand-green transition-colors">
          <div className="p-3.5 bg-brand-light text-brand-dark rounded-xl border border-brand-border/30">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-subtle">YTD Commits Logged</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-brand-dark">{commits.length}</span>
              <span className="text-xs text-brand-muted font-medium">completed actions</span>
            </div>
            <p className="text-[10px] text-brand-muted mt-1.5 leading-tight">
              Each choice strengthens automatic sustainable reflexes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Shame-Free Projection Benchmark Chart */}
      <motion.div variants={cardVariants} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">
          Shame-Free Carbon Improvement Footprint (Annual Target Runway)
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 pr-2">
            <p className="text-xs text-brand-muted leading-relaxed">
              Every committed daily micro-action decreases your projected annual runaway. Instead of focusing on historical errors or eco-anxiety, GreenPulse estimates your progress as a path towards optimized climate thresholds.
            </p>

            <div className="mt-4 p-4 bg-brand-light rounded-lg border border-brand-border">
              <div className="flex items-center gap-1.5 text-xs text-brand-green font-bold">
                <Zap className="w-4 h-4 text-brand-orange" />
                <span>Annualized savings pace:</span>
              </div>
              <p className="text-xs text-brand-dark font-black mt-1">
                {(annualSavingsFromCommits).toFixed(2)} metric tons avoided / year.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {/* Custom Visual Bar chart with grow animation */}
            <div>
              <div className="flex justify-between text-xs font-bold text-brand-subtle mb-1">
                <span>Quiz Established Baseline:</span>
                <span className="text-brand-dark font-black">{progress.baseline.toFixed(1)} t CO₂e/yr</span>
              </div>
              <div className="w-full bg-brand-light h-6 rounded-lg overflow-hidden relative border border-brand-border/30">
                <motion.div 
                  className="bg-brand-muted/30 h-full rounded-r" 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-[9px] font-extrabold text-brand-dark uppercase tracking-wider">
                  INITIAL baseline estimate
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-brand-subtle mb-1">
                <span>Projected run-rate based on active habits:</span>
                <span className="text-brand-green font-black">{projectedRunRate.toFixed(1)} t CO₂e/yr</span>
              </div>
              <div className="w-full bg-brand-light h-6 rounded-lg overflow-hidden relative border border-brand-border/30">
                <motion.div 
                  className="bg-brand-green h-full rounded-r" 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(25, (projectedRunRate / (progress.baseline || 1)) * 100))}%` }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.15 }}
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-[9px] font-extrabold text-white uppercase tracking-wider font-sans">
                  Your Current Run-Rate (-{progress.baseline ? ((progress.baseline - projectedRunRate)/progress.baseline * 100).toFixed(0) : 0}%)
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-brand-subtle mb-1">
                <span>UN Paris Agreement Target Path:</span>
                <span className="text-brand-dark font-black">2.0 t CO₂e/yr</span>
              </div>
              <div className="w-full bg-brand-light h-6 rounded-lg overflow-hidden relative border border-brand-border">
                <motion.div 
                  className="bg-gradient-to-r from-brand-light to-brand-extralight h-full rounded-r" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.baseline ? (2.0 / progress.baseline) * 100 : 100}%` }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-[9px] font-extrabold text-brand-muted uppercase tracking-wider">
                  UN Paris Target Match (Sustainable Corridor)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Graphing Suites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Runway Benchmark & Emission Shares */}
        <motion.div 
          variants={cardVariants}
          id="recharts-runway-comparison" 
          className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-brand-green/30 transition-colors"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 text-brand-dark mb-1">
              <BarChart2 className="w-4 h-4 text-brand-green" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Runway Benchmarks (t CO₂e/yr)
              </h3>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Comparison between estimated baseline, live performance based on registered habit commitments, and the United Nations climate targets.
            </p>
          </div>

          <div className="h-60 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={runwayChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(224, 242, 254, 0.4)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-brand-border p-2.5 rounded-lg shadow-sm text-xs">
                          <p className="font-extrabold text-brand-dark">{payload[0].name}</p>
                          <p className="font-semibold text-brand-green mt-0.5">{payload[0].value} t CO₂e/yr</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {runwayChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Card 2: Baseline Emission Breakdown */}
        <motion.div 
          variants={cardVariants}
          id="recharts-source-breakdown" 
          className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-brand-green/30 transition-colors"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 text-brand-dark mb-1">
              <PieIcon className="w-4 h-4 text-brand-orange" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Baseline Emission Sources Share
              </h3>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Calculated proportion of carbon contributors loaded during baseline questionnaire setup. Helps prioritize action spheres.
            </p>
          </div>

          {categoryPieData.length > 0 ? (
            <div className="h-60 w-full mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                      isAnimationActive={true}
                      animationDuration={1500}
                    >
                      {categoryPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-brand-border p-2 rounded-md shadow-sm text-xs">
                              <p className="font-bold text-brand-dark">{payload[0].name}</p>
                              <p className="text-brand-green font-semibold mt-0.5">{payload[0].value} t CO₂e/yr</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full sm:w-1/2 space-y-1.5 self-center">
                {categoryPieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} 
                      />
                      <span className="text-brand-muted font-medium truncate max-w-[110px]">{entry.name}</span>
                    </div>
                    <span className="font-bold text-brand-dark whitespace-nowrap">{entry.value.toFixed(1)} t</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center border border-dashed border-brand-border rounded-xl">
              <span className="text-xs text-brand-subtle">No survey metadata loaded</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card 3: Continuous savings timeline */}
      <motion.div 
        variants={cardVariants}
        id="recharts-savings-timeline" 
        className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:border-brand-green/30 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-dark mb-1">
              <Activity className="w-4 h-4 text-brand-green" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Cumulative Carbon Prevented Timeline (kg CO₂)
              </h3>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              {isDemo 
                ? 'Demonstration Pathway: How your active commits accumulate savings coefficients over sequential days.' 
                : 'Real-time track: Cumulative averted kilograms of carbon dioxide resulting from committed daily nudges.'}
            </p>
          </div>

          {isDemo && (
            <span className="inline-block text-[9px] bg-brand-orange/15 text-brand-orange border border-brand-orange/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start sm:self-auto">
              Simulated Forecast Track
            </span>
          )}
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="dateStr" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-brand-border p-2.5 rounded-lg shadow-sm text-xs">
                        <p className="text-brand-subtle text-[10px] uppercase font-bold">{data.dateStr}</p>
                        <p className="font-extrabold text-brand-dark mt-0.5">Cumulative Saved: <span className="text-brand-green">{data.co2Saved} kg</span></p>
                        {data.nudge && <p className="text-[10px] text-brand-muted mt-1 font-mono italic">"{data.nudge}"</p>}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="co2Saved" 
                stroke="#10B981" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorCo2)" 
                isAnimationActive={true}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Tangible Co-Benefits (Health, Money, Time) Cumulative Showcase */}
      <motion.div variants={cardVariants} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">
          Your Cumulative Co-Benefit Reward Locker
        </h3>
        <p className="text-xs text-brand-muted mb-5 leading-relaxed">
          We track the concrete side benefits of your sustainability choices. These represent real health boost, spare money, and stress-free minutes gained.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-brand-light/35 border border-brand-border rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-brand-light text-brand-green rounded-lg border border-brand-border/30"><DollarSign className="w-4 h-4 text-brand-orange" /></div>
              <span className="text-xs font-bold text-brand-dark">Total Money Freed</span>
            </div>
            <div>
              <span className="text-2xl font-black text-brand-dark block">${totalCash.toFixed(2)}</span>
              <span className="text-[10px] text-brand-muted mt-1 block">Redirected away from unnecessary waste</span>
            </div>
          </div>

          <div className="p-4 bg-brand-light/35 border border-brand-border rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-brand-light text-brand-green rounded-lg border border-brand-border/30"><Heart className="w-4 h-4 text-brand-green" /></div>
              <span className="text-xs font-bold text-brand-dark">Plant Meals Enjoyed</span>
            </div>
            <div>
              <span className="text-2xl font-black text-brand-dark block">{healthyMeals} portions</span>
              <span className="text-[10px] text-brand-muted mt-1 block">High fiber, low systemic cholesterol</span>
            </div>
          </div>

          <div className="p-4 bg-brand-light/35 border border-brand-border rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-brand-light text-brand-green rounded-lg border border-brand-border/30"><Clock className="w-4 h-4 text-brand-dark" /></div>
              <span className="text-xs font-bold text-brand-dark">Hands-Free Time Gain</span>
            </div>
            <div>
              <span className="text-2xl font-black text-brand-dark block">{activeMinutes} mins</span>
              <span className="text-[10px] text-brand-muted mt-1 block">Minutes reclaimed for focus & reading</span>
            </div>
          </div>

          <div className="p-4 bg-brand-light/35 border border-brand-border rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-brand-light text-brand-green rounded-lg border border-brand-border/30"><Compass className="w-4 h-4 text-brand-orange" /></div>
              <span className="text-xs font-bold text-brand-dark">Mindfulness Breathers</span>
            </div>
            <div>
              <span className="text-2xl font-black text-brand-dark block">{mindfulnessCount} days</span>
              <span className="text-[10px] text-brand-muted mt-1 block">Spent outdoor lowering cortisol</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gamification Achievements Section */}
      <motion.div variants={cardVariants} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-3">
          Unlocked Habit Milestones
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
          <div className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
            commits.length >= 1 ? 'bg-brand-light border-brand-green/30' : 'bg-brand-light/20 border-brand-border/40 opacity-50'
          }`}>
            <div className={`p-2 rounded-lg ${commits.length >= 1 ? 'bg-brand-green text-white shadow-sm' : 'bg-brand-light text-brand-subtle'}`}>
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-dark">First Spark</h4>
              <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">Agree to and record your first sustainable action.</p>
              {commits.length >= 1 && <span className="text-[10px] text-brand-green font-extrabold block mt-1.5">✓ Completed Goal</span>}
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
            progress.streak >= 3 ? 'bg-brand-light border-brand-green/30' : 'bg-brand-light/20 border-brand-border/40 opacity-50'
          }`}>
            <div className={`p-2 rounded-lg ${progress.streak >= 3 ? 'bg-brand-orange text-white shadow-sm' : 'bg-brand-light text-brand-subtle'}`}>
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-dark">Mighty Sprout Momentum</h4>
              <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">Maintain an active GreenPulse commitment streak of 3+ days.</p>
              {progress.streak >= 3 && <span className="text-[10px] text-brand-green font-extrabold block mt-1.5">✓ Completed Goal</span>}
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
            progress.totalSavedKg >= 10 ? 'bg-brand-light border-brand-green/30' : 'bg-brand-light/20 border-brand-border/40 opacity-50'
          }`}>
            <div className={`p-2 rounded-lg ${progress.totalSavedKg >= 10 ? 'bg-brand-green text-white shadow-sm' : 'bg-brand-light text-brand-subtle'}`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-dark">Ten-Pack Avenger</h4>
              <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">Avert a cumulative total of 10+ kilograms of carbon dioxide emission.</p>
              {progress.totalSavedKg >= 10 && <span className="text-[10px] text-brand-green font-extrabold block mt-1.5">✓ Completed Goal</span>}
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
            totalCash >= 25 ? 'bg-brand-light border-brand-green/30' : 'bg-brand-light/20 border-brand-border/40 opacity-50'
          }`}>
            <div className={`p-2 rounded-lg ${totalCash >= 25 ? 'bg-brand-dark text-white shadow-sm' : 'bg-brand-light text-brand-subtle'}`}>
              <PartyPopper className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-dark">Wallet Saver</h4>
              <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">Achieve a cumulative cash side savings of over $25.00 through nudges.</p>
              {totalCash >= 25 && <span className="text-[10px] text-brand-green font-extrabold block mt-1.5">✓ Completed Goal</span>}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
