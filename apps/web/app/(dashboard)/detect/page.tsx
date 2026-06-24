'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Upload, X, Loader2, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function DetectPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles = [...files, ...accepted].slice(0, 4);
    setFiles(newFiles);
    setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 4,
    maxSize: 10 * 1024 * 1024,
  });

  const removeImage = (i: number) => {
    const f = files.filter((_, idx) => idx !== i);
    const p = previews.filter((_, idx) => idx !== i);
    setFiles(f);
    setPreviews(p);
  };

  const handleDetect = async () => {
    if (!files.length) return toast.error('Please upload at least one image');
    setLoading(true);
    try {
      const token = localStorage.getItem('pdds_token');
      const formData = new FormData();
      files.forEach((f) => formData.append('images', f));

      const { data } = await axios.post(`${API}/api/v1/detect/`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        router.push(`/detect/${data.data.detection_id}`);
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Detection failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl font-bold text-parchment mb-2">Detect Disease</h1>
      <p className="text-mint-300/60 mb-10">Upload 1–4 photos of your plant for best accuracy</p>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                    transition-all duration-200
                    ${isDragActive
                      ? 'border-chlorophyll-500 bg-chlorophyll-500/10'
                      : 'border-forest-700 hover:border-chlorophyll-500/50 hover:bg-forest-800/50'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-chlorophyll-500" size={48} />
        <p className="text-parchment font-semibold text-lg">
          {isDragActive ? 'Drop images here' : 'Drag & drop plant images here'}
        </p>
        <p className="text-mint-300/50 text-sm mt-2">or click to browse · JPEG, PNG, WebP · max 10MB each · up to 4 images</p>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-6">
          {previews.map((src, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
              <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500/80 rounded-full p-0.5 hover:bg-red-500"
              >
                <X size={14} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-forest-900/80 text-xs px-2 py-0.5 rounded-full text-chlorophyll-400">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="card mt-6 flex gap-3">
        <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-mint-300/70">
          <strong className="text-parchment">Tips for better accuracy:</strong> Include the affected leaf, 
          stem, and surrounding healthy tissue. Natural daylight gives the best results.
        </div>
      </div>

      {/* Detect button */}
      <button
        onClick={handleDetect}
        disabled={!files.length || loading}
        className="btn-primary w-full mt-8 flex items-center justify-center gap-3 text-lg
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Analyzing {files.length} image{files.length > 1 ? 's' : ''}...
          </>
        ) : (
          <>🔬 Detect Disease</>
        )}
      </button>
    </div>
  );
}
