import * as React from "react";

const DictionarySkeleton: React.FC = () => (
  <div className="bg-white border-t border-gray-200 dark:border-gray-700 py-20">
    <ul className="divide-y-2 divide-dashed mb-10 mx-auto md:max-w-6xl border-b border-gray-200 dark:border-gray-700 bg-defaultBg rounded-xl shadow-md  px-4 md:px-10 py-8">
      <li className="py-4 animate-pulse">
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

      <li className="py-4 animate-pulse">
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

      <li className="py-4 animate-pulse">
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
    </ul>
  </div>
);

export default DictionarySkeleton;
