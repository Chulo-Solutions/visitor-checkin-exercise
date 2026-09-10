# Defect Report

## DEF-001 — Deactivated Visitor Remains in Active Visitor List

Summary: Deactivated visitor remains visible in the Active Visitor List

Type: Functional

Severity: High

Status: Confirmed

### Description

A visitor who has been successfully deactivated through the API continues to appear in the frontend Active Visitor List.

The requirement states that deactivated visitors must not appear in the Active Visitor List. This issue was reproduced using visitor ID 93 (`hhhh`).

The deactivation API returned `"active": false`, confirming that the visitor was successfully deactivated. However, the visitor was still displayed in the Active Visitor List after refreshing the frontend.

### Steps to Reproduce

1. Confirm that visitor 93 (`hhhh`) exists.
2. Send the following request:
   `PATCH http://localhost:3000/api/visitors/93/deactivate`
3. Check the API response.
4. Confirm that the response contains `"active": false`.
5. Open the visitor check-in application.
6. Confirm that the Active Visitor List is displayed.
7. Refresh the page.
8. Check whether visitor 93 (`hhhh`) is still displayed.

### Expected Result

The deactivated visitor should no longer appear in the Active Visitor List.

### Actual Result

Visitor 93 (`hhhh`) was successfully deactivated and the API returned `"active": false`, but the visitor continued to appear in the Active Visitor List after refreshing the page.

### Attachment

[DEF-001 Evidence](https://www.awesomescreenshot.com/image/63469993?key=f75f6e1b7ad4bc0acc187a0557fb7644)

---

## DEF-002 — Deactivated Visitor Can Be Registered Again

Summary: Deactivated visitor can be registered again

Type: Functional

Severity: High

Status: Confirmed

### Description

A visitor who has been deactivated can still be registered for a new visit.

After a visitor is deactivated, the API confirms that the visitor's status is `"active": false`. However, the same visitor can still be selected or entered during the visitor registration process and registered again.

This violates the requirement that deactivated visitors must not be selectable for repeat visits.

### Steps to Reproduce

1. Confirm an existing visitor is available in the system.
2. Deactivate the visitor using the deactivation functionality.
3. Check the deactivation response.
4. Confirm the response shows `"active": false`.
5. Open the visitor registration form.
6. Check whether the deactivated visitor can still be selected or entered for registration.
7. Confirm valid visit details are entered.
8. Confirm the registration is submitted.
9. Check the Active Visitor List.

### Expected Result

A visitor with `"active": false` should not be selectable or allowed to be registered for a repeat visit.

### Actual Result

A visitor with `"active": false` can still be selected or entered and successfully registered for another visit.

### Attachment


[DEF-002 Evidence](https://jam.dev/c/131eb370-55b8-4c81-855a-12eacd3ae40e)

---

## DEF-003 — Full Name Accepts Whitespace-Only Input

Summary: Full Name field accepts whitespace-only input

Type: Functional

Severity: Medium

Status: Confirmed

### Description

The Full Name field accepts an input containing only spaces and allows the visitor registration to proceed.

Whitespace-only input should be rejected as invalid input.

### Steps to Reproduce

1. Open the visitor registration form.
2. Confirm the Full Name field is available.
3. Enter only spaces in the Full Name field.
4. Confirm a valid Company Name is entered.
5. Confirm a valid Host is selected.
6. Confirm a valid Visit Purpose is entered.
7. Confirm the Submit button is clicked.
8. Check the Active Visitor List.

### Expected Result

The system should reject whitespace-only input in the Full Name field and display a validation message requiring a valid name.

The visitor should not be registered.

### Actual Result

The system accepts whitespace-only input in the Full Name field and allows the visitor to be registered.

### Attachment

[DEF-003 Evidence](https://jam.dev/c/c0a0b551-5dcc-4c51-89ce-a0b74b0edf64)

---

## DEF-004 — Long Full Name and Company Name Cause Horizontal Page Overflow

Summary: Very long Full Name and Company Name cause horizontal page overflow

Type: Usability

Severity: Medium

Status: Confirmed

### Description

When very long text is entered into the Full Name and Company Name fields, the page layout expands horizontally and causes horizontal scrolling.

This makes the registration form and visitor information difficult to view and affects the usability of the application.

### Steps to Reproduce

1. Open the visitor registration form.
2. Confirm the Full Name field is available.
3. Enter a very long value in the Full Name field.
4. Confirm the Company Name field is available.
5. Enter a very long value in the Company Name field.
6. Confirm a valid Host is selected.
7. Confirm a valid Visit Purpose is entered.
8. Check the page layout after entering the long values.
9. Check whether horizontal scrolling is required.

### Expected Result

The page should remain within the available screen width when long text is entered.

Long values should be handled without causing horizontal page overflow or unnecessary horizontal scrolling.

### Actual Result

Entering very long Full Name and Company Name values causes the page to extend horizontally, resulting in horizontal scrolling.

### Attachment

[DEF-004 Evidence](https://jam.dev/c/d2d66b9b-8893-4db4-9c26-1c1df6b5ccfa)

---

## DEF-005 — Check-In Time Displayed in UTC Instead of Receptionist Local Time

Summary: Check-in time is displayed in UTC instead of the receptionist's local timezone

Type: Functional

Severity: Medium

Status: Confirmed

### Description

The application displays visitor check-in times according to UTC instead of the receptionist's local timezone.

The assessment requirement explicitly states that all times must be displayed in the receptionist's local timezone.

### Steps to Reproduce

1. Open the visitor check-in application.
2. Confirm the application is being used by a receptionist in the local timezone.
3. Register a visitor.
4. Check the displayed check-in time in the Active Visitor List.
5. Compare the displayed time with the expected receptionist local time.

### Expected Result

The check-in time should be converted to and displayed in the receptionist's local timezone.

### Actual Result

The check-in time is displayed according to UTC rather than the receptionist's local timezone.

### Attachment

[DEF-005 Evidence](https://jam.dev/c/be1760f2-0d0d-41b5-a810-1ffa76e1a895)
