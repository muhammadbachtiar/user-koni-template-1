import type { Metadata } from "next";
import ArticleService from "@/services/controlers/article/article.service";
import { formatMetadata } from "@/services/utils/generate-seo";
import ArticleDetailClient from "@/components/modul/article/detail";
import { ArticleData } from "@/services/controlers/article/type";
import SettingService from "@/services/controlers/setting/setting.service";
import { validateAndRedirect } from "@/services/utils/shouldRedirect";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getArticle } from "@/hooks/contents/article/getArticle";

interface DynamicPageProps {
  params: { slug: string };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

let article: ArticleData;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const logoResponse = await SettingService.getSetting(
      `logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`
    );
    const articleResponse = await ArticleService.getOne(slug ?? "", {
      with: "user,category",
    });
    article = articleResponse.data;
    return formatMetadata(
      { ...article, type: "article" },
      {
        siteName:
          logoResponse?.data?.value?.regionEntity ||
          "Pemerintah Kabupaten Muara Enim",
      }
    );
  } catch {
    return {
      title: `Artikel | Pemerintah Kabupaten Muara Enim`,
    };
  }
}

export default async function ArticleDetailPage({
  params,
}: DynamicPageProps & PageProps) {
  const { slug } =  params;
  try {
    const article = await getArticle(slug);
   
    return (
      <div className="min-h-screen flex justify-center w-full">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <ArticleDetailClient  initialData={article} />
        </div>
      </div>
    );
  } catch {
     if (validateAndRedirect([params.slug])) {
        return redirect("/article");
    }
    return (
      <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }
}
