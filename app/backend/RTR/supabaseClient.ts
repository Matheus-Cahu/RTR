import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://stfiyumxoihokpocycia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Zml5dW14b2lob2twb2N5Y2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjU2MTIsImV4cCI6MjA2MTY0MTYxMn0.3E8H78J7S-RVWU_8FekdvQ8y0oBY4lL3iC4vTq69ZFw';
export const supabase = createClient(supabaseUrl, supabaseKey);

