from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import JoinOurClubSubmission, LetsConnectSubmission, JobPost, CareerJobApplication

# Register your models here.

class ReadOnlyAdminMixin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return True

@admin.register(JoinOurClubSubmission)
class JoinOurClubSubmissionAdmin(ReadOnlyAdminMixin, ImportExportModelAdmin):
    list_display = ('name', 'company', 'email', 'phone', 'comment', 'timestamp')
    search_fields = ('name', 'company', 'email', 'timestamp')
    #ordering = ('-timestamp',)
    list_filter = ('timestamp',)  # Add this line to enable date filter

    def get_readonly_fields(self, request, obj=None):
        return [field.name for field in self.model._meta.fields]
    
    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save_and_add_another'] = False
        extra_context['show_save_and_continue'] = False
        extra_context['show_save'] = False
        return super().change_view(request, object_id, form_url, extra_context=extra_context)

@admin.register(LetsConnectSubmission)
class LetsConnectSubmissionAdmin(ReadOnlyAdminMixin, ImportExportModelAdmin):
    list_display = ('name', 'company', 'email', 'message', 'timestamp')
    search_fields = ('name', 'company', 'email', 'timestamp')
    #ordering = ('-timestamp',)
    list_filter = ('timestamp',)

    def get_readonly_fields(self, request, obj=None):
        return [field.name for field in self.model._meta.fields]
    
    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save_and_add_another'] = False
        extra_context['show_save_and_continue'] = False
        extra_context['show_save'] = False
        return super().change_view(request, object_id, form_url, extra_context=extra_context)
    
@admin.register(JobPost)
class JobPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'timestamp')

@admin.register(CareerJobApplication)
class CareerJobApplicationAdmin(ReadOnlyAdminMixin, ImportExportModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone', 'location', 'job_title', 'timestamp']
    search_fields = ['first_name', 'last_name', 'email', 'phone', 'location', 'job_title', 'timestamp']
    list_filter = ['location', 'job_title', 'timestamp']

    class Meta:
        model = CareerJobApplication