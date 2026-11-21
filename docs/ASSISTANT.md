# Ask Flame help robot

The robot in the bottom right corner answers questions from the website's own content and takes visitors to the right page. There is no AI service behind it and no running cost.

## How it answers
1. **Knowledge base** (`content/knowledge-base.ts`): short owner-written answers. These win when a question matches.
2. **Site content**: services, packages, products, Insights, team, story and FAQs, indexed automatically from the `content/` files.
3. **No match**: it says so and offers WhatsApp or the contact page. It never guesses.

## Updating the knowledge base
1. Open `content/knowledge-base.ts` and copy an existing entry.
2. Fill in `question`, `answer` (one to three sentences), `link` (a real page), `alsoAsked` (other ways people ask it) and `updated` (today's date).
3. Run `npm run test:marketing`. It blocks unknown links, dashes, published prices, American spellings, long answers and calling an unlaunched product available.
4. Open a branch and PR, check it on staging, then merge.

Rules: only facts already approved and published on the site. No prices, no invented clients, figures or partners. Review each entry when its `updated` date is three months old.

## Privacy
- Questions typed into the search stay in the visitor's browser.
- An optional first name is kept in the visitor's browser only, to greet them.
- A call back form is offered only when the robot cannot answer or the question is about prices, quotes or starting a project. It sends to the inbox through FormSubmit only if the visitor adds a phone number, ticks consent and presses Send. The privacy notice (section 2) describes this.
