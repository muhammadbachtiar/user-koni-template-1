import type { MenuWithContent } from "@/types/menu";
import RichTextContent from "@/components/shared/RichTextContent";
import AsideContent from "@/components/app-layout/aside-content";
import Link from "next/link";
import SettingService from "@/services/controlers/setting/setting.service";
import { formatMetadata } from "@/services/utils/generate-seo";
import { Metadata } from "next";
import { validateAndRedirect } from "@/services/utils/shouldRedirect";
import { redirect } from "next/navigation";

function findMenuItemByPath(
  items: MenuWithContent,
  path: string[],
  currentPath = ""
): MenuWithContent[0] | null {
  for (const item of items) {
    const itemPath = item.route ? `${currentPath}${item.route}` : currentPath;

    if (itemPath === `/${path.join("/")}`) {
      return item;
    }

    if (item.child && item.child.length > 0) {
      const found = findMenuItemByPath(item.child, path, itemPath);
      if (found) return found;
    }
  }

  return null;
}

interface PageProps {
  params: Promise<{ slug?: string }>;
}

interface DynamicPageProps {
  params: { slug?: string[] };
}

export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const { data: menu } = await SettingService.getSetting(
    `menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`,
    {}
  );
  const logoResponse = await SettingService.getSetting(
    `logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`
  );
  const path = Array.isArray(unwrappedParams.slug) ? unwrappedParams.slug : [];
  const menuItem = Array.isArray(menu?.value)
    ? findMenuItemByPath(menu.value, path)
    : null;
  try {
    const menuData = await SettingService.getStaticPage(
      menuItem?.staticPage || ""
    );
    return formatMetadata(
      { ...menuData.data, type: "article" },
      {
        siteName:
          logoResponse?.data?.value?.regionEntity ||
          "Pemerintah Kabupaten Muara Enim",
      }
    );
  } catch {
    return {
      title: `Menu | Pemerintah Kabupaten Muara Enim`,
    };
  }
}

interface DynamicPageProps {
  params: { slug?: string[] };
}

export default async function DynamicPage({
  params,
}: DynamicPageProps & PageProps) {
  const unwrappedParams = await params;
  const path = Array.isArray(unwrappedParams.slug)
      ? unwrappedParams.slug
      : [];
  try {
    const { data: menu } = await SettingService.getSetting(
      `menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`,
      {}
    );
    const menuItem = Array.isArray(menu?.value)
      ? findMenuItemByPath(menu.value, path)
      : null;
    const { data: staticPage } = await SettingService.getStaticPage(
      menuItem?.staticPage || ""
    );

    return (
      <div className="min-h-screen flex justify-center w-full py-4">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">      
          <AsideContent>
            <RichTextContent content={staticPage.content} className="pr-3" />
          </AsideContent>
        </div>
      </div>
    );
  } catch {
     if (validateAndRedirect(path)) {
      const redirects: Record<string, string> = {
      tour: '/tour',
      article: '/article',
      };
      return redirect(redirects[path[0]] || '/');
    }
    return (
      <div className="flex flex-col text-center items-center justify-center h-screen w-full text-gray-700">
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
