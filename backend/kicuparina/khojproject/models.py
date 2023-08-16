from django.db import models
from django.contrib.auth.models import User

class InputValue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    input_values = models.TextField()  # Store comma-separated integers
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']