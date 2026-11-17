/* Shared bits for every page: storage, tracking, real deadlines, testimonials, falling hearts. */
(function(){
  var C = window.WORKSHOP;
  var LS = { get:function(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
             set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} },
             del:function(k){ try{ localStorage.removeItem(k); }catch(e){} } };
  var qs = new URLSearchParams(location.search);
  // testing helper: ?reset=1 wipes this browser's progress and deadlines
  if(qs.get('reset') === '1'){ try{ Object.keys(localStorage).forEach(function(k){ if(/^ws_/.test(k)) localStorage.removeItem(k); }); }catch(e){} }
  // demo helper: ?demo=1 starts fresh and drops you 15 seconds before the offer appears
  if(qs.get('demo') === '1'){
    try{ var keepName = localStorage.getItem('ws_name'); Object.keys(localStorage).forEach(function(k){ if(/^ws_/.test(k)) localStorage.removeItem(k); });
      var at = String(C.revealAtSeconds - 14); localStorage.setItem('ws_registered', String(Date.now())); localStorage.setItem('ws_max', at); localStorage.setItem('ws_pos', at);
      if(keepName) localStorage.setItem('ws_name', keepName); }catch(e){}
  }

  var STD = /^(Lead|CompleteRegistration|AddToCart|ViewContent|InitiateCheckout)$/;
  function track(name, data){ try{ (window.dataLayer = window.dataLayer || []).push(Object.assign({event:name}, data||{})); if(window.fbq) fbq(STD.test(name) ? 'track' : 'trackCustom', name, data||{}); }catch(e){} }

  /* ----- real, per-person deadlines ----- */
  function watchDeadline(){
    var start = parseInt(LS.get('ws_window') || LS.get('ws_registered') || '0', 10);
    return start ? start + C.watchWindowMinutes * 60000 : 0;
  }
  function bonusDeadline(){ var t = parseInt(LS.get('ws_bonus_until') || '0', 10); return t || 0; }
  function startBonusClock(){ if(!bonusDeadline()) LS.set('ws_bonus_until', String(Date.now() + C.bonusWindowMinutes * 60000)); return bonusDeadline(); }
  function clock(ms){ ms = Math.max(0, ms); var s = Math.floor(ms / 1000), m = Math.floor(s / 60); return m + ':' + ('0' + s % 60).slice(-2); }
  // paints every element with [data-count="watch"|"bonus"] each second; calls onEnd once at zero
  function countdown(kind, onEnd){
    var fired = false;
    function tick(){
      var end = kind === 'bonus' ? bonusDeadline() : watchDeadline(); if(!end) return;
      var left = end - Date.now();
      document.querySelectorAll('[data-count="' + kind + '"]').forEach(function(el){ el.textContent = clock(left); });
      if(left <= 0 && !fired){ fired = true; if(onEnd) onEnd(); }
    }
    tick(); setInterval(tick, 1000);
  }

  /* ----- testimonials (from the Wall of Love, love.weand.me) ----- */
  var P = 'assets/people/';
  var LOVE = [
    {n:"Jared Morrison", r:"Trainer & Coach", img:"Jared_Morrison", q:"I use the Connection Toolkit all the time! One participant recently said, “I’ve worked with these people for 10+ years and just learned more in this session than ever before!”"},
    {n:"Heather Italiano", r:"Speaker & Facilitator", img:"Heather_Italiano", q:"People don’t remember slides. They remember conversations. In just three minutes, We! Connect Cards helped a group of strangers form a leadership support network."},
    {n:"Donnella Tilery", r:"HR & Talent Development Consultant", img:"Donella_Tilery", q:"I was over cutesy icebreakers. We! Connect Cards made my leadership training more engaging and impactful. I even used the trick of not calling it an icebreaker, and it worked like a charm!"},
    {n:"Alex Morgan", r:"Leadership Facilitator", q:"Chad’s toolkit helped a group of senior leaders quickly open up and have rich, meaningful conversations, setting the stage for an impactful workshop."},
    {n:"Renee Thompson", r:"CEO, Healthy Workforce Institute", img:"Renee_Thompson", q:"Our team was struggling through a tough transition. Using We! Connect Cards during our retreat was a game-changer. It helped us reconnect and tackle challenges together."},
    {n:"Mark Collard", r:"Founder of playmeo", img:"Mark_Collard", q:"I never leave home without a deck of We! Connect Cards. Super fun, meaningful, and impactful."},
    {n:"Heather Balcerek, CPTM", r:"Global Talent & Leadership Development", img:"Heather-Balcerek-opt", q:"We! Connect Cards helped our Executive Leadership Program participants make deeper connections. Some even asked for their own decks to bring back to their teams!"},
    {n:"JA", r:"Team Meeting Facilitator", q:"Everyone participated, even the introverts! Lots of laughter in the room. Our team meeting was a total success!"},
    {n:"Chris Summers, Ed.D.", r:"Assistant Superintendent", img:"Chris_Summers", q:"We! Engage Cards help new teachers build trust and connection within 30 minutes, turning strangers into a supportive community."},
    {n:"Gary Strudler", r:"Global Director, Kids Around the World", img:"Gary_Strudler", q:"The Connection Before Content framework has revolutionized all our classes."},
    {n:"Jason", r:"Workshop Facilitator", q:"We! Engage Cards are a hit every time I use them! I’m on my 4th set because my clients always want to keep them!"},
    {n:"Doug Zawisza, CPTM", r:"Learning & Development Partner", img:"Doug_Zawisa", q:"Our workshop combined We! Connect Cards, We! Connect Sticker Nametags, and Ask Powerful Questions. The response? “So much better than an icebreaker!”"},
    {n:"Jordanne Christie", r:"Professor", img:"Jordanne_Christie", q:"Whether it’s the first day or the last semester, students always learn something new about each other!"},
    {n:"Lisa Hulla", r:"Facilitator and Agency Coach, City and County of Denver", q:"The forum used the We! Connect Cards with 300 attendees and I was able to influence them to use connection before content."},
    {n:"Janét Fratoni", r:"Customer & Patient Experience Leader", img:"Janet_Fratoni", q:"We! Connect Cards transformed our training, getting people out of their seats, talking, and building real connections that last."},
    {n:"Laya Saul", r:"Nonprofit Founder", q:"At our nonprofit’s first board retreat, We! Connect Cards helped build “connection before content.” The board and staff, spanning every decade from their 30s to 70s, loved them!"},
    {n:"KC Ray", r:"Experiential Facilitator", img:"KC_RAY", q:"We! Connect Cards were a game-changer! They spark meaningful conversations, help participants find common ground, and make connections easy and natural."},
    {n:"Jennifer L. DePasquale", r:"National 4-H Council", q:"Your connection toolkit is awesome and I use it weekly for team meetings."},
    {n:"Debi Grebenik", r:"Founder, Trauma Training Institute", img:"Debi-Grebenik-sm", q:"I use We and Me cards for connection activities in my Zoom calls. Everyone looks forward to what question will pop up next!"},
    {n:"Bob Freese", r:"Facilitator", img:"Bob_Freese", q:"It’s not just the great tools, it’s the shift in perspective they create, making a “we” environment real and engaging for everyone in the room."},
    {n:"Donna Rae Decatur", r:"Talent Management and L&D, Exyte", q:"The card decks are amaaazzing. I have used them in leadership trainings, nonprofit board retreats and as a kick-off for new team interactions. They work!"},
    {n:"Lindsay Humber", r:"Community Engagement Facilitator", img:"Lindsay_Humber", q:"I use We! Engage Cards so often that I had to buy another set! They’re an easy way to warm up groups, and they look and feel great in hand."},
    {n:"Bev Kubat", r:"Rio Tinto", q:"From large groups as a way of kicking off an event to picking a single question as a small group check-in. Love the versatility!"},
    {n:"Sarah Thompson", r:"Corporate Trainer", q:"We! Connect Cards were a hit at orientation! Employees got to choose their questions, and everyone walked away knowing their coworkers better."},
    {n:"Steven Michael", r:"Superintendent and Leadership Coach", q:"Your tools have been incredibly helpful while getting groups into a collaborative mode."},
    {n:"Mitch Simon", r:"Executive Coach and Facilitator", q:"John Chen told me about you and your products yesterday and let’s just say you are saving my butt."}
  ];
  var ACC = ['blue','green','purple'];
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>';
  function esc(s){ var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function initials(n){ return n.replace(/,.*$/, '').split(/\s+/).map(function(w){ return w[0]; }).slice(0, 2).join(''); }
  // fills a container with testimonial cards (masonry columns), fading in as they scroll into view
  function wall(el, list){
    el.innerHTML = list.map(function(t, i){
      var face = t.img ? '<img loading="lazy" src="' + P + t.img + '.jpg" alt="">' : '<span class="ini ' + ACC[i % 3] + '">' + esc(initials(t.n)) + '</span>';
      return '<figure class="lv ' + ACC[i % 3] + '"><span class="h">' + HEART + '</span><p>' + esc(t.q) + '</p><figcaption>' + face + '<span><b>' + esc(t.n) + '</b>' + esc(t.r) + '</span></figcaption></figure>';
    }).join('');
    if(!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin: '0px 0px -8% 0px'});
    el.querySelectorAll('.lv').forEach(function(f, i){ f.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(f); });
  }

  /* ----- falling hearts that pile up (a light version of love.weand.me) ----- */
  function hearts(canvas, count){
    var ctx = canvas.getContext('2d'), host = canvas.parentElement, W = 0, H = 0, dpr = 1, Pt = [], run = false, raf = 0, spawned = 0;
    var COL = ['#1071B9', '#8CC640', '#903F97', '#58ABDC'];
    var HP = new Path2D('M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z');
    var SPR = COL.map(function(c){ var o = document.createElement('canvas'); o.width = o.height = 64; var g = o.getContext('2d'); g.scale(64/24, 64/24); g.fillStyle = c; g.fill(HP);
      var sh = g.createRadialGradient(8, 8, .5, 9, 10, 11); sh.addColorStop(0, 'rgba(255,255,255,.5)'); sh.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = sh; g.fill(HP); return o; });
    var r0 = 9;
    function size(){ W = host.clientWidth; H = host.clientHeight; dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = W * dpr; canvas.height = H * dpr;
      r0 = Math.max(6, Math.min(12, Math.sqrt(.5 * W * H * .4 / (count * 3.6)))); }
    function build(){ Pt = []; for(var i = 0; i < count; i++){ var r = r0 * (.75 + Math.random() * .55), x = r + Math.random() * (W - 2 * r), y = -r - Math.random() * 80;
      Pt.push({x:x, y:y, px:x + (Math.random() - .5) * 1.5, py:y - Math.random() * 2, r:r, a:(Math.random() - .5) * .6, s:SPR[i % SPR.length], live:false}); } spawned = 0; }
    function step(){
      var moving = 0, i, j, p, q;
      for(i = 0; i < Pt.length; i++){ p = Pt[i]; if(!p.live) continue; var vx = (p.x - p.px) * .99, vy = (p.y - p.py) * .99; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + .06; }
      for(i = 0; i < Pt.length; i++){ p = Pt[i]; if(!p.live) continue;
        for(j = i + 1; j < Pt.length; j++){ q = Pt[j]; if(!q.live) continue; var dx = q.x - p.x, dy = q.y - p.y, m = p.r + q.r, d2 = dx*dx + dy*dy;
          if(d2 < m*m && d2 > 1e-6){ var d = Math.sqrt(d2), f = (m - d) / d * .3; p.x -= dx*f; p.y -= dy*f; q.x += dx*f; q.y += dy*f; } } }
      for(i = 0; i < Pt.length; i++){ p = Pt[i]; if(!p.live) continue;
        if(p.x < p.r) p.x = p.r; else if(p.x > W - p.r) p.x = W - p.r;
        if(p.y > H - p.r){ p.y = H - p.r; p.px = p.x - (p.x - p.px) * .6; }
        if(Math.abs(p.x - p.px) + Math.abs(p.y - p.py) > .3) moving++; }
      return moving;
    }
    function draw(){ ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      Pt.forEach(function(p){ if(!p.live) return; p.a = p.a * .98 + (p.x - p.px) / p.r * .3; var z = p.r * 2.4, c = Math.cos(p.a), s = Math.sin(p.a);
        ctx.setTransform(c*dpr, s*dpr, -s*dpr, c*dpr, p.x*dpr, p.y*dpr); ctx.drawImage(p.s, -z/2, -z/2, z, z); }); }
    var still = 0;
    function frame(){ raf = 0; if(!run) return;
      if(spawned < Pt.length){ for(var k = 0; k < 2 && spawned < Pt.length; k++) Pt[spawned++].live = true; }
      var m = 0; for(var k2 = 0; k2 < 2; k2++) m = step(); draw();
      still = (spawned === Pt.length && m === 0) ? still + 1 : 0;
      if(still < 40) raf = requestAnimationFrame(frame); }
    function go(){ if(run) return; run = true; size(); build(); raf = requestAnimationFrame(frame); }
    if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function(es){ if(es[0].isIntersecting){ go(); io.disconnect(); } }, {threshold: .25});
    io.observe(host);
    // tap or click the band to drop another handful
    host.addEventListener('click', function(){ if(!run) return; for(var i = 0; i < 12; i++){ var r = r0 * (.75 + Math.random() * .55), x = r + Math.random() * (W - 2*r);
      Pt.push({x:x, y:-r, px:x, py:-r - 2, r:r, a:0, s:SPR[Math.floor(Math.random() * SPR.length)], live:true}); } spawned = Pt.length; still = 0; if(!raf) raf = requestAnimationFrame(frame); });
  }

  window.WS = { LS:LS, qs:qs, track:track, watchDeadline:watchDeadline, bonusDeadline:bonusDeadline, startBonusClock:startBonusClock, clock:clock, countdown:countdown, LOVE:LOVE, wall:wall, hearts:hearts, HEART:HEART };
})();
