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
