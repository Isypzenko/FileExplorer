import { ArrowRight, FolderOpen, Upload, FileText } from "lucide-react";
import { Button } from "./ui/Button";

interface DescribeProps {
  onStart: () => void;
}

export const Describe = ({ onStart }: DescribeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            File Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern file manager with navigation, upload, and file preview
            capabilities — all in your browser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Navigation</h3>
            <p className="text-sm text-gray-600">
              Browse folders easily with back/forward controls
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Upload</h3>
            <p className="text-sm text-gray-600">
              Drag & drop or select files to upload
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Preview</h3>
            <p className="text-sm text-gray-600">
              Open images, text, PDFs, and more directly
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button
            onClick={onStart}
            size="lg"
            className="group inline-flex items-center gap-2 text-lg px-8 py-6"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
