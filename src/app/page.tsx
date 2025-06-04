import HeroSection from "@/components/section/hero";
import AppSection from "@/components/section/app";
import ProfileSection from "@/components/section/profile";
import ArticleSection from "@/components/section/article";
import Infografis from "@/components/section/infografis";


export default function Home() {
  return (
      <>
        <HeroSection/>
        <AppSection/>
        <ProfileSection/>
        <ArticleSection/>
        <Infografis/>
        {/* <EnterpriseSection/> */}
        {/* <Tour/> */}
      </>
  );
}
