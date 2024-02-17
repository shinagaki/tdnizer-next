'use client';

import { useState } from 'react';

interface Result {
  id: number;
  name: string;
  tdn: string;
  kana: string;
}

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);

  const handleChange = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    fetchData(e.target.value).catch((error) => {
      console.error(error);
    });
  };
  const fetchData = async (keyword: string) => {
    const res = await fetch(`/api/tdn?k=${keyword}`, { cache: 'no-store' });
    const data = (await res.json()) as Result[];
    setResults(data);
  };

  return (
    <body className="container mx-auto w-full">
      <main className="flex flex-col">
        <div className="flex flex-col justify-center bg-yellow-200">
          <h1 className="text-center text-5xl font-bold tracking-tight">Tdnizer</h1>
          <div className="m-4 h-12 text-center" id="search">
            <form action="" className="whitespace-nowrap">
              <input className="rounded-2xl p-2 text-2xl" id="" name="" onChange={handleChange} type="text" />
            </form>
          </div>
        </div>
        <ul className="bg-blue-200" id="result">
          {results.map((result, index) => (
            <li className="m-4" key={index}>
              <h2 className="text-lg font-bold">{result.nameTdn}</h2>
              <p>{result.name}</p>
            </li>
          ))}
        </ul>
      </main>
    </body>
  );
}
