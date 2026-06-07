import { pinyin } from 'pinyin-pro';
import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('data.json', 'utf-8'));

const result = data.map(r => {
  const allText = [r.name, ...r.dishes, r.address].join('');
  return {
    ...r,
    _pinyin:   pinyin(allText, { toneType: 'none', separator: ' ' }),
    _initials: pinyin(allText, { pattern: 'first', toneType: 'none', separator: '' }),
  };
});

writeFileSync('data.json', JSON.stringify(result, null, 2), 'utf-8');
console.log(`拼音生成完成，共 ${result.length} 条`);
