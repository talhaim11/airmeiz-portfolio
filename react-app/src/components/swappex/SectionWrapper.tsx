import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className, id }: SectionWrapperProps) => (
  <section id={id} className={cn("relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden", className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

export default SectionWrapper;
