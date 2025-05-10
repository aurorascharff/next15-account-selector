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
- Add snippet for escape key, add snippet for arrow keys and focus trap. Not up to standard. These are just two of the many things we need to implement for a menu. Don't even get me started on screen reader support, like adding aria-expanded and roles, activedescentant, so that the screen reader user even knows that this is a select! Again, I'm not an a11y expert, and it's a a lot!
- Phew! So. We don't want to do this. Delete the snippet code.
- Let's use the solutions we covered in the slides.

## Replace all divs with Ariakit equivalents and update styles

- Lets step by step replace all the divs with Ariakit equivalents.
- Remove "relative" from parent div
- Add ariakit Ariakit.SelectProvider between
- Replace label div with Ariakit.SelectLabel
- Replace open button with Ariakit.SelectButton
- Replace chevron icon inside with Ariakit.SelectArrow
- Replace "absolute" div Ariakit.SelectPopover
- Remove expanded useState for expanded state, add class "group" to the Ariakit.Select and use group-expanded for the icon rotate rather than the useState, showcase aria-expanded inside a component SelectButton
- Replace item with Ariakit.SelectItem, and use data-active-item: rather than hover:, the active item functionality is built in to Ariakit and stylable with data-active-item, replace focus with data-focus-visible to differentiate between the mouse and keyboard focus correctly, replace disabled: with aria-disabled:
- Replace the account buttons with Ariakit.SelectItem as well, replace hover: with data-active-item:, the disabled={} prop now is correctly implemented behind the scenes by Ariakit, use aria-disabled to style it
- Replace the selected item check with Ariakit.SelectItemCheck

## Use Server Function for the mutation

- Now lets get to work on the mutation. This is a lot of boilerplate code. We can use the new react 19 Server Functions to simplify this.
- Create new file account.ts with "use server", copy the API code
- Delete api code and api layer
- Call the server function inside the onClick

## Add useTransition for the loading state

- To track the loading state now, lets use the new useTransition hook from React 19. It let's use create Actions, which are a different type of event handling. It runs in the background and does not block the main thread, like a deferred update.
- Wrap server function with useTransition, get pending state isPending and replace the old one
- Use pending state to set aria-busy on the select and notice the spinner using the new variable

## Add useOptimistic for the optimistic update

- We deleted the naive optimistic update code, setting state on error. Lets add it back in a better way.
- To avoid the delayed update on the select depending on the server, let's use the new useOptimistic hook from React 19. It allows us to create an optimistic update, which is a temporary state that is shown while an async action is running.
- Add useOptimistic hook and wrap the server function with it. Use the optimistic value for all the existing account variables.
- Showcase the optimistic update in the UI. The select updates immediately, and the loading state is shown in the background. The spinner is shown on the button, and the select is disabled while loading.
- Showcase failure state by removing the disabled prop. We get automatic "rollback" because the optimistic value is not the same as the server value, it's just a temporary state.

## Showcase and use new toast implementation

- Now, we need to add back the toast that we had before. I would need to return something from this server function, and trigger toasts based on that or even use something like useActionState. Problem is, that doesn't work across page navigations. For example if i want a success toast after deleting a contact, that would be a problem.
- I'm gonna use an implementation that Ryan Toronto shared on build ui, utilizing cookies to trigger toasts from the server side. And they work across page navigations.
- Replace Toaster from sonner with custom Toaster component in layout.tsx. Showcase implementation.
- Delete toast code from AccountSelector
- Trigger toast from the server function. This is sweet because it's here on the server we know what the result of the action is. Showcase what it looks like, now in sync with the action.

## Add logout item in menu

- Let's add another custom UI element to the select. A logout button, showcasing the customizability of Ariakit.
- Await a new promise, track its loading state with another useTransition, creating a React Action.
- Style it with aria-disabled and not:data-active-item underline. Showcase the result when focusing it and clicking it.
- We're gonna call another Server Function, which deleted our account cookie. Log out.

## Update login form to login again

- Here logged out, let's complete the app with a functional login button. Use .bind to directly bind the server function to the button. Don't need to create a client component for this.
- Let's also create some final interactivity on this form using a SubmitButton. Head over to it, make it a client component, and use the React 19 useFormStatus hook to track the loading state of the nearest parent form.

## Final demo using only the keyboard

- Alright, let's do a final demo using only the keyboard. You can see my pressed keys on the screen.
- Pending state on login, view data right away and prepare out actions with a stable UX, navigate with tabs, and use the menu with the arrow keys, switch them quickly, open/close menu with enter with good focus, have optimistic updates, and get an in sync toast. And trust me the screen reader experience is good as well! Open menu and log out again with pending state.
- Review our changes: ariakit for nameless divs, react 19 hooks, less code!
- Ending point: Were done. Accessible, interactive, custom, account selector, without becoming an accessibility expert. Lets go back and summarize.
