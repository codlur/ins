import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-light">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-light mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              subscribe to our newsletter, or communicate with us. This information may include your 
              name, email address, and any other information you choose to provide.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Personalize your experience on our platform</li>
            </ul>
            
            <h2 className="text-xl font-light mt-8 mb-4">3. Information Sharing</h2>
            <p>
              We do not share, sell, rent, or trade your personal information with third parties 
              for their commercial purposes. We may share information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
              <li>To prevent fraud or criminal activity</li>
            </ul>
            
            <h2 className="text-xl font-light mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security 
              of your personal information. However, no method of transmission over the Internet or 
              electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. 
              You may also have the right to restrict or object to our processing of your personal 
              information in certain circumstances.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            
            <h2 className="text-xl font-light mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at: 
              privacy@insearch.example.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}