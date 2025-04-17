import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { appConfig } from "@/appConfig";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: appConfig.name,
  description: appConfig.bioShort,
  metadataBase: new URL(appConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexSans.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${appConfig.url} - RSS Feed`}
          href="/api/rss"
        />
      </head>
      <body className="mx-auto max-w-lg px-6 md:max-w-xl lg:max-w-2xl">
        {children}
      </body>
    </html>
  );
}
