import Footer from "@/components/Footer";

import NavBarHome from "@/components/NavBarHome";

export default function Home() {
  return (
    <>
    <NavBarHome/>
    <section className="max-w-5xl mx-auto p-6 space-y-10">
  <div className="space-y-4">
    <h1 className="text-4xl font-bold">About Retube</h1>
    <p className="text-lg">
      Retube is a collaborative platform that allows content contributors (Secondary Users) to submit video content to a YouTube channel owned by a Primary User. All content is subject to approval by the Primary User before being published to their YouTube channel.
    </p>
  </div>

  <div className="space-y-3">
    <h2 className="text-2xl font-semibold">How Retube Works</h2>
    <ol className="list-decimal list-inside space-y-1">
      <li>Sign up using email and password.</li>
      <li>Choose a role: <strong>Primary</strong> or <strong>Secondary</strong>.</li>
      <li><strong>Primary Users</strong> link their YouTube account using Google OAuth and get an invite token.</li>
      <li><strong>Secondary Users</strong> join a Primary User using the invite token.</li>
      <li>Secondary Users upload videos to Retube.</li>
      <li>Primary Users review uploaded videos and approve or reject them.</li>
      <li>Approved videos are uploaded directly to the Primary User&apos;s YouTube channel.</li>
    </ol>
  </div>

  <div className="space-y-3">
    <h2 className="text-2xl font-semibold">Key Features</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Role-based access system: Primary & Secondary users</li>
      <li>Secure Google account linking using OAuth 2.0</li>
      <li>Invite token system for user pairing</li>
      <li>Pending video approval workflow</li>
      <li>Automatic upload to YouTube on approval</li>
      <li>Secure refresh token storage and Google ID mapping</li>
    </ul>
  </div>

  <div className="space-y-3">
    <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Account Responsibility:</strong> Users are responsible for keeping their credentials secure.</li>
      <li><strong>YouTube Integration:</strong> By linking your YouTube account, you authorize Retube to upload videos using your channel.</li>
      <li><strong>Data Usage:</strong> We store only necessary information such as your email, Google ID, and refresh token (for Primary Users).</li>
      <li><strong>Content Ownership:</strong> All videos belong to the Primary User’s channel. Secondary Users acknowledge their videos are subject to approval.</li>
      <li><strong>Token Linking:</strong> Primary Users are responsible for sharing and revoking their invite tokens as needed.</li>
      <li><strong>Third-Party Dependency:</strong> Our service depends on YouTube API availability and may break if tokens are revoked or scopes are changed.</li>
      <li><strong>Revoking Access:</strong> You can unlink your Google account any time. Retube will no longer be able to publish content on your behalf after this.</li>
    </ul>
  </div>
</section>

    <Footer/>
    </>
  );
}