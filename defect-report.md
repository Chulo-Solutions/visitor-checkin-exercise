# Defect Report

## DEF-001 — Checked-out visitors could remain active

**Type:** Functional / Data

**Description:**  
When a visitor was checked out, the visitor record received a `checked_out_at` timestamp but the `active` field was not updated to false. This could leave the visitor marked as active even after checkout.

**Steps to Reproduce:**
1. Start the Rails API and React application.
2. Register a visitor.
3. Confirm the visitor appears in the Active Visitors list.
4. Click `Check Out`.
5. Inspect the visitor record through the API/database.

**Expected Result:**  
The visitor should be checked out and no longer be considered active.

**Actual Result:**  
The visitor received a checkout timestamp but could remain marked as active.

---

## DEF-002 — Inactive visitors could appear in the active visitor list

**Type:** Functional / Data

**Description:**  
The active visitor endpoint did not explicitly filter records using the `active` field. As a result, records that had been deactivated could potentially appear in the active visitor list.

**Steps to Reproduce:**
1. Create or identify a visitor record with `active` set to false.
2. Request the active visitor endpoint.
3. Observe the returned visitor records.

**Expected Result:**  
Deactivated visitors should not appear in the active visitor list.

**Actual Result:**  
The endpoint originally filtered only by `checked_out_at`, so an inactive record with no checkout timestamp could be returned.

---

## DEF-003 — Visitor search could return inactive visitors

**Type:** Functional / Data

**Description:**  
The visitor search endpoint originally searched by name without restricting results to active visitors. This could expose inactive visitor records through the search functionality.

**Steps to Reproduce:**
1. Create or identify an inactive visitor.
2. Enter part of that visitor's name in the visitor search field.
3. Observe the search suggestions/results.

**Expected Result:**  
Inactive visitors should not be returned for active-visitor search/repeat-visit selection.

**Actual Result:**  
The original search query did not filter by the `active` field.

---

## DEF-004 — API failures were not clearly surfaced by the frontend

**Type:** Usability / Functional

**Description:**  
The frontend API helper originally returned `null` for unsuccessful HTTP responses and did not provide useful error information to the user. Network failures could also result in an unhandled rejected promise.

**Steps to Reproduce:**
1. Start the frontend without the Rails API, or make the API unavailable.
2. Open the visitor application.
3. Attempt to load visitors or register a visitor.

**Expected Result:**  
The application should display a clear error message explaining that the API could not be reached or that the request failed.

**Actual Result:**  
The original frontend did not consistently display a useful API error to the user.

---

## DEF-005 — Visitor list did not provide explicit loading and empty states

**Type:** Usability

**Description:**  
The visitor list did not explicitly communicate that visitor data was being loaded and did not provide a dedicated empty state when no visitors were returned.

**Steps to Reproduce:**
1. Open the application.
2. Observe the visitor list while data is loading.
3. Use an environment where no active visitors are returned.
4. Observe the visitor list.

**Expected Result:**  
The interface should provide loading feedback and a clear empty state when there are no visitors.

**Actual Result:**  
The original visitor list did not provide explicit loading feedback or a clear empty-state message.