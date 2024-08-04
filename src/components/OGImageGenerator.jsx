
import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const OGImageGenerator = ({ title, content, image, setOgImageUrl }) => {
  const ogImageRef = useRef(null);

  useEffect(() => {
    const generateOGImage = async () => {
      if (ogImageRef.current) {
        const canvas = await html2canvas(ogImageRef.current, {
          width: 1200,
          height: 630,
          scale: 1,
        });
        const ogImageUrl = canvas.toDataURL('image/png');
        setOgImageUrl(ogImageUrl);
      }
    };

    generateOGImage();
  }, [title, content, image, setOgImageUrl]);

  return (
    <div
      ref={ogImageRef}
      className="hidden"
      style={{
        width: '1200px',
        height: '630px',
        position: 'absolute',
        left: '-9999px',
      }}
    >
      <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 p-8 flex flex-col justify-between">
        <div className="flex h-4/5">
          <div className="w-2/3 pr-8">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">{title}</h1>
            <p className="text-xl text-white">
              {content.length > 100 ? content.slice(0, 100) + '...' : content}
            </p>
          </div>
          {image && (
            <div className="w-1/3">
              <img
                src={image}
                alt="Post"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        <div className="text-white text-xl font-semibold">MyBrandLogo.com</div>
      </div>
    </div>
  );
};

export default OGImageGenerator;