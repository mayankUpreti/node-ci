# AdvancedNodeStarter
Starting project for a course on Advanced Node @ Udemy



see queries in mongoose

client.set('color','red','EX',5)
expire after 5 seconds


const query= Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').

query.getOptions()



npm run start &
pkill node








git remote -v
git remote remove origin
git remote add origin https://github.com/mayankUpreti/node-ci.git
git remote -v




