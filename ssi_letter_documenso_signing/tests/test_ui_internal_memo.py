# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiInternalMemo(HttpSavepointCase):
    """Tour test for the Documenso Signature Requests page on Approve."""

    @classmethod
    def setUpClass(cls):
        """Create one confirmed ``internal_memo`` fixture for the tour.

        ``internal_memo_validator_group`` already grants
        ``base.user_admin`` membership by default (see
        ``ssi_letter``'s ``security/res_groups/internal_memo.xml``), so
        ``admin`` can both open and approve the fixture without any extra
        group setup. The record's ``user_id`` is set explicitly to
        ``admin`` — ``cls.env`` runs as SUPERUSER here, and the record
        rule ``internal_memo_internal_user_rule`` would otherwise hide it
        from the ``admin`` tour session.

        No ``approval.template`` with a Documenso signing template is
        configured here — that is server-side Documenso connector setup,
        out of scope for this module's IK/tour (Ruang Lingkup). The
        shipped "Standard" template therefore drives approval normally,
        and the tour proves the added Signature Requests page renders
        alongside that unchanged base flow.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        memo_type = cls.env["internal_memo_type"].create(
            {"name": "TOUR DS IM Type", "code": "/"}
        )
        cls.rec_approve = cls.env["internal_memo"].create(
            {
                "type_id": memo_type.id,
                "date": "2026-01-15",
                "title": "TOUR-DS-IM-APPROVE",
                "memo": "<p>TOUR DS Internal Memo body content.</p>",
                "user_id": cls.admin.id,
            }
        )
        cls.rec_approve.with_user(cls.admin).action_confirm()
        cls.rec_approve.invalidate_cache()

    def test_approve(self):
        """Run the approve tour for ``internal_memo``.

        IK: docs/internal_memo/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_letter_documenso_signing_internal_memo_approve",
            login="admin",
        )
