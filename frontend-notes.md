\# Frontend Notes



\## 1. Component Structure Decision



I kept the visitor registration and visitor list responsibilities in separate React components.



`RegistrationForm.jsx` handles:

\- Visitor registration

\- Host loading

\- Visitor name suggestions

\- Registration errors



`VisitorList.jsx` handles:

\- Active visitor loading

\- Search

\- Pagination

\- Checkout

\- Loading, empty, and error states



I chose this structure because the two components have different responsibilities and API interactions. Keeping them separate makes the code easier to understand and maintain.



An alternative would have been to move all visitor-related state and API handling into a single parent component. I rejected that approach because it would make the parent component larger and would mix registration and visitor-list responsibilities.



\## 2. Handling API Errors



Client-side validation cannot guarantee that an API request will succeed.



The frontend API helper now handles:

\- Network failures

\- Non-success HTTP responses

\- Invalid JSON responses

\- API validation errors



These errors are converted into useful JavaScript errors and displayed through the appropriate error state in the registration form or visitor list.



Therefore, even when the form data is valid on the client, the application can still clearly inform the user when the server rejects the request or is unavailable.



\## 3. Defects Requiring Server-Side Adjustments



Some defects could not be completely solved only in the frontend.



The active/inactive visitor behavior depends on server-side filtering and visitor state. The backend therefore needs to ensure that inactive visitors are excluded from the active visitor endpoint and visitor search results.



The checkout operation also needs to update the server-side active state so that the frontend receives consistent visitor information.



\## 4. What I Would Do Differently With More Time



With more time, I would add automated frontend tests for the registration form and visitor list, including:



\- Successful visitor registration

\- API failure during registration

\- Loading state

\- Empty visitor list

\- Search results

\- No search results

\- Pagination

\- Checkout failure

\- Checkout success



I would also improve the UI styling and accessibility, including clearer loading indicators, better form feedback, and keyboard-friendly search suggestions.

