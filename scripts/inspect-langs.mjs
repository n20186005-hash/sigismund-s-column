import fs from 'node:fs';
for (const l of ['pl', 'ru', 'de']) {
  const m = JSON.parse(fs.readFileSync(`src/messages/${l}.json`, 'utf8'));
  console.log('\n##', l);
  console.log('hero.title:', m.hero.title);
  console.log('hero.subtitle:', m.hero.subtitle);
  console.log('intro.title:', m.intro.title);
  console.log('knowledge.sections[0].title:', m.knowledge.sections[0].title);
  console.log('hours.title:', m.hours.title, '| outdoorTime:', m.hours.outdoorTime);
  console.log('header.home:', m.header.home, '| footer.rights:', m.footer.rights.slice(0, 50));
  console.log('knowledge.sections[0].content head:', m.knowledge.sections[0].content.slice(0, 90));
}
