from django.contrib import admin

from .models import Article, ArticleClap, ArticleComment, HashTag

# Register your models here.

admin.site.register(Article)
admin.site.register(ArticleClap)
admin.site.register(ArticleComment)
admin.site.register(HashTag)
