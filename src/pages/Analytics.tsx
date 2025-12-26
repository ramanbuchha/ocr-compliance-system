import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsCard } from "@/components/stats/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

// Mock data for charts
const processingData = [
  { date: "Jan 1", processed: 120, compliant: 115, failed: 5 },
  { date: "Jan 5", processed: 145, compliant: 138, failed: 7 },
  { date: "Jan 10", processed: 189, compliant: 180, failed: 9 },
  { date: "Jan 15", processed: 210, compliant: 198, failed: 12 },
  { date: "Jan 20", processed: 178, compliant: 170, failed: 8 },
  { date: "Jan 25", processed: 256, compliant: 248, failed: 8 },
];

const languageData = [
  { name: "English", value: 45, color: "hsl(174, 72%, 40%)" },
  { name: "Hindi", value: 25, color: "hsl(190, 75%, 45%)" },
  { name: "Bengali", value: 12, color: "hsl(200, 70%, 50%)" },
  { name: "Tamil", value: 10, color: "hsl(210, 65%, 55%)" },
  { name: "Others", value: 8, color: "hsl(220, 60%, 60%)" },
];

const categoryData = [
  { category: "Warning", count: 45 },
  { category: "Storage", count: 32 },
  { category: "Safety", count: 28 },
  { category: "Legal", count: 22 },
  { category: "Health", count: 18 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor compliance metrics and processing statistics.
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              icon={FileText} 
              label="Total Processed" 
              value="12,847"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard 
              icon={CheckCircle} 
              label="Compliance Rate" 
              value="98.2%"
              trend={{ value: 3, isPositive: true }}
            />
            <StatsCard 
              icon={Clock} 
              label="Avg. Process Time" 
              value="1.2s"
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard 
              icon={TrendingUp} 
              label="Active Rules" 
              value="156"
            />
          </div>
          
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Processing Trend */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Processing Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={processingData}>
                      <defs>
                        <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCompliant" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" className="text-muted-foreground text-xs" />
                      <YAxis className="text-muted-foreground text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="processed" 
                        stroke="hsl(174, 72%, 40%)" 
                        fillOpacity={1} 
                        fill="url(#colorProcessed)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="compliant" 
                        stroke="hsl(152, 69%, 40%)" 
                        fillOpacity={1} 
                        fill="url(#colorCompliant)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Language Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {languageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Rules by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Rules by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" className="text-muted-foreground text-xs" />
                      <YAxis 
                        dataKey="category" 
                        type="category" 
                        className="text-muted-foreground text-xs"
                        width={80}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(174, 72%, 40%)" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
