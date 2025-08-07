import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { Card } from "../components/Card";

export function Twitter() {
  const { contents, refresh } = useContent<{ type: string; link: string; title: string }[]>();

  useEffect(() => {
    refresh();
  }, []);

  const twitterContents = contents.filter((content) => content.type === "twitter");

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <h2 className="text-xl font-semibold mb-4">Twitter</h2>
        <div className="flex gap-4 flex-wrap">
          {twitterContents.map(({ type, link, title }, index) => (
            <Card key={index} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
