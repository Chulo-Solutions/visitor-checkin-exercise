# QA Suite — Visitor Check-in

## TC-001 — Verify successful visitor registration

**Type:** Happy Path
**Preconditions:**

* Receptionist is on the visitor registration page.
* At least one active host is available.

**Steps:**

1. Check that the Full Name field is available.
2. Check that the Company Name field is available.
3. Check that an active host can be selected.
4. Check that the Visit Purpose field is available.
5. Enter a valid visitor full name.
6. Enter a valid company name.
7. Select an active host.
8. Enter a valid visit purpose.
9. Confirm the registration form is submitted successfully.

**Expected Result:**

* The visitor is registered successfully.
* The new visitor appears in the Active Visitors list.
* The visitor has a check-in time.
* The selected host and entered visitor information are displayed correctly.

**Execution Result:** [pass]


## TC-002 — Verify visitor registration requires Full Name

**Type:** Negative

**Preconditions:**

* Receptionist is on the visitor registration page.
* At least one active host is available.

**Steps:**

1. Check that the Full Name field is empty.
2. Enter a valid company name.
3. Select an active host.
4. Enter a valid visit purpose.
5. Confirm the registration form is submitted.

**Expected Result:**

* The registration should not be submitted.
* A required-field validation message should be displayed for Full Name.
* No new visitor should be added to the Active Visitors list.

**Execution Result:** [pass]


## TC-003 — Verify visitor registration requires Host

**Type:** Negative

**Preconditions:**

* Receptionist is on the visitor registration page.
* The visitor registration form is displayed.

**Steps:**

1. Enter a valid visitor full name.
2. Enter a valid company name.
3. Check that the Host field remains unselected.
4. Enter a valid visit purpose.
5. Confirm the registration form is submitted.

**Expected Result:**

* The registration should not be submitted.
* A required-field validation message should be displayed for the Host field.
* No new visitor should be added to the Active Visitors list.

**Execution Result:** [pass]


## TC-004 — Verify visitor registration works without optional fields

**Type:** Negative / Boundary

**Preconditions:**

* Receptionist is on the visitor registration page.
* At least one active host is available.

**Steps:**

1. Enter a valid visitor full name.
2. Check that the Company Name field is empty.
3. Select an active host.
4. Check that the Visit Purpose field is empty.
5. Confirm the registration form is submitted.

**Expected Result:**

* The visitor should be registered successfully.
* No validation error should be displayed for Company Name or Visit Purpose.
* The visitor should appear in the Active Visitors list.

**Execution Result:** [pass]


## TC-005 — Verify visitor registration rejects whitespace-only Full Name

**Type:** Boundary / Negative

**Preconditions:**

* Receptionist is on the visitor registration page.
* At least one active host is available.

**Steps:**

1. Enter only spaces in the Full Name field.
2. Enter a valid company name.
3. Select an active host.
4. Enter a valid visit purpose.
5. Confirm the registration form is submitted.

**Expected Result:**

* The registration should not be submitted.
* The system should display a validation message for the Full Name field.
* No visitor with a whitespace-only name should be added to the Active Visitors list.

**Execution Result:** [Fail]

## TC-006 — Verify visitor registration handles a very long Full Name

**Type:** Boundary

**Preconditions:**

* Receptionist is on the visitor registration page.
* At least one active host is available.

**Steps:**

1. Enter a very long value in the Full Name field (for example, 255 characters).
2. Enter a valid company name.
3. Select an active host.
4. Enter a valid visit purpose.
5. Confirm the registration form is submitted.

**Expected Result:**

* The application should handle the long Full Name without crashing or displaying an unexpected error.
* The application should either accept the value correctly or provide a clear validation message if a maximum length is enforced.

**Execution Result:** [Pass]

## TC-007 — Verify Active Visitors list pagination at 20 records

**Type:** Boundary

**Preconditions:**

* More than 20 active visitors are registered.

**Steps:**

1. Check the Active Visitors list.
2. Confirm that the first page contains no more than 20 active visitors.
3. Check that pagination controls are displayed when more than 20 active visitors exist.
4. Move to the next page.
5. Confirm that additional active visitors are displayed on the next page.

**Expected Result:**

* The Active Visitors list should display a maximum of 20 visitors per page.
* Pagination controls should allow navigation to additional pages.
* Visitors should not be duplicated or skipped between pages.

**Execution Result:** [Pass]

## Regression Subset — Minor Registration Form Update

The following tests are included in the regression subset because a minor update to the visitor registration form could affect required-field validation, optional-field handling, input validation, or successful submission.

### Included Tests

- **TC-001 — Verify successful visitor registration**
  - Included because changes to the registration form could prevent valid visitor data from being submitted or displayed correctly.

- **TC-002 — Verify visitor registration requires Full Name**
  - Included because changes to form fields or validation could affect the required Full Name rule.

- **TC-003 — Verify visitor registration requires Host**
  - Included because changes to the form could affect Host selection or its required-field validation.

- **TC-004 — Verify visitor registration works without optional fields**
  - Included because changes to the form could accidentally make Company Name or Visit Purpose required.

- **TC-005 — Verify visitor registration rejects whitespace-only Full Name**
  - Included because changes to Full Name input handling or validation could affect whitespace-only input behavior.

- **TC-006 — Verify visitor registration handles a very long Full Name**
  - Included because changes to the Full Name field could affect input length handling or validation.

### Excluded Tests

- **TC-007 — Verify Active Visitors list pagination at 20 records**
  - Excluded because pagination is unrelated to a minor registration form update and does not directly depend on registration form validation or field behavior.
  

