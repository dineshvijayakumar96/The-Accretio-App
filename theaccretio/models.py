from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField

# Create your models here.

class JoinOurClubSubmission(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    comment = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class LetsConnectSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=100)
    message = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class JobPost(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    country = models.CharField(max_length=100, default='India')
    location = models.CharField(max_length=100, default='This position is remote within India.')
    description = RichTextField()
    requirements = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class CareerJobApplication(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=100)
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.FileField(upload_to='cover_letters/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    job_title = models.CharField(max_length=255)  # Add this line to include the job title field

    def __str__(self):
        return f"{self.first_name} {self.last_name}"