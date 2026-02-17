import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Widget from "@/components/Widget";
import Percentage from "@/components/Percentage";

const durationOptions = [
    { id: 1, name: "Month" },
    { id: 2, name: "Week" },
    { id: 3, name: "Day" },
];

const legend = [
    { label: "Donations", color: "#AF71B0" },
    { label: "Book Sales", color: "#DFE1E7" },
];

type Props = {
    data: any[];
    total: number;
};

const TicketSalesAnalytics = ({ data, total }: Props) => {
    const [duration, setDuration] = useState(durationOptions[0]);

    const chartData = data.map((item) => ({
        name: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
        donations: item.donations,
        book_sales: item.book_sales,
    }));

    const CustomTooltip = ({
        active,
        payload,
        label,
    }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip min-w-44">
                    <div className="mb-2 font-semibold text-gray-900">{label}</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-2">
                            <div className="font-medium text-gray-400">
                                Donations
                            </div>
                            <div className="font-semibold text-[#AF71B0]">
                                ${payload[0].value}
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <div className="font-medium text-gray-400">
                                Book Sales
                            </div>
                            <div className="font-semibold text-gray-900">
                                ${payload[1].value}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Widget
            className="grow"
            title="Income Over Time"
            selectOptions={durationOptions}
            selectValue={duration}
            selectOnChange={setDuration}
        >
            <div className="flex items-end px-5 py-3 max-md:block">
                <div className="flex items-center">
                    <div className="text-h4">${total.toLocaleString()}</div>
                    <Percentage className="ml-2" value={0} isSimple />
                    <div className="ml-1.5 text-gray-500 capitalize">
                        Last updated: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                </div>
                <div className="flex gap-3 ml-auto max-md:mt-2">
                    {legend.map((item, index) => (
                        <div
                            className="flex items-center gap-1.5 text-gray-500"
                            key={index}
                        >
                            <div
                                className="size-2 rounded-xs"
                                style={{ backgroundColor: item.color }}
                            />
                            <div className="">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-79.5 pr-5 pb-4 max-md:-ml-1.5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        barGap={5}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="5 5"
                            stroke="#DFE1E7"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: "0.875rem",
                                fill: "#818898",
                            }}
                            height={32}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: "0.875rem",
                                fill: "#818898",
                            }}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "#f6f8fa" }}
                        />
                        <Bar
                            dataKey="donations"
                            fill="#AF71B0"
                            barSize={10}
                            radius={5}
                        />
                        <Bar
                            dataKey="book_sales"
                            fill="#DFE1E7"
                            barSize={10}
                            radius={5}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    );
};

export default TicketSalesAnalytics;
