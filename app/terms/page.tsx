import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the ImgSwift Terms of Service covering use of our online image and PDF tools.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Terms of Service
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: September 8, 2026
          </p>

          <div className="mt-10 space-y-8 text-[16px] leading-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                1. Acceptance of Terms
              </h2>

              <p className="mt-3">
                By accessing or using ImgSwift, you agree to these Terms of
                Service. If you do not agree with these terms, please do not
                use the website or its tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                2. About ImgSwift
              </h2>

              <p className="mt-3">
                ImgSwift provides online tools for processing images, PDF
                documents, and other supported file formats. Features and
                supported formats may vary between individual tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                3. Acceptable Use
              </h2>

              <p className="mt-3">
                You agree to use ImgSwift only for lawful purposes and in a way
                that does not violate applicable laws, regulations, or the
                rights of others.
              </p>

              <p className="mt-3">
                You must not use the website to upload, process, distribute, or
                create content that is unlawful, fraudulent, abusive, harmful,
                or that infringes intellectual property, privacy, or other
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                4. User Responsibility
              </h2>

              <p className="mt-3">
                You are responsible for the files and content that you choose
                to process using ImgSwift. You should make sure that you have
                the necessary rights and permissions to use any files you
                upload or process.
              </p>

              <p className="mt-3">
                You are also responsible for maintaining appropriate backups of
                important files. ImgSwift should not be treated as a permanent
                file-storage or backup service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                5. Tool Availability
              </h2>

              <p className="mt-3">
                We aim to keep ImgSwift available and functional, but we do not
                guarantee that every tool will always be available,
                uninterrupted, error-free, or compatible with every file,
                browser, device, or operating system.
              </p>

              <p className="mt-3">
                Features may be modified, improved, temporarily unavailable, or
                discontinued without prior notice when necessary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                6. File Processing
              </h2>

              <p className="mt-3">
                Some ImgSwift tools process files directly in your browser,
                while certain features may use external services when required
                for their functionality.
              </p>

              <p className="mt-3">
                Processing behavior may therefore differ between tools. Please
                review the applicable information provided by the individual
                tool before processing confidential or sensitive documents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                7. Third-Party Services
              </h2>

              <p className="mt-3">
                Some features may depend on third-party services. Your use of
                those features may also be subject to the third party's terms
                and policies.
              </p>

              <p className="mt-3">
                ImgSwift is not responsible for the availability, performance,
                policies, or practices of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                8. Intellectual Property
              </h2>

              <p className="mt-3">
                The ImgSwift website, including its design, branding, text,
                interface elements, and original website content, may be
                protected by applicable intellectual property laws.
              </p>

              <p className="mt-3">
                You retain responsibility for the files and content that you
                provide to the service, subject to any rights held by third
                parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                9. Disclaimer
              </h2>

              <p className="mt-3">
                ImgSwift is provided on an "as is" and "as available" basis to
                the extent permitted by applicable law. We do not guarantee
                that every file will be processed successfully or that every
                generated result will meet a particular purpose or requirement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                10. Limitation of Liability
              </h2>

              <p className="mt-3">
                To the maximum extent permitted by applicable law, ImgSwift
                will not be responsible for indirect, incidental, special, or
                consequential losses arising from your use of the website or
                its tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                11. Changes to These Terms
              </h2>

              <p className="mt-3">
                We may update these Terms of Service from time to time.
                Changes will be posted on this page together with an updated
                revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                12. Contact
              </h2>

              <p className="mt-3">
                If you have questions about these Terms of Service, please
                contact ImgSwift through the Contact Us page.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}