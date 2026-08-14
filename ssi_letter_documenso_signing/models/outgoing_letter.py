# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class OutgoingLetter(models.Model):
    """Enable Documenso-based approval signing for outgoing letters.

    Extends ``outgoing_letter`` with ``mixin.documenso_signing_approval``
    and turns on the Documenso Signing form tab, so an approval template
    with a Documenso signing template routes approval through a single
    ``documenso.signature.request`` instead of standard approval records.
    """

    _name = "outgoing_letter"
    _inherit = [
        "outgoing_letter",
        "mixin.documenso_signing_approval",
    ]

    _documenso_signing_create_page = True
