import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "@/components/sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/hero.svg" alt="logo" height={40} width={40} />
          <h1 className="text-2xl font-extrabold text-slate-600 tracking-wide">
            VegaBattle
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hidden">
        {" "}
        {/* Added custom class for hidden scrollbar */}
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        {/* <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        /> */}
        {/* <SidebarItem label="Quests" href="/quests" iconSrc="/quests.svg" /> */}
        {/* <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg" /> */}
        <SidebarItem label="Game" href="/game" iconSrc="/console.png" />
        <SidebarItem label="Battle" href="/battle" iconSrc="/battle.svg" />
        <SidebarItem label="Course" href="/course" iconSrc="/course.png" />
        <SidebarItem
          label="Opportunities"
          href="/opportunities"
          iconSrc="/job.svg"
        />
        <SidebarItem label="Custom" href="/custom" iconSrc="/custom.svg" />
        
      
        <SidebarItem
          label="Dashboard"
          href="/dashboard"
          iconSrc="/dashboard.png"
        />
        
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};
