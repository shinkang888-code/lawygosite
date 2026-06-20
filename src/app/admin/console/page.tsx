import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/cms/auth";
import { CmsConsole } from "@/components/admin/CmsConsole";

export default async function AdminConsolePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <CmsConsole username={session.username} />;
}
