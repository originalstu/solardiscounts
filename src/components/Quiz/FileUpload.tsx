import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, FileText, Upload } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export default function FileUpload({ files, onChange }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file sizes
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    // Limit to 4 files total
    const totalFiles = [...files, ...validFiles].slice(0, 4);
    onChange(totalFiles);
  }, [files, onChange]);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  });

  return (
    <div className="space-y-4">
      {files.length < 4 && (
        <div
          {...getRootProps()}
          className={`w-full p-6 bg-white/10 backdrop-blur border-2 ${
            isDragActive ? 'border-white' : 'border-dashed border-white/20'
          } rounded-xl text-center cursor-pointer transition-colors`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-2 text-white/80" />
          <p className="text-white/90 mb-2">
            {isDragActive ? 'Drop files here' : 'Click or drag files here'}
          </p>
          <p className="text-sm text-white/60">
            Upload your electricity bill
            <br />
            (PDF or images up to 10MB each)
          </p>
          <p className="text-sm text-white/60 mt-2">
            {4 - files.length} more file{4 - files.length !== 1 ? 's' : ''} allowed
          </p>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white/10 backdrop-blur p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-white">
                <FileText className="h-4 w-4 text-white/80" />
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-white/60">
                  ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                type="button"
              >
                <X className="h-4 w-4 text-white/80" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}