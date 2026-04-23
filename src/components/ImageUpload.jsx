import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadMenuImage } from '../lib/supabase';

/**
 * ImageUpload Component
 * Handles file selection via drag-drop or click-to-browse
 * Provides live preview and validation
 * 
 * @param {Object} props
 * @param {string} props.currentImage - URL of existing image (for edit mode)
 * @param {Function} props.onImageSelect - Callback with {file, preview, url, error}
 * @param {Function} props.onUploadStart - Called when upload begins
 * @param {Function} props.onUploadComplete - Called when upload finishes
 * @param {boolean} props.required - Whether image is required
 */
export default function ImageUpload({
  currentImage = null,
  onImageSelect = () => {},
  onUploadStart = () => {},
  onUploadComplete = () => {},
  required = false
}) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const validateFile = (file) => {
    if (!file) {
      setError('No file selected');
      return false;
    }

    if (file.size > MAX_SIZE) {
      setError('File size must be less than 5MB');
      return false;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileSelect = async (file) => {
    if (!validateFile(file)) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    setUploading(true);
    onUploadStart();

    const { url, error: uploadError } = await uploadMenuImage(file);

    if (uploadError) {
      setError(uploadError);
      setPreview(null);
      setUploading(false);
      onUploadComplete({ url: null, error: uploadError });
      return;
    }

    setUploadedUrl(url);
    setError(null);
    setUploading(false);
    onUploadComplete({ url, error: null });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setUploadedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect({ file: null, preview: null, url: null, error: null });
  };

  // Determine which image to display
  const displayImage = preview || uploadedUrl || currentImage;

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative w-full p-6 rounded-2xl border-2 border-dashed
          cursor-pointer transition-all duration-200
          ${
            isDragActive
              ? 'border-amber-900 bg-amber-50'
              : 'border-stone-200 bg-stone-50 hover:border-amber-900/50 hover:bg-amber-50/30'
          }
          ${uploading ? 'opacity-70 cursor-wait' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleInputChange}
          disabled={uploading}
          className="hidden"
          aria-label="Upload image"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-amber-900 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-stone-300" />
          )}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
              {uploading ? 'Uploading...' : 'Drag & Drop or Click'}
            </p>
            <p className="text-[10px] text-stone-400 mt-1">
              JPEG, PNG, WebP • Max 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {displayImage && (
        <div className="relative w-full rounded-2xl overflow-hidden border border-stone-100 bg-stone-50">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          {!uploading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="
                absolute top-3 right-3 p-2
                bg-red-500/90 hover:bg-red-600
                text-white rounded-lg transition-colors
              "
              title="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-xs font-semibold text-red-600">{error}</p>
        </div>
      )}

      {/* Upload Success Message */}
      {uploadedUrl && !uploading && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="text-xs font-semibold text-green-600">✓ Image uploaded successfully</p>
        </div>
      )}

      {/* No Image Notice (when required) */}
      {required && !displayImage && !error && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-xs font-semibold text-amber-700">Image is required</p>
        </div>
      )}
    </div>
  );
}
