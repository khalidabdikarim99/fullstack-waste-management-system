import smtplib
from email.mime.text import MIMEText
from config import Config

def send_welcome_email(to_email, name):
    """Send a welcome email to the newly registered user."""
    try:
        msg = MIMEText(
            f"Hello {name},\n\nWelcome to Waste2Wealth! Your account has been created successfully."
        )
        msg['Subject'] = "Welcome to Waste2Wealth"
        msg['From'] = Config.MAIL_USERNAME
        msg['To'] = to_email

        with smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT) as server:
            server.starttls()
            server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
            server.send_message(msg)

        print(f"Welcome email sent to {to_email}")
    except smtplib.SMTPAuthenticationError:
        print("Error sending email: Authentication failed. Check MAIL_USERNAME and MAIL_PASSWORD.")
    except Exception as e:
        print("Error sending email:", e)


def send_status_email(to_email, name, status):
    """Send email notifications based on pickup status."""
    try:
        messages = {
            "Pending": f"Hello {name},\n\nWe apologize for the delay. We are working hard to process your pickup request and will contact you shortly.",
            "Accepted": f"Hello {name},\n\nGood news! Your pickup request has been accepted. Please wait while we complete the process.",
            "Completed": f"Hello {name},\n\nYour pickup request has been successfully completed. Thank you for using Waste2Wealth!",
            "Deleted": f"Hello {name},\n\nYour pickup request has been deleted. You may submit a new request at any time."
        }
        body = messages.get(status, f"Hello {name},\n\nYour pickup request status is: {status}")

        msg = MIMEText(body)
        msg['Subject'] = f"Waste2Wealth Pickup Update: {status}"
        msg['From'] = Config.MAIL_USERNAME
        msg['To'] = to_email

        with smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT) as server:
            server.starttls()
            server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
            server.send_message(msg)

        print(f"Status email ({status}) sent to {to_email}")
    except Exception as e:
        print("Error sending status email:", e)
