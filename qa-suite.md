# QA Test Suite — Visitor Check-in

## Test Case Status Legend

- `[ ]` Not executed
- `[pass]` Passed
- `[fail]` Failed

---

# Happy Path Tests

## TC-REG-001 — Verify successful visitor registration

**Status:** [pass]

**Preconditions:**
- Application is running.
- A valid host employee is available.

**Steps:**
1. [pass] Confirm the visitor registration form is displayed.
2. [pass] Confirm a valid full name is entered.
3. [pass] Confirm a valid company name is entered.
4. [pass] Confirm a valid host employee is selected.
5. [pass] Confirm a valid visit purpose is entered.
6. [pass] Confirm the form is submitted.

**Expected Result:**
The visitor is successfully registered and appears in the Active Visitors list with a check-in time.

---

## TC-REG-002 — Verify registered visitor appears in active list

**Status:** [pass]

**Preconditions:**
- A visitor has been successfully registered.

**Steps:**
1. [pass] Confirm the Active Visitors list is displayed.
2. [pass] Check the list for the newly registered visitor.
3. [pass] Check that the visitor's check-in time is displayed.

**Expected Result:**
The newly registered visitor appears in the Active Visitors list with the appropriate check-in time.

---

## TC-CHK-001 — Verify visitor checkout

**Status:** [pass]

**Preconditions:**
- At least one visitor is currently active.

**Steps:**
1. [pass] Confirm an active visitor is displayed in the list.
2. [pass] Confirm the Check Out action is available.
3. [pass] Confirm Check Out is selected for the visitor.
4. [pass] Check the Active Visitors list after checkout.

**Expected Result:**
The visitor is checked out and no longer appears in the Active Visitors list.