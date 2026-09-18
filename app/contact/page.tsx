import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the ToolsGift team for questions, feedback, suggestions, or issues related to our image and PDF tools.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Contact Us
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            We would love to hear from you. If you have a question, feedback,
            suggestion, or experience an issue while using ToolsGift, you can
            contact us through the information provided below.
          </p>

          <div className="mt-10 space-y-8 text-[16px] leading-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Get in Touch
              </h2>

              <p className="mt-3">
                For questions or support related to ToolsGift, please contact
                us by email. When reporting a technical issue, including the
                name of the tool and a brief description of the problem can
                help us understand the issue more quickly.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-medium text-slate-900">
                  Email:
                </p>

                <p className="mt-1 text-slate-600">
                  Replace this with your actual support email address.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Feedback and Suggestions
              </h2>

              <p className="mt-3">
                Your feedback helps us improve ToolsGift. You can contact us
                with suggestions for new tools, improvements to existing
                features, or comments about the overall website experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Reporting a Tool Problem
              </h2>

              <p className="mt-3">
                If a tool does not work as expected, please mention the tool
                name, the type of file you were using, and what happened.
                Please do not send confidential or sensitive documents unless
                you are comfortable sharing them and it is necessary to
                investigate the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Business or Other Inquiries
              </h2>

              <p className="mt-3">
                For business-related questions, partnerships, or other
                inquiries concerning ToolsGift, you can use the same contact
                email address.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Response Time
              </h2>

              <p className="mt-3">
                We will review messages and respond when possible. Response
                times may vary depending on the nature and volume of requests.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
