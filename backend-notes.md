&#x20;Backend Notes



&#x20;Anil Upreti





&#x20;Selection of defects to fix



The assessment asks for three server side fixes and requires that at least one of them address a performance defect if one was identified. The three I chose are tightly related, they all affect which visitor records are returned by the public API and how efficiently the list endpoint loads its data.



1\. Deactivated visitors leaked into the active visitor list (index). The brief states that deactivated visitors must not appear in the active list. The query in Api::VisitorsController#index filtered only on checked\_out\_at being null. It happened to hide deactivated visitors in the seed data because seeds set checked\_out\_at alongside active:false, but that was a coincidence. Any visitor deactivated while still checked in would still appear. This is the defect that most directly violates a stated requirement, so it was my first choice.



2\. Deactivated visitors leaked into the search endpoint (search). The brief states that deactivated visitors must not be selectable when registering a repeat visit. The search endpoint powers the autocomplete in RegistrationForm.jsx, so a deactivated visitor could still be chosen from the dropdown. This is the same class of bug as the first fix and closes the remaining path through which a deactivated visitor could be reused.



3\. N+1 query on host lookups in the index action (performance). The serialize helper calls visitor.host\&.name for every row returned. With 20 visitors per page, this produced 1 query for the visitors plus 1 query per row for the associated host. The brief asks for a performance fix if a performance defect is present, and this is the clearest one in the codebase.



I did not attempt to fix other defects in this part of the assessment. Part 1 lists the full set I found. The three above were chosen because they each have a clean reproduction and each can be verified with a request spec.







&#x20;Performance measurements



&#x20;Methodology



The measurement was taken from the API server logs. The visitor list endpoint was hit once against a freshly restarted container to eliminate any benefit from the Rails in-memory query cache, and the summary line emitted by Rails at the end of the request was read. That line reports the number of SQL queries executed during the request.



Reproduction steps for both the before and after figures:

docker compose restart api

wait for Puma to start listening

&#x20; curl.exe "http://localhost:3000/api/visitors?page=1"

&#x20; docker logs visitor\_api --tail 40







&#x20;Before (baseline on the unmodified controller)



The log showed one query for the visitor list followed by one Host Load per row. For a page of 20 visitors the request summary line read:

Completed 200 OK in 439ms (Views: 1.3ms | ActiveRecord: 94.6ms (21 queries, 8 cached) | GC: 9.8ms)



The individual Host Load lines are visible in the log preceding the summary line, one per row in the page. The 8 cached queries are repeats of hosts that were already loaded earlier in the same request; the query count still includes them, and the number scales with the number of rows on the page.





After (with includes:host added to the index query)



With the eager load added, the same request now issues two queries total. The generated SQL for the host lookup is a single SELECT using an IN clause:



&#x20; Visitor Load (2.0ms)  SELECT "visitors".\* FROM "visitors" WHERE "visitors"."checked\_out\_at" IS NULL AND "visitors"."active" = ? ORDER BY "visitors"."id" ASC LIMIT ? OFFSET ?  \[\["active", 1], \["LIMIT", 20], \["OFFSET", 0]]

&#x20; Host Load (1.6ms)  SELECT "hosts".\* FROM "hosts" WHERE "hosts"."id" IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)



&#x20; Completed 200 OK in 351ms (Views: 1.5ms | ActiveRecord: 146.1ms (2 queries, 0 cached) | GC: 0.7ms)





&#x20;Summary



| Metric | Before | After |

| ------ | ------ | ----- |

| SQL queries per request | 21 | 2 |

| Host queries per request | 20 | 1 |

| Wall clock time (as observed, single sample) | 439ms | 351ms |



The query count is the reliable measurement here, because the wall clock figure is affected by the first-request warmup cost after the container restart. The query count is deterministic and scales with the page size in the before case and stays flat in the after case.





Fixes applied



The changes are confined to Api::VisitorsController.



\- index: adds active: true to the where clause and adds .includes(:host) to the association query.

\- search: adds active: true to the where clause.



No response shape was changed. The same JSON keys are returned with the same types as before. The list endpoint now returns fewer records when deactivated visitors exist, which is the intended behavior described in the brief.





&#x20;Tests



Three request specs were added in api/test/controllers/api/visitors\_defects\_test.rb. Each spec was written before the fix and confirmed to fail against the original controller, then confirmed to pass after the fix.



\- test "index excludes deactivated visitors even when they are not checked out"

\- test "search excludes deactivated visitors"

\- test "index avoids N+1 queries when serializing host names"



The full suite passes after the change (12 runs, 31 assertions, 0 failures).





Defects deliberately not fixed



Several defects listed in defect-report.md were left unfixed. Reasons below.



1\. Frontend timezone rendering (Defect 6). The fix belongs in the React client (VisitorList.jsx formats via toISOString, which always returns UTC). This is a client-side change and out of scope for the backend track.



2\. Check-out is not idempotent (Defect 3). Fixing this requires deciding what the API should do on a second check-out. The brief does not specify, so I recorded it as a defect and raised the behavior question in the report rather than changing the response shape without guidance. A fix would not alter the response structure; it would change whether checked\_out\_at is overwritten.



3\. Create accepts empty payloads (Defect 4). A proper fix requires adding validations on the Visitor model. That would change the response status for invalid requests from 201 to 422 and would add an errors body. Since the brief does not specify the error response format, I left this as a documented defect and would confirm the desired contract first. Note that fixing this would alter the API response structure for invalid input.



4\. Missing record returns an exception with a stack trace (Defect 5). The response shape for errors is not specified. A reasonable fix is a rescue\_from in ApplicationController returning a short JSON error, but that is an API contract decision and I did not want to introduce one without confirmation.



5\. Client-side UX defects (Defects 7, 8, 9, 10). All are in the React frontend. They do not affect the API contract and belong to the frontend track.





&#x20;Files changed in this submission



\- api/app/controllers/api/visitors\_controller.rb  (fix)

\- api/test/controllers/api/visitors\_defects\_test.rb  (tests)

\- defect-report.md  (Part 1)

\- backend-notes.md  

