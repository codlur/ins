"use client";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
            Download
          </button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <line x1="3" y1="3" x2="21" y2="21"></line>
              <path d="M12 3v18"></path>
              <path d="M3 12h18"></path>
            </svg>
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground pt-1">+20.1% from last month</p>
          </div>
        </div>
        
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Subscriptions</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground pt-1">+180.1% from last month</p>
          </div>
        </div>
        
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Sales</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground pt-1">+19% from last month</p>
          </div>
        </div>
        
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Active Now</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground pt-1">+201 since last hour</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="pb-4 border-b border-muted mb-4">
            <h3 className="text-lg font-semibold">Overview</h3>
          </div>
          <div className="pl-2">
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would go here</p>
            </div>
          </div>
        </div>
        
        <div className="col-span-3">
          <div className="pb-4 border-b border-muted mb-4">
            <h3 className="text-lg font-semibold">Recent Sales</h3>
            <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
          </div>
          <div>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="flex items-center" key={item}>
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Olivia Martin</p>
                    <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                  </div>
                  <div className="font-medium">+$1,999.00</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}