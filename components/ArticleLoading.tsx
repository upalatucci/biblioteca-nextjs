import Head from "next/head";
import { memo } from "react";
import Footer from "./Footer";
import HomeNavbar from "./Navbar/HomeNavbar";

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

const ArticleLoading = () => (
  <>
    <Head>
      <title>Loading | NICHIREN Library</title>
    </Head>
    <HomeNavbar />
    <main>
      <div className="bg-white px-2 py-8 lg:p-8">
        <div className="container px-4 lg:px-10 mx-auto">
          <h2 className="text-4xl md:text-5xl text-secondary pb-6 border-b-2 border-secondary">
            <div className="animate-pulse flex space-x-4">
              <div className="h-8 bg-slate-200 rounded w-full lg:w-1/2"></div>
            </div>
          </h2>
          <div className="py-4 flex flex-col-reverse lg:flex-row gap-10">
            <div className="w-full">
              <GoshoPageSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ArticleLoading;
