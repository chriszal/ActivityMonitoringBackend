from atexit import register
from api.model.study import Study
# import numpy as np
from api.model.participant import Participant
import random
import datetime
import string
from mongoengine.queryset.visitor import Q


class StudyService(object):
    @staticmethod
    def create_study(study_id, title,authors, description, no_participants,study_coordinators,study_assistants):
        """
        Create a new user
        """

        for i in range(no_participants):
            Participant(participant_id=study_id+"_"+str(i), reg_code=''.join(random.choice(string.ascii_uppercase + string.digits)
                        for _ in range(8)), name="", email="",date_of_birth=None,gender=None,weight=None,height=None,register_status="NULL", study_id=study_id).save()

        study = Study(study_id=study_id, title=title,authors=authors,
                      description=description, no_participants=no_participants,study_coordinators=study_coordinators,study_assistants=study_assistants).save()

        return study

    @staticmethod
    def list_studies():
        """
        Get created projects
        :return:
        :rtype:
        """
        return Study.objects()

    @staticmethod
    def get_study(study_id):
        """
        Get created projects
        :return:
        :rtype:
        """
        return Study.objects.get(study_id=study_id)

    @staticmethod
    def delete_study(study_id):
        """
        Delete the study
        """
        Study.objects.get(study_id=study_id).delete()
        Participant.objects(study_id=study_id).delete()

    @staticmethod
    def check_participant_in_study(study_id,userid):

        return Participant.objects(Q(participant_id=userid) & Q(study_id=study_id)).count()
