//You can initialize a new Supabase client using the createClient() method.

//The Supabase client is your entrypoint to the rest of the Supabase functionality and is the easiest way to interact with everything we offer within the Supabase ecosystem.


import { createClient } from '@supabase/supabase-js'

const URL = 'https://evkyiroqejitrzaifogz.supabase.co'
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2a3lpcm9xZWppdHJ6YWlmb2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwNzg2MDMsImV4cCI6MjAyMTY1NDYwM30.qfRgWjJJ4KHNQICPYzA5h2o5-0cTEC9ERqVBL7bq-oU'

export const supabase = createClient(URL, KEY);