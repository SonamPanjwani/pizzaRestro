import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pncuqukmdnzuyskctozd.supabase.co";
const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuY3VxdWttZG56dXlza2N0b3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyNTk5NjQsImV4cCI6MjAzNTgzNTk2NH0.erzgMJbRiZSq6NLvyJW7FgsmM_H9Gr_Yfvo99clxM_8";
export const supabase = createClient(supabaseUrl, supabaseKey);
