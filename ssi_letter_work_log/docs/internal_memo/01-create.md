# Create Internal Memo

> **Module:** ssi_letter_work_log
>
> **Extends:** ssi_letter — model `internal_memo`, aksi `01-create`

## Modified Flow

- Anchor: on Flow base step 2 (Click the **New** button). This module adds a **Work
  Log** page to the form (inserted after the last existing tab), showing **Estimation**,
  **Total**, **Remaining**, and **Excess** hour fields, the **Work Log Analytic
  Account** field, and the list of work log entries (`hr.work_log`) linked to this
  document. The page is already rendered on the unsaved create form — no field needs to
  be filled and no state condition applies.
- `internal_memo` never reaches an **On Progress** (`open`) status: once approval
  completes, the document goes straight to **Done** (see `05-approve`) with no separate
  working period. **Draft** — the state this Create flow produces — is therefore the
  state during which this page is typically used.
