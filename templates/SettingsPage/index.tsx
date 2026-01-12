"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Profile from "./Profile";
import Accounts from "./Accounts";
import Password from "./Password";
import MinistryConfig from "./MinistryConfig";

import { navigation } from "./navigation";

const SettingsPage = () => {
    const [activeId, setActiveId] = useState(0);

    return (
        <Layout title="Settings">
            <Breadcrumbs
                className="max-md:hidden"
                items={["Home", "Settings"]}
            />
            <div className="mb-2 text-h4">⚙️ Settings</div>
            <div className="mb-6 text-gray-500 font-medium">
                Manage your profile, account security, and ministry configurations.
            </div>

            <div className="flex border border-gray-100 rounded-2xl max-md:relative max-md:flex-col max-md:border-0 max-md:rounded-none max-md:min-h-[calc(100svh-5.6rem)]">
                <div className="flex flex-col gap-3 shrink-0 w-75 p-4 border-r border-gray-100 max-4xl:w-50 max-2xl:w-45 max-md:flex-row max-md:w-auto max-md:overflow-x-auto max-md:scrollbar-none max-md:border-b max-md:border-gray-100">
                    {navigation.map((item) => (
                        <button
                            className={`flex items-center h-9.25 px-3 border rounded-lg text-body-md transition-all hover:text-gray-900 max-md:shrink-0 ${activeId === item.id
                                ? "border-gray-100 bg-gray-25 font-semibold text-gray-900"
                                : "border-transparent font-medium text-gray-500"
                                }`}
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
                <div className="grow bg-white rounded-r-2xl max-md:rounded-none">
                    {activeId === 0 && <Profile />}
                    {activeId === 1 && <Accounts />}
                    {activeId === 2 && <Password />}
                    {activeId === 3 && <MinistryConfig />}
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
