# QA Notes

## Highest-Risk Area

I think the visitor status/deactivation flow is the highest-risk area.

The reason is that changing a visitor's status affects different parts of the application.

For example, after I deactivated a visitor:

- The visitor was still shown in Active Visitors.
- The visitor was still shown in the Full Name suggestions.
- The visitor could still be selected for another visit.

So, the deactivation status is not being applied correctly everywhere.

This could cause a receptionist to accidentally select a visitor who should no longer be allowed to make another visit.

---

## Question for the Product Owner

Before sign-off, I would ask:

**When a checked-out visitor comes back again, should the system create a new visit for the same visitor, or should it create a completely new visitor record?**

I would like to confirm this so the expected behavior is clear.

---

## Other Notes

### Registration

The basic registration flow worked correctly with valid information.

Full Name and Host are required. Company and Purpose can be left empty.

I also found that entering only spaces in the Full Name field is accepted, which should probably be blocked.

### Checkout

Checkout worked correctly. The visitor disappeared from the Active Visitors list and stayed removed.

### Deactivation

Deactivation worked through the API, but the frontend did not update correctly after the visitor was deactivated.

### Pagination

Pagination worked correctly during testing. The list showed 20 visitors per page and I did not see duplicate or skipped visitors while moving between pages.

### Time

The visitor check-in time was not matching Nepal local time. It was around 5 hours 45 minutes behind, which looks like UTC time is being shown.

### Observation

After completing an action, there is no clear success confirmation shown to the user. A success toast/popup could make it clearer that the action was completed.

---

## Things That Were Not Clear in the Requirements

I did not report these as bugs because the requirements do not clearly mention them:

- Maximum length for Full Name
- Whether two visitors can have the same name
- Whether a checked-out visitor should create a new visit record when they come again
- Whether the receptionist should have a button to deactivate visitors
