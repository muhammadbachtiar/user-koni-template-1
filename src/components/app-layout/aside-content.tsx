"use client";

import type React from "react";
import useArticle from "@/hooks/contents/article/useList";
import Image from "next/image";
import Infografis from "../section/infografis";
import Link from "next/link";
import Refetch from "../shared/refetch";

export default function AsideContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: articles,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useArticle({ page_size: 5, order: "desc", by: "views" });

  return (
    <div className="flex flex-col items-stretch md:flex-row w-full">
      <main className="flex-1 min-w-0">
        <div className="space-y-6">
          <div className="mb-8">{children}</div>
        </div>
      </main>
      <aside className="w-full md:w-72 lg:w-96 md:sticky md:top-0 md:self-start h-fit bg-white sm:pl-3 my-2 border-gray-300 md:border-l">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-blue-500 mb-4 pb-2 border-gray-300 border-b">
              Artikel Populer
            </h2>
            <ul className="space-y-4">
              {isLoading ||
              ((!articles ||
                !articles.pages[0] ||
                articles.pages[0]?.data.length === 0) &&
                isFetching) ? (
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
              ) : !isError &&
                !isFetching &&
                (!articles ||
                  !articles.pages[0] ||
                  articles.pages[0]?.data.length === 0) ? (
                <div className="flex min-h-52 mb-4 justify-center col-span-8 w-full">
                  <p className="text-black text-center text-md dark:text-gray-400">
                    Artikel tidak tersedia
                  </p>
                </div>
              ) : isError && !isFetching ? (
                <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                  <Refetch refetch={refetch} />
                </div>
              ) : (
                articles?.pages[0].data.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <li className="flex mb-2 items-center">
                      <div className="mr-3 max-w-40 min-w-40 md:max-w-32 md:min-w-28 lg:max-w-28 lg:min-w-32 w-full relative group">
                        <Image
                          className="object-cover object-center w-full h-full rounded-sm shadow-lg"
                          src={article.thumbnail || ""}
                          alt="Article Thumbnail"
                          width={1200}
                          height={720}
                          priority
                          style={{
                            aspectRatio: "16/9", 
                          }}
                        />
                        <div className="absolute w-full inset-0 rounded-sm bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-row gap-x-2">
                             <div className="text-sm text-blue-500">
                              {article.category.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {article.published_at}
                            </div>
                        </div>
                       
                        <h5 className="text-md font-semibold hover:text-blue-500 line-clamp-3 md:line-clamp-2">
                          {article.title}
                        </h5>
                      </div>
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-500 mb-4 pb-2 border-gray-300 border-b">
              Infografis
            </h2>
            <div className="relative">
              <Infografis slideToShow={1} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
