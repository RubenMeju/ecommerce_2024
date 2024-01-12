from django.contrib import admin
from .models import UserAccount


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'role', 'is_active',
                    'is_staff', 'verified', 'date_joined', 'updated_at')
    search_fields = ('email', 'username')
    list_filter = ('role', 'is_active', 'is_staff',
                   'verified', 'date_joined', 'updated_at')


admin.site.register(UserAccount, UserAdmin)
