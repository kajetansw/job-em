import Dashboard from "@/components/home/Dashboard/Dashboard";
import { createSupabaseClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <h1>Hello!</h1>
      <Dashboard />
    </>
  );
}
