from django.shortcuts import redirect, render, get_object_or_404
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from .forms import LetsConnectForm, JoinOurClubForm, CareerJobApplicationForm  # Import the form you created
from .models import JoinOurClubSubmission, LetsConnectSubmission, JobPost, CareerJobApplication

def home(request):
    return render(request, 'home.html', {})

def aboutyou(request):
    return render(request, 'about-you.html', {})

# def joinourclub(request):
#     if request.method == "POST":
#         # Getting Data
#         name = request.POST['name']
#         company = request.POST['company']
#         email = request.POST['email']
#         phone = request.POST['phone']
#         comment = request.POST['comment']

#         # Email Setup
#         #send_mail(
#         #    'Message from Join Our Club | ' + name, # Subject
#         #    'Name : '+ name + ' Company Name : ' + company + ' Phone : ' + phone + ' Comment : ' + comment + ' Email : ' + email, # Message
#         #    email,
#         #    ['dineshvijayakumar96@gmail.com'], # To Email
#         #)

#         # Email Setup
#         subject = 'Message from Join Our Club | ' + name
#         from_email = 'dineshjustin95@gmail.com'  # Set your email address here
#         to_email = ['dineshvijayakumar96@gmail.com']

#         # Load the HTML template
#         html_message = render_to_string('email_template.html', {'name': name, 'company': company, 'email': email, 'phone': phone, 'comment': comment})

#         # Create an EmailMultiAlternatives object to send both HTML and plain text emails
#         email = EmailMultiAlternatives(subject, 'This is the plaintext message', from_email, to_email)
#         email.attach_alternative(html_message, "text/html")

#         # Send the email
#         email.send()

#         # Set a session variable to indicate that the form has been submitted
#         request.session['form_submitted'] = True

#         # return render(request, 'join-our-club.html', {'thankyou': '<p class="bg-success text-white p-3">Thank you for your interest. Our team will get back to you shortly.</p>'})
#         return redirect('thankyou')

#     else:
#         return render(request, 'join-our-club.html', {})

def joinourclub(request):
    if request.method == "POST":
        form = JoinOurClubForm(request.POST)
        if form.is_valid():
            # Getting Data from Form
            name = form.cleaned_data['name']
            company = form.cleaned_data['company']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            comment = form.cleaned_data['comment']

            # Save form submission to the database
            JoinOurClubSubmission.objects.create(
                name=name,
                company=company,
                email=email,
                phone=phone,
                comment=comment
            )

            # Email Setup
            subject = 'Message from Join Our Club | ' + name
            from_email = 'dineshjustin95@gmail.com'  # Set your email address here "dineshjustin95@gmail.com"
            to_email = ['dineshvijayakumar96@gmail.com'] # Set your to email address here "dineshvijayakumar96@gmail.com"

            # Load the HTML template
            html_message = render_to_string('email_template.html', {'name': name, 'company': company, 'email': email, 'phone': phone, 'comment': comment})

            # Create an EmailMultiAlternatives object to send both HTML and plain text emails
            email = EmailMultiAlternatives(subject, 'This is the plaintext message', from_email, to_email)
            email.attach_alternative(html_message, "text/html")

            try:
                # Send the email
                email.send()

                # Set a session variable to indicate that the form has been submitted
                request.session['form_submitted'] = True

                # Redirect to a thank you page or use render if you want to display a thank you message on the same page
                return redirect('thankyou')

            except Exception as e:
                # Handle email sending error
                return render(request, 'join-our-club.html', {'error': str(e), 'form': form})

        else:
            # Form is not valid, render the form with validation errors
            return render(request, 'join-our-club.html', {'form': form})

    else:
        form = JoinOurClubForm()
        return render(request, 'join-our-club.html', {'form': form})
    
def ourworks(request):
    return render(request, 'our-works.html', {})

def iconiccity(request):
    return render(request, 'iconic-city.html', {})

def antaracares(request):
    return render(request, 'antaracares.html', {})

def edubest(request):
    return render(request, 'edubest.html', {})

def bestiu(request):
    return render(request, 'bestiu.html', {})

def i2c2(request):
    return render(request, 'i2c2.html', {})

def expertise(request):
    return render(request, 'expertise.html', {})

# def yourcareer(request):
#     return render(request, 'careers.html', {})

def yourcareer(request):
    job_posts = JobPost.objects.all()
    return render(request, 'careers.html', {'job_posts': job_posts})

# def careers_single(request, job_id):
#     job_post = get_object_or_404(JobPost, pk=job_id)
#     return render(request, 'careers-single.html', {'job_post': job_post})

# def careers_single(request, job_id):
#     job_post = get_object_or_404(JobPost, pk=job_id)
#     requirements_lines = job_post.requirements.split('\n')
#     return render(request, 'careers-single.html', {'job_post': job_post, 'requirements_lines': requirements_lines})

