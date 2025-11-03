"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQDoc() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4 pl-0">
            <Link href="/docs">← Back to Documentation</Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Answers to common questions and troubleshooting tips.
          </p>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none mt-6 space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-semibold">How do I reset my password?</h3>
          <p>
            If you've forgotten your password, you can reset it by clicking the "Forgot Password" link 
            on the login page. Enter your email address and follow the instructions sent to your inbox.
          </p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-semibold">How do I upgrade to Premium?</h3>
          <p>
            You can upgrade to Premium by visiting the Premium section in your account. 
            Premium users get access to additional features like creating launches and products, 
            advanced search filters, and priority support.
          </p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-semibold">How do I cancel my subscription?</h3>
          <p>
            You can cancel your subscription at any time from the Billing section of your account settings. 
            Your subscription will remain active until the end of your current billing period.
          </p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-semibold">Why isn't my content appearing?</h3>
          <p>
            All content submitted to Acces goes through a review process to ensure quality and 
            adherence to our community guidelines. This process typically takes 24-48 hours. 
            If your content hasn't appeared after 48 hours, please contact support.
          </p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-semibold">How do I report inappropriate content?</h3>
          <p>
            You can report inappropriate content by clicking the three dots menu on any post and 
            selecting "Report". Our moderation team will review the content and take appropriate action.
          </p>
        </div>
        
        <div className="pb-4">
          <h3 className="font-semibold">How do I contact support?</h3>
          <p>
            You can contact our support team through the Contact Support button in the documentation, 
            or by emailing support@insearch.com. We typically respond within 24 hours.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button asChild size="sm">
          <Link href="/docs/user-guide">← Previous: User Guide</Link>
        </Button>
        <div></div> {/* Empty div for spacing */}
      </div>
    </div>
  );
}