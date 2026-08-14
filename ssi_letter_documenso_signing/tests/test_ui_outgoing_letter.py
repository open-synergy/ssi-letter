# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutgoingLetter(HttpSavepointCase):
    """Tour test for the Documenso Signature Requests page on Approve."""

    @classmethod
    def setUpClass(cls):
        """Create one confirmed ``outgoing_letter`` fixture for the tour.

        ``outgoing_letter_validator_group`` already grants
        ``base.user_admin`` membership by default (see
        ``ssi_letter``'s ``security/res_groups/outgoing_letter.xml``), so
        ``admin`` can both open and approve the fixture without any extra
        group setup. The record's ``user_id`` is set explicitly to
        ``admin`` — ``cls.env`` runs as SUPERUSER here, and the record
        rule ``outgoing_letter_internal_user_rule`` would otherwise hide
        it from the ``admin`` tour session.

        No ``approval.template`` with a Documenso signing template is
        configured here — that is server-side Documenso connector setup,
        out of scope for this module's IK/tour (Ruang Lingkup). The
        shipped "Standard" template therefore drives approval normally,
        and the tour proves the added Signature Requests page renders
        alongside that unchanged base flow.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        company_partner = cls.env.company.partner_id
        partner = cls.env["res.partner"].create(
            {"name": "TOUR DS OL Partner", "is_company": True}
        )
        letter_type = cls.env["letter_type"].create(
            {"name": "TOUR DS OL Type", "code": "/"}
        )
        internal_partner = cls.env["res.partner"].create(
            {
                "name": "TOUR-DS-OL-APPROVE",
                "parent_id": company_partner.id,
                "is_company": False,
            }
        )
        cls.rec_approve = cls.env["outgoing_letter"].create(
            {
                "partner_id": partner.id,
                "internal_partner_id": internal_partner.id,
                "type_id": letter_type.id,
                "date": "2026-01-15",
                "title": "TOUR DS Outgoing Letter Approve",
                "digital": True,
                "user_id": cls.admin.id,
            }
        )
        cls.rec_approve.with_user(cls.admin).action_confirm()
        cls.rec_approve.invalidate_cache()

    def test_approve(self):
        """Run the approve tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_letter_documenso_signing_outgoing_letter_approve",
            login="admin",
        )
