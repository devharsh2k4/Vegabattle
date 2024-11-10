import Dashboard from '@/components/DashboardItems'; // Your existing dashboard component
import { FeedWrapper } from "@/components/feed-wrapper";


import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

// Combine both the leaderboard and dashboard components into one page
const DashboardPage = async () => {
  const userProgerssData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [userProgress, _userSubscription, leaderboard] = await Promise.all([
    userProgerssData,
    userSubscriptionData,
    leaderboardData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  // const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-[48px] px-6">
      {/* Left Side: User Progress and Promo */}
   

      {/* Center Area: Main Dashboard */}
      <div className="w-full lg:w-50% flex flex-col space-y-8">
        {/* Dashboard Section */}
        <Dashboard />
      </div>

      {/* Right Side: Leaderboard Section */}
      <div className="w-full lg:w-2/5">
        <FeedWrapper>
          <div className="w-full flex flex-col items-center">
            <Image
              src="/leaderboard.svg"
              alt="leaderboard"
              width={90}
              height={90}
            />
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
              Leaderboard
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
              See where you stand among others
            </p>

            <Separator className="mb-4 h-0.5 rounded-full" />
            {leaderboard.map((userProgress, index) => (
              <div
                key={userProgress.userId}
                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
              >
                <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                  <AvatarImage
                    className="object-cover"
                    src={userProgress.userImageSrc}
                  />
                </Avatar>

                <p className="font-bold text-neutral-800 flex-1">
                  {userProgress.userName}
                </p>
                <p className="text-muted-foreground">{userProgress.points} XP</p>
              </div>
            ))}
          </div>
        </FeedWrapper>
      </div>
    </div>
  );
};

export default DashboardPage;
