import { allBlogs } from ".contentlayer/generated";
import Link from "next/link";
import { Icon } from "@iconify/react";
import StargazersCount from "@/components/StargazersCount";
import { appConfig } from "@/appConfig";

const links = [
  { label: "Hire Me!", href: `mailto://${appConfig.socials.email}` },
];

export default function Home() {
  const availableBlogEntries = allBlogs
    .filter((entry) =>
      process.env.NODE_ENV === "production" ? !entry.draft : true
    )
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

  return (
    <main className="mt-16 text-base text-zinc-300 md:text-base lg:text-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">{appConfig.name}</h2>
        <div className="flex items-center gap-3">
          <a href={appConfig.socials.linkedin}>
            <Icon icon="mdi:linkedin" className="text-white" />
          </a>
          <a href={appConfig.socials.github}>
            <Icon icon="mdi:github" className="text-white" />
          </a>
          <a href={appConfig.socials.medium}>
            <Icon icon="simple-icons:medium" className="text-white" />
          </a>
        </div>
      </div>
      <section className="mt-8 mb-4">
        <p>Hey there, {appConfig.bioShort}</p>
      </section>

      <section className="text-xs text-zinc-400 md:text-sm lg:text-base">
        <p className="mb-1 flex items-center gap-2 italic">
          <Icon icon="octicon:location-16" />
          {appConfig.location}
        </p>
        <p className="mb-1 flex items-center gap-2 italic">
          <Icon icon="octicon:briefcase-16" />
          Team Leader at{" "}
          <a
            className="underline decoration-zinc-600 underline-offset-1 transition hover:decoration-current"
            href={appConfig.companyUrl}
          >
            {appConfig.company}
          </a>
        </p>
        <p className="mb-1 flex items-center gap-2 italic">
          <Icon icon="octicon:book-16" />
          {appConfig.education}
        </p>
      </section>
      <section>
        <br />
        <p>{appConfig.bioDetailed}</p>
      </section>

      <div className="mt-12 text-xs text-zinc-400 md:text-sm lg:text-base">
        Blog
      </div>
      <section className="mt-2 flex flex-col gap-2">
        {availableBlogEntries.map((entry) => (
          <Link
            key={entry.slug}
            className="relative rounded border border-zinc-800 bg-zinc-900 px-4 pb-2 transition hover:bg-zinc-800"
            href={`/blog/${entry.slug}`}
          >
            <div className="mt-2 flex items-start justify-between gap-4">
              <div>{entry.title}</div>
              <Icon icon="octicon:arrow-up-right-16" className="text-lg" />
            </div>
            <time
              className="absolute top-0 -right-24 hidden text-xs text-zinc-600 md:-right-32 md:block md:text-sm lg:text-base"
              dateTime={entry.publishDate}
            >
              {new Date(entry.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </Link>
        ))}
      </section>

      <div className="mt-12 text-xs text-zinc-400 md:text-sm lg:text-base">
        Projects
      </div>
      <section className="grid grid-cols-1 gap-2 gap-x-10 md:grid-cols-2">
        <a
          href="https://www.npmjs.com/package/number-into-words"
          className="group flex flex-col gap-2 rounded py-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-lg italic underline decoration-zinc-600 underline-offset-2 transition group-hover:decoration-current">
              Number into words
            </div>
            <StargazersCount repo="number-into-words">
              <Icon icon="octicon:star-fill-16" className="text-yellow-500" />
            </StargazersCount>
          </div>
          <p className="text-xs text-zinc-400 md:text-sm lg:text-base">
            number-into-words is a light-weight, quick number to words generator
            for NodeJS or other Front End Frameworks that uses JavaScript with
            ZERO dependency.
          </p>
        </a>
        <a
          href="https://www.npmjs.com/package/ipsumlorem"
          className="group flex flex-col gap-2 rounded py-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-lg italic underline decoration-zinc-600 underline-offset-2 transition group-hover:decoration-current">
              ipsumlorem
            </div>
            <StargazersCount repo="ipsumlorem">
              <Icon icon="octicon:star-fill-16" className="text-yellow-500" />
            </StargazersCount>
          </div>
          <p className="text-xs text-zinc-400 md:text-sm lg:text-base">
            A light-weight, quick sample text generator for node.js or any Front
            End that uses JavaScript with ZERO dependency.
          </p>
        </a>
      </section>

      {/* Footer */}
      <section className="my-12 flex justify-center gap-6 text-xs font-thin text-zinc-100 decoration-zinc-400 md:text-sm lg:text-base">
        {links.map((link) => (
          <a
            key={link.href}
            className="underline-offset-4 hover:underline"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </section>
    </main>
  );
}
