import { supabase } from '@/utils/supabase';

export const getAllTdn = async (keyword: string) => {
  console.log('supabase access');
  const res = await supabase.from('tdn').select('id,name,tdn,kana').like('tdn', `${keyword}%`);
  return res.data;
};
