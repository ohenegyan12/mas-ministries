import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
    variable: "--font-inter-tight",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MAS Ministries",
    description: "MAS Ministries Dashboard",
    icons: {
        icon: "/logo-main.jpg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            className="text-[calc(0.7rem+0.4vw)] max-[2300px]:text-[calc(0.7rem+0.33vw)] max-[2150px]:text-[calc(0.7rem+0.28vw)] max-4xl:text-[1rem]"
            lang="en"
        >
            <head>
                <link rel="icon" href="/logo-main.jpg" />
                {/* Description no longer than 155 characters */}
                <meta
                    name="description"
                    content="MAS Ministries – Dashboard"
                />

                {/* Product Name */}
                <meta
                    name="product-name"
                    content="MAS Ministries – Dashboard"
                />

                {/* Twitter Card data */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@masministries" />
                <meta
                    name="twitter:title"
                    content="MAS Ministries – Dashboard"
                />
                <meta
                    name="twitter:description"
                    content="MAS Ministries Dashboard"
                />
                <meta name="twitter:creator" content="@masministries" />
                {/* Twitter Summary card images must be at least 120x120px */}
                <meta
                    name="twitter:image"
                    content="/logo-main.jpg"
                />

                {/* Open Graph data for Facebook */}
                <meta
                    property="og:title"
                    content="MAS Ministries – Dashboard"
                />
                <meta property="og:type" content="Article" />
                <meta
                    property="og:url"
                    content="https://masministries.org"
                />
                <meta
                    property="og:image"
                    content="/logo-main.jpg"
                />
                <meta
                    property="og:description"
                    content="MAS Ministries Dashboard"
                />
                <meta
                    property="og:site_name"
                    content="MAS Ministries – Dashboard"
                />
                <meta property="fb:admins" content="" />

                {/* Open Graph data for LinkedIn */}
                <meta
                    property="og:title"
                    content="MAS Ministries – Dashboard"
                />
                <meta
                    property="og:url"
                    content="https://masministries.org"
                />
                <meta
                    property="og:image"
                    content="/logo-main.jpg"
                />
                <meta
                    property="og:description"
                    content="MAS Ministries Dashboard"
                />

                {/* Open Graph data for Pinterest */}
                <meta
                    property="og:title"
                    content="MAS Ministries – Dashboard"
                />
                <meta
                    property="og:url"
                    content="https://masministries.org"
                />
                <meta
                    property="og:image"
                    content="/logo-main.jpg"
                />
                <meta
                    property="og:description"
                    content="MAS Ministries Dashboard"
                />
            </head>
            <body
                className={`${interTight.variable} font-inter-tight text-body-md text-gray-900 antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
