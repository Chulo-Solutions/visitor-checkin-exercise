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
2. [pass] Confirm a valid Full Name is entered.
3. [pass] Confirm a valid Company Name is entered.
4. [pass] Confirm a valid Host Employee is selected.
5. [pass] Confirm a valid Purpose is entered.
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

---

## TC-REG-006 — Verify repeat visit after checkout

**Status:** [pass]

**Preconditions:**

- A visitor has previously been registered and checked out.

**Steps:**

1. [pass] Confirm the previously checked-out visitor can be entered or selected again.
2. [pass] Confirm valid registration details are provided.
3. [pass] Confirm the registration is submitted.
4. [pass] Check the Active Visitors list.

**Expected Result:**

A previously checked-out visitor can be registered again and appears in the Active Visitors list as an active visitor.

---

# Negative Tests

## TC-REG-003 — Verify registration with empty Full Name

**Status:** [pass]

**Preconditions:**

- Application is running.
- The other applicable registration fields contain valid values.

**Steps:**

1. [pass] Confirm the Full Name field is left empty.
2. [pass] Confirm a valid Company Name is entered.
3. [pass] Confirm a valid Host Employee is selected.
4. [pass] Confirm a valid Purpose is entered.
5. [pass] Confirm the form is submitted.

**Expected Result:**

The system rejects the registration and displays a validation message requiring a Full Name.

---

## TC-REG-004 — Verify registration with whitespace-only Full Name

**Status:** [fail]

**Preconditions:**

- Application is running.
- The other applicable registration fields contain valid values.

**Steps:**

1. [pass] Confirm only whitespace is entered in the Full Name field.
2. [pass] Confirm a valid Company Name is entered.
3. [pass] Confirm a valid Host Employee is selected.
4. [pass] Confirm a valid Purpose is entered.
5. [pass] Confirm the form is submitted.

**Expected Result:**

The system rejects whitespace-only input and displays a validation message requiring a valid Full Name.

**Actual Result:**

Whitespace-only input is accepted as a valid Full Name.

**Related Defect:**

DEF-001 in `defect-report.md`.

---

## TC-REG-005 — Verify registration with no Host Employee selected

**Status:** [pass]

**Preconditions:**

- Application is running.
- A valid Full Name is provided.
- No Host Employee is selected.

**Steps:**

1. [pass] Confirm a valid Full Name is entered.
2. [pass] Confirm the Host Employee field is left unselected.
3. [pass] Confirm valid values are provided for the other applicable fields.
4. [pass] Confirm the form is submitted.

**Expected Result:**

The system rejects the registration and displays a validation message requiring a Host Employee.

---

## TC-REG-007 — Verify duplicate active visitor registration

**Status:** [fail]

**Preconditions:**

- Application is running.
- A visitor is already registered and appears in the Active Visitors list.

**Steps:**

1. [pass] Confirm an active visitor is displayed in the Active Visitors list.
2. [pass] Confirm the registration form is displayed.
3. [pass] Confirm the same visitor details are entered again.
4. [pass] Confirm the registration is submitted.
5. [pass] Check the Active Visitors list.

**Expected Result:**

The system should prevent duplicate active registration for the same visitor or clearly inform the receptionist that the visitor already has an active visit.

**Actual Result:**

The same visitor can be registered again with the same details, resulting in multiple active records.

**Related Defect:**

DEF-004 in `defect-report.md`.

---

# Usability Tests

## TC-UI-001 — Verify visitor name suggestions do not prevent new visitor entry

**Status:** [fail]

**Preconditions:**

- Application is running.
- Existing visitor records are available.

**Steps:**

1. [pass] Confirm the visitor registration form is displayed.
2. [pass] Confirm an existing visitor's name is partially entered in the Full Name field.
3. [pass] Confirm visitor suggestions are displayed.
4. [pass] Confirm a different valid visitor name is attempted without selecting a suggestion.
5. [pass] Check whether the suggestions can be clearly dismissed while continuing entry.

**Expected Result:**

The suggestion list should assist the receptionist without preventing normal entry of a different visitor name. A clear method should be available to dismiss the suggestions.

**Actual Result:**

The visitor suggestions interfere with entering a different visitor name and there is no clear dismissal control.

**Related Defect:**

DEF-003 in `defect-report.md`.

---

# Boundary Tests

## TC-PAG-001 — Verify active visitor pagination at 20 visitors

**Status:** [pass]

**Preconditions:**

- Application is running.
- At least 21 active visitors exist.

**Steps:**

1. [pass] Confirm 20 visitors are displayed on the first page.
2. [pass] Confirm pagination controls are displayed.
3. [pass] Confirm the 21st visitor is displayed on the next page.
4. [pass] Check that the first page does not display more than 20 visitors.

**Expected Result:**

The Active Visitors list displays a maximum of 20 visitors per page, and additional visitors appear on the next page.

---

# Regression Subset — Minor Registration Form Update

## Scope and Assumption

Assumption: A minor update is made to the visitor registration form, such as changing Full Name validation or modifying a registration form field.

No application code was changed as part of this assessment. This section identifies the regression tests that should be executed after such an update based on the potential impact of the change.

## Regression Test Selection

| Test Case | Decision | Rationale |
|---|---|---|
| TC-REG-001 — Verify successful visitor registration | Include | Confirms that valid visitor registration still works after the form update. |
| TC-REG-002 — Verify registered visitor appears in active list | Include | Confirms that successful form submission still creates the expected active visitor. |
| TC-REG-003 — Verify registration with empty Full Name | Include | Directly checks required-field validation that could be affected by a form update. |
| TC-REG-004 — Verify registration with whitespace-only Full Name | Include | Directly checks Full Name validation and covers an existing registration-form defect. |
| TC-REG-005 — Verify registration with no Host Employee selected | Include | Confirms that validation of another required registration field remains unaffected. |
| TC-REG-006 — Verify repeat visit after checkout | Include | Confirms that registration of a returning visitor still works after the form change. |
| TC-REG-007 — Verify duplicate active visitor registration | Include | Confirms that registration behavior does not introduce or worsen duplicate active registrations. |
| TC-UI-001 — Verify visitor name suggestions do not prevent new visitor entry | Include | Autocomplete behavior is part of the registration form and could be affected by a form update. |
| TC-CHK-001 — Verify visitor checkout | Exclude | Checkout is separate from the registration form and is not directly affected by a minor form update. |
| TC-PAG-001 — Verify active visitor pagination at 20 visitors | Exclude | Pagination is independent of the registration form and is outside the focused regression scope. |

## Regression Strategy

The regression subset prioritizes tests that directly exercise the registration form, its validation, autocomplete behavior, submission, duplicate-registration behavior, and the immediate result of registration.

Tests unrelated to the registration form, such as checkout and pagination, are excluded from this focused regression subset because the assumed change is limited to the registration form.

The regression subset is a test-selection exercise based on the stated assumption. No application code was modified to create a regression scenario.