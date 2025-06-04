# DEMO STEPS

## Starting point

- What you're looking at is an project dashboard demo app with an account selector. This is based on by a real feature I built for my current project, the inspiration behind this talk.
- Let’s pretend your designer gave this nice custom UI, with a custom account select that doesn't exist in your component library. So you built it yourself. And all is well, right? Let's try this out.
- This account select allows me to switch account, get a loading state spinner, a toast, and see the updated dashboard. There was a strange interaction there, the loading state was not entirely in sync with the visual dashboard. Oh well, let's also try interacting with this dropdown.
- (My toast is also out of sync, it shows the success message before the dashboard has updated.)
- The keyboard navigation is incorrectly implemented, trying to use arrows, I have to use tabs when I should be using the arrow keys, does not close moving to next element. It does not close on escape click or on click outside. The menu popover placement isn't smart and doe not have any smart auto positioning functionality (show with console).
- I have these challenges: I'm trying to build a custom UI component, yet I want it to be accessible, but I'm not an accessibility expert. I also want to smoothly handle async operations with a good UX. and I don't want to write lot's of code to get all this right.
- This situation was me not long ago. Who else has been in a similar situation?
- Goal of this demo: show you how to make this custom account selector interactive and accessible, and improve the unstable UX using certain tools: Ariakit and React 19. Let's get to the code!

## Setup

- The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, and Tailwind CSS v4.
- I already completed all the data fetching here.
- Page.tsx: Since app Router, can use Server components fetching data through this data access layer, getting all accounts from the database, getCurrentAccount based on a cookie value simulating auth, getting that account and, caching everything with cache() to avoid duplicate requests. When loading the page, the server components are completed on the server then streamed in and suspense fallbacks are used to create loading states.
- Everything is dynamically rendered since we are using cookies. And it's artificially slowed down so we can see the loading states.
- (And a bonus: using Next.js unauthorized.tsx error boundary to catch a thrown 401 forbidden(9) error if the account cookie is not a valid account).
- All of this is covered in detail in a previous talk of mine if you're interested! Or just check out the code on GitHub later.

## Initial implementation of AccountSelector

- Now, thats the setup, but our problems are is the AccountSelector component. It's reading a promise from the server of the current account with React 19 use().
- Showcase the typical React code using isLoading, expanded states. Mutation through endpoint contains lots of boilerplate code. A sort of naive optimistic update here using setState. Quite a lot of code, probably prone to bugs. Let's say I just coded this up without thinking too much about it, and it works, but it could be better.
- For the select, it's hard to read the divs and spans, I even marked them so I can find them. I should maybe have extracted this to components. And probably I should have used different elements. I'm using state variables to define styles which is not optimal.

## Try to fix the accessibility issues

- Let's try to fix the accessibility issues. Let's try to implement the keyboard navigation correctly. It's not up to standard, though.
- Add snippet for escape key. Looks familiar?
- (Add snippet for arrow keys and focus trap.)
- These are just one(two) of the many things we need to implement for a menu. Don't even get me started on screen reader support, by adding roles and things like aria-expanded and aria-activedescendant, so that the screen reader user even knows that this is a select! Again, I'm not an a11y expert!
- Who has tried to implement some of this stuff correctly? Who has failed? I did multiple times as well. It's a lot of work to get this right. And even if you do, it will be hard to maintain and extend.
- So. We don't want to do this. Delete the snippet code.

## Replace all divs with Ariakit equivalents and update styles

- Let's use Ariakit to solve this problem. Import ariakit.
- Ariakit is a React library that provides unstyled, primitive components and hooks for building interactive UIs. Provides declarative components that are accessible by default and have all the functionality we need built in, and can compose together.
- Lets step by step replace all the divs with Ariakit equivalents.
- Remove "relative" from parent div
- Provider: Add ariakit Ariakit.SelectProvider between with value={currentAccount?.id}
- Label: Replace label div with Ariakit.SelectLabel
- Select: Replace open button with Ariakit.Select and remove setExpanded
- SelectArrow: We can't use expanded state anymore, replace chevron icon inside with Ariakit.SelectArrow, add class "group" to the Ariakit.Select and use group-expanded for the icon rotate rather than the useState
- SelectButton: Replace all styles and render SelectButton and showcase aria-expanded
- SelectPopover: Open the popover, remove expanded wrapper, replace "absolute" div Ariakit.SelectPopover, remove top-20, and add gutter={8},  open the popover
- SelectItem: Replace Icon item with Ariakit.SelectItem, replace hover: with data-active-item, the active item functionality is built in to Ariakit and stylable with data-active-item
- SelectItem: Replace item with Ariakit.SelectItem, and use data-active-item: rather than hover:, replace focus-visible with data-focus-visible to differentiate between the mouse and keyboard focus correctly, replace disabled: with aria-disabled, the disabled={} prop now is correctly implemented behind the scenes by Ariakit.
- SelectItemCheck: Replace the selected item check with Ariakit.SelectItemCheck and add value={account.id}
- All of this is in the documentation! And there are docs for non-tailwind users as well. And so many ariakit primitives, not only for selects, but also for menus, dialogs, tooltips, and more. And they can be composed together.
- Remove setExpanded from handleSwitchAccount, remove expanded useState.
- Showcase the result. Smart placement, keyboard nav, focus trap, arrow keys, escape to close, click outside to close, open/close with enter, and the menu is now accessible by default.
- No longer have nameless divs, rather used declarative components with Ariakit without compromising on the customizability.

## Add useTransition for the loading state

