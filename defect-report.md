Defect Report - Visitor Check-in Application



&#x20;Anil Upreti



&#x20;Scope

This report covers the defects I identified while exploring the visitor check-in application, both through the API directly and through the React frontend. Where a defect is environment-dependent (development vs production), I have noted that in the description. I have separated true defects from missing or ambiguous requirements at the end of the document.





&#x20;Assumptions



Before listing defects, I want to state the assumptions I made while testing. These affected my judgement about what counts as a defect.



1\. The brief states "All times are displayed in the receptionist's local

&#x20;  timezone." The application is documented as being designed for

&#x20;  Asia/Kathmandu (UTC+05:45). There is no server-side or client-side timezone

&#x20;  configuration in the code, and the frontend formats timestamps as UTC. I

&#x20;  have treated this as a defect, assuming the receptionist's local timezone

&#x20;  is Asia/Kathmandu.



2\. The brief states the active visitor list is paginated at 20 records per

&#x20;  page. It does not specify sort order. The current implementation sorts by

&#x20;  id ascending. I have treated this as acceptable but raise "should the list

&#x20;  be sorted by most recent check-in first?" as an open question rather than

&#x20;  a defect.



3\. The brief does not define what should happen when a check-out is requested

&#x20;  for a visitor who has already been checked out. I have treated the current

&#x20;  silent overwrite of the check-out timestamp as a defect.



4\. The brief does not define the shape of API error responses. I have treated

&#x20;  the raw exception and stack trace returned for a missing record as a defect

&#x20;  in the development environment and noted that the production behaviour

&#x20;  would differ.







Defects

&#x20;Defect 1: Deactivated visitors are returned by the search endpoint



Type: Functional



Description:

The search action in Api::VisitorsController filters only on full\_name and applies no filter for the active flag. The brief states that deactivated visitors must not be selectable when registering a repeat visit. The search endpoint is what powers the repeat-visit autocomplete in RegistrationForm.jsx, so it must exclude deactivated records. Because it does not, a receptionist using the autocomplete can select a deactivated visitor and re-register them.



Steps to Reproduce:

1\. Run rails db:seed or rails db:reset to load the seed data. The seeds mark

&#x20;  specific visitor records as inactive (Visitor.id 3, 8, 13, 16, 19, 24, 28,

&#x20;  and so on, corresponding to the inactive\_positions array).

2\. Open a terminal and run:

&#x20;  curl.exe "http://localhost:3000/api/visitors/search?q=Chris"

3\. Observe the list of results.



Expected Result:

Only visitors with active set to true are returned.



Actual Result:

The response includes Visitor.id 3 (Chris Taylor), which is one of the records marked inactive by the seeds.







Defect 2: Deactivated visitors can still appear in the active visitor list



Type: Functional 



Description:

The index action filters only on checked\_out\_at being null. It does not filter on the active flag. In the current seed data, deactivated visitors also happen to have checked\_out\_at set, so they are hidden from the list by coincidence. However, the underlying query is wrong. Any visitor that is deactivated while still checked in (for example, created via the API and then deactivated before a check-out) will continue to appear in the active list. This violates the brief, which states that deactivated visitors must not appear in the active list.



Steps to Reproduce:

1\. Register a new visitor through the API and note the id returned:

&#x20;  curl.exe -X POST http://localhost:3000/api/visitors ^

&#x20;    -H "Content-Type: application/json" ^

&#x20;    -d "{\\"full\_name\\":\\"Deactivate Test\\",\\"company\_name\\":\\"X\\",\\"purpose\\":\\"X\\",\\"host\_id\\":1}"

2\. Deactivate that visitor using the returned id (replace N):

&#x20;  curl.exe -X PATCH http://localhost:3000/api/visitors/N/deactivate

3\. Request the first page of the active list:

&#x20;  curl.exe "http://localhost:3000/api/visitors?page=1"



Expected Result:

"Deactivate Test" does not appear in the list because active is now false.



Actual Result:

"Deactivate Test" appears in the list because the query only excludes checked-out visitors.







&#x20;Defect 3: Check-out is not idempotent and overwrites the original time



Type: Functional 

Description:

The check\_out action unconditionally sets checked\_out\_at to Time.current. There is no guard that checks whether the visitor has already been checked out. Calling the endpoint a second time silently overwrites the recorded check-out time with the new value.



Steps to Reproduce:

