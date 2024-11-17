import { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/img/2.JPG',
    '/img/1.JPG',
    '/img/8.JPG'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="px-4 md:px-8">
      <div className="relative w-full h-[500px] md:h-[700px] my-6 md:my-10">
        <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
          {/* Images container */}
          <div className="absolute inset-0">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-1000 ease-in-out`}
                style={{
                  transform: `translateX(${100 * (index - currentIndex)}%)`,
                }}
              >
                <img
                  src={src}
                  alt={`slide-${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Optional: Navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <div className="text-white px-4">
            <h3 className="text-white text-sm md:text-base uppercase tracking-wider mb-2">
              CAPTURING MEMORIES INTO FRAMES
            </h3>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Eternalize Your <br className="hidden md:block" />
              Beloved Moments
            </h1>
            <div className="text-xl">✦✦</div>
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-[5] rounded-2xl md:rounded-[2rem]"></div>
      </div>
    </div>
  );
};

export default Carousel; 