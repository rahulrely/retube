import Footer from "@/components/Footer";

import NavBarHome from "@/components/NavBarHome";

export default function Home(){
  return (
    <>
    <NavBarHome/>
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: June 23, 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Retube is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect
            your personal information when you use our platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Email address and authentication information (via email or Google OAuth)</li>
            <li>Google account ID and refresh token (only for Primary Users)</li>
            <li>Video metadata (title, instructions, upload paths)</li>
            <li>Basic role-based data (Primary or Secondary)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To authenticate users and manage roles</li>
            <li>To link YouTube accounts securely for video publishing</li>
            <li>To store video uploads and track their status</li>
            <li>To send system notifications and support responses</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Google OAuth Usage</h2>
          <p>
            We use Google OAuth to allow Primary Users to securely connect their YouTube channel. This includes access to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload videos to the connected YouTube channel</li>
            <li>Retrieve channel metadata for display</li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> read, modify, or access any data beyond the authorized scopes. Users can revoke access
            at any time via their Google Account settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
          <p>
            We retain data only as long as necessary to operate the platform. Users may request account deletion or data
            removal at any time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Sharing Your Information</h2>
          <p>
            We do <strong>not</strong> share your personal information with third parties except as required by law or for
            legal compliance (e.g., YouTube API services).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Security</h2>
          <p>
            We implement strong security practices, including hashed passwords, OAuth token encryption, and secure storage of
            video content metadata.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. You will be notified of significant changes via email or app
            notification.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:aksrahul@hotmail.com" className="text-blue-600 hover:underline">
              aksrahul@hotmail.com
            </a>.
          </p>
        </div>
      </section>

      <footer className="mt-12 text-sm text-gray-500 text-center">
        &copy; 2025 Retube. All rights reserved.
      </footer>
    </main>
    <Footer/>
    </>
)};