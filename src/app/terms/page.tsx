import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-light">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-light mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using Insearch, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this site.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Insearch 
              for personal, non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
            
            <h2 className="text-xl font-light mt-8 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Insearch are provided on an &apos;as is&apos; basis. Insearch makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall Insearch or its suppliers be liable for any damages whatsoever 
              arising out of the use or inability to use the materials on Insearch, even if 
              Insearch or an authorized representative has been notified orally or in writing 
              of the possibility of such damage.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Insearch could include technical, typographical, or 
              photographic errors. Insearch does not warrant that any of the materials on its 
              website are accurate, complete or current.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">6. Changes to Terms</h2>
            <p>
              Insearch may revise these terms of service for its website at any time without notice. 
              By using this website you are agreeing to be bound by the then current version of 
              these terms of service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}