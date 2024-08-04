
import React, { useState, useEffect } from 'react';
import OGImageGenerator from './OGImageGenerator';

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [postLink, setPostLink] = useState('');

  useEffect(() => {
    // Update meta tag when ogImageUrl changes
    const metaTag = document.querySelector('meta[property="og:image"]');
    if (metaTag) {
      metaTag.setAttribute('content', ogImageUrl);
    } else {
      const newMetaTag = document.createElement('meta');
      newMetaTag.setAttribute('property', 'og:image');
      newMetaTag.setAttribute('content', ogImageUrl);
      document.head.appendChild(newMetaTag);
    }
  }, [ogImageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const generatePostLink = () => {
    const baseUrl = 'https://yourdomain.com/post/';
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    return `${baseUrl}${uniqueId}`;
  };

  const createPost = () => {
    const link = generatePostLink();
    setPostLink(link);
    // Here you would typically save the post data to your backend
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 mb-4"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 mb-4"
        rows="4"
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={createPost}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mb-4"
      >
        Create Post
      </button>
      <OGImageGenerator
        title={title}
        content={content}
        image={image}
        setOgImageUrl={setOgImageUrl}
      />
     {postLink && (
  <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4 shadow-md">
    <div className="flex items-center mb-2">
      <img src="/your-logo.png" alt="Logo" className="w-6 h-6 mr-2 rounded-full" />
      <span className="text-sm text-gray-500">yourdomain.com</span>
    </div>
    <h2 className="text-lg font-semibold mb-2">{title || 'Post Title'}</h2>
    <p className="text-sm text-gray-600 mb-2">
      {content.length > 100 ? content.slice(0, 100) + '...' : content}
    </p>
    {image && <img src={image} alt="Post" className="w-full rounded-md mb-2" />}
    <a
      href={postLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline text-sm"
    >
      {postLink}
    </a>
  </div>
)}
      <div className="mt-8 bg-gray-100 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title || 'Post Title'}</h2>
        <p className="text-gray-600 mb-4">{content || 'Post content will appear here...'}</p>
        {image && <img src={image} alt="Post" className="w-full rounded-lg shadow-md" />}
      </div>
    </div>
  );
};

export default PostPage;