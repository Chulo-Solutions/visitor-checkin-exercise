# Defect Report

## DEF-001 - Deactivated visitor still appears in Active Visitors

**Type:** Functional

**Description:**  
After a visitor is deactivated, they are still shown in the Active Visitors list.

**Steps to Reproduce:**

1. Open the application.
2. Select an active visitor.
3. Deactivate the visitor using the deactivate API.
4. Refresh the application.
5. Check the Active Visitors list.

**Expected Result:**  
The deactivated visitor should not appear in the Active Visitors list.

**Actual Result:**  
The deactivated visitor is still shown in the Active Visitors list.

---

## DEF-002 - Deactivated visitor can still be selected for a new visit

**Type:** Functional

**Description:**  
After deactivating a visitor, their name still appears when searching for a visitor and they can still be selected for a new visit.

**Steps to Reproduce:**

1. Open the application.
2. Deactivate an existing visitor using the deactivate API.
3. Go to the visitor registration form.
4. Type the deactivated visitor's name in the Full Name field.
5. Check the suggestions.

**Expected Result:**  
The deactivated visitor should not appear in the suggestions and should not be selectable for a new visit.

**Actual Result:**  
The deactivated visitor still appears in the suggestions and can be selected.

---

## DEF-003 - Full Name accepts only spaces

**Type:** Functional

**Description:**  
The Full Name field is required, but the form accepts a space as the name and creates a visitor.

**Steps to Reproduce:**

1. Open the visitor registration form.
2. Enter one space in the Full Name field.
3. Select a valid Host.
4. Submit the form.
5. Check the Active Visitors list.

**Expected Result:**  
The form should show a validation message and should not create a visitor when only spaces are entered.

**Actual Result:**  
The form accepts the space and creates a visitor.

---

## DEF-004 - Check-in time is not showing Nepal local time

**Type:** Functional

**Description:**  
The check-in time shown for visitors does not match the receptionist's local time in Nepal.

**Steps to Reproduce:**

1. Open the application.
2. Check the current local time on the computer.
3. Register a new visitor.
4. Check the check-in time shown for the new visitor.
5. Compare it with the local computer time.

**Expected Result:**  
The check-in time should be shown in the receptionist's local timezone.

**Actual Result:**  
The time shown in the application was around 5 hours 45 minutes behind Nepal local time. It looks like the application is showing UTC time.
