# QA Notes — Visitor Check-in

## Highest-Risk Area

### Visitor Lifecycle and Deactivation

The highest-risk area is the visitor lifecycle, particularly the transition between active, checked-out, and deactivated visitors.

The system is expected to maintain the correct state of a visitor throughout the complete lifecycle. A newly registered visitor should appear in the Active Visitors list, a checked-out visitor should be removed from the active list, and a deactivated visitor must not appear in the active list or be selectable for a repeat visit.

This area has a high risk because incorrect visitor state can result in inaccurate active-visitor information and may allow a visitor who has been deactivated to participate in the registration flow again.

During testing, the registration, checkout, repeat-visit, and pagination flows were tested successfully. Testing also identified that the same visitor can be registered multiple times while an existing registration is still active. This can result in duplicate active visitor records. The behavior has been documented as a defect based on the expected visitor lifecycle and data integrity concerns.

The deactivation capability was not available through the application UI during testing, although a backend deactivation endpoint exists. This was documented as a functional defect in `defect-report.md`.

Because visitor registration and subsequent state transitions affect the accuracy of the Active Visitors list and the ability to control visitor access, the visitor lifecycle and deactivation area presents the highest overall risk.

## Product Owner Questions Before Sign-off

1. **What is the expected administrator workflow for deactivating a visitor in the UI, including where the administrator should access the deactivation action?**

