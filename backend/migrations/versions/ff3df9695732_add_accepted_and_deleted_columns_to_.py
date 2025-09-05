"""Add accepted and deleted columns to collector_store

Revision ID: ff3df9695732
Revises: 1e70462e482c
Create Date: 2025-09-04 18:55:37.082346

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff3df9695732'
down_revision = '1e70462e482c'
branch_labels = None
depends_on = None


def upgrade():
    # Columns already exist in DB, so skip adding them
    pass


def downgrade():
    # If you ever downgrade, do nothing (columns already in use)
    pass
