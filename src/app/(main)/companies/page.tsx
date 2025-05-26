import CompaniesGrid from "@/components/companies/CompaniesGrid";
import { createSupabaseClient } from "@/utils/supabase/client";

export default async function CompaniesPage() {
  const supabase = await createSupabaseClient();
  const companies = await supabase.from("companies").select("*");

  console.log(companies);

  // TODO improve error management
  if (companies.error) {
    return (
      <>
        <h2>error</h2>
        <pre>{JSON.stringify(companies.error)}</pre>
      </>
    );
  }

  return (
    <>
      <CompaniesGrid />
    </>
  );
}
