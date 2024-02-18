import { getTdn } from '@/utils/supabaseFunctions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('k')?.toUpperCase() || '';

  if (!keyword) {
    return Response.json({
      results: [],
      totalCount: -1,
    });
  }

  const res = await getTdn(keyword);

  return Response.json(
    // tdns?.filter((x) => {
    //   return x.tdn.indexOf(keyword) === 0;
    // }),
    {
      results: res.results,
      totalCount: res.totalCount,
    },
  );
}
