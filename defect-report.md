# Defect Report

## DEF-001 — Deactivated visitor remains in Active Visitors list

### Summary

Deactivated visitor still appears in the Active Visitors list and still has a Check Out button.

### Type

Functional

### Description

After an administrator deactivates a visitor record, the visitor is still returned by the visitors API and remains visible in the frontend Active Visitors list. The visitor also still has the Check Out button available.

### Steps to Reproduce

1. Register a visitor with valid information.
2. Locate the registered visitor in the Active Visitors list.
3. Deactivate the visitor using the administrator deactivation endpoint:
   `PATCH /api/visitors/:id/deactivate`
4. Confirm that the API response shows `active: false`.
5. Refresh the frontend.
6. Navigate to the page containing the deactivated visitor.
7. Observe the deactivated visitor in the Active Visitors list.

### Expected Result

The deactivated visitor should not appear in the Active Visitors list and should not be available for an active visit.

### Actual Result

The deactivated visitor remains visible in the Active Visitors list and still has a Check Out button.

### Evidence

Visitor ID: 81
Visitor: Test Visitor
API response after deactivation: `active: false`
The visitor was still returned by `visitors?page=3` and remained visible in the frontend.

### Execution Result

(fail)

## DEF-002 — Visitor check-in time is displayed in UTC instead of local timezone

### Summary

Visitor check-in time is displayed as `05:35` instead of the receptionist's local Kathmandu time.

### Type

Functional

### Description

The application displays the visitor check-in time using the UTC timestamp instead of converting it to the receptionist's local timezone (Asia/Kathmandu).

### Steps to Reproduce

1. Register a visitor with valid information.
2. Locate the visitor in the Active Visitors list.
3. Confirm the check-in time displayed in the frontend.
4. Check the visitor's `checked_in_at` value from the API response.
5. Compare the API UTC time with the displayed local time.

### Expected Result

The check-in time should be displayed in the receptionist's local timezone (Asia/Kathmandu).

For example, an API timestamp of `05:35 UTC` should be displayed as approximately `11:20` in Kathmandu.

### Actual Result

The frontend displays `05:35`, which matches the UTC time instead of the Kathmandu local time.

### Evidence

Visitor ID: 81
API `checked_in_at`: `2026-09-11T05:35:27Z`
Frontend displayed time: `05:35`
Expected Kathmandu time: approximately `11:20`

### Execution Result

(fail)
