'use client'
import { useState } from "react";
import useArticle from "@/hooks/contents/article/useList";
import { BiPlus } from "react-icons/bi";
import ArticleCard from "@/components/shared/articleCard";
import SelectCategory from "@/components/shared/form/selectCategory";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "@/components/shared/refetch";
import DatePicker from "@/components/shared/form/DatePicker";


export default function Home() {
const [categoryId, setCategoryId] = useState(0);
const [searchValue, setSearchValue] = useState('');
const [dateRange, setRangeDate] = useState('');

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
  };

const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
const { data: articles, isLoading, isFetching, hasNextPage, fetchNextPage, refetch, isError } = useArticle({"search": searchValue, "page_size": 6, "date": dateRange, 'order': 'desc', 'by':'published_at'}, categoryId);
const allArticles = articles?.pages.flatMap(page => page?.data) || [];

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})`}
    : { backgroundImage: `url(/images/unavailable-image.png)` }

  return (
      <>
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
                <section style={backgroundStyle} className={`relative flex justify-center py-8 rounded-md bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 items-end`}>
                    <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                    <div className="z-10 w-full text-start px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting?.value?.title ?? "[Judul artikel belum diatur]"}</h2>
                    </div>
                </section>
            )
        }
        <div className="w-full flex justify-center">
            <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl grid justify-center items-center grid-cols-3 lg:grid-cols-4 gap-y-6">
                <div className="w-full bg-transparent rounded-s-md col-span-4 py-6 grid grid-cols-6">    
                    <div className="col-span-6 grid grid-cols-6 gap-4">
                        <div className="relative w-full col-span-6">
                            <input id="search-dropdown" type='search' value={searchValue} onChange={handleChange} className="block py-3 px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Cari artikel ..." />
                            <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </span>
                        </div>
                        <div className="relative w-full col-span-6 md:col-span-2">
                            <SelectCategory setCategoryId={setCategoryId}/>
                        </div>
                        <div className="relative w-full col-span-6 md:col-span-4">
                              <DatePicker setDate={setRangeDate} />
                        </div> 
                        <div className="w-full col-span-6 mt-4 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center">
                            {isLoading ||  (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) && isFetching ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 animate-pulse w-full">
                                    <div className="h-64 w-full flex-1 rounded-2xl bg-gray-200"></div>
                                    </div>
                                ))
                            ) : !isError && !isFetching && (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) ? (
                                <div className="flex col-span-6 w-full h-full justify-center">
                                    <div className="flex min-h-96 flex-col items-center justify-center gap-2">
                                        <p className="text-black text-2xl dark:text-gray-400 text-center">Artikel tidak tersedia</p>
                                    </div>
                                </div>
                            ) : isError && !isFetching  ? (
                                <div className="w-full col-span-6 h-full flex justify-center">
                                    <div className="min-h-96 flex-col items-center justify-center gap-2">
                                        <p className="text-black text-2xl dark:text-gray-400 text-center">Terjadi kesalahan, silakan ulangi</p>
                                        <Refetch  refetch={refetch} />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {allArticles.map((card) => 
                                        <div tabIndex={1} key={card.id} className="col-span-6 md:col-span-3  lg:col-span-2 w-full">
                                            <ArticleCard thumbnail={card.thumbnail} slug={card.slug} title={card.title} description={card.description} category_name={card.category.name} published_at={card.published_at} />  
                                        </div>
                                    )}
                                    <div className="col-span-6">
                                        <button 
                                            className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                            onClick={() => fetchNextPage()} 
                                            disabled={!hasNextPage || isFetching}
                                        >
                                            Tampilkan lebih banyak
                                            <BiPlus />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
  );
}
