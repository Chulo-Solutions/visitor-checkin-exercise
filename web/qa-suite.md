# QA Test Suite

## 1. Visitor Registration

### [pass] TC-REG-001 - Verify visitor registration with valid details

**Preconditions:**

- Application is running.
- At least one host is available.

**Steps:**

1. Confirm the registration form is displayed.
2. Confirm a valid Full Name is entered.
3. Confirm a Host is selected.
4. Confirm valid Company and Purpose are entered.
5. Confirm the form is submitted.
6. Check the Active Visitors list.

**Expected Result:**

- Visitor should be registered successfully.
- Visitor should appear in the Active Visitors list.

---

### [pass] TC-REG-002 - Verify registration without Company

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm a valid Full Name is entered.
2. Confirm a Host is selected.
3. Confirm the Company field is empty.
4. Confirm the form is submitted.
5. Check the Active Visitors list.

**Expected Result:**

- Visitor should be registered successfully.

---

### [pass] TC-REG-003 - Verify registration without Purpose

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm a valid Full Name is entered.
2. Confirm a Host is selected.
3. Confirm the Purpose field is empty.
4. Confirm the form is submitted.
5. Check the Active Visitors list.

**Expected Result:**

- Visitor should be registered successfully.

---

### [pass] TC-REG-004 - Verify form clears after registration

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm valid visitor details are entered.
2. Confirm the form is submitted.
3. Check the registration form after submission.

**Expected Result:**

- The form should be cleared after successful registration.

---

### [pass] TC-REG-005 - Verify visitor search with different capitalization

**Preconditions:**

- An existing visitor is available.

**Steps:**

1. Confirm the Full Name field is available.
2. Confirm an existing visitor's name is entered using different capitalization.
3. Check the suggestions.

**Expected Result:**

- The matching visitor should appear in the suggestions.

---

### [pass] TC-REG-006 - Verify registration of a new visitor

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm a new visitor name is entered.
2. Confirm a Host is selected.
3. Confirm the form is submitted.
4. Check the Active Visitors list.

**Expected Result:**

- The new visitor should be created and shown in the Active Visitors list.

---

### [pass] TC-REG-007 - Verify Full Name is required

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm the Full Name field is empty.
2. Confirm a Host is selected.
3. Confirm the form is submitted.
4. Check the validation message.
5. Check the Active Visitors list.

**Expected Result:**

- The form should not be submitted.
- A required-field message should be shown.
- No visitor should be created.

---

### [pass] TC-REG-008 - Verify Host is required

**Preconditions:**

- Application is running.

**Steps:**

1. Confirm a valid Full Name is entered.
2. Confirm no Host is selected.
3. Confirm the form is submitted.
4. Check the validation message.
5. Check the Active Visitors list.

**Expected Result:**

- The form should not be submitted.
- A required-field message should be shown.
- No visitor should be created.

---

### [fail] TC-REG-009 - Verify Full Name does not accept only spaces

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm only a space is entered in the Full Name field.
2. Confirm a Host is selected.
3. Confirm the form is submitted.
4. Check the Active Visitors list.

**Expected Result:**

- The form should show a validation message.
- No visitor should be created.

**Actual Result:**

- The form accepted the space and created a visitor.

**Related Defect:** DEF-003

---

### [pass] TC-REG-010 - Verify long Full Name

**Preconditions:**

- Application is running.
- A Host is available.

**Steps:**

1. Confirm a long Full Name is entered.
2. Confirm a Host is selected.
3. Confirm the form is submitted.
4. Check the Active Visitors list.

**Expected Result:**

- The application should handle the name without breaking the page.

**Actual Result:**

- The long name was accepted and no obvious UI issue was seen.

**Note:**

- No maximum name length is mentioned in the requirements, so this was not treated as a defect.

---

## 2. Checkout

### [pass] TC-CHK-001 - Verify visitor checkout

**Preconditions:**

- At least one active visitor is available.

**Steps:**

1. Confirm an active visitor is shown.
2. Confirm the Checkout option is available.
3. Confirm the visitor is checked out.
4. Check the Active Visitors list.
5. Refresh the page and check the list again.

**Expected Result:**

- The visitor should disappear from the Active Visitors list.
- The visitor should remain checked out after refresh.

---

### [pass] TC-CHK-002 - Verify checked-out visitor can be selected again

**Preconditions:**

- A visitor has already been checked out.

**Steps:**

