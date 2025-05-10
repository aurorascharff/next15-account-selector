# DEMO STEPS

## Starting point

- This is a account dashboard demo app. Again this is inspired by that feature I showed in the slides.
- The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, and Tailwind CSS.
- I already completed all the data fetching here.
- Since app Router, using Server components fetching data based on a cookie value, fetched through this data access layer, caching everything with cache() to avoid duplicate requests. When loading the page, the server components are streamed in and suspense fallbacks are used to show loading states.a
- And a bonus: using Next.js unauthorized.tsx error boundary to throw a 401 error if the user is not logged in. This is a great way to handle authentication in Next.js. specific unauthorized error if the accountId in the cookie is not valid.
- Everything is dynamic since we are using cookies.
- All of this is covered in detail in a previous talk of mine if you're interested!
- Goal: Create a  interactive, accessible, custom account dashboard using these tools

## Initial implementation of AccountSelector

- Now, thats the setup, but our task is the AccountSelector component. So it has this nice custom UI that doesn't exist in any library.
- Demo the selection of the account and the loading state. Looks good right? But wait.
- Showcase the code using isLoading, expanded, and states. Mutation through endpoint contains lots of boilerplate code. Hard to read the divs and spans. Probably I should have used lists anyways.
- Now let's get into the problems here. Our loading state is not entirely in sync with the backend. The keyboard navigation is incorrectly implemented, I have to use tabs when I should be using the arrow keys. It does not close on escape click or on click outside. The menu dropdown placement isn't customizable and doe not have any smart auto positioning functionality. I'm using state variables to define styles which is not optimal nor easy.
- Who has tried to implement some of this stuff correctly? Who has failed? I know I have. It's a lot of work to get this right. And even if you do, it will be hard to maintain and extend.

## Add example implementation of accessibility

- Let's do a trial on one of these features. Let's try to implement the keyboard navigation correctly.
- Add snippet for escape key, add snippet for arrow keys and focus trap. Not up to standard. These are just two of the many things we need to implement for a menu. Don't even get me started on screen reader support, like adding aria-expanded and roles, activedescentant, so that the screen reader user even knows that this is a menu! Again, I'm not an a11y expert, and it's a a lot!
- Phew! So. We don't want to do this. Delete the snippet code.
- Let's use the solutions we covered in the slides.

## Replace all divs with Ariakit equivalents and update styles

## Use Server Function for the mutation

## Add useTransition for the loading state

## Add useOptimistic for the optimistic update

## Showcase and use new toast implementation

## Add logout item in menu

## Update login form to login again

## Final demo using only the keyboard

- Pending state on login, view data right away and prepare out actions with a stable UX, navigate with tabs, and use the menu with the arrow keys, switch them quickly, open/close menu with enter with good focus, have optimistic updates, and get an in sync toast. And trust me the screen reader experience is good as well! Open menu and log out again with pending state.
- Review our changes: ariakit for nameless divs, react 19 hooks, less code!
- Ending point: Were done. Accessible, interactive, custom, account selector, without becoming an accessibility expert. Lets go back and summarize.
