# QA Notes — Visitor Check-in

## Highest-Risk Area

The highest-risk area is **visitor lifecycle and status management**.

The Active Visitors list is a critical receptionist-facing view, so incorrect visitor status can lead to inaccurate information.

Testing confirmed that a visitor can be deactivated through the backend, but the deactivated visitor still appears in the Active Visitors list after refresh. This is a high-risk functional issue because deactivated visitors should not appear as active.

The check-in time also does not match the receptionist's local timezone requirement, which can affect the accuracy of visitor records.

## Product Owner Question Before Sign-off

**Should the system allow the same visitor to have multiple simultaneous active registrations, or should duplicate active registrations be prevented?**