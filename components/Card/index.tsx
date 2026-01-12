import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Percentage from "@/components/Percentage";
import Image from "@/components/Image";

type Props = {
    className?: string;
    item: {
        title: string;
        value: string;
        percentage: number;
        image: string;
        tooltip: string;
    };
};

const Card = ({ className, item }: Props) => {
    const isImagePath = item.image.startsWith("/") || item.image.startsWith("http");

    return (
        <div
            className={`p-4 border border-gray-100 rounded-2xl ${className || ""}`}
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex justify-center items-center size-10 border border-gray-100 rounded-[0.625rem]">
                    {isImagePath ? (
                        <Image
                            src={item.image}
                            width={20}
                            height={20}
                            alt={item.title}
                            className="!size-5 opacity-100"
                        />
                    ) : (
                        <Icon
                            className="!size-5 fill-gray-900"
                            name={item.image}
                        />
                    )}
                </div>
                <Tooltip className="ml-1.5" content={item.tooltip} place="top" />
            </div>
            <div className="mb-1 text-gray-500">{item.title}</div>
            <div className="flex justify-between items-center">
                <div className="text-body-xl font-semibold">{item.value}</div>
                <Percentage value={item.percentage} />
            </div>
        </div>
    );
};

export default Card;
