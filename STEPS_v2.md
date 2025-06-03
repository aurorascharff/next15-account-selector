# DEMO STEPS

## Starting point

- What you're looking at is an project dashboard demo app with an account selector. This is inspired by a real feature I built for my current consultancy project, where I'm actively using Next.js App Router with Server Components and React 19.
- Let’s pretend your designer gave this nice custom UI, a custom select that doesn't exist in any library. And you built it. And all is well.
- Demo the selection of the account and the loading state. Switch account, spinner, toast, updated dashboard. Looks good right? But wait.
- There are some UX problems here. The select is tied to the server update. Our loading state is not entirely in sync with the dashboard update, since the toast and the loading state fires after the request but not after the new page has loaded and the account is actually switched visually.
- What about accessibility? The keyboard navigation is incorrectly implemented, trying to use arrows, I have to use tabs when I should be using the arrow keys, does not close moving to next element. It does not close on escape click or on click outside. The menu dropdown placement isn't customizable and doe not have any smart auto positioning functionality.
- I have three problems: I'm trying to build a custom UI, yet I want it to be accessible, and I also want it to smoothly update the UI with async operations. But I'm not an accessibility expert, and I don't want to write all this boilerplate code to get it right.
- This situation was me not long ago. Who else has been in a similar situation? Who has tried to implement some of this stuff correctly? Who has failed? I did multiple times as well. It's a lot of work to get this right. And even if you do, it will be hard to maintain and extend.
- Goal: Make this custom account selector interactive and accessible, and improve the UX using certain tools: Ariakit and React 19. Let's get to the code!

## Setup

- The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, and Tailwind CSS v4.
- I already completed all the data fetching here.
- Page.tsx: Since app Router, can use Server components fetching data through this data access layer, getting all accounts from the database, getCurrentAccount based on a cookie value simulating auth, getting that account and, caching everything with cache() to avoid duplicate requests. When loading the page, the server components are completed on the server then streamed in and suspense fallbacks are used to create loading states.
- (And a bonus: using Next.js unauthorized.tsx error boundary to catch a thrown 401 forbidden(9) error if the account cookie is not a valid account).
- Everything is dynamically rendered since we are using cookies. And it's artificially slowed down so we can see the loading states.
- All of this is covered in detail in a previous talk of mine if you're interested! Or just check out the code on GitHub later.

## Initial implementation of AccountSelector

- Now, thats the setup, but our problems are is the AccountSelector component. So it has this nice custom UI that doesn't exist in any library.
- Showcase the typical React code using isLoading, expanded states. Mutation through endpoint contains lots of boilerplate code. For the select, it's hard to read the divs and spans. Probably I should have used lists anyways. I'm using state variables to define styles which is not optimal nor easy.
- Let's do a trial on one of these features. Let's try to implement the keyboard navigation correctly.
- Add snippet for escape key, add snippet for arrow keys and focus trap. Not up to standard.
- These are just two of the many things we need to implement for a menu. Don't even get me started on screen reader support, like adding aria-expanded and roles, aria-activedescendant, so that the screen reader user even knows that this is a select! Again, I'm not an a11y expert, and it's a lot!
- So. We don't want to do this. Delete the snippet code.

## Replace all divs with Ariakit equivalents and update styles

- Let's use Ariakit to solve this problem. Ariakit is a React library that provides accessible UI components and hooks for building interactive UIs. It has a lot of built-in functionality for accessibility, keyboard navigation, and more.
- Lets step by step replace all the divs with Ariakit equivalents, declarative components that are accessible by default and have all the functionality we need built in, and can compose together. Import ariakit.
- Remove "relative" from parent div
- Provider: Add ariakit Ariakit.SelectProvider between with value={account?.id}
- Label: Replace label div with Ariakit.SelectLabel
- Select: Replace open button with Ariakit.Select and remove setExpanded
- SelectArrow: We can't use expanded state anymore, replace chevron icon inside with Ariakit.SelectArrow, add class "group" to the Ariakit.Select and use group-expanded for the icon rotate rather than the useState
- SelectButton: Replace all styles and render SelectButton and showcase aria-expanded
- SelectPopover: Open the popover, remove expanded wrapper, replace "absolute" div Ariakit.SelectPopover, remove top-20, and add gutter={8},  open the popover
- SelectItem: Replace Icon item with Ariakit.SelectItem, replace hover: with data-active-item, the active item functionality is built in to Ariakit and stylable with data-active-item
- SelectItem: Replace item with Ariakit.SelectItem, and use data-active-item: rather than hover:, replace focus-visible with data-focus-visible to differentiate between the mouse and keyboard focus correctly, replace disabled: with aria-disabled, the disabled={} prop now is correctly implemented behind the scenes by Ariakit.
- SelectItemCheck: Replace the selected item check with Ariakit.SelectItemCheck and add value={account.id}
- All of this is in the documentation! And there are docs for non-tailwind users as well.
- Remove setExpanded from handleSwitchAccount, remove expanded useState.
- Showcase the result. Keyboard nav, focus trap, arrow keys, escape to close, click outside to close, open/close with enter, and the menu is now accessible by default. The screen reader reads the select and the items correctly.
- No longer have nameless divs, rather used declarative components with Ariakit without compromising on the customizability.

