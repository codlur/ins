"use client";

import { Button } from "@/components/ui/button";
import { FileText, PlusCircle } from "lucide-react";
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
      
      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={product.id}>
            <div className="pb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
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
                  className="h-6 w-6 hover:bg-muted flex-shrink-0"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-medium ${
                    product.status === "Active" ? "text-green-600" : 
                    product.status === "Beta" ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {product.status}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/app/products/${product.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
              </div>
            </div>
            {index < products.length - 1 && (
              <div className="border-b border-muted"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}