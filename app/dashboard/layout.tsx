import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  return (
    <SidebarProvider>
       <AppSidebar user={data.user}/>
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
