'use client'
import SliderCard from '../shared/sliderArticle';
import Link from 'next/link';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';

export default function Article() {
  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)`};

  return (
    <section className="relative w-full flex justify-center items-center">
        <div className="max-w-full w-full grid grid-cols-8 gap-2 bg-white dark:bg-gray-700 dark:border-gray-600 ">
            {
              isSettingLoading ? (
                  <div className="flex animate-pulse mb-4 col-span-8 w-full">
                    <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
                  </div>
              ) : isSettingError && !isSettingFetching  ? (
                  <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetchSetting} />
                  </div>
              ) : (
                <>
                    <div style={backgroundStyle} className={`relative bg-cover bg-bottom h-40 md:h-60 flex flex-col col-span-8 gap-2 mb-4 justify-items-center items-center`}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                        <div className="relative h-full flex flex-col justify-center items-center px-8 md:px-24 xl:px-56 text-center py-16 lg:py-32 gap-4">
                            <h2 className="self-center text-4xl text-white font-bold ">{setting?.value?.title || "[Judul artikel belum diatur]"}</h2>
                            <Link href="/article" className="inline-flex justify-center hover:text-gray-900 items-center py-2 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 hover:border-gray-900 focus:ring-4 focus:ring-gray-400 transition transform duration-300 ease-in-out">
                                Lihat selengkapnya
                            </Link> 
                        </div>
                    </div>
                </>
              )
            }
            <div className="col-span-8 grid grid-cols-4 h-full w-full font-medium md:gap-x-4 justify-center justify-items-center">
                <div className="col-span-4 max-w-full w-full overflow-hidden dark:bg-gray-800 dark:border-gray-700"> <SliderCard/></div>
            </div>
        </div>
    </section>
  );
}
