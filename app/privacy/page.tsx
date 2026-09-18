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
            Last updated: September 8, 2026
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
                ToolsGift provides tools for processing images and PDF
                documents. Some tools process files directly in your browser.
                Where browser-based processing is used, the file may remain on
                your device and is not intentionally uploaded to our servers
                for processing.
              </p>
              <p className="mt-3">
                However, certain features may use external services when
                required to perform a specific function. Users should avoid
                uploading confidential, highly sensitive, or legally protected
                information unless they are comfortable with the processing
                required by that particular tool.
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
                Some ToolsGift tools may rely on third-party services to provide
                specific functionality. When a tool sends information to an
                external service, that processing may be governed by the
                third party's own privacy policy and terms.
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
                9. Children's Privacy
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
                privacy requests.
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
