import db from "@/lib/db";

async function getPosts() {
  const posts = await db;
}

export default function Life() {
  return (
    <div>
      <h1 className="text-white text-4xl">Life!</h1>
    </div>
  );
}
