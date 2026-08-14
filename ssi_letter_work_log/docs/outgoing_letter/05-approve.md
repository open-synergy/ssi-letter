# Approve Outgoing Letter

> **Module:** ssi_letter_work_log
>
> **Extends:** ssi_letter — model `outgoing_letter`, aksi `05-approve`

## Modified Flow

- Anchor: on Flow base step 3 (Click the **Approve** button). This module adds a **Work
  Log** page to the form (present from record creation onward — see `01-create` —
  inserted after the last existing tab), showing **Estimation**, **Total**,
  **Remaining**, and **Excess** hour fields, the **Work Log Analytic Account** field,
  and the list of work log entries (`hr.work_log`) linked to this document.
- The page is not gated by document status — it can be opened and filled in any state.
  However, `outgoing_letter` is the only one of the three models extended by this module
  that reaches an **On Progress** (`open`) status once approval completes (see base
  Post-Condition). That On Progress period is the natural point in this document's
  lifecycle where staff record the hours actually spent working on the letter, before it
  is marked **Done** (see `09-finish`).

## Additional Post-Condition

- Once this document reaches **On Progress**, its **Work Log** page keeps accepting new
  entries for as long as the record is in that state.
