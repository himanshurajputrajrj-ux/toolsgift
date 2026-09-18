import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the ToolsGift Disclaimer regarding the use, accuracy, availability and limitations of our online image and PDF tools.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Disclaimer
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: September 8, 2026
          </p>

          <div className="mt-10 space-y-8 text-[16px] leading-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                1. General Information
              </h2>

              <p className="mt-3">
                The information and tools provided on ToolsGift are intended
                for general informational and file-processing purposes. While
                we aim to provide useful and reliable tools, we do not
                guarantee that all information, features, or generated results
                will always be complete, accurate, current, or suitable for
                every purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                2. File Processing
              </h2>

              <p className="mt-3">
                ToolsGift provides tools for processing images, PDF documents,
                and other supported files. Results may vary depending on the
                file format, file structure, content, browser, device, and the
                particular tool being used.
              </p>

              <p className="mt-3">
                Users should review generated files before relying on them for
                important, professional, legal, financial, academic, or other
                consequential purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                3. No Guarantee of Results
              </h2>

              <p className="mt-3">
                We do not guarantee that every uploaded file can be processed
                successfully or that the output will exactly reproduce the
                original file.
              </p>

              <p className="mt-3">
                Some tools may have technical limitations, including
                limitations involving complex layouts, scanned documents,
                unsupported formats, fonts, tables, images, encryption, or
                other file features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                4. Important Documents
              </h2>

              <p className="mt-3">
                If a processed file is important or requires exact formatting,
                legal validity, archival compliance, accessibility, or
                professional accuracy, users should independently verify the
                resulting file before using it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                5. Third-Party Services
              </h2>

              <p className="mt-3">
                Certain ToolsGift features may use third-party services when
                required for their functionality. Third-party services may have
                their own terms, privacy policies, technical limitations, and
                availability requirements.
              </p>

              <p className="mt-3">
                ToolsGift is not responsible for the policies, availability, or
                performance of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                6. External Links
              </h2>

              <p className="mt-3">
                ToolsGift may contain links to websites or services operated by
                third parties. We do not control those external websites and
                are not responsible for their content, security, availability,
                or privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                7. Advertising
              </h2>

              <p className="mt-3">
                ToolsGift may display advertisements from third-party
                advertising providers. Advertisements may be selected or
                personalized by those providers according to their applicable
                policies and user privacy choices.
              </p>

              <p className="mt-3">
                The presence of an advertisement does not constitute an
                endorsement or guarantee by ToolsGift of the advertised product
                or service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                8. Professional Advice
              </h2>

              <p className="mt-3">
                ToolsGift does not provide legal, financial, medical,
                professional, or other specialized advice through its tools or
                website content. Information available on the website should
                not be treated as a substitute for advice from a qualified
                professional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                9. Limitation of Responsibility
              </h2>

              <p className="mt-3">
                To the extent permitted by applicable law, ToolsGift is not
                responsible for losses, damages, data loss, processing errors,
                or other consequences resulting from reliance on the website,
                its tools, or generated files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                10. Changes to This Disclaimer
              </h2>

              <p className="mt-3">
                This Disclaimer may be updated from time to time. Any changes
                will be published on this page together with an updated
                revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                11. Contact
              </h2>

              <p className="mt-3">
                If you have questions about this Disclaimer, please contact
                ToolsGift through the Contact Us page.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
