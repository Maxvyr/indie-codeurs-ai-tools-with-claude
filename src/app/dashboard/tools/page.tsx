import { db } from "@/server/db";
import { type AITool } from "@prisma/client";

export default async function AIToolsPage() {
  const tools = await db.aITool.findMany();

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-8 text-3xl font-bold">AI Tools</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.length === 0 ? (
          <div>No tools found</div>
        ) : (
          <ToolsCards tools={tools} />
        )}
      </div>
    </div>
  );
}

const ToolsCards = ({ tools }: { tools: AITool[] }) => {
  return (
    <>
      {tools.map((tool) => (
        <div key={tool.id} className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">{tool.name}</h2>
          <p className="mb-2 text-gray-600">{tool.description}</p>
          <p className="mb-2 text-sm text-gray-500">
            Category: {tool.category}
          </p>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Visit Website
          </a>
        </div>
      ))}
    </>
  );
};