1\. Note that Visitor.id 1 is currently checked in (its checked\_out\_at is null

&#x20;  after seeding).

2\. First call:

&#x20;  curl.exe -X PATCH http://localhost:3000/api/visitors/1/check\_out

&#x20;  Note the value of checked\_out\_at in the response.

3\. Wait a few seconds.

4\. Second call:

&#x20;  curl.exe -X PATCH http://localhost:3000/api/visitors/1/check\_out

&#x20;  Note the value of checked\_out\_at again.



Expected Result:

The second call is a no-op. The original check-out time is preserved, since the visitor has already left. The endpoint returns the same record.



Actual Result:

The second call overwrites the timestamp. In my test the first call returned "checked\_out\_at":"2026-09-11T13:30:54Z" and the second call returned "checked\_out\_at":"2026-09-11T13:30:55Z". The original check-out time has been lost.







Defect 4: Creating a visitor accepts missing or null required fields



Type: Functional 



Description:

The Visitor model has no validations at all. The host association is declared as belongs\_to :host, optional: true, which directly contradicts the brief that a host employee is required on registration. The controller also does not check for presence. As a result, an empty POST request creates a visitor record with all fields null.



Steps to Reproduce:

1\. Send an empty JSON body to the create endpoint:

&#x20;  curl.exe -X POST http://localhost:3000/api/visitors ^

&#x20;    -H "Content-Type: application/json" ^

&#x20;    -d "{}"

2\. Inspect the response body.



Expected Result:

The API rejects the request with 422 Unprocessable Entity and a list of validation errors indicating that full\_name, company\_name, purpose and host\_id are required.



Actual Result:

The API returns 201 Created with a visitor whose full\_name, company\_name, purpose and host\_id are all null. In my test the response body was: {"id":81,"full\_name":null,"company\_name":null,"purpose":null, "checked\_in\_at":"2026-09-11T13:30:55Z","checked\_out\_at":null, "active":true,"host\_id":null,"host\_name":null}







&#x20;Defect 5: Missing record produces a 404 with a full stack trace



Type: Data / Security 



Description:

Both check\_out and deactivate call Visitor.find without rescue. When the id does not exist, ActiveRecord::RecordNotFound is raised and not handled. In the development environment this causes Rails to return a 404 response whose JSON body contains the exception object and the entire application and framework backtrace. This leaks internal file paths, gem versions and code structure. In production the response body would be generic, but the underlying lack of a rescue\_from handler means the API has no consistent error contract.



Steps to Reproduce:

1\. Send a check-out request for an id that does not exist:

&#x20;  curl.exe -X PATCH http://localhost:3000/api/visitors/999999/check\_out

2\. Inspect the JSON response body.



Expected Result:

A clean 404 response with a short error message such as {"error":"Visitor not found"}.



Actual Result:

A 404 response whose body contains the exception object, Application Trace and Full Trace arrays listing gem file paths, line numbers and gem versions.









Defect 6: Frontend renders check-in times as UTC instead of local time



Type: Functional 



Description:

VisitorList.jsx defines a formatTime helper that calls new Date(isoString).toISOString().slice(11, 16). Calling toISOString always returns the time in UTC regardless of the user's local timezone, so the displayed time is wrong for any user not in UTC. The brief requires all times to be shown in the receptionist's local timezone. Since the application is documented as being designed for Asia/Kathmandu (UTC+05:45), this is a real defect and not a theoretical one. Two records in the seed data make this clearly visible, since they fall near midnight in Kathmandu time.



Steps to Reproduce:

1\. Open the web app at http://localhost:5173.

2\. Look at the Checked In column for the visitor with id 11 (Kai White).

&#x20;  Its checked\_in\_at value is "2026-09-09T19:20:00Z".

3\. Compare against the expected Kathmandu local time, which is 01:05 on

&#x20;  2026-09-10.

4\. Also look at the visitor with id 5 (Emil Wilson). Its checked\_in\_at value

&#x20;  is "2026-09-10T17:45:00Z", which should render as 23:30 on the same day

&#x20;  in Kathmandu.



Expected Result:

Id 11 renders as 01:05, id 5 renders as 23:30.



Actual Result:

Id 11 renders as 19:20, id 5 renders as 17:45. Both are the raw UTC values.







Defect 7: Registration form clears on silent API failure



Type: Usability



Description:

The api.js helper returns null for any non-2xx response and does not throw or surface the error. RegistrationForm.handleSubmit does not check the return value before clearing the form and triggering the parent refresh. If the API call fails, the user sees the form clear and assumes the registration succeeded, when in fact no visitor was created.



Steps to Reproduce:

1\. Stop the API container (docker compose stop) or otherwise make the API

&#x20;  unreachable.

2\. Fill in the registration form with valid data and submit.

3\. Observe the form behaviour.



Expected Result:

An error message is shown and the entered data is preserved so the user can retry.



Actual Result:

The form is cleared and the list refresh is triggered. No error message is displayed.







&#x20;Defect 8: Check-out is optimistic and not rolled back on failure



Type: Usability / Data



Description:

The handleCheckOut function in VisitorList.jsx removes the row from local state before the API request resolves and never inspects the result of the request. If the request fails, the row disappears from the UI while the visitor remains checked in on the server. The next refresh brings the row back, which is confusing and gives the receptionist a false impression that the visitor has left.



Steps to Reproduce:

1\. Simulate an API failure (stop the API container or throttle the network).

2\. Click the Check Out button on any row in the active visitor list.

3\. Observe the row disappearing from the table.

4\. Restart the API and refresh the page.



Expected Result:

Either the row is only removed after a successful response, or the row reappears with a visible error indicator when the request fails.



Actual Result:

The row disappears immediately. On refresh, the visitor is still in the active list because the server never received a successful check-out.







Defect 9: company\_name and purpose are not enforced as required



Type: Functional / Usability



Description:

The brief lists full name, company name, host employee and purpose of visit as fields collected at registration. The frontend form marks only full\_name and host\_id as required. The backend has no validations of any kind. As a result, a visitor can be registered with a name and host but no company and no purpose, which contradicts the brief.



Steps to Reproduce:

1\. Submit the registration form with only full name and host filled in,

&#x20;  leaving company and purpose blank.

2\. Observe the resulting record.



Expected Result:

The form or the API (or both) rejects the submission and identifies the missing fields.



Actual Result:

The visitor is created with company\_name null and purpose null.









Defect 10: No loading, empty or error states in the visitor list



Type: Usability



Description:

VisitorList.jsx renders a table with an empty tbody when the list is empty or when the fetch failed. There is no loading indicator while the request is in flight, no message when there are no visitors, and no error banner when the request fails. The user cannot tell whether the list is empty because there are no visitors or because the request is still loading or failed.



Steps to Reproduce:

1\. Open the web app and watch the visitor list region while the initial

&#x20;  fetch is in progress.

2\. Stop the API container and refresh the page. The list area remains blank

&#x20;  with no indication of a problem.

3\. Filter the data so that no active visitors exist. The list area remains

&#x20;  blank.



Expected Result:

Distinct UI states for loading, empty and error, with clear messaging.



Actual Result:

The table renders an empty tbody in all three cases.







&#x20;Not Filed as Defects



The following items are not clearly specified in the brief. I have not treated them as defects, but I would want to clarify them before sign-off.



1\. Should the search endpoint also match on company\_name in addition to

&#x20;  full\_name? Currently only full\_name is matched.



2\. Should the active list be sorted by checked\_in\_at descending so that

&#x20;  the most recent arrivals appear first? Currently it is sorted by id

&#x20;  ascending.



3\. Should POST /api/visitors block a new registration when a deactivated

&#x20;  record with the same full\_name and company already exists? Or should it

&#x20;  silently reactivate the existing record? The brief says deactivated

&#x20;  visitors must not be selectable for a repeat visit, but it does not say

&#x20;  how the API should behave if the receptionist types the details manually.



4\. Should the index response include a total count or has\_more flag so that

&#x20;  the client can render pagination controls accurately? Currently the client

&#x20;  infers the presence of a next page from whether it received exactly 20

&#x20;  records, which is fragile.



5\. Should deactivate require the visitor to be checked out first? Currently

&#x20;  a visitor can be deactivated while still checked in, which produces the

&#x20;  state described in Defect 2.



6\. Should the API reject a check-out for a visitor that has been deactivated?

&#x20;  Currently it allows it.







Summary 

Highest impact issues, are Defect 1 and Defect 2 (both allow deactivated visitors to remain reachable through the API) and Defect 6 (times are displayed in the wrong timezone for the intended users). Defects 3, 4 and 5 affect data integrity and the shape of the API's error

contract. Defects 7 through 10 are client-side issues that affect usability and trust in the UI.

