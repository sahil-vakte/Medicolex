import type { ReactNode } from "react";
import { PageHero, Prose, Section } from "./ui";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} intro={`Last updated ${updated}`} />
      <Section>
        <Prose>{children}</Prose>
      </Section>
    </>
  );
}
