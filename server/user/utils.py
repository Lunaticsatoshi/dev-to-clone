from django.core.mail import EmailMessage
import threading


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()

class Utils():
    
    @staticmethod
    def send_email(data):
        try:
            email = EmailMessage(subject=data['subject'], body=data['body'], from_email="redlolicon99@gmail.com", to=[data['email']])
            EmailThread(email).start()
        except Exception as e:
            print(e)
