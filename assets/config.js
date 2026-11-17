/* workshop.weand.me settings. Everything you might want to change lives here. */
window.WORKSHOP = {
  // The workshop video (YouTube for now; swap the id to change the video).
  youtubeId: "LcJgpAhOvko",
  durationSeconds: 909,

  // When the Toolkit offer appears. 670 = 11:10 (Chad picked this moment on Nov 14, 2026).
  revealAtSeconds: 670,

  // A quiet "Get the kit" link under the video, from the first time Chad mentions the kit
  // (0:20, "I'm going to end by pointing you toward a kit") until the full kit card appears.
  earlyKitAtSeconds: 24,

  // Real deadlines, per person (minutes).
  // watchWindow: how long after signing up (or after the time they picked) the workshop stays open.
  // bonusWindow: how long after the offer appears the workshop bonuses stay available.
  watchWindowMinutes: 60,
  bonusWindowMinutes: 20,

  // Kit (email). Paste the Kit form id here to start collecting sign-ups.
  // While this is empty the form works in preview mode: nothing is sent anywhere.
  kitFormId: "10202361",   // Kit form "/workshop (workshop.weand.me free workshop)", no confirmation email

  // Social proof lines on the sign-up page. Edit freely.
  proof: {
    trusted: "Trusted by 100,000+ leaders, trainers, educators and facilitators",
    reviews: "1,000+ five-star reviews"
  },

  // Shopify. The button sends people straight to checkout with the Toolkit in the cart.
  shopDomain: "shop.weand.me",
  toolkitVariantId: "41600244121734",
  price: 197,

  // The value stack shown at the offer. "bonus: true" items show as workshop bonuses and expire,
  // unless "keep: true" (the masterclass always comes with the Toolkit, so it never expires).
  stack: [
    { title: "The Connection Toolkit", detail: "Two card decks, the Roadmap to Connection, the book and playmeo access.", value: 197,
      img: "https://cdn.shopify.com/s/files/1/0592/6151/7958/files/Connection_Toolkit_-_Main-opt.jpg?v=1744637377&width=300" },
    { title: "Connection Before Content Masterclass", detail: "The full on-demand masterclass, yours to keep.", value: 697, bonus: true, keep: true,
      img: "https://cdn.shopify.com/s/files/1/0592/6151/7958/files/masterclass_1da74697-a616-4b16-af72-7888d5762dcc.jpg?v=1744637180&width=300" },
    { title: "A free deck of Future Focused We! Connect Cards", detail: "Our newest deck, added to your box.", value: 39, bonus: true,
      img: "https://cdn.shopify.com/s/files/1/0592/6151/7958/files/Shopify_Header_Photo_Future_Focused_We_Connect_CardsShopify_Header_Photo_Future_Focused_We_Connect_Cards-opt_1.webp?v=1759253612&width=300" },
    { title: "The printable version of all the cards", detail: "Print-ready files of every deck, emailed right after you order.", value: 39, bonus: true,
      img: "https://cdn.shopify.com/s/files/1/0592/6151/7958/files/Digital_Print_Pack_Main_image.png?v=1778189979&width=300" }
  ],

  // To make the bonuses real in Shopify: add the free deck (variant 41600239861894) with a 100% off
  // discount code, then fill these in. Both empty = the order goes through as the Toolkit alone.
  bonusVariantId: "",
  bonusDiscountCode: "",

  // One-time upgrade, shown once in the order panel before checkout.
  oto: {
    show: true,
    variantId: "41600240648326",   // Effortless Engagement Kit
    title: "The Effortless Engagement Kit",
    price: 497,                    // regular store price
    discountCode: "",
    // Struck-through "Valued at" figure. Only values stated on the store listing:
    // Connection Toolkit $197 + playmeo $117 + both masterclasses $1,394 = $1,708 (the other items have no listed value).
    valuedAt: 1708,
    valueNote: "Valued at $1,708 using the values on our store: Connection Toolkit $197, playmeo $117, both masterclasses $1,394. The rest is extra.",
    img: "https://cdn.shopify.com/s/files/1/0592/6151/7958/files/The-Literally-Everything-Kit-scaled.jpg?v=1744638007&width=700"
  },

  // Tracking. Paste a Meta Pixel id to turn on ad tracking. Empty = off.
  metaPixelId: "",

  // Seven learnings. Each one is a lock on the video bar at second t; its card flips once the video passes it.
  // The last two unlock during the unboxing (12:28 and 13:40), so people keep watching to the end.
  learnings: [
    { t: 92,  color: "blue",   title: "The big idea", text: "“Without relatedness, no real work can occur.”", by: "Peter Block" },
    { t: 262, color: "green",  title: "The purpose", text: "Connect to the purpose. When Johns Hopkins surgical teams shared their names and any concerns before surgery, errors and deaths dropped." },
    { t: 356, color: "purple", title: "3 ingredients", text: "Great openers connect people to each other, connect them to the purpose, and offer a choice to share, never a mandate." },
    { t: 418, color: "blue",   title: "Groups of 3", text: "Use groups of three. In a group of twelve, sharing is public speaking. In a group of three, it’s a conversation." },
    { t: 552, color: "green",  title: "The debrief", text: "Debrief after every small group conversation. Ask, “What struck you about those conversations?”" },
    { t: 748, color: "purple", title: "Make it visible", text: "Make conversations visible. People remember an image paired with a person even longer than they remember a name." },
    { t: 820, color: "blue",   title: "The question swap", text: "Try a question swap: pair up, ask, swap cards, find someone new. It works for 30 people or 6,000." }
  ]
};
