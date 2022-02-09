
class Utils():
    
    @staticmethod
    def generate_slug(title):
        return title.replace(' ', '-').lower()