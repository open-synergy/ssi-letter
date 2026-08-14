# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class OutgoingLetter(models.Model):
    """
    Enables work hour logging on outgoing letter documents.

    Adds the ``mixin.work_object`` capability to ``outgoing_letter`` so
    users can record work log entries (``hr.work_log``) against a
    letter, track estimated vs. realized work, and link entries to an
    analytic account.
    """

    _name = "outgoing_letter"
    _inherit = [
        "outgoing_letter",
        "mixin.work_object",
    ]

    _work_log_create_page = True
