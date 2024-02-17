'use client';

// import { Result } from '@/utils/interface';

// import fs from 'fs';

// const filePath: string = '@/_data/nicoime_msime.txt';
// 読み込み
async function readData(filePath) {
  const text = await fs.promises.readFile(filePath, 'utf8');
  const lines = text.split('\n').map((l) => l.split('\t'));
  const header = lines.shift();

  return lines.map((l) => header.reduce((a, c, i, s) => Object.assign(a, { [c]: l[i] }), {}));
}

export default function Home() {
  readData(filePath);

  return (
    <body className="container mx-auto w-full">
      <main className="flex flex-col">
        <div className="flex flex-col justify-center bg-yellow-200">
          <h1 className="text-center text-5xl font-bold tracking-tight">Tdnizer</h1>
          <div className="m-4 h-12 text-center" id="search"></div>
        </div>
        <ul className="bg-blue-200" id="result"></ul>
      </main>
    </body>
  );
}
