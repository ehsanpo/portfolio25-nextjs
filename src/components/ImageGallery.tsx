"use client";

import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "./cards/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui//Badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Heart,
  Maximize2,
} from "lucide-react";
import { cn } from "../lib/cn";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  tags?: string[];
  photographer?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  variant?: "grid" | "masonry" | "carousel";
  columns?: 2 | 3 | 4 | 5;
  showTags?: boolean;
  showInfo?: boolean;
  allowDownload?: boolean;
  className?: string;
}

export function ImageGallery({
  images,
  variant = "grid",
  columns = 3,
  showTags = true,
  showInfo = true,
  allowDownload = false,
  className,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLiked, setIsLiked] = useState<{ [key: string]: boolean }>({});

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
    setZoom(1);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    setZoom(1);
  };

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
      setZoom(1);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
      setZoom(1);
    }
  };

  const toggleLike = (imageId: string) => {
    setIsLiked((prev) => ({ ...prev, [imageId]: !prev[imageId] }));
  };

  const handleDownload = (image: GalleryImage) => {
    const link = document.createElement("a");
    link.href = image.src;
    link.download = `${image.title || "image"}.jpg`;
    link.click();
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: image.src,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "+":
        case "=":
          setZoom((prev) => Math.min(prev + 0.25, 3));
          break;
        case "-":
          setZoom((prev) => Math.max(prev - 0.25, 0.5));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImage]);

  const getGridClasses = () => {
    const columnClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    };
    return columnClasses[columns];
  };

  const renderImage = (image: GalleryImage, index: number) => (
    <div
      key={image.id}
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onClick={() => openLightbox(index)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex items-center space-x-2">
          <Button variant="glass" size="sm" className="text-white">
            <ZoomIn size={16} />
          </Button>
          <Button variant="glass" size="sm" className="text-white">
            <Maximize2 size={16} />
          </Button>
        </div>
      </div>

      {/* Image Info Overlay */}
      {showInfo && (image.title || image.photographer) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {image.title && (
            <h4 className="font-basement text-sm font-semibold mb-1">
              {image.title}
            </h4>
          )}
          {image.photographer && (
            <p className="text-xs font-kabel opacity-80">
              by {image.photographer}
            </p>
          )}
        </div>
      )}

      {/* Tags */}
      {showTags && image.tags && image.tags.length > 0 && (
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {image.tags.slice(0, 2).map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              variant="glass"
              className="text-xs text-white"
            >
              {tag}
            </Badge>
          ))}
          {image.tags.length > 2 && (
            <Badge variant="glass" className="text-xs text-white">
              +{image.tags.length - 2}
            </Badge>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={cn("w-full", className)}>
        {variant === "grid" && (
          <div className={cn("grid gap-4", getGridClasses())}>
            {images.map((image, index) => (
              <div key={image.id} className="aspect-square">
                {renderImage(image, index)}
              </div>
            ))}
          </div>
        )}

        {variant === "masonry" && (
          <div
            className={cn(
              "columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4",
              columns === 4 && "lg:columns-4",
              columns === 5 && "xl:columns-5"
            )}
          >
            {images.map((image, index) => (
              <div key={image.id} className="break-inside-avoid">
                {renderImage(image, index)}
              </div>
            ))}
          </div>
        )}

        {variant === "carousel" && (
          <div className="relative">
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
              {images.map((image, index) => (
                <div key={image.id} className="flex-shrink-0 w-80 aspect-video">
                  {renderImage(image, index)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="glass"
            size="sm"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white"
          >
            <X size={20} />
          </Button>

          {/* Navigation Buttons */}
          {selectedImage > 0 && (
            <Button
              variant="glass"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white"
            >
              <ChevronLeft size={24} />
            </Button>
          )}

          {selectedImage < images.length - 1 && (
            <Button
              variant="glass"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white"
            >
              <ChevronRight size={24} />
            </Button>
          )}

          {/* Image Controls */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setZoom((prev) => Math.min(prev + 0.25, 3))}
              className="text-white"
            >
              <ZoomIn size={16} />
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.5))}
              className="text-white"
            >
              <ZoomOut size={16} />
            </Button>
            <span className="text-white text-sm font-kabel bg-black/50 px-2 py-1 rounded">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-10">
            <Button
              variant="glass"
              size="sm"
              onClick={() => toggleLike(images[selectedImage].id)}
              className="text-white"
            >
              <Heart
                size={16}
                className={
                  isLiked[images[selectedImage].id]
                    ? "fill-current text-error-500"
                    : ""
                }
              />
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => handleShare(images[selectedImage])}
              className="text-white"
            >
              <Share2 size={16} />
            </Button>
            {allowDownload && (
              <Button
                variant="glass"
                size="sm"
                onClick={() => handleDownload(images[selectedImage])}
                className="text-white"
              >
                <Download size={16} />
              </Button>
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 z-10">
            <Badge variant="glass" className="text-white">
              {selectedImage + 1} / {images.length}
            </Badge>
          </div>

          {/* Main Image */}
          <div className="max-w-[90vw] max-h-[90vh] overflow-auto">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {/* Image Info */}
          {showInfo &&
            (images[selectedImage].title ||
              images[selectedImage].description) && (
              <Card
                variant="glass"
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-md"
              >
                <div className="p-4 text-center">
                  {images[selectedImage].title && (
                    <h3 className="font-basement text-white text-lg mb-2">
                      {images[selectedImage].title}
                    </h3>
                  )}
                  {images[selectedImage].description && (
                    <p className="text-white/80 font-kabel text-sm">
                      {images[selectedImage].description}
                    </p>
                  )}
                  {images[selectedImage].photographer && (
                    <p className="text-white/60 font-kabel text-xs mt-2">
                      Photo by {images[selectedImage].photographer}
                    </p>
                  )}
                </div>
              </Card>
            )}
        </div>
      )}
    </>
  );
}
