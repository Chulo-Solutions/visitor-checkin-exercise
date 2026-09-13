# Defect Report — Visitor Check-in

## DEF-001 — Whitespace-only Full Name Is Accepted

**Summary:** The registration form accepts whitespace-only input as a valid Full Name.

**Type:** Data

**Severity:** Medium

**Status:** Confirmed

**Description:**

The Full Name field is a required field, but the system accepts an input containing only whitespace characters. This allows invalid visitor data to be registered.

**Steps to Reproduce:**

1. Open the visitor registration form.
2. Enter only whitespace characters in the Full Name field.
3. Enter valid values in the other required fields.
4. Submit the registration form.
5. Check the Active Visitors list.

**Expected Result:**

The system should reject whitespace-only input and display a validation message requiring a valid Full Name.

**Actual Result:**

The system accepts whitespace-only input as a valid Full Name and allows the visitor to be registered.

---

## DEF-002 — Deactivated Visitor Remains Visible in Active Visitor List

**Summary:** A deactivated visitor remains visible in the Active Visitors list.

**Type:** Functional

**Severity:** High

**Status:** Confirmed

**Description:**

A visitor who has been successfully deactivated through the API continues to appear in the frontend Active Visitors list.

The requirement states that deactivated visitors must not appear in the Active Visitors list or be selectable for repeat visits.

This issue was reproduced using visitor `bisham` with visitor ID `107`.

The deactivation API returned `"active": false`, confirming that the visitor was successfully deactivated. However, the visitor continued to appear in the Active Visitors list after refreshing the frontend.

**Steps to Reproduce:**

1. Confirm that visitor `bisham` with ID `107` exists as an active visitor.
2. Send the following request:
   `PATCH http://localhost:3000/api/visitors/107/deactivate`
3. Check the API response.
4. Confirm that the response contains `"active": false`.
5. Open the visitor check-in application.
6. Confirm that the Active Visitors list is displayed.
7. Refresh the page.
8. Locate visitor `bisham` in the Active Visitors list.

**Expected Result:**

The deactivated visitor should no longer appear in the Active Visitors list.

**Actual Result:**

Visitor `bisham` was successfully deactivated and the API returned `"active": false`, but the visitor continued to appear in the Active Visitors list after refreshing the page.

---

## DEF-003 — Existing Visitor Suggestions Interfere With New Visitor Name Entry

**Summary:** Visitor suggestions appear while entering a Full Name and do not provide a clear dismissal mechanism.

**Type:** Usability

**Severity:** Medium

**Status:** Confirmed

**Description:**

When entering a Full Name that matches existing visitor records, the application displays visitor suggestions. During testing, the suggestion list interfered with entering a new visitor name and there was no clear UI control to dismiss the suggestions while continuing to enter a different name.

**Steps to Reproduce:**

1. Open the visitor registration form.
2. Ensure that an existing visitor with a known name is available.
3. Start entering the existing visitor's name in the Full Name field.
4. Continue typing without selecting a suggestion.
5. Observe the suggestion list displayed below the Full Name field.
6. Attempt to continue entering a different valid visitor name without selecting a suggestion.

**Expected Result:**

Suggestions should assist the receptionist without preventing normal entry of a different visitor name. The receptionist should have a clear way to dismiss the suggestions and continue entering a new name.

**Actual Result:**

The existing visitor suggestions remain visible and interfere with entering a different visitor name, with no clear dismissal control.

---

## DEF-004 — Same Active Visitor Can Be Registered Multiple Times

**Summary:** The system allows the same visitor to be registered multiple times while an existing registration is still active.

**Type:** Functional

**Severity:** Medium

**Status:** Confirmed

**Description:**

The same visitor details can be submitted repeatedly while an existing registration for that visitor is still present in the Active Visitors list. This can result in multiple active records containing the same visitor information.

The requirements do not explicitly state whether simultaneous active registrations for the same visitor are permitted.

**Steps to Reproduce:**

1. Register a visitor using valid Full Name, Company Name, Host Employee, and Purpose.
2. Confirm that the visitor appears in the Active Visitors list.
3. Return to the visitor registration form.
4. Enter the same visitor details again.
5. Submit the registration.
6. Check the Active Visitors list.

**Expected Result:**

If only one active visit per visitor is allowed, the system should prevent the duplicate active registration or clearly inform the receptionist that the visitor already has an active visit.

**Actual Result:**

The same visitor can be registered again using the same details, resulting in multiple active records for the visitor.

**Note:**

The requirement does not explicitly define whether multiple simultaneous active visits for the same visitor are allowed. This should be clarified with the Product Owner.

---

## DEF-005 — Check-in Time Is Not Displayed in the Receptionist's Local Timezone

**Summary:** The visitor check-in time is displayed using a timezone different from the receptionist's local timezone.

**Type:** Data

**Severity:** High

**Status:** Confirmed

**Description:**

The application displays visitor check-in timestamps without correctly converting them to the receptionist's local timezone.

The exercise specifies that times should be displayed in the receptionist's local timezone and that the application is designed for Asia/Kathmandu.

During testing, the displayed check-in time did not match the receptionist's local time.

**Steps to Reproduce:**

1. Open the visitor registration application.
2. Confirm that the receptionist's local timezone is Asia/Kathmandu.
3. Register a visitor.
4. Note the actual local time at the moment of registration.
5. Check the check-in time displayed in the Active Visitors list.
6. Compare the displayed time with the actual local time.

**Expected Result:**

The check-in time should be displayed in the receptionist's local timezone.

**Actual Result:**

The displayed check-in time does not match the receptionist's local timezone.
