import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about ImgSwift, an online platform providing simple image and PDF tools for everyday file processing.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            About ImgSwift
          </h1>

          <div className="mt-10 space-y-8 text-[16px] leading-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                What is ImgSwift?
              </h2>

              <p className="mt-3">
                ImgSwift is an online file-processing platform designed to
                provide simple and accessible tools for working with images
                and PDF documents.
              </p>

              <p className="mt-3">
                Our goal is to make common file tasks easier by bringing useful
                tools together in one place, without requiring users to install
                complicated desktop software for everyday tasks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                What Can You Do With ImgSwift?
              </h2>

              <p className="mt-3">
                ImgSwift provides a growing collection of tools for image and
                PDF processing. Depending on the tool, users can perform tasks
                such as compressing, converting, resizing, cropping, rotating,
                editing, merging, splitting and organizing files.
              </p>

              <p className="mt-3">
                The platform also includes tools for converting between common
                document formats and extracting or processing information from
                PDF files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Our Approach
              </h2>

              <p className="mt-3">
                We focus on creating tools with straightforward interfaces so
                that users can complete common file-processing tasks with as
                few steps as possible.
              </p>

              <p className="mt-3">
                Where practical, browser-based processing is used to help
                reduce unnecessary file transfers. Some features may use
                external services when required to provide their functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Why ImgSwift?
              </h2>

              <p className="mt-3">
                ImgSwift brings multiple everyday image and PDF utilities
                together in a single platform. Instead of searching for a
                separate service for every task, users can access a variety of
                tools from one website.
              </p>

              <p className="mt-3">
                We aim to keep the experience fast, simple and easy to
                understand while continuing to improve the available tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Continuous Improvement
              </h2>

              <p className="mt-3">
                ImgSwift is continuously being developed and improved. We may
                introduce new tools, improve existing functionality and update
                the website experience over time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900">
                Contact Us
              </h2>

              <p className="mt-3">
                If you have questions, feedback, suggestions or need to
                contact us regarding ImgSwift, please use our Contact Us page.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}