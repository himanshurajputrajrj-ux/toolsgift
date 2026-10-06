import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the ToolsGift Privacy Policy to understand how we handle information, files, cookies, analytics and advertising.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: October 6, 2026
          </p>

          <div className="mt-10 space-y-8 text-[16px] leading-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                1. Introduction
              </h2>
              <p className="mt-3">
                Welcome to ToolsGift. This Privacy Policy explains how
                information may be collected, used and protected when you use
                our website and online image and PDF tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                2. Information We Collect
              </h2>
              <p className="mt-3">
                ToolsGift is designed to provide online file-processing tools.
                Depending on how you use the website, we may collect limited
                technical information such as your browser type, device
                information, approximate location, IP address, pages visited,
                and usage information.
              </p>
              <p className="mt-3">
                If you voluntarily contact us, we may receive the information
                you provide, such as your name, email address, and the contents
                of your message.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                3. Uploaded Files
              </h2>
              <p className="mt-3">
                ToolsGift provides tools for processing images, PDF documents,
                and other file types. Most tools process files directly in your
                browser, so those files may remain on your device and are not
                intentionally uploaded to our servers for processing.
              </p>
              <p className="mt-3">
                The <strong>Share</strong> feature is different. When you share
                a result or upload a file (image, document, batch archive, or
                video), that data is temporarily stored with Vercel Blob, a
                file storage service operated by Vercel, Inc., so that anyone
                with the share link can view or download it. This is required
                for sharing to work at all.
              </p>
              <p className="mt-3">
                <strong>Retention.</strong> Shared text results, images,
                documents, and batch archives are kept for up to 30 days. Shared
                videos are kept for the expiry option you choose when creating
                the link (1 hour to 7 days). After the expiry date the share
                link stops working and the stored file is deleted automatically.
              </p>
              <p className="mt-3">
                <strong>Deletion.</strong> Files are removed when their share
                link is accessed after expiry, and a background sweep also
                removes expired shares and abandoned uploads. There is currently
                no self-service button to delete an individual share before it
                expires; you can request deletion through the Contact Us page
                and we will review it.
              </p>
              <p className="mt-3">
                File types shown for shares are based on the content type
                reported by your browser when the file was shared; we do not
                inspect the contents of uploaded files. You should avoid sharing
                confidential, highly sensitive, or legally protected information
                unless you are comfortable with this processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                4. How We Use Information
              </h2>
              <p className="mt-3">
                Information may be used to operate and maintain ToolsGift,
                improve our tools and website, understand how visitors use our
                services, prevent abuse, troubleshoot technical problems,
                communicate with users who contact us, and comply with legal
                obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                5. Cookies
              </h2>
              <p className="mt-3">
                ToolsGift may use cookies and similar technologies for essential
                website functionality, analytics, preferences, security, and
                advertising purposes.
              </p>
              <p className="mt-3">
                Third-party advertising or analytics providers may also use
                cookies or similar technologies according to their own
                policies and applicable requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                6. Advertising
              </h2>
              <p className="mt-3">
                ToolsGift may display advertisements provided by third-party
                advertising partners, including Google AdSense or other
                advertising services.
              </p>
              <p className="mt-3">
                These providers may use cookies and similar technologies to
                provide, personalize, measure, and improve advertising, subject
                to their applicable policies and your available privacy
                choices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                7. Third-Party Services
              </h2>
              <p className="mt-3">
                ToolsGift uses Vercel Blob to store files for the Share and
                Video {"\u2192"} Link features, as described in section 3.
                Vercel Blob is operated by Vercel, Inc. and stores the data on
                servers outside your device.
              </p>
              <p className="mt-3">
                Advertising is served by Google AdSense only after you consent
                to advertising cookies. When a tool sends information to an
                external service, that processing may be governed by the third
                party&apos;s own privacy policy and terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                8. Data Security
              </h2>
              <p className="mt-3">
                We take reasonable measures to protect information associated
                with the operation of ToolsGift. However, no website,
                transmission method, or electronic storage system can be
                guaranteed to be completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                9. Children&apos;s Privacy
              </h2>
              <p className="mt-3">
                ToolsGift is not intended to knowingly collect personal
                information from children in violation of applicable law. If
                you believe a child has provided personal information to us,
                please contact us so that the information can be reviewed and,
                where appropriate, removed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                10. External Links
              </h2>
              <p className="mt-3">
                ToolsGift may contain links to third-party websites or
                services. We are not responsible for the privacy practices,
                content, or security of external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                11. Your Privacy Choices
              </h2>
              <p className="mt-3">
                Depending on your location and applicable law, you may have
                rights regarding access, correction, deletion, restriction,
                objection, or other processing of your personal information.
                You may contact us to request assistance with applicable
                privacy requests. Shared files are deleted automatically when
                their share link expires, as described in section 3.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                12. Changes to This Policy
              </h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page with an updated revision
                date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                13. Contact Us
              </h2>
              <p className="mt-3">
                If you have questions about this Privacy Policy or our privacy
                practices, please contact ToolsGift through the Contact Us page
                on this website.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
