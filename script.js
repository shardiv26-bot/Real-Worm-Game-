// Worm Garden Adventure - 30 questions total (10 per level).
const LEVELS={beginner:{name:"Happy Classroom Garden",lives:7,total:30},intermediate:{name:"Teacher Cheer Zone",lives:5,total:45},expert:{name:"Thunder Gaming Arena",lives:3,total:50}};
const PASSAGE="Hi! My name is Sara and I am ten years old. Every Saturday morning, I help my mother at home. I usually make my bed and sweep the floor. In the afternoon, I go to the park with my younger brother, Danial. We like riding our bicycles there. In the evening, we eat dinner together and watch cartoons on television.";
const Q={
beginner:[
["Aiman ________ from Malaysia. He lives in Selangor.",["am","is","are","were"],1],
["Where ________ you from?",["am","is","are","has"],2],
["Mei Ling ________ her teeth every morning and night.",["brush","brushes","brushed","brushing"],1],
["Yesterday, my family and I ________ to the zoo.",["go","goes","went","going"],2],
["There is ________ milk in the glass.",["a","an","some","many"],2],
["How ________ apples do we need to make the pie?",["much","many","any","some"],1],
["You ________ wear a helmet when you ride a bicycle.",["must","mustn't","can't","shouldn't"],0],
["The cheetah is ________ than the lion.",["fast","faster","fastest","as fast"],1],
["Blue whales are the ________ animals in the world.",["big","bigger","biggest","most big"],2],
["What are you going to ________ tomorrow?",["do","does","did","doing"],0]
],
intermediate:[
["This is my bag. It is ________.",["my","me","mine","I"],2],
["Look at those boys! ________ are playing football on the field.",["He","She","We","They"],3],
["There aren't ________ biscuits left in the jar.",["a","an","some","any"],3],
["Did you ________ a pyramid when you visited Egypt?",["see","saw","sees","seeing"],0],
["My sister ________ her homework right now.",["do","does","is doing","did"],2],
["We celebrate Merdeka Day ________ August.",["in","on","at","to"],0],
["Cycling is ________ than walking.",["quick","quicker","quickest","quickly"],1],
["“I have a bad toothache.” “You ________ go to the dentist.”",["should","shouldn't","mustn't","couldn't"],0],
["Please throw the rubbish ________ the recycling bin.",["on","under","into","between"],2],
["________ your brother like playing badminton?",["Do","Does","Is","Are"],1]
],
expert:[
["People from the UK are ________.",["American","British","Mexican","Korean"],1],
["My favourite school subject is ________ because I love painting and drawing.",["Science","Art","Maths","Music"],1],
["In ancient Egypt, kings and queens were buried inside ________.",["pyramids","castles","caves","tents"],0],
["We eat ________ with milk in a bowl for breakfast.",["cereal","steak","soup","noodles"],0],
["A ________ is a dangerous sea animal with sharp teeth.",["dolphin","turtle","shark","seahorse"],2],
["How old is Sara?",["Nine years old","Ten years old","Eleven years old","Twelve years old"],1,true],
["When does Sara help her mother at home?",["Every Friday morning","Every Saturday morning","Every Saturday afternoon","Every Sunday evening"],1,true],
["What housework does Sara do?",["Washes the dishes","Waters the plants","Makes her bed and sweeps the floor","Cooks dinner"],2,true],
["Who goes to the park with Sara?",["Her mother","Her father","Her older sister","Her younger brother"],3,true],
["What do Sara and Danial do at the park?",["Play football","Ride their bicycles","Watch cartoons","Fly a kite"],1,true]
]};
const $=id=>document.getElementById(id);
let level="beginner",worms=[],lives=7,escaped=0,stars=0,locked=false,activeId=null,qOrder=[],qPos=0;
const colors=["#f17db0","#62b8e9","#f5ad55","#a78be8","#75c78a","#e8c75e"];
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function makeWorms(){let pairs=[];for(let y=0;y<10;y+=2)for(let x=0;x<10;x+=2){let vertical=Math.random()<.5;let p=vertical?[[[x,y],[x,y+1]],[[x+1,y],[x+1,y+1]]]:[[[x,y],[x+1,y]],[[x,y+1],[x+1,y+1]]];p.forEach(c=>{if(Math.random()<.5)c.reverse();pairs.push(c)})}return shuffle(pairs).slice(0,LEVELS[level].total).map((cells,i)=>({id:i+1,cells,color:colors[i%colors.length]}))}
function startGame(which){level=which;document.body.classList.remove("level-beginner","level-intermediate","level-expert");document.body.classList.add("level-"+level);setWorldScene();lives=LEVELS[level].lives;escaped=0;stars=0;locked=false;activeId=null;worms=makeWorms();qOrder=shuffle(Q[level].map((_,i)=>i));qPos=0;$("totalWorms").textContent=LEVELS[level].total;$("gardenName").textContent=LEVELS[level].name.toUpperCase();$("home").classList.add("hidden");$("game").classList.remove("hidden");$("questionModal").classList.add("hidden");$("endModal").classList.add("hidden");update();draw()}

