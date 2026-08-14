# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class InternalMemo(models.Model):
    """
    Enables work hour logging on internal memo documents.

    Adds the ``mixin.work_object`` capability to ``internal_memo`` so
    users can record work log entries (``hr.work_log``) against a
    memo, track estimated vs. realized work, and link entries to an
    analytic account.
    """

    _name = "internal_memo"
    _inherit = [
        "internal_memo",
        "mixin.work_object",
    ]

    _work_log_create_page = True
