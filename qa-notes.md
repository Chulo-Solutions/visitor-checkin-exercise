## Highest-Risk Area

The timezone handling for check-in timestamps is the highest-risk area of
this feature. The spec explicitly ties correctness to the Asia/Kathmandu
timezone, and this class of bug — a fixed, consistent offset (UTC vs local)
— is easy to introduce during development and easy to miss during testing
if testing happens to occur only during hours when the discrepancy is less
visually obvious. It's also a data-integrity concern beyond display: if
timestamps are genuinely stored in the wrong timezone rather than just
displayed incorrectly, that could affect any future reporting, auditing, or
compliance use of check-in records.

## Question for Product Owner

When a receptionist views the active list from a browser/device set to a
timezone different from Kathmandu (e.g., a remote administrator), should
check-in times display in the receptionist's browser timezone, or always in
Kathmandu time regardless of viewer location? The spec's phrase "receptionist's
local timezone" is ambiguous for this case, and the answer affects whether
the fix should key off browser locale or a fixed app-wide timezone setting.