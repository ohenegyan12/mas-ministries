import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SearchModal from "@/components/SearchModal";
import Menu from "./Menu";
import Logout from "./Logout";

type Props = {
    toggle: boolean;
    visible: boolean;
    onToggle: () => void;
    onClose: () => void;
};

const Sidebar = ({ toggle, visible, onToggle, onClose }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className={`fixed top-0 left-0 bottom-0 z-10 flex flex-col bg-white border-r border-gray-100 max-xl:z-30 max-xl:transition-transform max-md:w-full ${toggle ? "w-18" : "w-69"
                    } ${visible
                        ? "max-xl:translate-x-0"
                        : "max-xl:-translate-x-full"
                    }`}
            >
                <div
                    className={`flex items-center gap-2 border-b border-gray-100 ${toggle
                        ? "flex-col px-5 py-3"
                        : "justify-between p-5 max-md:py-4"
                        }`}
                >
                    <Link className="flex items-center" href="/">
                        <Image
                            className="w-8 opacity-100"
                            src="/logo-main.jpg"
                            width={32}
                            height={32}
                            alt="MAS Ministries"
                            priority
                        />
                        {!toggle && (
                            <div className="ml-2.5 text-h5">MAS Ministries</div>
                        )}
                    </Link>
                    <Button
                        className={`!transition-colors max-xl:hidden ${toggle ? "rotate-180" : ""
                            }`}
                        icon="chevron"
                        isSecondary
                        isXSmall
                        isSquare
                        onClick={onToggle}
                    />
                    <Button
                        className="!hidden [&_svg]:!size-6 max-xl:!flex"
                        icon="close"
                        isSecondary
                        isXSmall
                        isSquare
                        onClick={onClose}
                    />
                </div>
                <div className="flex flex-col p-4 pt-5 grow overflow-y-auto scrollbar-none">
                    {!toggle && <SearchModal className="mb-4 max-xl:hidden" />}
                    <Menu toggle={toggle} />
                    {toggle ? (
                        <div className="flex flex-col mt-auto">
                            <Button
                                className="w-full"
                                icon="logout"
                                isRed
                                isMedium
                                isSquare
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                    ) : (
                        <Button
                            className="w-full mt-auto"
                            icon="logout"
                            isRed
                            isMedium
                            onClick={() => setIsModalOpen(true)}
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Logout onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Sidebar;
