# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class LetterType(models.Model):
    """
    Master data classifying the kind of a letter.
    Used by ``mixin.letter`` (``type_id``) to categorize
    ``incoming_letter`` and ``outgoing_letter`` records for numbering,
    reporting, and filtering purposes.
    """

    _name = "letter_type"
    _inherit = [
        "mixin.master_data",
    ]
    _description = "Letter Type"
