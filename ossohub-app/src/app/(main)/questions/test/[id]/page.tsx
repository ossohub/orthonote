import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { TestPageClient } from "./TestPageClient";
import type { QuestionTestItem } from "@/lib/types";

interface Props { params: Promise<{ id: string }> }

export default async function QuestionTestPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: test } = await supabase
    .from("question_tests")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!test) notFound();

  const { data: items } = await supabase
    .from("question_test_items")
    .select(
      "id, test_id, question_id, order_index, selected_option, is_correct, answered_at, question:questions(id, author_id, area, source, statement, image_url, option_a, option_b, option_c, option_d, option_e, is_active, times_answered, times_correct, created_at, updated_at)"
    )
    .eq("test_id", id)
    .order("order_index", { ascending: true });

  return <TestPageClient test={test} initialItems={(items ?? []) as unknown as QuestionTestItem[]} />;
}
