"use client";
import { useMemo, useState } from "react";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    FunnelChart,
    Funnel,
    LabelList,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    getApplicationsData,
    getFunnelData,
    getStatusDistribution,
} from "./utils/analytics.helpers";

const TIME_RANGES = {
    week: 7,
    month: 30,
    year: 365,
};

const COLORS = {
    Applied: "#3b82f6",
    Interview: "#f59e0b",
    Offer: "#22c55e",
    Rejected: "#ef4444",
};

const AnalyticsComponent = ({ data }) => {
    const [timeRange, setTimeRange] = useState("week");

    const startDate = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() - TIME_RANGES[timeRange]);
        return d;
    }, [timeRange]);

    const filteredData = useMemo(() => {
        return data.filter((app) => new Date(app.appliedAt) >= startDate);
    }, [data, startDate]);

    const applicationsData = useMemo(
        () => getApplicationsData(filteredData),
        [filteredData]
    );

    const distributionData = useMemo(
        () => getStatusDistribution(filteredData),
        [filteredData]
    );

    const funnelData = useMemo(
        () => getFunnelData(filteredData),
        [filteredData]
    );

    if (data.length <= 0) {
        return (
            <div className="flex justify-center py-10 text-gray-500">
                Loading Data...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Analytics Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Insights into your job application progress
                    </p>
                </div>

                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-48 bg-white dark:bg-neutral-900 shadow-sm border">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="week">Last 7 days</SelectItem>
                        <SelectItem value="month">Last 30 days</SelectItem>
                        <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold mb-1">Application Funnel</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    How far your applications progress in the pipeline
                </p>

                <ResponsiveContainer width="100%" height={320}>
                    <FunnelChart>
                        <Tooltip />
                        <Funnel dataKey="count" data={funnelData}>
                            <LabelList position="right" dataKey="stage" />
                        </Funnel>
                    </FunnelChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg font-semibold mb-1">
                        Applications Over Time
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Activity during the selected period
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={applicationsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg font-semibold mb-1">Status Distribution</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Current snapshot of your application pipeline
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={distributionData}
                                dataKey="percentage"
                                nameKey="status"
                                outerRadius={100}
                                label={({ percentage }) => `${percentage}%`}
                            >
                                {distributionData.map((entry) => (
                                    <Cell key={entry.status} fill={COLORS[entry.status]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name, props) => [
                                    `${props.payload.count} (${value}%)`,
                                    name,
                                ]}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsComponent;
