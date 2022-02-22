from django.utils.crypto import get_random_string
class Utils():
    
    @staticmethod
    def generate_slug(title):
        random_str = get_random_string(length=8)
        slug = title.replace(' ', '-').lower()
        return f"{slug}-{random_str}"