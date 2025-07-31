const SkeletonCard = () => {
  return (
    <div className=" min-h-[450px] rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-yellow-50 to-white">
      <div className="h-full w-full flex flex-col gap-3 bg-secondary rounded-2xl overflow-hidden p-2 pb-6">
        <div className="skeleton h-[300px] overflow-hidden rounded-2xl" />
        <div className="  flex flex-col gap-2">
          <div className="skeleton flex justify-between items-start rounded-lg">
            <div className=" h-10 w-full" />
          </div>
          <span className="h-4 skeleton w-2/3 rounded-lg" />
          <div className="h-4 skeleton w-2/3 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
