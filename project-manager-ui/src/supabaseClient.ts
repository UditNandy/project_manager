import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: any;
          email: any;
          password_hash: any | null;
          displayName: any;
        };
        Insert: {
          email: any;
          password_hash?: any | null;
          displayName: any;
        };
        Update: {
          password_hash?: any | null;
        };
      };
    };
  };
};

const supabaseUrl = 'https://kbkwgghjuqlsegxhvobh.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtia3dnZ2hqdXFsc2VneGh2b2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNDE3NTYsImV4cCI6MjA0NTYxNzc1Nn0.9eA6VzGG4C3aNZdUGKk6mAEeYrHPblJ6Ew5-8LIZrjo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
