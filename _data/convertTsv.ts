/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from 'fs';

import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

// const dataset = fs.readFileSync('_data/nicoime_sample.txt', 'utf16le');
const dataset = fs.readFileSync('_data/nicoime_msime.txt', 'utf16le');

const records = parse(dataset, {
  delimiter: '\t',
  from_line: 8,
  skip_empty_lines: true,
  bom: true,
  columns: ['kana', 'name', 'type'],
  relax_quotes: true,
});

const hiraganaToKatakata = (str: string) => {
  return str.replace(/[\u3041-\u3096]/g, function (s: string) {
    return String.fromCharCode(s.charCodeAt(0) + 0x60);
  });
};

const katakanaToTdn = (str: string) => {
  const convertMap = {
    ァ: '',
    ィ: '',
    ゥ: '',
    ェ: '',
    ォ: '',
    ャ: '',
    ュ: '',
    ョ: '',
    ッ: '',
    ヵ: '',
    ヶ: '',
    ヮ: '',
    ー: '',
    ア: 'A',
    イ: 'I',
    ウ: 'U',
    エ: 'E',
    オ: 'O',
    カ: 'K',
    キ: 'K',
    ク: 'K',
    ケ: 'K',
    コ: 'K',
    サ: 'S',
    シ: 'S',
    ス: 'S',
    セ: 'S',
    ソ: 'S',
    タ: 'T',
    チ: 'T',
    ツ: 'T',
    テ: 'T',
    ト: 'T',
    ナ: 'N',
    ニ: 'N',
    ヌ: 'N',
    ネ: 'N',
    ノ: 'N',
    ハ: 'H',
    ヒ: 'H',
    フ: 'H',
    ヘ: 'H',
    ホ: 'H',
    マ: 'M',
    ミ: 'M',
    ム: 'M',
    メ: 'M',
    モ: 'M',
    ヤ: 'Y',
    ユ: 'Y',
    ヨ: 'T',
    ラ: 'R',
    リ: 'R',
    ル: 'R',
    レ: 'R',
    ロ: 'R',
    ワ: 'W',
    ン: 'N',
    ヰ: 'I',
    ヱ: 'E',
    ヲ: 'O',
    ガ: 'G',
    ギ: 'G',
    グ: 'G',
    ゲ: 'G',
    ゴ: 'G',
    ザ: 'Z',
    ジ: 'Z',
    ズ: 'Z',
    ゼ: 'Z',
    ゾ: 'Z',
    ダ: 'D',
    ヂ: 'D',
    ヅ: 'D',
    デ: 'D',
    ド: 'D',
    バ: 'B',
    ビ: 'B',
    ブ: 'B',
    ベ: 'B',
    ボ: 'B',
    パ: 'P',
    ピ: 'P',
    プ: 'P',
    ペ: 'P',
    ポ: 'P',
    ヷ: 'V',
    ヸ: 'V',
    ヴ: 'V',
    ヹ: 'V',
    ヺ: 'V',
  };

  for (const [katakana, tdn] of Object.entries(convertMap)) {
    str = str.replace(new RegExp(katakana, 'g'), tdn);
  }
  return str;
};

for (const record of records) {
  record['kana'] = hiraganaToKatakata(record['kana']);
  record['tdn'] = katakanaToTdn(record['kana']);
}

const csvString = stringify(records, {
  columns: ['kana', 'name', 'tdn'],
  header: true,
});
fs.writeFileSync('_data/output.csv', csvString);
