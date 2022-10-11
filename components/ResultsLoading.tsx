const ResultsLoading: React.FC = () => {
  return (
    <div
      className="container mx-auto px-4 pt-8 xl:px-14 min-h-[50vh]"
      id="risultati"
    >
      <div className="rounded-md mb-4 w-full mx-auto">
        <div className="h-8 max-w-sm bg-slate-200 rounded my-4"></div>

        <hr className="border border-secondary" />
      </div>

      <ul className="divide-y-2 divide-dashed pt-4 mb-10">
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
      </ul>
    </div>
  );
};

export default ResultsLoading;
