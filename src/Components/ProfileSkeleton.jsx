const ProfileSkeleton = () => {
  return (

    <div className="rounded-lg bg-orange-50 h-130 p-4"> {/* ✅ match outer wrapper */}
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-6 w-32 bg-mist-200 rounded mb-4"></div>
        <div className="h-4 w-48 bg-mist-200 rounded mb-6"></div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">



          <div className="flex justify-between items-center">
            <div>
              <div className="h-5 w-40 bg--200 rounded mb-2"></div>
              <div className="h-4 w-52 bg-mist-200 rounded"></div>
            </div>
            <div className="h-10 w-24 bg-mist-200 rounded-xl"></div>
          </div>


          <div>
            <div className="h-4 w-24 bg-mist-200 rounded mb-2"></div>
            <div className="h-12 w-full bg-mist-200 rounded-xl"></div>
          </div>

          <div>
            <div className="h-4 w-24 bg-mist-200 rounded mb-2"></div>
            <div className="h-12 w-full bg-mist-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSkeleton;