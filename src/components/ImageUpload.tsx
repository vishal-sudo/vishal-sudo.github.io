'use client';

import { useState, useRef, DragEvent } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image URL" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    
    try {
      // Convert to base64 for local storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? 'border-purple-500 bg-purple-500/10' 
            : 'border-gray-700 hover:border-gray-600'
        }`}
      >
        {value ? (
          <div className="space-y-3">
            <img src={value} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Change Image
              </button>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center">
              {uploading ? (
                <div className="text-purple-400">Uploading...</div>
              ) : (
                <Upload className="w-10 h-10 text-gray-600" />
              )}
            </div>
            <p className="text-gray-500 text-sm">
              Drag & drop an image here, or
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              browse files
            </button>
          </div>
        )}
      </div>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-900 px-2 text-gray-500">Or use URL</span>
        </div>
      </div>
      
      <input
        type="url"
        value={value}
        onChange={handleUrlChange}
        placeholder="https://example.com/image.jpg"
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
      />
    </div>
  );
}

function Upload({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
}
