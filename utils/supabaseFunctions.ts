import { supabase } from '@/utils/supabase';

export const getTdn = async (keyword: string) => {
  console.log('supabase access');
  const { data, error, status, count } = await supabase
    .from('tdn')
    .select('id,name,tdn,kana', { count: 'exact' })
    .like('tdn', `${keyword}%`)
    .order('tdn', { ascending: true })
    .limit(100);

  if (error && status !== 406) {
    throw error;
  }

  return {
    results: data,
    totalCount: count ? count : 0,
  };
};
