# QA Notes

## 1. Highest-Risk Feature

### Deactivated Visitor Handling and Repeat Registration

The highest-risk feature is **deactivated visitor handling and repeat registration**.

Deactivation is important because it controls whether a visitor should remain active in the system and whether that visitor can return for another visit. If deactivated visitors continue to appear in the Active Visitor List and can be registered again, the application does not reliably enforce the visitor's deactivated status.

During testing, a deactivated visitor remained visible in the **Active Visitor List** even after the API confirmed that the visitor's status was `"active": false`. The same deactivated visitor could also be selected or entered again and successfully registered for another visit.

This is a high-risk issue because it can lead to:

* Deactivated visitors being incorrectly treated as active.
* Deactivated visitors being allowed to return for repeat visits.
* Incorrect visitor records and active-visitor information.
* Failure to enforce an important business rule defined in the requirements.

This issue should be addressed before sign-off because the system must reliably prevent deactivated visitors from appearing as active or being registered again.

---

## 2. Product Owner Question Before Sign-Off

**Question for Product Owner:**

> Should the system allow the same active visitor to be registered for multiple visits while they are already listed as an active visitor, or should duplicate active registrations be prevented?

### Reason for Asking

The requirements define how deactivated visitors should be handled, but they do not specify whether an **already-active visitor** can be registered again while they are still active.

During testing, the application allowed the same active visitor to be registered multiple times. Since the expected behavior is not explicitly defined, this should be treated as an **open requirement rather than a defect**.

Clarifying this rule before sign-off will ensure that the registration behavior matches the intended business process and that the appropriate test coverage can be applied.
