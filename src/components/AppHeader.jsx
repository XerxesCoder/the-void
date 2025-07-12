import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export default function AppHeader() {
  return (
    <header className="w-full absolute top-0 px-4  h-16 bg-background border-b flex justify-center items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-widest">AI VOID</h1>

        <div className="space-x-2 flex justify-center items-center">
          <Button asChild>
            <Link href={"/"}>Dashboard</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
