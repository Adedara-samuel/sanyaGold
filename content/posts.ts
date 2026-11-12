import type { Post } from "@/lib/types";

/**
 * Blog posts as typed content. To add a post, append an object to this array.
 * When you move to a CMS, update `lib/data.ts` — pages and hooks stay the same.
 * These are general educational articles, not tax advice for any specific situation.
 */
export const posts: Post[] = [
  {
    slug: "form-990-basics-for-minnesota-nonprofits",
    title: "Form 990 basics for Minnesota nonprofits",
    excerpt:
      "Which version of Form 990 your organization files, what goes into it, and how to make filing season less stressful.",
    category: "Nonprofits",
    publishedAt: "2026-09-15",
    readingMinutes: 5,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Most tax-exempt organizations must file an annual information return with the IRS. Which version you file depends mainly on your gross receipts and total assets. Filing on time keeps your exempt status in good standing and shows donors that you are well run.",
      },
      { type: "h2", text: "Which form do you file?" },
      {
        type: "ul",
        items: [
          "Form 990-N (e-Postcard): for small organizations with gross receipts normally at or below the IRS threshold.",
          "Form 990-EZ: a shorter return for mid-sized organizations under the IRS limits for receipts and assets.",
          "Form 990: the full return for larger organizations.",
        ],
      },
      {
        type: "callout",
        text: "IRS thresholds and Minnesota charitable reporting rules change from time to time. Check the current limits with your CPA before you file.",
      },
      { type: "h2", text: "Three habits that make filing easier" },
      {
        type: "ul",
        items: [
          "Keep restricted and unrestricted funds separate in your books all year.",
          "Keep board minutes, policies and compensation decisions documented.",
          "Reconcile your accounts monthly instead of waiting for year end.",
        ],
      },
      {
        type: "p",
        text: "If you're not sure which form applies to you, or you're behind on filings, a short conversation can help you understand your options.",
      },
    ],
  },
  {
    slug: "quarterly-estimated-taxes-small-business",
    title: "A simple guide to quarterly estimated taxes",
    excerpt:
      "Why estimated payments matter for small business owners, and a practical way to plan for them without the stress.",
    category: "Small Business",
    publishedAt: "2026-08-20",
    readingMinutes: 4,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "If you own a business that doesn't withhold tax from your income, you're generally expected to pay tax during the year through quarterly estimated payments. Missing them can lead to penalties and a large bill when you file.",
      },
      { type: "h2", text: "A practical approach" },
      {
        type: "ul",
        items: [
          "Set aside a fixed percentage of each deposit in a separate savings account.",
          "Review year-to-date profit with your accountant each quarter.",
          "Adjust your payments when your income changes significantly.",
        ],
      },
      {
        type: "callout",
        text: "Payment due dates and safe-harbor rules are set by the IRS and the Minnesota Department of Revenue. Confirm the current year's dates before you pay.",
      },
      {
        type: "p",
        text: "A short planning call each quarter takes most of the guesswork out of estimated taxes.",
      },
    ],
  },
  {
    slug: "audit-vs-review-vs-compilation",
    title: "Audit, review or compilation: which do you need?",
    excerpt:
      "A plain-English comparison of the three main types of financial statement services and when each one makes sense.",
    category: "Audit & Review",
    publishedAt: "2026-07-10",
    readingMinutes: 6,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Lenders, funders and boards often ask for financial statements prepared or examined by a CPA. The three most common services offer different levels of assurance, at different costs.",
      },
      { type: "h2", text: "Compilation" },
      {
        type: "p",
        text: "A CPA presents your financial information as financial statements without providing assurance. It's useful when you need professionally formatted statements.",
      },
      { type: "h2", text: "Review" },
      {
        type: "p",
        text: "A review provides limited assurance, mainly through analytical procedures and inquiry. It's often enough for smaller lenders and some funders.",
      },
      { type: "h2", text: "Audit" },
      {
        type: "p",
        text: "An audit provides reasonable assurance and includes testing, confirmations and an evaluation of internal controls. It's often required for larger nonprofits and certain grants.",
      },
      {
        type: "callout",
        text: "Before choosing, ask the person requesting the statements exactly what level of service they require. It can save you time and money.",
      },
    ],
  },
  // ── Articles carried over from the previous sanyagold.com blog (2025) ──
  {
    slug: "master-your-wallet-strategies-to-outsmart-impulse-buying-habits",
    title: "Master Your Wallet: Strategies to Outsmart Impulse Buying Habits",
    excerpt:
      "Practical ways to spot your spending triggers, slow down unplanned purchases and keep more of what you earn.",
    category: "Personal Finance",
    publishedAt: "2025-07-18",
    readingMinutes: 3,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Impulse purchases feel small in the moment, but they add up quickly and can quietly undo a careful budget. The good news is that a few simple habits make unplanned spending much easier to resist.",
      },
      { type: "h2", text: "Understand the triggers of impulse buying" },
      {
        type: "p",
        text: "Most impulse buys have a trigger: stress, boredom, a flash sale or a clever advert. Try writing down every unplanned purchase for a month, along with how you felt at the time. Patterns usually appear quickly, and once you can name a trigger it becomes much easier to pause.",
      },
      { type: "h2", text: "Create a budget and stick to it" },
      {
        type: "p",
        text: "List your essential expenses first, then set a fixed amount for fun spending, for example $50 a month for personal treats. Knowing you already have money set aside for enjoyment takes the pressure off, and makes a spontaneous splurge less tempting.",
      },
      { type: "h2", text: "Delay gratification with the 30-day rule" },
      {
        type: "p",
        text: "When you want something that isn't essential, write it down and wait 30 days. If you still want it after a month, and it fits your budget, buy it with a clear conscience. Very often the urge simply fades.",
      },
      { type: "h2", text: "Make a shopping list" },
      {
        type: "p",
        text: "Decide what you need before you shop and stick to the list. If you find yourself in a store without one, pause before adding anything to your basket and ask whether you came in for it.",
      },
      { type: "h2", text: "Use cash instead of cards" },
      {
        type: "p",
        text: "Handing over cash feels more real than tapping a card, which naturally slows spending. For shopping trips where you tend to overspend, withdraw only what you can afford and leave your card at home.",
      },
      { type: "h2", text: "Take a digital shopping break" },
      {
        type: "ul",
        items: [
          "Unsubscribe from promotional emails and sale alerts.",
          "Remove shopping apps from your phone's home screen.",
          "Use a spending-tracking app so you can see where your money goes.",
        ],
      },
      { type: "h2", text: "Don't save your card details on shopping sites" },
      {
        type: "p",
        text: "One-click checkout is designed to make buying effortless. Typing your card number in each time adds a moment of friction, which is often all you need to reconsider.",
      },
      { type: "h2", text: "Seek support from friends and family" },
      {
        type: "p",
        text: "Share your goals with someone you trust, or agree with friends to check in before bigger purchases. A little accountability goes a long way.",
      },
      { type: "h2", text: "Final thoughts" },
      {
        type: "p",
        text: "Changing spending habits takes time. Identify your triggers, budget for the treats you enjoy and give yourself time before buying, and impulse spending will steadily lose its grip.",
      },
    ],
  },
  {
    slug: "unlocking-hidden-income-streams-you-never-knew-existed",
    title: "Unlocking Hidden Income Streams You Never Knew Existed",
    excerpt:
      "From freelancing and hobbies to renting out unused space, a practical look at ways to add income alongside your main job.",
    category: "Personal Finance",
    publishedAt: "2025-06-16",
    readingMinutes: 4,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Whether you want to supplement your salary or build income that keeps working in the background, there are more options than most people realize. Here are some worth considering.",
      },
      { type: "h2", text: "Freelancing your skills online" },
      {
        type: "p",
        text: "Writing, design, book-keeping, tutoring and many other skills can be offered on freelance marketplaces. Start with small projects, collect good reviews and raise your rates as your reputation grows.",
      },
      { type: "h2", text: "Monetizing your hobbies" },
      {
        type: "p",
        text: "Handmade crafts can be sold online or at local markets, and a talent for cooking can become private lessons or small catering jobs. Turning something you already enjoy into income keeps it sustainable.",
      },
      { type: "h2", text: "Real estate investment" },
      {
        type: "p",
        text: "You don't need to buy a property outright to invest in real estate. Real estate crowdfunding platforms and real estate investment trusts (REITs) let you start with smaller amounts. Returns are never guaranteed, so understand the fees and risks first.",
      },
      { type: "h2", text: "Peer-to-peer lending" },
      {
        type: "p",
        text: "Lending platforms connect investors with borrowers and pay interest in return. Some loans will default, so spread your money across many small loans rather than a few large ones.",
      },
      { type: "h2", text: "Affiliate marketing" },
      {
        type: "p",
        text: "If you have a blog, newsletter or social following, you can earn a commission by recommending products you genuinely use. Be transparent with your audience about affiliate links.",
      },
      { type: "h2", text: "Creating online courses" },
      {
        type: "p",
        text: "If you have expertise in a subject, packaging it into an online course lets you earn from the same work again and again. Course platforms handle hosting and payments for you.",
      },
      { type: "h2", text: "Renting out unused space" },
      {
        type: "p",
        text: "A spare room, garage or parking space can earn regular income. Check local short-term rental rules, your lease or HOA terms and your insurance before you list it.",
      },
      { type: "h2", text: "Investing in dividend stocks" },
      {
        type: "p",
        text: "Some companies pay part of their profits to shareholders as dividends. A 3% dividend yield, for example, pays about $3 a year for every $100 invested. Research carefully and consider speaking with a licensed financial adviser before investing.",
      },
      {
        type: "callout",
        text: "Extra income is usually taxable. Keep records of what you earn and spend, and plan ahead for the tax on side income so it doesn't surprise you at filing time.",
      },
      { type: "h2", text: "Take the first step" },
      {
        type: "p",
        text: "You don't need to try everything at once. Pick one idea that suits your skills and time, start small and build from there.",
      },
    ],
  },
  {
    slug: "unlock-financial-freedom-discover-the-thrilling-benefits-and-simple-steps-to-master-budgeting-today",
    title: "Unlock Financial Freedom: Discover the Thrilling Benefits and Simple Steps to Master Budgeting Today!",
    excerpt:
      "What a budget is, why it matters and six simple steps to build one that helps you save, plan and worry less about money.",
    category: "Personal Finance",
    publishedAt: "2025-05-19",
    readingMinutes: 4,
    author: "Sanyagold Team",
    body: [
      {
        type: "p",
        text: "Budgeting can feel overwhelming, especially when you're just starting out on your own. But a budget is simply a plan for your money, and it's one of the most useful tools for paying bills on time, building savings and reaching your goals.",
      },
      { type: "h2", text: "Understanding budgeting" },
      {
        type: "p",
        text: "A budget sets out what money comes in and where it goes. Think of it as a roadmap: if you want a $1,000 phone, setting aside $100 a month gets you there in ten months without debt.",
      },
      { type: "h2", text: "The benefits of budgeting" },
      {
        type: "ul",
        items: [
          "Financial awareness: you see exactly where your money goes, including small habits like daily coffee that add up.",
          "Control over spending: setting limits for categories such as food keeps spending on track.",
          "More savings: even saving 10% of your income adds up quickly.",
          "Clear goals: saving $200 a month for a year covers a $2,400 trip.",
          "Less stress: knowing your numbers removes much of the worry about money.",
          "Better habits: reviewing your budget regularly shows where you can improve.",
          "Readiness for emergencies: an emergency fund turns a surprise $300 car repair into an inconvenience, not a crisis.",
        ],
      },
      { type: "h2", text: "Six steps to build your budget" },
      {
        type: "ul",
        items: [
          "Set financial goals: decide what you're working towards, short and long term.",
          "Track your income: use your take-home pay after taxes.",
          "Identify your expenses: separate fixed costs (rent, insurance) from variable ones (groceries, entertainment).",
          "Create your plan: give every dollar a job, and make sure spending doesn't exceed income.",
          "Monitor and adjust: compare actual spending against your plan as the month goes on.",
          "Evaluate your progress: at month end, review what worked and adjust next month's plan.",
        ],
      },
      { type: "h2", text: "Tips for successful budgeting" },
      {
        type: "ul",
        items: [
          "Stay consistent: a quick weekly check-in keeps you on track.",
          "Use a budgeting app: many link to your bank account and categorize spending for you.",
          "Be realistic: set limits that reflect how you actually live.",
          "Celebrate small wins: every milestone is worth recognizing.",
        ],
      },
      { type: "h2", text: "Your journey to financial control" },
      {
        type: "p",
        text: "Budgeting isn't about restriction. It's about deciding what matters to you and making sure your money supports it. Start simple, stay consistent and adjust as you go.",
      },
    ],
  },
  {
    slug: "understanding-the-complexities-of-tax-regulations-for-small-business-owners",
    title: "Understanding the Complexities of Tax Regulations for Small Business Owners",
    excerpt:
      "The main taxes small businesses face, the records that make compliance easier and common deductions and credits to ask your CPA about.",
    category: "Small Business",
    publishedAt: "2025-04-29",
    readingMinutes: 4,
    author: "W O Oyebamiji CPA LLC",
    body: [
      {
        type: "p",
        text: "Tax rules can feel complicated for small business owners, and the rules that apply to you depend on your business structure, where you operate and whether you have employees. Understanding the basics helps you stay compliant and avoid paying more than you need to.",
      },
      { type: "h2", text: "Why understanding tax rules matters" },
      {
        type: "p",
        text: "Getting taxes wrong can lead to penalties, interest and missed deductions. Knowing your obligations, and keeping good records all year, makes filing faster and reduces surprises.",
      },
      { type: "h2", text: "Common tax obligations for small businesses" },
      {
        type: "ul",
        items: [
          "Income tax: how business income is taxed depends on your structure (sole proprietorship, partnership, S corporation or C corporation).",
          "Self-employment tax: sole proprietors and partners generally pay Social Security and Medicare tax on their net earnings.",
          "Sales tax: if you sell taxable goods or services in Minnesota, you generally need to collect and remit Minnesota sales tax, plus any applicable local taxes.",
          "Payroll taxes: employers withhold and pay federal and state income tax, Social Security and Medicare, and unemployment taxes. Penalties for unpaid payroll taxes can be severe.",
          "Excise taxes: some industries, such as alcohol, tobacco and fuel, have additional taxes.",
        ],
      },
      { type: "h2", text: "Keep accurate records" },
      {
        type: "ul",
        items: [
          "Use accounting software to record income and expenses as they happen.",
          "Keep an organized system for receipts, whether paper or digital.",
          "Reconcile your bank and credit card accounts every month.",
        ],
      },
      { type: "h2", text: "Deductions and credits to ask about" },
      {
        type: "ul",
        items: [
          "Home office: if you use part of your home regularly and exclusively for business, you may be able to deduct a share of related costs.",
          "Ordinary and necessary business expenses: supplies, business travel and professional fees are typically deductible.",
          "Depreciation: the cost of larger assets, such as equipment or a business vehicle, can be deducted over time, based on business use.",
          "Small Business Health Care Tax Credit: eligible small employers that provide health coverage may qualify.",
          "Work Opportunity Tax Credit: available for hiring employees from certain targeted groups.",
        ],
      },
      {
        type: "callout",
        text: "Eligibility rules, limits and rates change regularly. Confirm what applies to your business with a CPA before you file.",
      },
      { type: "h2", text: "How to stay compliant as tax laws change" },
      {
        type: "ul",
        items: [
          "Work with a tax professional, such as a CPA.",
          "Watch for updates from the IRS and the Minnesota Department of Revenue.",
          "Attend workshops or webinars from business associations.",
          "Set calendar reminders for filing and payment deadlines.",
        ],
      },
      { type: "h2", text: "Navigate tax rules with confidence" },
      {
        type: "p",
        text: "With good records, a clear calendar and the right professional support, managing your business taxes becomes far more manageable.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
