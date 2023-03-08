import Head from "next/head";
import { memo } from "react";
import Footer from "./Footer";
import HomeNavbar from "./Navbar/HomeNavbar";
import { removeHTMLTags } from "@utils/utils";

const GoshoPageSkeleton = memo(() => (
  <ul>
    {new Array(5)
      .fill(0)
      .map((_, index) => index + 1)
      .map((element) => (
        <li className="py-6 animate-pulse" key={element}>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 max-w-sm bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
              <div className="h-2 max-w-sm bg-slate-200 rounded"></div>
            </div>
          </div>
        </li>
      ))}
  </ul>
));

GoshoPageSkeleton.displayName = "GoshoPageSkeleton";

type ArticleLoadingType = {
  originalPost: any;
};

const ArticleLoading: React.FC<ArticleLoadingType> = ({ originalPost }) => (
  <>
    <Head>
      <title>
        {removeHTMLTags(originalPost?.title?.rendered)} | La Biblioteca di
        Nichiren
      </title>
      <meta
        name="Description"
        content={removeHTMLTags(
          originalPost?.content.rendered?.substring(0, 155)
        )}
      ></meta>
    </Head>
    <HomeNavbar />

    <main>
      <div className="bg-defaultBg">
        <div className="">
          <div className="bg-white rounded-xl shadow-md">
            <div className="py-20 px-8 md:px-20 container mx-auto max-w-[1400px]">
              <h2 className="text-4xl md:text-5xl text-secondary pb-6">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>
              </h2>
              <div className="text-gray-400 pb-6">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 bg-slate-200 rounded w-1/2 lg:w-1/4"></div>
                </div>
              </div>

              <div className="px-6 py-4 w-full text-md mb-4 h-32 rounded-2xl shadow-md bg-defaultBg flex items-center justify-start">
                <div className="animate-pulse flex space-x-4 w-32">
                  <div className="h-20 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>

                <div className="animate-pulse flex space-x-4 w-32">
                  <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>

                <div className="animate-pulse flex space-x-4 w-32">
                  <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>

                <div className="animate-pulse flex space-x-4 w-32">
                  <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>

                <div className="animate-pulse flex space-x-4 w-32">
                  <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>

                <div className="animate-pulse flex space-x-4 w-32">
                  <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-20 container mx-auto max-w-[1000px]">
            <GoshoPageSkeleton />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ArticleLoading;
