import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how ToolsGift uses cookies and similar technologies for functionality, analytics, security and advertising.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Cookie Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: September 8, 2026
          </p>

          <div className="mt-10 space-y-8 text-[16px] leading-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                1. What Are Cookies?
              </h2>

              <p className="mt-3">
                Cookies are small text files that websites may store on your
                device when you visit them. They can help websites remember
                information, provide functionality, understand website usage,
                and support advertising services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                2. How ToolsGift Uses Cookies
              </h2>

              <p className="mt-3">
                ToolsGift may use cookies and similar technologies for several
                purposes, including essential website functionality, security,
                preferences, analytics, performance measurement, and
                advertising.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                3. Essential Cookies
              </h2>

              <p className="mt-3">
                Some cookies or similar technologies may be necessary for the
                website to function properly. These technologies can support
                features such as security, session functionality, preferences,
                and basic website operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                4. Analytics Cookies
              </h2>

              <p className="mt-3">
                ToolsGift may use analytics services to understand how visitors
                interact with the website. Analytics information can help us
                identify popular pages, understand usage patterns, detect
                technical problems, and improve the website.
              </p>

              <p className="mt-3">
                Analytics providers may use their own cookies or similar
                technologies according to their applicable policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                5. Advertising Cookies
              </h2>

              <p className="mt-3">
                ToolsGift may use third-party advertising services, including
                Google AdSense, to display advertisements.
              </p>

              <p className="mt-3">
                Advertising providers may use cookies and similar technologies
                to serve, measure, personalize, or improve advertisements,
                subject to applicable policies and your available privacy
                choices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                6. Third-Party Cookies
              </h2>

              <p className="mt-3">
                Third-party services used on ToolsGift may place their own
                cookies or similar technologies on your device. These services
                operate according to their own privacy policies and terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                7. Managing Cookies
              </h2>

              <p className="mt-3">
                Most modern web browsers allow you to control or delete
                cookies through their settings. You can generally choose to
                block cookies, delete existing cookies, or receive notifications
                when cookies are being used.
              </p>

              <p className="mt-3">
                Blocking certain cookies may affect the functionality or
                availability of some website features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                8. Your Privacy Choices
              </h2>

              <p className="mt-3">
                Depending on your location and applicable law, you may have
                choices regarding cookies, personalized advertising, and other
                forms of data processing. Where required, ToolsGift may provide
                appropriate consent or privacy controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                9. Changes to This Cookie Policy
              </h2>

              <p className="mt-3">
                We may update this Cookie Policy when our website, services,
                technologies, or legal requirements change. Updates will be
                published on this page with a revised date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                10. Contact Us
              </h2>

              <p className="mt-3">
                If you have questions about this Cookie Policy or how cookies
                are used on ToolsGift, please contact us through the Contact Us
                page.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
