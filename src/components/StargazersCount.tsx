"use client";

import { useEffect, useState } from "react";

interface Props {
  owner?: string;
  repo: string;
  children: React.ReactNode;
}

export default function StargazersCount({
  owner = "amandeeptherockstar",
  repo,
  children,
}: Props) {
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      const data = await response.json();
      setStargazersCount(data.stargazers_count);
    };

    fetchData();
  }, [owner, repo]);

  if (!stargazersCount) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
      title={`starred ${stargazersCount} times on GitHub`}
    >
      {children}
      <div>{stargazersCount}</div>
    </div>
  );
}
