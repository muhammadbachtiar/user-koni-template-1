"use client"

import type React from "react"
import useArticle from "@/hooks/contents/article/useList";
import Image from "next/image";
import Infografis from "../section/infografis";
import Link from "next/link";
import Refetch from "../shared/refetch";


export default function AsideContent({ children }: { children: React.ReactNode}) {

    const { data: articles, isLoading, isFetching, refetch, isError} = useArticle({"page_size": 4});

  return (
    <div className="flex flex-col items-stretch md:flex-row w-full">
      <main className="flex-1 min-w-0">
        <div className="space-y-6">
          <div className="mb-8">
            {children}
          </div>
        </div>
      </main>
      <aside className="w-full md:w-72 lg:w-96 md:sticky md:top-0 md:self-start h-fit bg-white sm:p-4 border-gray-300 md:border-l">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-blue-500 mb-4 pb-2 border-gray-300 border-b">Artikel Populer</h2>
            <ul className="space-y-4">
              {
                isLoading ||  (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) && isFetching ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="flex animate-pulse">
                      <div className="mr-3 min-w-32 relative group mb-3">
                        <div className="w-40 md:w-30 rounded-sm shadow-lg bg-gray-200 h-20"></div>
                        <div className="absolute w-40 md:w-30 inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                      </div>
                    </li>
                ))
                ) : !isError && !isFetching && (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) ? (
                    <div className="flex min-h-52 mb-4 justify-center col-span-8 w-full">
                      <p className="text-black text-center text-md dark:text-gray-400">Artikel tidak tersedia</p>
                    </div>
                ) : isError && !isFetching  ? (
                    <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                      <Refetch  refetch={refetch} />
                    </div>
                ) : (
                  articles?.pages[0].data.map((article) => (
                    <Link key={article.id} href={`/article/${article.slug}`}>
                      <li className="flex my-2">
                        <div className="mr-3 max-w-40 min-w-40 md:max-w-32 md:min-w-32 w-full relative group">
                            <Image
                                className="max-w-40 md:max-w-32 max-h-24 h-full w-full rounded-sm shadow-lg object-cover"
                                src={article.thumbnail || ""}
                                alt="Article Thumbnail"
                                width={1200}
                                height={720}
                                priority 
                                />
                            <div className="absolute w-40 md:w-32 inset-0 rounded-sm bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                        </div>
                        <h5 className="text-md line-clamp-4 font-semibold hover:text-blue-500 ">
                          {article.title}
                        </h5>
                      </li>
                    </Link>
                  ))
                )
               }
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-500 mb-4 pb-2 border-gray-300 border-b">Infografis</h2>
            <div className="relative">
              <Infografis slideToShow={1}/>
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500 mb-2">ADVERTISEMENT</div>
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Ad Space</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
