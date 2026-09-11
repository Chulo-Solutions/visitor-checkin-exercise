# QA Notes

## Highest-Risk Area

The highest-risk area is the visitor lifecycle between registration, active visitor listing, check-out, and deactivation.

This area is high risk because incorrect visitor status can cause inaccurate active visitor records. In particular, a deactivated visitor must not remain in the Active Visitors list or remain available for an active visit. A defect in this flow could result in incorrect visitor records being shown to receptionists and could affect visitor tracking and security.

During testing, deactivation was found to be a confirmed defect because a visitor with `active: false` continued to appear in the Active Visitors list.

## Product Owner Question Before Sign-off

When an administrator deactivates a visitor, should the system immediately remove that visitor from the Active Visitors list and prevent the visitor from being selected or registered again for a repeat visit?

This clarification is needed because the requirement states that deactivated visitors must not appear in the active list or be selectable for repeat visits, but the current registration form does not provide a visitor selection/search flow for repeat visits.
