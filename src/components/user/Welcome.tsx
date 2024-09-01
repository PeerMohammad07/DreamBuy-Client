const Welcome = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center md:flex-row lg:flex-row xl:flex-row pt-10">
          <h1 className='text-2xl'>Welcome to </h1>
          <img
            src="/dreambuylogo.png"
            alt="dreambuylogo"
            className="w-15 h-9 ml-2 md:ml-0 lg:ml-0 xl:ml-0 md:mt-0 lg:mt-0 xl:mt-0" // Adjusted margin for medium screens and above
          />
      </div>
    </>
  )
}

export default Welcome
