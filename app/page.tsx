import { existsSync } from "node:fs";
import { join } from "node:path";
import Portfolio from "./portfolio";

export default function Page() {
  const hasResume = existsSync(
    join(process.cwd(), "public", "resume.pdf"),
  );

  return <Portfolio hasResume={hasResume} />;
}
