'use client';

import { Textbook } from '@vectopus/atlas-icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { Result } from '@/utils/interface';

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);
  const [totalCount, setTotalCount] = useState<number>(-1);
  const maxCount = 100;

  const handleChange = (e: { target: { value: string } }) => {
    const hankakuToZenkaku = (str: string) => {
      return str.replace(/[Ａ-Ｚａ-ｚ]/g, (s: string) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      });
    };
    const keyword = hankakuToZenkaku(e.target.value).replace(/[^a-z]/gi, '');
    e.target.value = keyword;
    fetchData(keyword).catch((error) => {
      console.error(error);
    });
  };
  const fetchData = async (keyword: string) => {
    const res = await fetch(`/api/tdn?k=${keyword}`, { cache: 'no-store' });
    // const res = await fetch(`/api/tdn?k=${keyword}`, { cache: 'force-cache' });

    const data = (await res.json()) as {
      results: Result[];
      totalCount: number;
    };
    setResults(data.results);
    setTotalCount(data.totalCount);
  };

  return (
    <body className="container mx-auto w-full bg-slate-500">
      <main className="flex flex-col">
        <div className="flex flex-row  justify-center bg-slate-700 md:flex-col">
          <div className="my-2 flex items-baseline justify-center text-slate-300">
            <Textbook className="size-10 md:size-16" size={36} />
            <h1 className="bg-gradient-to-t from-slate-300 via-slate-100 to-slate-500 bg-clip-text text-center text-6xl font-bold tracking-tight text-transparent md:text-8xl">
              Tdnizer
            </h1>
          </div>
          <div className="m-4 h-12 text-center md:mb-6" id="search">
            <form action="" className="whitespace-nowrap">
              <input
                autoComplete="off"
                autoFocus
                className="size-full rounded-lg border border-slate-300 bg-white p-2 text-2xl uppercase text-slate-700 focus:border-primary focus:outline-none focus:ring focus:ring-yellow-300"
                id="keyword"
                inputMode="url"
                onChange={handleChange}
                pattern="^[a-zA-Z]+$"
                placeholder="TDN"
                type="text"
              />
            </form>
          </div>
        </div>
        <div className="bg-slate-900 text-center text-slate-200">
          {totalCount >= 0 && (
            <p>
              <span className="text-xl">{totalCount}</span>件 見つかりました
            </p>
          )}
        </div>
        <ul className="divide-y divide-slate-900 bg-slate-200" id="result">
          {results && results.length > 0 ? (
            results.map((result, index) => (
              <li className="p-2 hover:bg-slate-50" key={index}>
                <Link
                  href={`https://dic.nicovideo.jp/a/${encodeURIComponent(result.name)}`}
                  rel="nofollow"
                  target="_blank"
                >
                  <h2 className="text-2xl font-bold">{result.tdn}</h2>
                  <p className="-mt-1 text-xs text-slate-500">{result.kana}</p>
                  <p className="text-lg">{result.name}</p>
                </Link>
                <Link
                  href={{
                    pathname: '/about',
                    query: { name: 'test' },
                  }}
                ></Link>
              </li>
            ))
          ) : (
            <li className="m-6">Tdnizerは、TDN表記から元となったキーワードを検索するサービスです</li>
          )}
        </ul>
        <div className="bg-slate-900 text-center text-slate-200">
          {totalCount > maxCount && (
            <p>
              <span className="text-xl">{maxCount}</span>件以上は表示できません
            </p>
          )}
        </div>
      </main>
    </body>
  );
}
