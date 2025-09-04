"""Initial migration with User and PickupRequest

Revision ID: 6fd2e8333389
Revises: 
Create Date: 2025-09-04 07:54:29.138915
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6fd2e8333389'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Add 'status' column with default for existing rows
    with op.batch_alter_table('pickup_requests', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                'status', 
                sa.String(length=50), 
                nullable=False, 
                server_default='Pending'  # ensures existing rows get a value
            )
        )
        batch_op.alter_column(
            'quantity',
            existing_type=sa.FLOAT(),
            type_=sa.String(length=100),
            existing_nullable=False
        )

    # Remove server_default so future inserts must provide a value explicitly
    with op.batch_alter_table('pickup_requests', schema=None) as batch_op:
        batch_op.alter_column(
            'status',
            server_default=None
        )


def downgrade():
    # Revert 'quantity' to FLOAT and drop 'status' column
    with op.batch_alter_table('pickup_requests', schema=None) as batch_op:
        batch_op.alter_column(
            'quantity',
            existing_type=sa.String(length=100),
            type_=sa.FLOAT(),
            existing_nullable=False
        )
        batch_op.drop_column('status')