function setWorldScene(){
 const scene=$("coachStrip");
 const scenes={
  beginner:'<div class="class-crowd" aria-label="A whole class cheering"><span>👧🏻</span><span>👦🏽</span><span>👧🏾</span><span>👦🏻</span><span>👧🏼</span></div><div class="world-message"><strong>🌈 YOUR WHOLE CLASS IS BEHIND YOU!</strong><br>“We believe in you! You can do it!” 📣💖</div><div class="cheer-sign">🙌🏻 ⭐ 🙌🏽</div>',
  intermediate:'<div class="teacher-pop"><span class="teacher-emoji">👩🏻‍🏫</span><small>YOUR TEACHER</small></div><div class="world-message"><strong>💗 KEEP ON ROCKING, MY DEAR!</strong><br>“You are doing amazing. Keep going!” ✨</div><div class="teacher-stars">📚 🌟 💕</div>',
  expert:'<div class="thunder-student"><div class="gamer-head">🧑🏻‍💻</div><div class="gamer-body">🪑</div><div class="gamer-desk">🎮 ⌨️ 🖥️</div></div><div class="world-message"><strong>⚡ THUNDER GAMING ARENA ⚡</strong><br>Our student is seated, focused and giving it a try!<br>“Stay sharp. You’ve got this!” 🎧🏆</div><div class="thunder-bolt">⚡</div>'
 };
 scene.className="level-world world-"+level;scene.innerHTML=scenes[level];
}
function update(){$("lives").textContent=lives;$("stars").textContent=stars;$("escaped").textContent=escaped;$("questionsDone").textContent=qPos;$("progressbar").style.width=(escaped/LEVELS[level].total*100)+"%"}
function xy(c){return[35+c[0]*43,35+c[1]*43]}
function dir(w){let a=w.cells[w.cells.length-2],b=w.cells[w.cells.length-1];return[Math.sign(b[0]-a[0]),Math.sign(b[1]-a[1])]}
function draw(){let s=$("board"),boardFill=level==="expert"?"#101a38":level==="intermediate"?"#d9e5ff":"#fff3d9",dotFill=level==="expert"?"#8298ef":"#72b99a",out=`<defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.4" fill="${dotFill}" opacity=".4"/></pattern></defs><rect width="500" height="500" rx="15" fill="${boardFill}"/><rect width="500" height="500" fill="url(#dots)"/>`;worms.forEach(w=>{let points=w.cells.map((c)=>xy(c).join(",")).join(" "),[hx,hy]=xy(w.cells[1]),[dx,dy]=dir(w),px=-dy,py=dx;let e1=[hx+px*7-dx*2,hy+py*7-dy*2],e2=[hx-px*7-dx*2,hy-py*7-dy*2];out+=`<g class="worm" data-id="${w.id}" onclick="choose(${w.id})"><polyline points="${points}" fill="none" stroke="#52765e" stroke-width="29" stroke-linecap="round" opacity=".18" transform="translate(0 3)"/><polyline points="${points}" fill="none" stroke="${w.color}" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="${e1[0]}" cy="${e1[1]}" rx="6" ry="7" fill="white"/><ellipse cx="${e2[0]}" cy="${e2[1]}" rx="6" ry="7" fill="white"/><circle cx="${e1[0]+dx*2.5}" cy="${e1[1]+dy*2.5}" r="2.7" fill="#263a32"/><circle cx="${e2[0]+dx*2.5}" cy="${e2[1]+dy*2.5}" r="2.7" fill="#263a32"/></g>`});s.innerHTML=out}
function blocked(w){let[dx,dy]=dir(w),h=w.cells[1],occ=new Set();worms.filter(o=>o.id!==w.id).forEach(o=>o.cells.forEach(c=>occ.add(c.join(","))));let x=h[0]+dx,y=h[1]+dy;while(x>=0&&x<10&&y>=0&&y<10){if(occ.has(x+","+y))return true;x+=dx;y+=dy}return false}
function choose(id){if(locked)return;let w=worms.find(o=>o.id===id);if(!w)return;activeId=id;if(blocked(w)&&qPos<10)ask();else{if(blocked(w))toast("🌟 You used all 10 questions! Keep clearing the garden!");escape(id)}}
function escape(id){locked=true;let w=worms.find(o=>o.id===id),el=document.querySelector(`[data-id="${id}"]`),[dx,dy]=dir(w);if(el){el.style.transition="transform .6s,opacity .6s";el.style.transform=`translate(${dx*650}px,${dy*650}px)`;el.style.opacity=0}setTimeout(()=>{worms=worms.filter(o=>o.id!==id);escaped++;update();draw();if(escaped===LEVELS[level].total)finish(true);else locked=false},620)}
function ask(){locked=true;let q=Q[level][qOrder[qPos++]];$("qcount").textContent=`QUESTION ${qPos} OF 10`;$("questionsDone").textContent=qPos;$("question").textContent=q[0];$("feedback").textContent="";$("feedback").className="";$("passage").textContent=PASSAGE;$("passage").classList.toggle("hidden",!q[3]);let box=$("answers");box.innerHTML="";q[1].forEach((a,i)=>{let b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+i)+". "+a;b.onclick=()=>answer(i,q[2]);box.appendChild(b)});$("questionModal").classList.remove("hidden")}
function answer(choice,correct){let buttons=[...$("answers").children];buttons.forEach(b=>b.disabled=true);let right=choice===correct;if(right){stars++;$("feedback").textContent="🌟 Correct! Great job!";$("feedback").className="good"}else{lives--;$("feedback").textContent="💗 Not quite! The worm will still escape."; $("feedback").className="bad"}update();setTimeout(()=>{$("questionModal").classList.add("hidden");if(lives<=0){finish(false)}else escape(activeId)},1000)}
function finish(won){locked=true;$("endEmoji").textContent=won?"🏆":"🌷";$("endTitle").textContent=won?"Garden Champion!":"Good try, little gardener!";$("endMessage").textContent=won?`You helped all ${LEVELS[level].total} worms escape and completed all 10 English questions!`:`You have used all your lives. You escaped ${escaped} worms. Try again and win your garden prize!`;$("finalStars").textContent=stars;$("prizeBadge").textContent=won?(stars>=8?"🥇 GOLD ENGLISH CHAMPION":stars>=5?"🥈 SILVER GARDEN STAR":"🥉 BRONZE WORM HERO"):"🌱 Keep practising! Your prize is waiting!";$("confetti").innerHTML="";if(won){for(let i=0;i<65;i++){let bit=document.createElement("i");bit.style.setProperty("--x",Math.random()*100+"%");bit.style.setProperty("--h",Math.floor(Math.random()*360));bit.style.setProperty("--t",(1.8+Math.random()*2)+"s");bit.style.setProperty("--r",Math.random()*360+"deg");$("confetti").appendChild(bit)}}$("endModal").classList.remove("hidden")}
function hint(){if(locked)return;let free=worms.find(w=>!blocked(w));if(free){let el=document.querySelector(`[data-id="${free.id}"]`);if(el){el.style.filter="drop-shadow(0 0 10px #ffcb35)";setTimeout(()=>el.style.filter="",1500)}toast("✨ Try the glowing worm! Its path is clear.")}else toast("💡 All remaining worms are blocked. Tap one to answer a question!")}
let toastTimer;function toast(t){$("toast").textContent=t;$("toast").classList.remove("hidden");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.add("hidden"),2300)}
document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>startGame(b.dataset.level)));
$("homeBtn").onclick=()=>{$("game").classList.add("hidden");$("home").classList.remove("hidden");$("endModal").classList.add("hidden");$("questionModal").classList.add("hidden");locked=false};
$("change").onclick=$("homeBtn").onclick;
$("restart").onclick=()=>startGame(level);
$("again").onclick=()=>startGame(level);
$("endHome").onclick=$("homeBtn").onclick;
$("hint").onclick=hint;
$("instructions").onclick=()=> $("helpModal").classList.remove("hidden");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$(b.dataset.close).classList.add("hidden"));
$("game").addEventListener("click",e=>{if(e.target.id==="gameHow")$("helpModal").classList.remove("hidden")});
