
const About = () => {
  return (
    <div className='min-h-screen py-16 px-6 '>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-center text-gray-900 mb-10'>
          About Us
        </h1>

        <div className='flex flex-col lg:flex-row lg:gap-12 mb-16'>
          <div className='flex flex-col lg:w-1/2'>
            <div className='flex flex-col flex-grow'>
              <h2 className='text-4xl font-semibold text-gray-800 mb-6'>
                Our Story
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                Dream Buy emerged from a vision to redefine how people find their perfect home. Our founders, passionate about real estate and technology, saw the need for a platform that not only lists properties but also connects people with their future homes. Our goal is to simplify the home buying process and make it an inspiring experience.
              </p>
              <h2 className='text-4xl font-semibold text-gray-800 mb-6'>
                What Sets Us Apart
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Dream Buy stands out by blending advanced technology with a personal touch. Our user-friendly interface and sophisticated search features simplify property exploration, while our dedicated team offers personalized support to help you make informed decisions. Experience the difference with Dream Buy.
              </p>
            </div>
          </div>
          <div className='lg:w-1/2 flex items-stretch mt-8 lg:mt-10'>
            <img src="/dreamImage.avif" alt="Our Story" className='w-full h-96 rounded-lg shadow-2xl object-cover' />
          </div>
        </div>

        <div className='flex flex-col mb-16'>
          <div className='w-full'>
            <h2 className='text-4xl font-semibold text-gray-800 mb-6'>
              Our Vision
            </h2>
            <p className='text-lg text-gray-600 leading-relaxed'>
              We envision a future where finding your dream home is an exhilarating adventure. By continuously innovating and enhancing our platform, we aim to stay at the cutting edge of the real estate industry, offering a service as dynamic and forward-thinking as you are.
            </p>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center p-12 rounded-xl shadow-xl'>
          <h2 className='text-4xl font-semibold mb-6'>
            Join Us
          </h2>
          <p className='text-lg mb-6'>
            We invite you to become part of the Dream Buy community. Whether you’re purchasing your first home, upgrading, or searching for an investment property, Dream Buy is here to ensure an exceptional experience.
          </p>
          <p className='text-lg'>
            Thank you for choosing Dream Buy. Together, let's make your dream home a reality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
