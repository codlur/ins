"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Image, Upload, Eye, ExternalLink } from "lucide-react";
import { useUser } from "@/contexts/user-context";

export default function CreateProductPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);

  // Redirect non-premium users to premium page
  useEffect(() => {
    if (!user.isPremium) {
      router.replace("/app/premium-sign-up");
    }
  }, [user.isPremium, router]);

  // Don't render the page if user is not premium
  if (!user.isPremium) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
          <p className="text-muted-foreground mb-6">
            Product creation is only available for premium users. Upgrade your account to access this feature.
          </p>
          <Button onClick={() => router.push("/app/premium-sign-up")}>
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  const handleCreate = () => {
    console.log("Creating product:", { 
      productName, 
      productCategory, 
      productDescription,
      productImages 
    });
    // Here you would typically make an API call to create the product
    alert("Product created successfully!");
    
    // Reset form fields
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setProductImages([]);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      // Limit to 4 images
      const newImages = files.slice(0, 4 - productImages.length);
      setProductImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-6">
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold">Create Product</h2>
            <p className="text-sm text-muted-foreground">Add a new product to your portfolio</p>
          </div>
          <div className="space-y-6">
            {isPreviewMode ? (
              <div className="space-y-6 p-6 bg-background rounded-lg border">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Logo */}
                    <div className="bg-muted rounded-lg w-24 h-24 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-muted-foreground" />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{productName || "Product Name"}</h1>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                          {productCategory || "Category"}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 max-w-2xl">{productDescription || "Product description will appear here..."}</p>
                      
                      <Button>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-muted my-6"></div>
                
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-muted">
                  <Button variant="ghost" className="border-b-2 border-primary rounded-none px-0">
                    Overview
                  </Button>
                  <Button variant="ghost" className="rounded-none px-0">
                    Launches
                  </Button>
                  <Button variant="ghost" className="rounded-none px-0">
                    Use Cases
                  </Button>
                  <Button variant="ghost" className="rounded-none px-0">
                    Team
                  </Button>
                </div>
                
                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Overview */}
                    <section>
                      <h2 className="text-2xl font-bold mb-4">Overview</h2>
                      <p className="text-muted-foreground">{productDescription || "Product description will appear here..."}</p>
                    </section>
                    
                    {/* Use Cases */}
                    <section>
                      <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                          <span>Use case 1</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                          <span>Use case 2</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                          <span>Use case 3</span>
                        </li>
                      </ul>
                    </section>
                  </div>
                  
                  {/* Media Section */}
                  <div className="space-y-6">
                    <div className="pb-4 border-b border-muted mb-4">
                      <h3 className="text-lg font-semibold">Media</h3>
                      <p className="text-sm text-muted-foreground">Images and videos showcasing the product</p>
                    </div>
                    <div className="space-y-4">
                      {/* Images */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Images</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {productImages.length > 0 ? (
                            productImages.map((_, index) => (
                              <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                <Image className="h-8 w-8 text-muted-foreground" />
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                <Image className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                <Image className="h-8 w-8 text-muted-foreground" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Product Logo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="product-logo">Product Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg bg-muted border-2 border-dashed flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        Square with rounded corners
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                {/* Product Category/Niche */}
                <div className="space-y-2">
                  <Label htmlFor="product-category">Product Niche / Category</Label>
                  <Input
                    id="product-category"
                    placeholder="Enter product category or niche"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  />
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Describe your product"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Product Images/Videos */}
                <div className="space-y-2">
                  <Label>Images/Video (16:9 ratio, max 4)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Preview existing images */}
                    {productImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <Image className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {/* Add new image button (only show if less than 4 images) */}
                    {productImages.length < 4 && (
                      <div>
                        <label className="block aspect-video bg-muted border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                          <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Add Media</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {productImages.length}/4 images or videos (16:9 ratio)
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? "Edit" : "Preview"}
              </Button>
              {!isPreviewMode && (
                <Button onClick={handleCreate}>Create Product</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}