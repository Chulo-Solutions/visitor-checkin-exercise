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