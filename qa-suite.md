# QA Test Suite — Visitor Check-in Feature

## Test Cases

### TC-001: Confirm visitor appears in active list after successful check-in
**Preconditions:** Registration form is visible and empty.
**Steps:**
1. Confirm the registration form is visible.
2. Enter a valid full name and select a valid host.
3. Submit the form.
4. Check the active visitor list.
**Expected Result:** The new visitor appears in the active list with a check-in time.
**Status:** [pass]

### TC-002: Check registration succeeds with only required fields filled
**Preconditions:** Registration form is empty.
**Steps:**
1. Enter a valid full name.
2. Select a valid host.
3. Leave Company and Purpose blank.
4. Submit the form.
**Expected Result:** Visitor is registered successfully; Company/Purpose display as blank in the list.
**Status:** [pass]

### TC-003: Confirm registration is blocked when Full Name is missing
**Preconditions:** Registration form is empty.
**Steps:**
1. Leave Full Name blank.
2. Select a valid host.
3. Submit the form.
**Expected Result:** Form is blocked with a validation error; no visitor is added to the list.
**Status:** [pass]

### TC-004: Confirm registration is blocked when Host is not selected
**Preconditions:** Registration form is empty.
**Steps:**
1. Enter a valid full name.
2. Leave Host as "Select host...".
3. Submit the form.
**Expected Result:** Form is blocked with a validation error; no visitor is added to the list.
**Status:** [pass]

### TC-005: Check visitor disappears from active list after checkout
**Preconditions:** At least one visitor is in the active list.
**Steps:**
1. Note a visitor currently in the active list.
2. Click "Check Out" for that visitor.
3. Check the active visitor list.
**Expected Result:** The visitor no longer appears in the active list.
**Status:** [pass]

### TC-006: Check active visitor count decreases correctly after checkout
**Preconditions:** Note the total number of active visitors across all pages before checkout.
**Steps:**
1. Check out one visitor.
2. Recount the total number of active visitors across all pages.
**Expected Result:** Total count decreases by exactly 1.
**Status:** [pass]

### TC-007: Confirm deactivated visitor does not appear in active list
**Preconditions:** A visitor exists with active:true.
**Steps:**
1. Send a PATCH request to `/api/visitors/:id/deactivate` for that visitor.
2. Confirm the response shows `"active": false`.
3. Refresh the active visitor list.
**Expected Result:** The deactivated visitor should not appear in the active list.
**Status:** [fail] — see Defect 2

### TC-008: Confirm check-in time reflects local (Kathmandu) time, not UTC
**Preconditions:** Note the current local wall-clock time.
**Steps:**
1. Register a new visitor.
2. Check the "Checked In" time shown for that visitor.
3. Compare it to the local wall-clock time noted above.
**Expected Result:** Check-in time matches local time within a minute or two.
**Status:** [fail] — see Defect 1

### TC-009: Check pagination shows exactly 20 records on a full page
**Preconditions:** More than 20 active visitors exist.
**Steps:**
1. Check Page 1 of the active visitor list.
2. Count the number of rows displayed.
**Expected Result:** Exactly 20 rows are shown.
**Status:** [pass]

### TC-010: Confirm final (partial) page shows the correct remainder count
**Preconditions:** Total active visitors is not an exact multiple of 20.
**Steps:**
1. Navigate to the last page of the active visitor list.
2. Count the number of rows displayed.
**Expected Result:** Row count equals (total visitors mod 20).
**Status:** [pass]

### TC-011: Confirm "Next" is disabled/inactive on the last page
**Preconditions:** On the final page of the active visitor list.
**Steps:**
1. Check the state of the "Next" button.
**Expected Result:** "Next" is disabled or does nothing (no further pages exist).
**Status:** [pass]

### TC-012: Confirm "Previous" is disabled/inactive on the first page
**Preconditions:** On page 1 of the active visitor list.
**Steps:**
1. Check the state of the "Previous" button.
**Expected Result:** "Previous" is disabled or does nothing.
**Status:** [pass]

### TC-013: Check registration with a very long Full Name (boundary case)
**Preconditions:** Registration form is empty.
**Steps:**
1. Enter a full name of 150+ characters.
2. Select a valid host.
3. Submit the form.
**Expected Result:** Either the input is rejected/truncated gracefully with a clear message, or it is stored and displayed without breaking the table layout.
**Status:** [ ]

### TC-014: Confirm re-registering an already checked-out visitor works normally
**Preconditions:** A visitor has been checked out previously.
**Steps:**
1. Register a new visitor using the same full name as a previously checked-out visitor.
2. Submit the form.
**Expected Result:** A new, separate active visitor entry is created without conflict or error.
**Status:** [ ]

---

## Regression Subset — Registration Form Update
*(Scenario: adding an optional "Phone Number" field to the registration form)*

**Include:**
- TC-001 — directly exercises the registration submission path the new field is added to.
- TC-002 — confirms optional-field handling still works correctly alongside a new optional field.
- TC-003 / TC-004 — required-field validation must still function correctly and not be broken by the new field.
- TC-013 — a new field increases the chance of layout/overflow issues; worth re-checking boundary input handling.

**Exclude:**
- TC-005 / TC-006 — checkout logic is unrelated to the registration form.
- TC-007 — deactivation logic doesn't touch the registration form.
- TC-008 — timezone display logic is independent of form fields.
- TC-009 / TC-010 / TC-011 / TC-012 — pagination logic has no dependency on the registration form's fields.
