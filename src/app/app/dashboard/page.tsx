"use client";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
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
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
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
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would go here</p>
            </div>
          </div>
        </div>
        
        <div className="col-span-3">
          <div className="pb-4 border-b border-muted mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">You have 5 new activities this week.</p>
          </div>
          <div>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="flex items-center" key={item}>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Activity {item}</p>
                    <p className="text-sm text-muted-foreground">
                      Description of activity {item}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+${item * 100}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}