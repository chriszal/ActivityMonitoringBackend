from src.model.study import Study
from src.model.participant import Participant
import random
import string

class StudyService(object):
    @staticmethod
    def create_study(id,title,description,no_participants):
        """
        Create a new user
        """
        participants = []

        for i in range(no_participants):
            participants.append(Participant(id+"_"+str(i),''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8)),"",""))
        user = Study(id=id,title=title,description=description,no_participants=no_participants,participants=participants).save()
        return user

    @staticmethod
    def list_users():
        """
        Get created projects
        :return:
        :rtype:
        """
        return Study.objects()

    @staticmethod
    def delete_study(study_id):
        """
        Delete the study
        """
        Study.objects(id=study_id).delete()