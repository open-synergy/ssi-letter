# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiInternalMemo(HttpSavepointCase):
    """Tour tests for the ``internal_memo`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the ``internal_memo`` fixtures each tour needs.

        ``internal_memo_validator_group`` already grants
        ``base.user_admin`` membership by default (see
        ``security/res_groups/internal_memo.xml``) and implies both the
        user and viewer groups, so ``admin`` can run every tour here
        (including approving, since the shipped "Standard"
        ``approval.template`` draws its approvers from the same
        Validator group) without any extra group setup.

        Every fixture record's ``user_id`` is set explicitly to
        ``admin`` — ``cls.env`` runs as SUPERUSER here, and the record
        rule ``internal_memo_internal_user_rule`` would otherwise hide
        records owned by someone else from the ``admin`` tour session.
        ``title`` doubles as the unique row-locator token: unlike
        ``outgoing_letter``/``incoming_letter``, ``internal_memo``'s
        tree view (``views/internal_memo.xml``) shows the Title column.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        cls.memo_type = cls.env["internal_memo_type"].create(
            {"name": "TOUR IM Type", "code": "/"}
        )
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {
                "name": "TOUR IM Cancel Reason",
                "code": "TOURIM",
                "global_use": True,
            }
        )

        cls.rec_edit = cls._create_memo("TOUR-IM-EDIT")
        cls.rec_delete = cls._create_memo("TOUR-IM-DELETE")
        cls.rec_confirm = cls._create_memo("TOUR-IM-CONFIRM")

        cls.rec_approve = cls._create_memo("TOUR-IM-APPROVE")
        cls.rec_approve.with_user(cls.admin).action_confirm()
        cls.rec_approve.invalidate_cache()

        cls.rec_reject = cls._create_memo("TOUR-IM-REJECT")
        cls.rec_reject.with_user(cls.admin).action_confirm()
        cls.rec_reject.invalidate_cache()

        cls.rec_cancel = cls._create_memo("TOUR-IM-CANCEL")

        cls.rec_restart = cls._create_memo("TOUR-IM-RESTART")
        cls.rec_restart.with_user(cls.admin).action_confirm()
        cls.rec_restart.invalidate_cache()
        cls.rec_restart.with_user(cls.admin).action_cancel(cls.cancel_reason)
        cls.rec_restart.invalidate_cache()

        # IK Pre-Condition of 13-reset-number: a manually-assigned number,
        # so the tour can observe it change back to "/".
        cls.rec_reset = cls._create_memo("TOUR-IM-RESET", name="TOUR-IM-RESET-NUM")

        # IK Pre-Condition of 14-restart-approval: Status is Waiting for
        # Approval, with NO Approval Template assigned (see the note in
        # docs/internal_memo/14-restart-approval.md) — under the shipped
        # "Standard" policy.template, restart_approval_ok only evaluates
        # True while approval_template_id is empty. A normal Confirm always
        # assigns one, so this fixture clears it back out afterwards to
        # exercise the button the IK documents.
        cls.rec_restart_approval = cls._create_memo("TOUR-IM-REAPPROVAL")
        cls.rec_restart_approval.with_user(cls.admin).action_confirm()
        cls.rec_restart_approval.write({"approval_template_id": False})
        cls.rec_restart_approval.invalidate_cache()

    @classmethod
    def _create_memo(cls, tag, name=False):
        """Create one draft ``internal_memo`` fixture.

        :param tag: value for the ``title`` field, used by the tours to
            locate the row in the list view (the Title column is
            always visible there)
        :param name: manual document number to assign, or a falsy value
            to keep the default "/"
        :return: the created ``internal_memo`` record
        :rtype: :class:`InternalMemo`
        """
        vals = {
            "type_id": cls.memo_type.id,
            "date": "2026-01-15",
            "title": tag,
            "memo": "<p>TOUR Internal Memo body content.</p>",
            "user_id": cls.admin.id,
        }
        if name:
            vals["name"] = name
        return cls.env["internal_memo"].create(vals)

    def test_create(self):
        """Run the create tour for ``internal_memo``.

        IK: docs/internal_memo/01-create.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_create", login="admin")

    def test_edit(self):
        """Run the edit tour for ``internal_memo``.

        IK: docs/internal_memo/02-edit.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_edit", login="admin")

    def test_delete(self):
        """Run the delete tour for ``internal_memo``.

        IK: docs/internal_memo/03-delete.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_delete", login="admin")

    def test_confirm(self):
        """Run the confirm tour for ``internal_memo``.

        IK: docs/internal_memo/04-confirm.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_confirm", login="admin")

    def test_approve(self):
        """Run the approve tour for ``internal_memo``.

        IK: docs/internal_memo/05-approve.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_approve", login="admin")

    def test_reject(self):
        """Run the reject tour for ``internal_memo``.

        IK: docs/internal_memo/06-reject.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_reject", login="admin")

    def test_cancel(self):
        """Run the cancel tour for ``internal_memo``.

        IK: docs/internal_memo/10-cancel.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_cancel", login="admin")

    def test_restart(self):
        """Run the restart tour for ``internal_memo``.

        IK: docs/internal_memo/12-restart.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_restart", login="admin")

    def test_reset_number(self):
        """Run the reset document number tour for ``internal_memo``.

        IK: docs/internal_memo/13-reset-number.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_reset_number", login="admin")

    def test_restart_approval(self):
        """Run the restart approval process tour for ``internal_memo``.

        IK: docs/internal_memo/14-restart-approval.md
        """
        self.start_tour(
            "/web", "ssi_letter_internal_memo_restart_approval", login="admin"
        )
