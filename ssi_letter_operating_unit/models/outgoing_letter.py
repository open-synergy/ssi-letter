# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class OutgoingLetter(models.Model):
    """
    Adds Operating Unit ownership to outgoing letter documents.
    Restricts each outgoing letter to a single operating unit via
    ``mixin.single_operating_unit``, enabling operating unit based
    visibility and security rules for the document.
    """

    _name = "outgoing_letter"
    _inherit = [
        "outgoing_letter",
        "mixin.single_operating_unit",
    ]
