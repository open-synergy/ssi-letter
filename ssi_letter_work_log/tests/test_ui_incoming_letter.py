# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiIncomingLetter(HttpSavepointCase):
    """Tour test for the create-time Work Log page.

    No fixture data is needed: ``incoming_letter_validator_group``
    already grants ``base.user_admin`` membership by default (see
    ``ssi_letter``'s ``security/res_groups/incoming_letter.xml``), so
    ``admin`` can open the **New** form without any extra setup, and
    the delta being tested is visible on that unsaved form.
    """

    def test_create(self):
        """Run the create tour for ``incoming_letter``.

        IK: docs/incoming_letter/01-create.md (E2a delta -- Modified
        Flow)
        """
        self.start_tour(
            "/web",
            "ssi_letter_work_log_incoming_letter_create",
            login="admin",
        )
