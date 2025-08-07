import HeroSection from "@/components/section/hero";
import AppSection from "@/components/section/app";
import ProfileSection from "@/components/section/profile";
import ArticleSection from "@/components/section/article";
import Infografis from "@/components/section/infografis";

export default function Home() {
  return (
      <>
        <HeroSection/>
        <div className="flex w-full border-gray-200 justify-center items-center pb-8 ">
          <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-[56px] row-start-2 items-center sm:items-start">
            <AppSection/>
            <ProfileSection/>
            <ArticleSection/>
            <Infografis/>
          </div>
        </div>
      </>
  );
}