def careers_single(request, job_id):
    job_post = get_object_or_404(JobPost, pk=job_id)
    requirements_lines = job_post.requirements.split('\n')

    if request.method == "POST":
        form = CareerJobApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            # Save form submission to the database
            application = form.save(commit=False)
            application.job_post = job_post
            application.save()

            # Email Setup
            subject = f'Application for {job_post.title} {job_post.subtitle} | {application.first_name} {application.last_name}'
            from_email = 'dineshjustin95@gmail.com'
            to_email = ['dineshvijayakumar96@gmail.com']

            # Load the HTML template for the main application email
            html_message = render_to_string('email_template_3.html', {'application': application, 'job_post': job_post})

            # Create an EmailMessage object
            email = EmailMessage(subject, html_message, from_email, to_email)
            email.content_subtype = "html"  # Set the content type to HTML

            # Attach the resume file
            if application.resume:
                resume_file_path = application.resume.path
                email.attach_file(resume_file_path)

            # Attach the cover letter file
            if application.cover_letter:
                cover_letter_file_path = application.cover_letter.path
                email.attach_file(cover_letter_file_path)

            try:
                # Send the main application email
                email.send()

                # Send the reply email
                subject_reply = f'{application.first_name} {application.last_name} | Your Application on {job_post.title} {job_post.subtitle} | The Accretio'
                html_message_reply = render_to_string('reply_email_template.html', {'application': application, 'job_post': job_post})
                email_reply = EmailMessage(subject_reply, html_message_reply, from_email, [application.email])
                email_reply.content_subtype = "html"  # Set the content type to HTML
                email_reply.send()

                # Set a session variable to indicate that the form has been submitted
                request.session['form_submitted'] = True

                # Redirect to a thank you page or use render if you want to display a thank you message on the same page
                return redirect('thankyoujob')

            except Exception as e:
                # Handle email sending error
                return render(request, 'careers-single.html', {'error': str(e), 'form': form, 'job_post': job_post, 'requirements_lines': requirements_lines})

        else:
            # Form is not valid, render the form with validation errors
            return render(request, 'careers-single.html', {'form': form, 'job_post': job_post, 'requirements_lines': requirements_lines})

    else:
        form = CareerJobApplicationForm(initial={'job_title': f"{job_post.title} {job_post.subtitle}"})
        return render(request, 'careers-single.html', {'form': form, 'job_post': job_post, 'requirements_lines': requirements_lines})

# def letsconnect(request):
#     if request.method == "POST":
#         # Getting Data
#         name = request.POST['name']
#         email = request.POST['email']
#         company = request.POST['company']
#         message = request.POST['message']

#         # Email Setup
#         #send_mail(
#         #    'Message from Join Our Club | ' + name, # Subject
#         #    'Name : '+ name + ' Company Name : ' + company + ' Phone : ' + phone + ' Comment : ' + comment + ' Email : ' + email, # Message
#         #    email,
#         #    ['dineshvijayakumar96@gmail.com'], # To Email
#         #)

#         # Email Setup 2
#         subject = 'Message from Lets Connect | ' + name
#         from_email = 'dineshjustin95@gmail.com'  # Set your email address here
#         to_email = ['dineshvijayakumar96@gmail.com']

#         # Load the HTML template
#         html_message = render_to_string('email_template_2.html', {'name': name, 'email': email, 'company': company, 'message': message})

#         # Create an EmailMultiAlternatives object to send both HTML and plain text emails
#         email = EmailMultiAlternatives(subject, 'This is the plaintext message', from_email, to_email)
#         email.attach_alternative(html_message, "text/html")

#         # Send the email
#         email.send()

#         # Set a session variable to indicate that the form has been submitted
#         request.session['form_submitted'] = True

#         # return render(request, 'lets-connect.html', {'thankyou': '<p class="bg-success text-white p-3">Thank you for your interest. Our team will get back to you shortly.</p>'})
#         return redirect('thankyou')

#     else:
#         return render(request, 'lets-connect.html', {})

def letsconnect(request):
    if request.method == "POST":
        form = LetsConnectForm(request.POST)
        if form.is_valid():
            # Getting Data from Form
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            company = form.cleaned_data['company']
            message = form.cleaned_data['message']

            # Save form submission to the database
            LetsConnectSubmission.objects.create(
                name=name,
                email=email,
                company=company,
                message=message
            )

            # Email Setup
            subject = 'Message from Lets Connect | ' + name
            from_email = 'dineshjustin95@gmail.com'  # Set your email address here "dineshjustin95@gmail.com"
            to_email = ['dineshvijayakumar96@gmail.com'] # Set your to email address here "dineshvijayakumar96@gmail.com"

            # Load the HTML template
            html_message = render_to_string('email_template_2.html', {'name': name, 'email': email, 'company': company, 'message': message})

            # Create an EmailMultiAlternatives object to send both HTML and plain text emails
            email = EmailMultiAlternatives(subject, 'This is the plaintext message', from_email, to_email)
            email.attach_alternative(html_message, "text/html")

            try:
                # Send the email
                email.send()

                # Set a session variable to indicate that the form has been submitted
                request.session['form_submitted'] = True

                # Redirect to a thank you page or use render if you want to display a thank you message on the same page
                return redirect('thankyou')

            except Exception as e:
                # Handle email sending error
                return render(request, 'lets-connect.html', {'error': str(e), 'form': form})

        else:
            # Form is not valid, render the form with validation errors
            return render(request, 'lets-connect.html', {'form': form})

    else:
        form = LetsConnectForm()
        return render(request, 'lets-connect.html', {'form': form})
    
def thankyou(request):
    # Check if the form has been submitted before allowing access to the thank-you page
    if not request.session.get('form_submitted', False):
        # If not, redirect to another page, for example, the home page
        return redirect('home')

    # Clear the session variable to ensure that the user can't access the thank-you page again
    request.session['form_submitted'] = False

    return render(request, 'thank-you.html', {})

def thankyoujob(request):
    # Check if the form has been submitted before allowing access to the thank-you page
    if not request.session.get('form_submitted', False):
        # If not, redirect to another page, for example, the home page
        return redirect('home')

    # Clear the session variable to ensure that the user can't access the thank-you page again
    request.session['form_submitted'] = False

    return render(request, 'thank-you-job.html', {})

