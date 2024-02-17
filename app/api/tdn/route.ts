import { Result } from '@/utils/interface';
import { getAllTdn } from '@/utils/supabaseFunctions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('k')?.toUpperCase() || '';

  if (!keyword) {
    return Response.json([]);
  }

  const tdns: Result[] | null = await getAllTdn(keyword);
  console.log(tdns);

  return Response.json(
    tdns?.filter((x) => {
      return x.tdn.indexOf(keyword) === 0;
    }),
  );
}
