# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class InternalMemo(models.Model):
    """
    Adds Operating Unit ownership to internal memo documents.
    Brings internal_memo in line with incoming_letter and
    outgoing_letter, which already carry the operating_unit_id field.
    """

    _name = "internal_memo"
    _inherit = [
        "internal_memo",
        "mixin.single_operating_unit",
    ]
