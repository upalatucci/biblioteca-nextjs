import * as React from "react";

const GoshoListSkeleton: React.FC = () => (
  <section className="bg-defaultBg" id="gosho-list">
    <div className="container mx-auto px-4 py-8 min-h-[50vh]">
      <h2 className="text-4xl md:text-3xl text-primary font-bold mb-8 font-serif ">
        Scritti
      </h2>
      <div className="pb-2 flex items-center justify-between flex-wrap">
        <div className="mb-4 w-full animate-pulse">
          <div className="grid grid-cols-5 gap-4">
            <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            <div className="h-5  col-span-1"></div>
            <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            <div className="h-5  col-span-1"></div>
            <div className="h-5 bg-slate-200 rounded col-span-1"></div>
          </div>
        </div>
      </div>
      <ul className="mt-4 divide-y-2 divide-gray-300 divide-dashed text-xl">
        <li className="py-3 animate-pulse">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 max-w-sm bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </li>

        <li className="py-3 animate-pulse">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 max-w-sm bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </li>

        <li className="py-3 animate-pulse">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 max-w-sm bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
);

export default GoshoListSkeleton;
