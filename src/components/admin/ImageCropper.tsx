"use client";

import { useState, useRef, useEffect } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";

interface ImageCropperProps {
  image: string;
  onCrop: (croppedImage: Blob) => void;
  aspectRatio?: number;
}

export function ImageCropper({ image, onCrop, aspectRatio = 3/4 }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    );
    
    setCrop(crop);
  }

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
      canvasDraw(completedCrop);
    }
  }, [completedCrop, scale, rotate]);

  function canvasDraw(crop: Crop) {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;

    // Get accurate dimensions
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate dimensions taking into account scale and rotation
    const pixelRatio = window.devicePixelRatio;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    canvas.width = cropWidth * pixelRatio;
    canvas.height = cropHeight * pixelRatio;

    // Scale canvas according to device pixel ratio
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    // Calculate translation and rotation center for transformed image
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    // Clear canvas and set new translation + rotation
    ctx.save();
    ctx.translate(-crop.x * scaleX, -crop.y * scaleY);
    ctx.translate(centerX, centerY);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    
    // Draw the image
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
    
    ctx.restore();
  }

  // Apply the crop and send the result
  const handleCropComplete = async () => {
    if (!completedCrop || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      
      // Convert canvas content to a blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            throw new Error("Canvas to Blob conversion failed");
          }
        }, 'image/jpeg', 0.95);
      });
      
      onCrop(blob);
    } catch (error) {
      console.error("Error creating cropped image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow-0 flex-shrink-0">
          <div className="mb-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              minWidth={50}
              minHeight={50}
            >
              {/* Using regular img tag instead of Next.js Image component */}
              <img
                ref={imgRef}
                src={image}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ 
                  maxHeight: '60vh',
                  maxWidth: '100%',
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                  transformOrigin: 'center'
                }}
              />
            </ReactCrop>
          </div>
          
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Zoom: {Math.round(scale * 100)}%</p>
              <Slider
                min={0.5}
                max={3}
                step={0.01}
                value={[scale]}
                onValueChange={(values) => setScale(values[0])}
                className="max-w-xs"
              />
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Rotate: {rotate}°</p>
              <Slider
                min={-180}
                max={180}
                step={1}
                value={[rotate]}
                onValueChange={(values) => setRotate(values[0])}
                className="max-w-xs"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-grow-0 flex-shrink-0">
          <div className="mb-2">
            <p className="text-sm font-medium mb-2">Preview</p>
            <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm aspect-[3/4] w-48 flex items-center justify-center">
              {completedCrop ? (
                <canvas
                  ref={canvasRef}
                  style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
              ) : (
                <div className="text-gray-400 text-sm text-center p-4">
                  Adjust the crop area to see preview
                </div>
              )}
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleCropComplete}
            disabled={!completedCrop || isProcessing}
            className="mt-4 px-4 py-2 bg-[#8b1a1a] rounded-md text-sm font-medium text-white hover:bg-[#8b1a1a]/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Apply Crop"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}