import { Cell, Pie, PieChart } from "recharts";
import Widget from "@/components/Widget";
import millify from "millify";

const COLORS = ["#AF71B0", "#7189B0", "#71B098", "#B0A271", "#B07171"];

type Props = {
    data: any[];
};

const UserDistribution = ({ data }: Props) => {
    const chartData = data.map((item) => ({
        name: item.purpose.name.replace("_", " "),
        value: parseFloat(item.total_amount),
    }));

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const getPercentage = (value: number) => {
        if (total === 0) return 0;
        return ((value / total) * 100).toFixed(0);
    };

    return (
        <Widget
            className="shrink-0 w-108 max-4xl:w-88 max-2xl:w-70 max-lg:w-full"
            title="Donations by Project"
        >
            <div className="p-5">
                <div className="relative">
                    <PieChart
                        className="!size-46 mx-auto"
                        width={184}
                        height={184}
                    >
                        <Pie
                            data={chartData}
                            cx={86}
                            cy={86}
                            innerRadius={62}
                            outerRadius={91}
                            fill="#8884d8"
                            paddingAngle={1}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-h6 text-center">
                        <div className="text-gray-400 text-body-xs uppercase font-bold">Total</div>
                        <div className="text-body-sm font-bold">${millify(total)}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-1.5">
                    {chartData.length > 0 ? (
                        chartData.map((item, index) => (
                            <div
                                className="flex items-center gap-3 py-3 not-last:border-b border-gray-100 font-medium capitalize"
                                key={index}
                            >
                                <div
                                    className="shrink-0 size-2.5 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <div className="text-body-sm truncate">{item.name}</div>
                                <div className="ml-auto text-body-sm">
                                    {getPercentage(item.value)}%
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-gray-400 text-body-sm">
                            No project data available
                        </div>
                    )}
                </div>
            </div>
        </Widget>
    );
};

export default UserDistribution;