## Add useTransition for the loading state

- Now lets get to work on the mutation. This is a lot of boilerplate code. We can use the new react 19 to simplify this.
- To track the loading state, lets use the improved useTransition hook from React 19. It let's use create Actions, which are a different type of event handling. It runs in the background and does not block the main thread, like a deferred update. Returns pending state isPending and a startTransition function.
- Remove pending state useState.
- Wrap everything after the == check with useTransition, remove setPending, get pending state isPending. Move async keyword.
- Use pending state to set aria-busy on the select and notice the spinner using the new variable.
- Test that it works. The spinner is correctly synced to the UI update of the dashboard now.

## Use Server Function for the mutation

- Now the API call.Let's replace this with a function call to the server.
- (Create new file auth.ts with "use server", copy the API code. Call the server function inside the onClick. Type safe.)
- Call the server function inside the onClick instead of API. Showcase server function in account.ts. We can with server functions call server code from the client as a function, it creates a hidden API endpoint. Here setting the cookie simulating switching accounts. Erroring if the account is not active.
- Type safe with RPC.
- Delete api code and api layer. No type safety here by the way, I just deleted the endpoint but there was no way to know.
- Update the toast code to use response.error. Test it. It still works!

## Add useOptimistic for the optimistic update

- Notice again we are synced to the server with our select value. We want optimistic update here. We could start messing around with useState and keeping it in sync, but let's use more React 19 to make this easier.
- To avoid the delayed update on the select depending on the server, let's use the new useOptimistic hook from React 19. It takes in a state to show when no transition is pending, which is our server truth of the currentAccount, and returns a optimistic account state and a function to update it.
- Call useOptimistic hook above the server function, needs to be called inside a transition, but we already have that. Use the optimistic value for all the existing account variables (remember inside handleSwitchAccount).
- Showcase the optimistic update in the UI. The select updates immediately, and the loading state is shown in the background. UseOptimistic creates a temporary state that is shown while an async action is running, then throws it away when the transition is done and settles to the passed value.
- Showcase failure state by removing the disabled prop. We get automatic "rollback" because the optimistic value is not the same as the server value, it's just a temporary state.

## Showcase and use new toast implementation

- I want to improve the out of sync toast. It's actually triggering when the response comes back but before the UI has updated in the dashboard. And in addition, this toast doesn't work across page navigations. For example if I want a success toast after deleting an item, that would be a problem.
- I'm gonna try an implementation that Ryan Toronto shared on build ui, utilizing cookies to trigger toasts from the server side. And they work across page navigations.
- Replace Toaster from sonner with custom Toaster component in layout.tsx. Showcase implementation. Server side. I'm still testing this, so it might change in the future. This is just a demo.
- Delete toast code from AccountSelector, trigger toast from the server function, error and success. This is sweet because it's here on the server we know what the result of the action is and have all the information. Showcase what it looks like, now in sync with the action.
- A lot less code here using the React 19 hooks and the server function, and improved UX.

## Add logout item in menu

- Let's add another custom UI element to the select. A logout button, showcasing the customizability of Ariakit.
- Replace with Ariakit.SelectItem, styled with aria-disabled and not-aria-disabled:data-active-item underline.
- Showcase the result when focusing it and hovering it.
- We're gonna onClick call another Server Function, which deletes our account cookie (showcase). Track its loading state with another useTransition, creating a React Action. Add disabled= and "logging out" text. Log out and showcase the loading state and the styling with ariakit.

## Update login form to login again

- Here logged out, let's complete the app with a functional login button. Use .bind to directly bind the server function to the button. Don't need to create a client component for this, just use the React 19 form component that let's us call a function in the action property.
- We also want some interactivity on this form by extending our SubmitButton. Use the React 19 useFormStatus hook to track the loading state of the nearest parent form, and add use client. Composable interactive button that can be used in any form.
- Log in again and view the pending state.

## Final demo using only the keyboard

- Alright, let's do a final demo using only the keyboard. You can see my pressed keys on the screen.
- Load page and view data right away, get this stable loading state with suspense fallback using server components.
- Navigate with tabs, and use the menu with the arrow keys, switch them quickly, open/close menu with enter with good focus, escape close, click outside. And trust me the screen reader experience is good as well!
- Execute the switch, we have optimistic updates, and get an in sync toast. Open menu and log out again with pending state.

## Conclusion

- What did we achieve through this process?
- With Ariakit, we built a fully accessible UI: keyboard navigation, click outside to close, focus management, and screen reader support—all handled out of the box.
- Customization was straightforward, letting us style everything with Tailwind CSS using data- and aria-attributes.
- With React 19, we streamlined server communication using server functions, eliminating the need for a separate API layer.
- We replaced common patterns like `useState` and `useEffect` with new hooks like `useTransition`, `useFormStatus`, and `useOptimistic`, resulting in smoother interactions and simplified loading states.
- Instant user feedback and automatic error rollback were achieved with optimistic updates.
- The result: a maintainable, accessible, and user-friendly account selector with minimal boilerplate and modern best practices.