- Now lets get to work on the async operation, the account switching. This is a lot of boilerplate code. We can use the new react 19 to simplify this, and fix the out of sync spinner as well.
- To track the loading state, lets use the improved useTransition hook from React 19. It let's use mark a state update as non-urgent or deferred, and commits all of them once they are all done. Returns pending state for the transition and a startTransition function.
- Remove pending state useState.
- Wrap everything above the api call with useTransition, remove setPending, get pending state isPending. Move async keyword.
- Use pending state to set aria-busy on the select.
- Test that it works. The spinner is correctly synced to the UI update of the dashboard now.

## Use Server Function for the mutation

- Now the API call. Let's replace this with a function call to the server, switchAccount.
- (Create new file auth.ts with "use server", copy the API code. Call the server function inside the onClick. Type safe.)
- Call the server function inside the onClick instead of API. Showcase server function in account.ts. We can with React 19 server functions call server code from the client as a function, it creates a hidden API endpoint. Here setting the cookie simulating switching accounts. Erroring if the account is not active.
- Type safe with RPC.
- Delete api code and api layer. No type safety here by the way, I just deleted the endpoint but there was no way to know.
- Update the toast code to use response.error. Test it. It still works!
- Replace router.refresh with revalidatePath inside the server function, so that the page is revalidated and the new account and data is fetched from the server. Remove router.

## (Showcase and use new toast implementation)

- I want to improve the out of sync toast. It's actually triggering when the response comes back but before the UI has updated in the dashboard. And in addition, this toast doesn't work across page navigations. For example if I want a success toast after deleting an item, that would be a problem.
- I'm gonna try an implementation that Ryan Toronto shared on build ui, utilizing cookies to trigger toasts from the server side. And they work across page navigations.
- Replace Toaster from sonner with custom Toaster component in layout.tsx. Showcase implementation. Server side. I'm still testing this, so it might change in the future. This is just a demo.

## Move toast code to server function

- For these toasts, I'm actually using an implementation that Ryan Toronto shared on build UI, utilizing cookies to trigger toasts from the server side. I won't get into the details of this implementation, but it's a nice way to handle toasts in a server function. And they work across page navigations.
- We can actually move the toast code from AccountSelector, trigger toast from the server function, error and success. This is nice because it's here on the server we know what the result of the action is and have all the information. And it works across page navigations.
- Delete toasts from handleSwitchAccount. Still works.

## Add useOptimistic for the optimistic update

- Let's use more React 19 to make this easier.
- Remove naive useState and use currentAccountResolved directly, rename to currentAccount. See delayed update on the select.
- To avoid the delayed update on the select depending on the server, let's use the new useOptimistic hook from React 19. It takes in a state to show when no transition is pending, which is our server truth of the currentAccount, and returns a optimistic account state and a function to update it.
- Call useOptimistic hook above the server function inside the transition. Use the optimistic value for all the existing account variables (remember inside handleSwitchAccount).
- Showcase the optimistic update in the UI. The select updates immediately, and the loading state is shown in the background. UseOptimistic creates a temporary state that is shown while the transition is running, then throws it away and settles to the passed value.
- Showcase failure state by removing the disabled prop. We get automatic "rollback" because the optimistic value is not the same as the server value, it's just a temporary state.
- We simplified the handleSwitchAccount function greatly with less code, fixed the out of sync loading state, and made it arguably better with less risk of bugs.

## Add logout item in menu

- Im already done with my improvements, but let's add some final features to this account selector.
- Let's add another custom UI element to the select. A logout button, showcasing the customizability of Ariakit.
- Styled with aria-disabled and not-aria-disabled:data-active-item underline.
- Showcase the result when focusing it and hovering it.
- We're gonna onClick call another Server Function, which deletes our account cookie (showcase). Track its loading state with another useTransition, creating a React Action. Add disabled= and "logging out" text.
- Log out and showcase the loading state and the styling with ariakit.

## Update login form to login again

- Here logged out, let's complete the app with a functional login button. Let's use a React 19 improved form that let's us call a function in the action property. Need a parameter, instead of creating a client component with a callback function, let's use bind to directly bind the server function to the button.
- We also will have some interactivity on this button, because it's the React 19 useFormStatus hook to track the loading state of the nearest parent form. Composable interactive button that can be used in any form.
- Log in again and view the pending state.

## Final demo

- Alright, let's do a final demo.
- Load page and view the UI right away, get this stable loading state with suspense fallback using server components.
- Navigate with tabs, open menu and use the menu with the arrow keys, all my styling is applied accordingly with hover or focus, open/close menu with enter with good focus, escape close, click outside. Popover automatic placement. And trust me the screen reader experience is good as well, provided by Ariakit.
- Execute the switch, we have optimistic updates, and get an in sync loading state and a toast. Open menu and log out again with pending state and log back in.

## Conclusion

- What is the bottom line? What did we achieve?
- With ariakit, we were able to build fully accessible UI, rather than nameless divs we also got clean, declarative, composable component code without boilerplate.
- We were able to easily customize the UI and style it with our normal tailwind CSS flow using data- and aria-attributes provided.
- With React 19, we streamlined server communication using server functions, eliminating the need for a separate API layer.
- We utilized alternatives to common solutions like useState with useTransition and useOptimistic, and got smooth interactions, instant user feedback and "error rollback", and simplified loading states and code.
- And finally, we quickly added some addition features like a logout button and a login form with the React 19 form API and useFormStatus.
- The result: a maintainable, accessible, and user-friendly account selector with minimal boilerplate and modern best practices.
