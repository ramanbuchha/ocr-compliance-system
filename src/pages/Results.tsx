import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComplianceResultCard, ComplianceStatus } from "@/components/results/ComplianceResultCard";
import { StatsCard } from "@/components/stats/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText
} from "lucide-react";

// Mock data for demonstration
const mockResults: Array<{
  id: string;
  imageName: string;
  imageUrl: string;
  status: ComplianceStatus;
  extractedText: string;
  matchedRules: number;
  totalRules: number;
  timestamp: string;
}> = [
  {
    id: "1",
    imageName: "label_product_001.jpg",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
    status: "pass",
    extractedText: "SCHEDULE H DRUG - TO BE SOLD BY RETAIL ON THE PRESCRIPTION OF A REGISTERED MEDICAL PRACTITIONER ONLY",
    matchedRules: 5,
    totalRules: 5,
    timestamp: "2025-01-15 14:32:00",
  },
  {
    id: "2",
    imageName: "packaging_batch_042.png",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop",
    status: "fail",
    extractedText: "Store in cool and dry place. Keep away from direct sunlight.",
    matchedRules: 2,
    totalRules: 5,
    timestamp: "2025-01-15 14:28:00",
  },
  {
    id: "3",
    imageName: "warning_label_en.jpg",
    imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&h=200&fit=crop",
    status: "warning",
    extractedText: "WARNING: This product contains nicotine. Nicotine is an addictive chemical.",
    matchedRules: 4,
    totalRules: 5,
    timestamp: "2025-01-15 14:15:00",
  },
  {
    id: "4",
    imageName: "hindi_label_003.png",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop",
    status: "pass",
    extractedText: "यह दवा केवल चिकित्सक के परामर्श से लें। बच्चों की पहुंच से दूर रखें।",
    matchedRules: 5,
    totalRules: 5,
    timestamp: "2025-01-15 13:58:00",
  },
  {
    id: "5",
    imageName: "product_batch_019.jpg",
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop",
    status: "fail",
    extractedText: "Mfg. Date: 01/2025 Exp. Date: 01/2027",
    matchedRules: 1,
    totalRules: 4,
    timestamp: "2025-01-15 13:45:00",
  },
];

const Results = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<ComplianceStatus | "all">("all");

  const filteredResults = mockResults.filter((result) => {
    const matchesSearch = result.imageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.extractedText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || result.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockResults.length,
    passed: mockResults.filter(r => r.status === "pass").length,
    failed: mockResults.filter(r => r.status === "fail").length,
    warnings: mockResults.filter(r => r.status === "warning").length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Compliance Results
            </h1>
            <p className="text-muted-foreground">
              Review and manage OCR processing results and compliance status.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              icon={FileText} 
              label="Total Processed" 
              value={stats.total}
            />
            <StatsCard 
              icon={CheckCircle} 
              label="Compliant" 
              value={stats.passed}
              className="border-success/30"
            />
            <StatsCard 
              icon={XCircle} 
              label="Non-Compliant" 
              value={stats.failed}
              className="border-destructive/30"
            />
            <StatsCard 
              icon={AlertTriangle} 
              label="Review Required" 
              value={stats.warnings}
              className="border-warning/30"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by filename or text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {(["all", "pass", "fail", "warning"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === "all" ? "All" : status === "pass" ? "Compliant" : status === "fail" ? "Failed" : "Warning"}
                </Button>
              ))}
            </div>
            
            <Button variant="outline" className="ml-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          {/* Results List */}
          <div className="space-y-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <ComplianceResultCard
                  key={result.id}
                  {...result}
                  onView={() => console.log("View result:", result.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-medium mb-1">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
