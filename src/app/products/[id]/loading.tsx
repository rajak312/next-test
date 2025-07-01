export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-inherit">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-gray-300 border-dashed rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
