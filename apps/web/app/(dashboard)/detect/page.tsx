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
    setFiles(files.filter((_, idx) => idx !== i));
    setPreviews(previews.filter((_, idx) => idx !== i));
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
      if (data.success) router.push(`/detect/${data.data.detection_id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Detection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto" style={{ backgroundColor: '#0A1A0F' }}>
      <h1 className="font-display text-4xl font-bold mb-2" style={{ color: '#F5F0E8' }}>Detect Disease</h1>
      <p className="mb-10" style={{ color: 'rgba(168,230,207,0.6)' }}>Upload 1–4 photos of your plant for best accuracy</p>

      <div {...getRootProps()} className="relative rounded-2xl p-12 text-center cursor-pointer transition-all duration-200"
        style={{
          border: `2px dashed ${isDragActive ? '#2ECC71' : '#2A5232'}`,
          backgroundColor: isDragActive ? 'rgba(46,204,113,0.1)' : 'transparent',
        }}>
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4" size={48} style={{ color: '#2ECC71' }} />
        <p className="font-semibold text-lg" style={{ color: '#F5F0E8' }}>
          {isDragActive ? 'Drop images here' : 'Drag & drop plant images here'}
        </p>
        <p className="text-sm mt-2" style={{ color: 'rgba(168,230,207,0.5)' }}>
          or click to browse · JPEG, PNG, WebP · max 10MB · up to 4 images
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-6">
          {previews.map((src, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
              <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
              <button onClick={() => removeImage(i)}
                className="absolute top-1 right-1 rounded-full p-0.5"
                style={{ backgroundColor: 'rgba(239,68,68,0.8)' }}>
                <X size={14} color="white" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'rgba(10,26,15,0.8)', color: '#2ECC71' }}>Primary</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card mt-6 flex gap-3">
        <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#E8B84B' }} />
        <div className="text-sm" style={{ color: 'rgba(168,230,207,0.7)' }}>
          <strong style={{ color: '#F5F0E8' }}>Tips for better accuracy:</strong> Include the affected leaf,
          stem, and surrounding healthy tissue. Natural daylight gives the best results.
        </div>
      </div>

      <button onClick={handleDetect} disabled={!files.length || loading}
        className="btn-primary w-full mt-8 flex items-center justify-center gap-3 text-lg"
        style={{ opacity: !files.length || loading ? 0.5 : 1, cursor: !files.length || loading ? 'not-allowed' : 'pointer' }}>
        {loading ? <><Loader2 className="animate-spin" size={20} />Analyzing...</> : <>🔬 Detect Disease</>}
      </button>
    </div>
  );
}
