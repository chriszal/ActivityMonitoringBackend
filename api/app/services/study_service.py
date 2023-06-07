from model.study import Study
from model.participant import Participant
import random
import string
from mongoengine.queryset.visitor import Q


class StudyService(object):
    @staticmethod
    def create_study(study_id, title, authors, description, no_participants, owners, study_coordinators, study_assistants):

        # Check for duplicate user IDs on owner study coordinator and study assistant fields
        if len(set(owners) & set(study_coordinators)) > 0 or len(set(owners) & set(study_assistants)) > 0 or len(set(study_coordinators) & set(study_assistants)) > 0:
            raise ValueError(
                "Duplicate user id found in owners, study coordinators, or study assistants list")

        study = Study(study_id=study_id, title=title, authors=authors,
                      description=description, no_participants=no_participants, owners=owners, study_coordinators=study_coordinators, study_assistants=study_assistants).save()

        for i in range(no_participants):
            Participant(participant_id=study_id+"_"+str(i), reg_code=''.join(random.choice(string.ascii_uppercase + string.digits)
                        for _ in range(8)), name="", email="", date_of_birth=None, gender=None, weight=None, height=None, register_status="NULL", study=str(study.id)).save()

        return study

    @staticmethod
    def list_studies():
        return Study.objects()

    @staticmethod
    def get_study(study_id):
        return Study.objects.get(study_id=study_id)

    @staticmethod
    def update_study_by_study_id(s_id, **kwargs):
        study = Study.objects.get(study_id=s_id)

        # Check for duplicate values in the update fields
        new_owners = kwargs.get('owners', study.owners)
        new_study_coordinators = kwargs.get(
            'study_coordinators', study.study_coordinators)
        new_study_assistants = kwargs.get(
            'study_assistants', study.study_assistants)

        if len(set(new_owners) & set(new_study_coordinators)) > 0 or len(set(new_owners) & set(new_study_assistants)) > 0 or len(set(new_study_coordinators) & set(new_study_assistants)) > 0:
            raise ValueError(
                "Duplicate user id found in owners, study coordinators, or study assistants list")

        for key, value in kwargs.items():
            setattr(study, key, value)
        study.save()
        return study

    @staticmethod
    def delete_study(study_id):
        study = Study.objects.get(study_id=study_id)
        Participant.objects(study=str(study.id)).delete()
        study.delete()

    @staticmethod
    def check_participant_in_study(study_id, userid):

        return Participant.objects(Q(participant_id=userid) & Q(study=study_id)).count()

    @staticmethod
    def list_studies_by_user_id(user_id):
        return Study.objects(Q(owners__contains=user_id) | Q(study_coordinators__contains=user_id) | Q(study_assistants__contains=user_id))
