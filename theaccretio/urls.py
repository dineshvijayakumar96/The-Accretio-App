from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('about-you', views.aboutyou, name="aboutyou"),
    path('about-you/join-our-club', views.joinourclub, name="joinourclub"),
    path('our-works', views.ourworks, name="ourworks"),
    path('our-works/iconic-city', views.iconiccity, name="iconiccity"),
    path('our-works/i2c2', views.i2c2, name="i2c2"),
    path('our-works/antaracares', views.antaracares, name="antaracares"),
    path('our-works/edubestonline', views.edubest, name="edubest"),
    path('our-works/best-innovation-university', views.bestiu, name="bestiu"),
    path('expertise', views.expertise, name="expertise"),
    path('careers', views.yourcareer, name="yourcareer"),
    path('careers/<int:job_id>/', views.careers_single, name='careers_single'),  # Added URL for individual job posts
    path('lets-connect', views.letsconnect, name="letsconnect"),
    path('thank-you', views.thankyou, name="thankyou"),
    path('thank-you-job', views.thankyoujob, name="thankyoujob"),
]
