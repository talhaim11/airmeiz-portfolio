import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FullSceneProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const FullScene = ({ children, className, id }: FullSceneProps) => (
  <section
    id={id}
    className={cn(
      "snap-section relative min-h-screen w-full flex items-center justify-center overflow-hidden",
      className
    )}
  >
    {children}
  </section>
);

export default FullScene;
