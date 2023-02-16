import { memo } from "react";

const LoadingElement = memo(() => (
  <li className="py-6 animate-pulse">
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
));

LoadingElement.displayName = "LoadingElement";

const ResultsLoading: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-xl py-20">
      <div className="px-8 md:px-20 xl:px-0 md:max-w-6xl mx-auto">
        <ul className="divide-y-2 divide-dashed pt-4 mb-10 mx-auto bg-defaultBg  rounded-xl shadow-md  px-4 md:px-10 py-8">
          <LoadingElement />
          <LoadingElement />
          <LoadingElement />
          <LoadingElement />
          <LoadingElement />
          <LoadingElement />
          <LoadingElement />
          <LoadingElement />
        </ul>
      </div>
    </div>
  );
};

export default ResultsLoading;
