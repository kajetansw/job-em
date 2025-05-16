import Dashboard from "@/components/home/Dashboard/Dashboard";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@mantine/core";
import Form from "next/form";
import { redirect } from "next/navigation";
import { signOutAction } from "./actions";

export default async function Home() {
  const supabase = await createClient();

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
      <Form action={signOutAction}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </Form>
    </>
  );
}
