"use client";

export default function AdvertisePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Advertise</h1>
          <p className="text-muted-foreground mt-2">
            Promote your business with us
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Advertising Opportunities</h2>
        <p className="text-muted-foreground mb-4">
          Reach our engaged audience of AI and technology enthusiasts through various advertising options.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Banner advertisements on our news feed</li>
          <li>Sponsored content and articles</li>
          <li>Newsletter sponsorships</li>
          <li>Social media promotions</li>
          <li>Targeted advertising based on user interests</li>
        </ul>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Contact Us</h3>
          <p className="text-muted-foreground">
            For advertising inquiries, please contact us at{' '}
            <a href="mailto:advertise@acces.com" className="text-primary hover:underline">
              advertise@acces.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}