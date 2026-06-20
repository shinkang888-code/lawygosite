import { ContentProvider } from "@/components/content/ContentContext";
import { HomeShell } from "@/components/home/HomeShell";
import { getSiteContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();
  return (
    <ContentProvider content={content}>
      <HomeShell />
    </ContentProvider>
  );
}