1. Confirm the visitor has been checked out.
2. Confirm the visitor's name is entered in the Full Name field.
3. Check the suggestions.

**Expected Result:**

- A checked-out visitor can be selected again because the requirements only say that deactivated visitors cannot be selected.

**Actual Result:**

- The checked-out visitor was available to select.

---

## 3. Deactivation

### [fail] TC-DEC-001 - Verify deactivated visitor is removed from Active Visitors

**Preconditions:**

- An active visitor is available.

**Steps:**

1. Confirm an active visitor exists.
2. Confirm the visitor is deactivated using the deactivate API.
3. Confirm the API shows the visitor as inactive.
4. Refresh the application.
5. Check the Active Visitors list.

**Expected Result:**

- The deactivated visitor should not appear in the Active Visitors list.

**Actual Result:**

- The deactivated visitor was still shown.

**Related Defect:** DEF-001

---

### [fail] TC-DEC-002 - Verify deactivated visitor cannot be selected again

**Preconditions:**

- A visitor has been deactivated.

**Steps:**

1. Confirm the visitor is inactive.
2. Confirm the visitor's name is entered in the Full Name field.
3. Check the suggestions.
4. Confirm whether the visitor can be selected.

**Expected Result:**

- The deactivated visitor should not appear in the suggestions.
- The visitor should not be selectable.

**Actual Result:**

- The deactivated visitor appeared in the suggestions and could be selected.

**Related Defect:** DEF-002

---

## 4. Pagination

### [pass] TC-PAG-001 - Verify visitor pagination

**Preconditions:**

- More than 20 active visitors are available.

**Steps:**

1. Confirm more than 20 visitors are available.
2. Check the first page.
3. Confirm that up to 20 visitors are shown.
4. Confirm the next-page option is available.
5. Check the next page.
6. Confirm the previous-page option is available.
7. Check the previous page.

**Expected Result:**

- A maximum of 20 visitors should be shown on one page.
- Next and previous page options should work.
- Visitors should not be skipped or duplicated.

---

### [pass] TC-PAG-002 - Verify pagination after checkout

**Preconditions:**

- More than 20 active visitors are available.

**Steps:**

1. Confirm more than one page of visitors is available.
2. Confirm a visitor is checked out.
3. Check the current page.
4. Check the next page if needed.

**Expected Result:**

- The checked-out visitor should be removed.
- The remaining visitors should still be displayed correctly.
- Pagination should continue to work.

---

## 5. Timezone

### [fail] TC-TIME-001 - Verify check-in time uses local timezone

**Preconditions:**

- Application is running.
- Local timezone is Nepal.

**Steps:**

1. Confirm the local computer time.
2. Confirm a new visitor is registered.
3. Check the visitor's check-in time.
4. Compare it with the local computer time.

**Expected Result:**

- The check-in time should match Nepal local time.

**Actual Result:**

- The displayed time was around 5 hours 45 minutes behind Nepal local time.

**Related Defect:** DEF-004

---

# Regression Tests

If there is a small change to the visitor registration form, I would run the following tests again:

| Test Case   | Include? | Reason                                                         |
| ----------- | -------- | -------------------------------------------------------------- |
| TC-REG-001  | Yes      | Main registration flow could be affected.                      |
| TC-REG-002  | Yes      | Checks the Company field.                                      |
| TC-REG-003  | Yes      | Checks the Purpose field.                                      |
| TC-REG-004  | Yes      | Checks what happens after submitting the form.                 |
| TC-REG-005  | Yes      | Checks Full Name search.                                       |
| TC-REG-006  | Yes      | Checks new visitor registration.                               |
| TC-REG-007  | Yes      | Checks Full Name validation.                                   |
| TC-REG-008  | Yes      | Checks Host validation.                                        |
| TC-REG-009  | Yes      | Checks Full Name input validation.                             |
| TC-REG-010  | Yes      | Checks long input.                                             |
| TC-CHK-001  | No       | Checkout is not related to the form change.                    |
| TC-CHK-002  | No       | Repeat visit after checkout is not related to the form change. |
| TC-DEC-001  | No       | Deactivation is not related to the form change.                |
| TC-DEC-002  | No       | Deactivation search is not related to the form change.         |
| TC-PAG-001  | No       | Pagination is not related to the form change.                  |
| TC-PAG-002  | No       | Pagination after checkout is not related to the form change.   |
| TC-TIME-001 | No       | Timezone display is not related to the form change.            |
