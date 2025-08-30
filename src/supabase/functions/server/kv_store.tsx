/* Key-Value Store for Portfolio Projects */

/* Table schema:
CREATE TABLE kv_store_32d29310 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kv_store_32d29310_key ON kv_store_32d29310(key);
*/

import { createClient } from "@supabase/supabase-js";

const client = () => createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
);

// Helper function to handle database errors
const handleDbError = (error: any, operation: string): Error => {
  console.error(`KV Store ${operation} error:`, error);
  
  // Check for SSL/connection errors
  if (error.message?.includes('SSL handshake failed') || 
      error.message?.includes('Error code 525') ||
      error.message?.includes('<!DOCTYPE html>') ||
      error.message?.includes('Cloudflare')) {
    console.log(`SSL/Connection error detected during ${operation}, switching to fallback mode`);
    return new Error(`Database connection unavailable (SSL issue), using fallback mode`);
  }
  
  if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
    return new Error(`Database table 'kv_store_32d29310' does not exist. Please create it first.`);
  }
  
  if (error.message?.includes('column') && error.message?.includes('does not exist')) {
    return new Error(`Database schema issue: ${error.message}`);
  }
  
  // Check for network/connection issues
  if (error.message?.includes('fetch') || 
      error.message?.includes('network') ||
      error.message?.includes('timeout') ||
      error.message?.includes('ECONNREFUSED')) {
    console.log(`Network error detected during ${operation}, switching to fallback mode`);
    return new Error(`Database connection unavailable (network issue), using fallback mode`);
  }
  
  return new Error(`KV Store ${operation} failed: ${error.message || 'Unknown error'}`);
};

// Set stores a key-value pair in the database.
export const set = async (key: string, value: any): Promise<void> => {
  try {
    const supabase = client();
    // Only use key and value fields, don't rely on updated_at
    const { error } = await supabase.from("kv_store_32d29310").upsert({
      key,
      value
    });
    
    if (error) {
      throw handleDbError(error, 'set');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'set');
  }
};

// Get retrieves a key-value pair from the database.
export const get = async (key: string): Promise<any> => {
  try {
    const supabase = client();
    const { data, error } = await supabase
      .from("kv_store_32d29310")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    
    if (error) {
      throw handleDbError(error, 'get');
    }
    
    return data?.value;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'get');
  }
};

// Delete deletes a key-value pair from the database.
export const del = async (key: string): Promise<void> => {
  try {
    const supabase = client();
    const { error } = await supabase
      .from("kv_store_32d29310")
      .delete()
      .eq("key", key);
    
    if (error) {
      throw handleDbError(error, 'delete');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'delete');
  }
};

// Sets multiple key-value pairs in the database.
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  try {
    if (keys.length !== values.length) {
      throw new Error('Keys and values arrays must have the same length');
    }
    
    const supabase = client();
    const records = keys.map((k, i) => ({ 
      key: k, 
      value: values[i]
    }));
    
    const { error } = await supabase.from("kv_store_32d29310").upsert(records);
    
    if (error) {
      throw handleDbError(error, 'mset');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'mset');
  }
};

// Gets multiple key-value pairs from the database.
export const mget = async (keys: string[]): Promise<any[]> => {
  try {
    if (keys.length === 0) {
      return [];
    }
    
    const supabase = client();
    const { data, error } = await supabase
      .from("kv_store_32d29310")
      .select("key, value")
      .in("key", keys);
    
    if (error) {
      throw handleDbError(error, 'mget');
    }
    
    // Return values in the same order as requested keys
    const dataMap = new Map((data || []).map(item => [item.key, item.value]));
    return keys.map(key => dataMap.get(key));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'mget');
  }
};

// Deletes multiple key-value pairs from the database.
export const mdel = async (keys: string[]): Promise<void> => {
  try {
    if (keys.length === 0) {
      return;
    }
    
    const supabase = client();
    const { error } = await supabase
      .from("kv_store_32d29310")
      .delete()
      .in("key", keys);
    
    if (error) {
      throw handleDbError(error, 'mdel');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'mdel');
  }
};

// Search for key-value pairs by prefix.
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  try {
    const supabase = client();
    const { data, error } = await supabase
      .from("kv_store_32d29310")
      .select("key, value")
      .like("key", prefix + "%");
    
    if (error) {
      throw handleDbError(error, 'getByPrefix');
    }
    
    return data?.map((d) => d.value) ?? [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw handleDbError(error, 'getByPrefix');
  }
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const testKey = `test:${Date.now()}`;
    const testValue = { test: true, timestamp: new Date().toISOString() };
    
    await set(testKey, testValue);
    const retrieved = await get(testKey);
    await del(testKey);
    
    return retrieved && retrieved.test === true;
  } catch (error) {
    console.error('KV store connection test failed:', error);
    
    // Check for specific SSL/connection errors and log appropriate message
    if (error.message?.includes('SSL handshake failed') || 
        error.message?.includes('Error code 525') ||
        error.message?.includes('<!DOCTYPE html>') ||
        error.message?.includes('Cloudflare')) {
      console.log('SSL/Cloudflare connection issue detected - application will run in fallback mode');
    } else if (error.message?.includes('Database connection unavailable')) {
      console.log('Database connection issue detected - application will run in fallback mode');
    }
    
    return false;
  }
};

// Create table if it doesn't exist (simplified version)
export const ensureTable = async (): Promise<boolean> => {
  try {
    const supabase = client();
    
    // Test if table exists by trying to select from it
    const { error } = await supabase
      .from("kv_store_32d29310")
      .select("key")
      .limit(1);
    
    if (error) {
      if (error.message?.includes('does not exist')) {
        console.log('Table kv_store_32d29310 does not exist');
        console.log('Please create it manually in Supabase dashboard with this SQL:');
        console.log(`
          CREATE TABLE kv_store_32d29310 (
            key TEXT NOT NULL PRIMARY KEY,
            value JSONB NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS idx_kv_store_32d29310_key ON kv_store_32d29310(key);
        `);
        return false;
      }
      console.error('Unknown error checking table:', error);
      return false;
    }
    
    console.log('Table kv_store_32d29310 exists and is accessible');
    return true;
  } catch (error) {
    console.error('Error checking table existence:', error);
    return false;
  }
};