const ProfileSkeleton = () => {
    return (
        <div className="rounded-lg bg-slate-900 h-130 p-4">
            {' '}
            <div className="max-w-2xl mx-auto animate-pulse">
                <div className="h-6 w-32 bg-slate-600 rounded mb-4"></div>
                <div className="h-4 w-48  bg-slate-600 rounded mb-6"></div>

                <div className="flex bg-slate-800  p-3 rounded-2xl  w-160 h-30   ">
                    <div className="h-20 w-20 m-3.5 bg-slate-600 rounded-2xl   ">
                        {' '}
                    </div>
                    <div className=" flex  ">
                        <div className="h-10 w-40 bg-slate-600 rounded-2xl  mb-2 ">
                            {' '}
                        </div>
                        <div className="h-10 w-24 relative top-5 bg-slate-600 rounded-xl mb-2 "></div>
                    </div>
                    <div className="bg-slate-400 w-30 felx relative R-12 h-12 "></div>
                </div>

                <div className="bg-gray-800 p-6 rounded-2xl border shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="h-5 w-40 bg-slate-600 rounded mb-2"></div>
                            <div className="h-4 w-52 bg-slate-600 rounded"></div>
                        </div>
                    </div>

                    <div>
                        <div className="h-4 w-24 bg-slate-600 rounded mb-2"></div>
                        <div className="h-12 w-full bg-slate-600 rounded-xl"></div>
                    </div>

                    <div>
                        <div className="h-4 w-24 bg-slate-600 rounded mb-2"></div>
                        <div className="h-12 w-full bg-slate-600 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileSkeleton
