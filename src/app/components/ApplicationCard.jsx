import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const statusColors = {
  applied: "bg-blue-100 text-blue-700 border border-blue-200",
  interview: "bg-amber-100 text-amber-700 border border-amber-200",
  offer: "bg-green-100 text-green-700 border border-green-200",
  rejected: "bg-red-100 text-red-700 border border-red-200",
};

const ApplicationCard = ({ company, title, statusText, detailText, status, children }) => {
  return (
    <Card className="rounded-xl border shadow-sm p-5 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
      
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {company}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {title}
        </CardDescription>
      </CardHeader>

      <div
        className={`inline-block text-xs px-3 py-1 rounded-full capitalize mb-4 font-medium ${statusColors[status]}`}
      >
        {statusText}
      </div>

      {detailText && (
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">{detailText}</p>
      )}

      <CardContent className="p-0 flex justify-end gap-2">
        {children}
      </CardContent>

    </Card>
  );
};

export default ApplicationCard;
