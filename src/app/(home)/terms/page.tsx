import Footer from "@/components/Footer";
import NavBarHome from "@/components/NavBarHome";

export default function Home(){
  return (
    <>
    <NavBarHome/>
    <main className="max-w-4xl mx-auto mt-5 px-6 py-12 text-gray-300">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: June 23, 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Retube  (&quot; the Service &quot;) , you agree to be bound by these Terms of Service.
            If you do not agree, please do not use the Service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. User Roles</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Primary Users</strong> are content owners who connect their YouTube account and invite Secondary Users.
            </li>
            <li>
              <strong>Secondary Users</strong> are collaborators who upload content for approval by Primary Users.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. YouTube Integration</h2>
          <p>
            Primary Users must authorize Retube to access their YouTube account using Google OAuth. This access allows us to
            upload videos on your behalf. You may revoke access at any time from your Google Account settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Content Ownership</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All uploaded content belongs to the Primary User&apos;s channel.</li>
            <li>Secondary Users agree that content they upload is subject to approval and may not be published.</li>
            <li>Retube does not claim ownership of any video content submitted.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Invite Token System</h2>
          <p>
            Primary Users generate invite tokens to allow Secondary Users to link to their workspace. You are responsible for
            managing your invite tokens securely.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep your login credentials secure.</li>
            <li>Do not upload content that violates YouTube’s terms or community guidelines.</li>
            <li>Use the service only for lawful purposes.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>Retube is not liable for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Loss of content due to revoked OAuth access</li>
            <li>Issues caused by YouTube API outages or restrictions</li>
            <li>Unauthorized use of invite tokens</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to the Service at our discretion, particularly in case of
            abuse, misuse, or violation of these terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">9. Modifications</h2>
          <p>
            We may update these terms periodically. Continued use of Retube after changes indicates acceptance of the new
            terms.
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