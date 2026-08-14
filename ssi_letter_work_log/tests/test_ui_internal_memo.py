# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiInternalMemo(HttpSavepointCase):
    """Tour test for the create-time Work Log page.

    No fixture data is needed: ``internal_memo_validator_group``
    already grants ``base.user_admin`` membership by default (see
    ``ssi_letter``'s ``security/res_groups/internal_memo.xml``), so
    ``admin`` can open the **New** form without any extra setup, and
    the delta being tested is visible on that unsaved form.
    """

    def test_create(self):
        """Run the create tour for ``internal_memo``.

        IK: docs/internal_memo/01-create.md (E2a delta -- Modified
        Flow)
        """
        self.start_tour(
            "/web",
            "ssi_letter_work_log_internal_memo_create",
            login="admin",
        )
