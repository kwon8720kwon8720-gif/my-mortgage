import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy | Mortgage Calculator",
  description: "Privacy policy for the mortgage calculator tool.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-700">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Information We Collect</h2>
              <p>
                This mortgage calculator operates entirely in your browser. We do not collect, store, or transmit any personal information or calculation data to our servers. All calculations are performed locally on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Cookies and Tracking</h2>
              <p>
                We may use standard web analytics tools that collect anonymous usage statistics. These tools do not identify individual users or collect personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Third-Party Services</h2>
              <p>
                This website may use third-party services for analytics and hosting. These services have their own privacy policies governing data collection and use.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact</h2>
              <p>
                If you have questions about this privacy policy, please visit our{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  contact page
                </a>
                .
              </p>
            </div>

            <div className="text-sm text-slate-600 pt-4 border-t border-slate-200">
              <p>Last updated: January 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

