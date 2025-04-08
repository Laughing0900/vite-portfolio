"use client";
import { cn } from "@/lib/utils";
import type React from "react";

interface TimelineEntry {
  title: string;
  company: string;
  duration: string;
  content?: React.ReactNode;
  tags?: string[];
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="w-full">
      <div className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex md:[:last-child]:mb-max-container"
            id={`${item.company}-experience`}
          >
            <div className="sticky top-one-six-dvh z-40 flex flex-1 flex-col items-center self-start border-accent border-t-2 px-10 py-8 max-md:hidden md:w-1/2 md:items-end">
              <div className="-translate-y-1/2 absolute top-1/2 right-0 h-6 w-6 translate-x-1/2 rotate-45 rounded-full border-4 border-primary" />
              <p className="mb-2.5 text-base">0{index + 1}</p>
              <h3 className="text-balance text-right text-4xl">
                {item.title} {"//"}
              </h3>
              <p className="text-sm">
                {item.company}
                <span className="text-secondary-foreground">
                  {" "}
                  | {item.duration}
                </span>
              </p>
            </div>

            <div
              className={cn(
                "relative w-full flex-1 border-accent border-t-2 max-md:pt-one-six-dvh md:border-l-2",
                !!item.content && "md:min-h-max-container",
              )}
            >
              <div className="relative block p-5 md:hidden">
                <div className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-0 z-10 h-6 w-6 rotate-45 rounded-full border-4 border-primary" />
                <p className="mb-1 text-sm">0{index + 1}</p>
                <h3 className="text-2xl">
                  {item.title} {"//"}
                </h3>
                <p className="text-base">
                  {item.company}
                  <span className="text-secondary-foreground">
                    {" "}
                    | {item.duration}
                  </span>
                </p>
              </div>
              {item.content && (
                <div className="p-5 md:p-10">
                  <p className="mb-5 text-sm">Information:</p>
                  {item.content}
                </div>
              )}
              <div className="flex flex-wrap gap-2 p-5 md:p-10">
                {item.tags?.map((tag) => (
                  <p
                    key={tag}
                    className="rounded-sm bg-muted px-2 py-0.5 text-muted-foreground text-sm"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
