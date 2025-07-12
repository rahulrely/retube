import Footer from "@/components/Footer";

import NavBarHome from "@/components/NavBarHome";

export default function Home() {
  return (
    <>
    <NavBarHome/>
    <section className="max-w-5xl mx-auto p-6 space-y-10 text-gray-300">
  <div className="space-y-4">
    <h1 className="text-4xl font-bold">About Retube</h1>
    <p className="text-lg">
      It is a collaborative platform that allows content contributors (Secondary Users) to submit video content to a YouTube channel owned by a Primary User. All content is subject to approval by the Primary User before being published to their YouTube channel.
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
</section>
    <Footer/>
    </>
  );
}