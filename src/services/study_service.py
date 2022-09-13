from src.model.study import Study
from src.model.participant import Participant
import random
import string

class StudyService(object):
    @staticmethod
    def create_study(study_id,title,description,no_participants):
        """
        Create a new user
        """
        participants = []
        for i in range(no_participants):
            participants.append(Participant(study_id+"_"+str(i),''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8)),"","","NULL"))
        
        study = Study(study_id=study_id,title=title,description=description,no_participants=no_participants,participants=participants).save()    
        
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