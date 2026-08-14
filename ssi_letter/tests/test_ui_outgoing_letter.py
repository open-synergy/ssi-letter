# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutgoingLetter(HttpSavepointCase):
    """Tour tests for the ``outgoing_letter`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the ``outgoing_letter`` fixtures each tour needs.

        ``outgoing_letter_validator_group`` already grants
        ``base.user_admin`` membership by default (see
        ``security/res_groups/outgoing_letter.xml``) and implies both the
        user and viewer groups, so ``admin`` can run every tour here
        (including approving, since the shipped "Standard"
        ``approval.template`` draws its approvers from the same
        Validator group) without any extra group setup.

        Every fixture record's ``user_id`` is set explicitly to
        ``admin`` — ``cls.env`` runs as SUPERUSER here, and the record
        rule ``outgoing_letter_internal_user_rule`` would otherwise hide
        records owned by someone else from the ``admin`` tour session.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        company_partner = cls.env.company.partner_id
        cls.partner = cls.env["res.partner"].create(
            {"name": "TOUR OL Partner", "is_company": True}
        )
        cls.letter_type = cls.env["letter_type"].create(
            {"name": "TOUR OL Type", "code": "/"}
        )
        # Used by the create tour to search for an Internal Partner via the
        # many2one autocomplete — not reused by any other fixture record.
        cls.env["res.partner"].create(
            {
                "name": "TOUR-OL-CREATE",
                "parent_id": company_partner.id,
                "is_company": False,
            }
        )
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {
                "name": "TOUR OL Cancel Reason",
                "code": "TOUROL",
                "global_use": True,
            }
        )

        cls.rec_edit = cls._create_letter("TOUR-OL-EDIT")
        cls.rec_delete = cls._create_letter("TOUR-OL-DELETE")
        cls.rec_confirm = cls._create_letter("TOUR-OL-CONFIRM")

        cls.rec_approve = cls._create_letter("TOUR-OL-APPROVE")
        cls.rec_approve.with_user(cls.admin).action_confirm()
        cls.rec_approve.invalidate_cache()

        cls.rec_reject = cls._create_letter("TOUR-OL-REJECT")
        cls.rec_reject.with_user(cls.admin).action_confirm()
        cls.rec_reject.invalidate_cache()

        cls.rec_finish = cls._create_letter("TOUR-OL-FINISH")
        cls._run_to_open(cls.rec_finish)

        cls.rec_cancel = cls._create_letter("TOUR-OL-CANCEL")

        cls.rec_restart = cls._create_letter("TOUR-OL-RESTART")
        cls.rec_restart.with_user(cls.admin).action_confirm()
        cls.rec_restart.invalidate_cache()
        cls.rec_restart.with_user(cls.admin).action_cancel(cls.cancel_reason)
        cls.rec_restart.invalidate_cache()

        # IK Pre-Condition of 13-reset-number: a manually-assigned number,
        # so the tour can observe it change back to "/".
        cls.rec_reset = cls._create_letter("TOUR-OL-RESET", name="TOUR-OL-RESET-NUM")

        # IK Pre-Condition of 14-restart-approval: Status is Waiting for
        # Approval, with NO Approval Template assigned (see the note in
        # docs/outgoing_letter/14-restart-approval.md) — under the shipped
        # "Standard" policy.template, restart_approval_ok only evaluates
        # True while approval_template_id is empty. A normal Confirm always
        # assigns one, so this fixture clears it back out afterwards to
        # exercise the button the IK documents.
        cls.rec_restart_approval = cls._create_letter("TOUR-OL-REAPPROVAL")
        cls.rec_restart_approval.with_user(cls.admin).action_confirm()
        cls.rec_restart_approval.write({"approval_template_id": False})
        cls.rec_restart_approval.invalidate_cache()

    @classmethod
    def _create_letter(cls, tag, name=False):
        """Create one draft ``outgoing_letter`` fixture.

        :param tag: name for a dedicated Internal Partner, also used by
            the tours to locate the row in the list view (the Internal
            Partner column is always visible there)
        :param name: manual document number to assign, or a falsy value
            to keep the default "/"
        :return: the created ``outgoing_letter`` record
        :rtype: :class:`OutgoingLetter`
        """
        internal_partner = cls.env["res.partner"].create(
            {
                "name": tag,
                "parent_id": cls.env.company.partner_id.id,
                "is_company": False,
            }
        )
        vals = {
            "partner_id": cls.partner.id,
            "internal_partner_id": internal_partner.id,
            "type_id": cls.letter_type.id,
            "date": "2026-01-15",
            "title": "TOUR Outgoing Letter %s" % tag,
            "digital": True,
            "user_id": cls.admin.id,
        }
        if name:
            vals["name"] = name
        return cls.env["outgoing_letter"].create(vals)

    @classmethod
    def _run_to_open(cls, record):
        """Confirm then approve ``record`` as ``admin`` so it reaches Open.

        :param record: the ``outgoing_letter`` record to advance
        :return: nothing
        """
        record.with_user(cls.admin).action_confirm()
        record.invalidate_cache()
        record.with_user(cls.admin).action_approve_approval()
        record.invalidate_cache()

    def test_create(self):
        """Run the create tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/01-create.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_create", login="admin")

    def test_edit(self):
        """Run the edit tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/02-edit.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_edit", login="admin")

    def test_delete(self):
        """Run the delete tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/03-delete.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_delete", login="admin")

    def test_confirm(self):
        """Run the confirm tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/04-confirm.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_confirm", login="admin")

    def test_approve(self):
        """Run the approve tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/05-approve.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_approve", login="admin")

    def test_reject(self):
        """Run the reject tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/06-reject.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_reject", login="admin")

    def test_finish(self):
        """Run the finish tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/09-finish.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_finish", login="admin")

    def test_cancel(self):
        """Run the cancel tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/10-cancel.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_cancel", login="admin")

    def test_restart(self):
        """Run the restart tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/12-restart.md
        """
        self.start_tour("/web", "ssi_letter_outgoing_letter_restart", login="admin")

    def test_reset_number(self):
        """Run the reset document number tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/13-reset-number.md
        """
        self.start_tour(
            "/web", "ssi_letter_outgoing_letter_reset_number", login="admin"
        )

    def test_restart_approval(self):
        """Run the restart approval process tour for ``outgoing_letter``.

        IK: docs/outgoing_letter/14-restart-approval.md
        """
        self.start_tour(
            "/web", "ssi_letter_outgoing_letter_restart_approval", login="admin"
        )
