function Loader({ text = "Loading..." }) {
  return (
    <div className='flex flex-col items-center justify-center py-20 space-y-4'>
      <div className='w-12 h-12 border-[6px] border-white border-t-transparent rounded-full animate-spin shadow-lg' />
      <p className='text-sm font-medium text-white animate-pulse'>{text}</p>
    </div>
  );
}

export default Loader;
