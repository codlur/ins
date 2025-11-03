"use client";

export default function ListBusinessPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">List Your Business</h1>
          <p className="text-muted-foreground mt-2">
            Showcase your newsletter or news platform
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Business Listing</h2>
        <p className="text-muted-foreground mb-4">
          Get your AI and technology business, newsletter, or news platform featured on our platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Newsletters</h3>
            <p className="text-sm text-muted-foreground">
              Have an AI or technology-focused newsletter? Get it listed in our RSS feed aggregation.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">News Platforms</h3>
            <p className="text-sm text-muted-foreground">
              Run an AI or technology news platform? Have your content featured alongside other sources.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">How to List</h3>
          <p className="text-muted-foreground mb-4">
            To get your business listed, please provide the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Business name and description</li>
            <li>Website URL</li>
            <li>RSS feed URL (for newsletters and news platforms)</li>
            <li>Contact information</li>
            <li>Category/Tags</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Contact Us</h3>
          <p className="text-muted-foreground">
            To list your business, please contact us at{' '}
            <a href="mailto:list@acces.com" className="text-primary hover:underline">
              list@acces.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}