"use client";

import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, MessageCircle, ArrowBigUp } from "lucide-react";
import Link from "next/link";
import { BookmarkButton } from "@/components/bookmark-button";

export default function ProductsPage() {
  // Mock product data
  const products = [
    { 
      id: "1", 
      name: "AI Research Assistant", 
      description: "Advanced AI-powered research tool", 
      status: "Active" 
    },
    { 
      id: "2", 
      name: "Machine Learning Platform", 
      description: "End-to-end ML development suite", 
      status: "Active" 
    },
    { 
      id: "3", 
      name: "Natural Language Processor", 
      description: "State-of-the-art NLP engine", 
      status: "Beta" 
    },
    { 
      id: "4", 
      name: "Computer Vision Suite", 
      description: "Image recognition and analysis toolkit", 
      status: "Active" 
    },
    { 
      id: "5", 
      name: "Predictive Analytics Engine", 
      description: "Forecasting and trend analysis system", 
      status: "Inactive" 
    },
    { 
      id: "6", 
      name: "Neural Network Designer", 
      description: "Visual deep learning model builder", 
      status: "Active" 
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage and view your AI products and services
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                {/* Logo placeholder - in a real app this would be an actual logo */}
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">LOGO</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
              
              <BookmarkButton 
                item={{
                  type: 'product',
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  status: product.status
                }}
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted flex-shrink-0"
              />
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <ArrowBigUp className="h-4 w-4 mr-1" />
                  <span>24</span>
                </button>
                <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>8</span>
                </button>
              </div>
              
              <Button variant="outline" size="sm" asChild>
                <Link href={`/app/products/${product.id}`}>
                  <FileText className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}