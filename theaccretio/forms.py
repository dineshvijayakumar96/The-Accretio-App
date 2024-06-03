from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from .models import CareerJobApplication
from django_recaptcha.fields import ReCaptchaField
from django_recaptcha.widgets import ReCaptchaV3

class LetsConnectForm(forms.Form):
    name = forms.CharField(label='*Name', max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '*Name'}))
    email = forms.EmailField(label='*Email', required=True, widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': '*Email'}))
    company = forms.CharField(label='*Company', max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '*Company'}))
    message = forms.CharField(label='Message (optional)', required=False, widget=forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Message (optional)'}))
    # captcha = ReCaptchaField(widget=ReCaptchaV3)

class JoinOurClubForm(forms.Form):
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')

        # Check if the phone contains only digits and '+'
        if not all(char.isdigit() or char == '+' for char in phone):
            raise ValidationError('Phone number can only contain digits and the "+" symbol.')

        return phone
    
    name = forms.CharField(label='*Name', max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control rounded-0 border-dark', 'placeholder': '*Name', 'id': 'floatingInput'}))
    company = forms.CharField(label='*Company', max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control rounded-0 border-dark', 'placeholder': '*Company', 'id': 'floatingInput2'}))
    email = forms.EmailField(label='*E-Mail', required=True, widget=forms.EmailInput(attrs={'class': 'form-control rounded-0 border-dark', 'placeholder': '*E-Mail', 'id': 'floatingInput3'}))
    phone = forms.CharField(label='*Phone Number', max_length=15, required=True, widget=forms.TextInput(attrs={'class': 'form-control rounded-0 border-dark', 'placeholder': '*Phone Number', 'id': 'floatingInput4'}))
    comment = forms.CharField(label='Comments', widget=forms.Textarea(attrs={'class': 'form-control rounded-0 border-0 bg-comment', 'rows': '6'}), required=False)
    # captcha = ReCaptchaField(widget=ReCaptchaV3)

class CareerJobApplicationForm(forms.ModelForm):
    job_title = forms.CharField(widget=forms.HiddenInput(), required=False)

    # captcha = ReCaptchaField(widget=ReCaptchaV3)

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')

        # Check if the phone contains only digits and '+'
        if not all(char.isdigit() or char == '+' for char in phone):
            raise ValidationError('Phone number can only contain digits and the "+" symbol.')

        return phone
    
    def clean_resume(self):
        resume = self.cleaned_data.get('resume')
        if resume:
            # Check file extension
            file_extension_validator = FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])
            file_extension_validator(resume)

            # Check file size (limit to 5 MB, adjust as needed)
            max_size = 5 * 1024 * 1024  # 5 MB
            if resume.size > max_size:
                raise ValidationError(f'Maximum file size is 5 MB.')

        return resume

    def clean_cover_letter(self):
        cover_letter = self.cleaned_data.get('cover_letter')
        if cover_letter:
            # Check file extension
            file_extension_validator = FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])
            file_extension_validator(cover_letter)

            # Check file size (limit to 5 MB, adjust as needed)
            max_size = 5 * 1024 * 1024  # 5 MB
            if cover_letter.size > max_size:
                raise ValidationError(f'Maximum file size is 5 MB.')

        return cover_letter
    
    class Meta:
        model = CareerJobApplication
        fields = ['first_name', 'last_name', 'email', 'phone', 'location', 'resume', 'cover_letter']

        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control career-job-input', 'placeholder': 'First Name'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control career-job-input', 'placeholder': 'Last Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control career-job-input', 'placeholder': 'Email'}),
            'phone': forms.TextInput(attrs={'class': 'form-control career-job-input', 'placeholder': 'Phone'}),
            'location': forms.TextInput(attrs={'class': 'form-control career-job-input', 'placeholder': 'Location'}),
            'resume': forms.FileInput(attrs={'class': 'form-control career-job-input', 'accept': '.pdf,.doc,.docx'}),
            'cover_letter': forms.FileInput(attrs={'class': 'form-control career-job-input', 'accept': '.pdf,.doc,.docx'}),
            'job_title': forms.HiddenInput(),
        }
