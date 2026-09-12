# Defect Report

### Defect 1: Check-in time displayed in UTC instead of receptionist's local (Asia/Kathmandu) time

**Type:** Functional

**Description:** The spec states "All times are displayed in the receptionist's
local timezone." The application's timezone is documented as Asia/Kathmandu
(UTC+5:45). However, the "Checked In" time shown in the Active Visitors list
is consistently 5 hours 45 minutes behind actual local wall-clock time,
indicating the timestamp is being stored and/or rendered in raw UTC rather
than being converted to local time.

**Steps to Reproduce:**
1. Note the current local time (Asia/Kathmandu).
2. Go to the Register Visitor form and submit a new visitor with any valid
   Full Name and Host.
3. Observe the "Checked In" time shown for the new entry in the Active
   Visitors list.
4. Compare it to the actual local time noted in step 1.

**Expected Result:** The "Checked In" time should match the current local
(Kathmandu) time at the moment of registration.

**Actual Result:** The "Checked In" time is exactly 5 hours 45 minutes
earlier than actual local time. Reproduced twice in a row (two separate
registrations, ~2 minutes apart) with the same consistent 5h45m offset,
confirming this is not intermittent.

### Defect 2: Deactivated visitors still appear in the active visitor list

**Type:** Functional

**Description:** Per spec, "Deactivated visitors must not appear in the
active list." However, the backend's visitor list endpoint
(`GET /api/visitors`) returns all visitors regardless of their `active`
status, including those explicitly deactivated. As a result, deactivated
visitors continue to appear in the frontend's Active Visitors list. Note:
there is also no UI control anywhere in the frontend to deactivate a visitor,
even though the backend supports it via `PATCH /api/visitors/:id/deactivate`
(confirmed via `rails routes` and direct API testing).

**Steps to Reproduce:**
1. Send a PATCH request to `/api/visitors/1/deactivate` (or deactivate any
   visitor via direct API call, since no UI exists for this).
2. Confirm the response shows `"active": false` for that visitor.
3. Send a GET request to `/api/visitors` (or refresh the Active Visitors
   list in the browser).
4. Look for the deactivated visitor in the results.

**Expected Result:** The deactivated visitor should not appear in the
`GET /api/visitors` response or in the Active Visitors list.

**Actual Result:** The deactivated visitor (`"active": false`) is still
present in the `GET /api/visitors` response and still displayed in the
Active Visitors list.
## Assumptions / Open Questions
- The spec doesn't mention a UI for deactivating visitors, only that
  "Administrators can deactivate visitor records." I treated the complete
  absence of any deactivation control in the frontend as related to Defect 2
  rather than a separate defect, since the backend capability exists but the
  frontend never calls it.