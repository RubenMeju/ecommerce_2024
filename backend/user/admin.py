from django.contrib import admin
from .models import UserAccount


class UserAdmin(admin.ModelAdmin):
    # ...
    list_display = ["email", "username"]


admin.site.register(UserAccount, UserAdmin)
