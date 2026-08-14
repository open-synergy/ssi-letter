# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class InternalMemoType(models.Model):
    """
    Master data classifying the kind of an internal memo.
    Used to categorize ``internal_memo`` records for numbering,
    reporting, and filtering purposes.
    """

    _name = "internal_memo_type"
    _inherit = [
        "mixin.master_data",
    ]
    _description = "Internal Memo Type"
