from django.contrib.auth.models import User
from rest_framework import serializers, validators


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Added password field
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

        extra_kwargs = {
            "email": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        queryset=User.objects.all(),
                        message="A user with that Email already exists"
                    )
                ]
            },
            "username": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        queryset=User.objects.all(),
                        message="A user with that Username already exists"
                    )
                ]
            }
        }
        

    def create(self, validated_data):
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            password=password,  # Use create_user method for password hashing
            **validated_data
        )

        return user