export function GET(request: Request) {
  const data = [
    {
      id: 1,
      name: '多田野',
      tdn: 'tdn',
      kana: 'タダノ',
    },
    {
      id: 2,
      name: '多田野32',
      tdn: 'tdn2',
      kana: 'タダノ2',
    },
  ];
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('k') || '';

  return Response.json(
    data.filter((x) => {
      return x.tdn.indexOf(keyword) === 0;
    }),
  );
}
