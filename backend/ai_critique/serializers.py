from rest_framework import serializers


class PersonalDetailsSerializer(serializers.Serializer):
    firstName = serializers.CharField(required=False, allow_blank=True, default="")
    lastName = serializers.CharField(required=False, allow_blank=True, default="")
    email = serializers.EmailField(required=False, allow_blank=True, default="")
    phone = serializers.CharField(required=False, allow_blank=True, default="")
    city = serializers.CharField(required=False, allow_blank=True, default="")
    state = serializers.CharField(required=False, allow_blank=True, default="")
    country = serializers.CharField(required=False, allow_blank=True, default="")
    linkedin = serializers.URLField(required=False, allow_blank=True, default="")
    jobTarget = serializers.CharField(required=False, allow_blank=True, default="")


class WorkExperienceSerializer(serializers.Serializer):
    id = serializers.CharField(required=False, default="")
    jobTitle = serializers.CharField(required=False, allow_blank=True, default="")
    employer = serializers.CharField(required=False, allow_blank=True, default="")
    description = serializers.CharField(required=False, allow_blank=True, default="")
    startDate = serializers.DateField(required=False, allow_null=True)
    endDate = serializers.DateField(required=False, allow_null=True)
    isWorking = serializers.BooleanField(required=False, default=False)
    location = serializers.CharField(required=False, allow_blank=True, default="")


class EducationHistorySerializer(serializers.Serializer):
    id = serializers.CharField(required=False, default="")
    school = serializers.CharField(required=False, allow_blank=True, default="")
    degree = serializers.CharField(required=False, allow_blank=True, default="")
    field = serializers.CharField(required=False, allow_blank=True, default="")
    startDate = serializers.DateField(required=False, allow_null=True)
    endDate = serializers.DateField(required=False, allow_null=True)
    isStudying = serializers.BooleanField(required=False, default=False)


class SkillSerializer(serializers.Serializer):
    id = serializers.CharField(required=False, default="")
    name = serializers.CharField(required=False, allow_blank=True, default="")
    level = serializers.ChoiceField(
        required=False,
        choices=["beginner", "intermediate", "advanced", "expert", ""],
        default="",
    )


class ResumeCritiqueRequestSerializer(serializers.Serializer):
    personalDetails = PersonalDetailsSerializer(required=False, allow_null=True)
    summary = serializers.CharField(required=False, allow_blank=True, default="")
    workExperience = WorkExperienceSerializer(required=False, many=True, default=list)
    educationHistory = EducationHistorySerializer(required=False, many=True, default=list)
    skills = SkillSerializer(required=False, many=True, default=list)
