from django.utils.crypto import get_random_string
import re
class Utils():
    
    @staticmethod
    def generate_slug(title):
        random_str = get_random_string(length=5)
        slug = title.replace(' ', '-').lower()
        return f"{slug}-{random_str}"
    
    @staticmethod
    def validate_name(name):
        pattern = r"^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
        if not re.match(pattern, name):
            return False
        return True