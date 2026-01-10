"use client";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AtsResults = ({ analysis }) => {
  return (
    <div className="space-y-8">
      <Card
        className={
          analysis.match_score >= 80
            ? "bg-green-50 border-green-200"
            : analysis.match_score >= 60
            ? "bg-yellow-50 border-yellow-200"
            : "bg-red-50 border-red-200"
        }
      >
        <CardHeader className="text-center">
          <div className="text-5xl font-bold">{analysis.match_score}%</div>
          <div className="text-sm text-gray-600">
            {analysis.analysis_type === "internship" ? "Internship" : "Job"} Match Score
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-green-700 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Strengths ({analysis.strengths.length})
            </h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {analysis.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full mt-2"></span>
                {s}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-amber-700 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-600" />
              Weaknesses ({analysis.weaknesses.length})
            </h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {analysis.weaknesses.map((w, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="h-2 w-2 bg-amber-500 rounded-full mt-2"></span>
                {w}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <h3 className="font-semibold text-blue-800">Recommendations</h3>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {analysis.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {rec}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AtsResults;
