import { buildServer } from "@/server";

async function main() {
  const server = await buildServer();

  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server is running on http://localhost:4000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
