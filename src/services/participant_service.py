from src.model.participant import Participant
from src.model.study import Study
#modify participant register field by participant id
#modify user study id when creating new study

class ParticipantService(object):
    @staticmethod
    def modify_participant(id,study_id):
        return Study.objects(study_id=study_id,participants__id=id).update(set__participants__S__register_status="registered")

    @staticmethod
    def list_participants_in_study(study_id):

        return Study.objects.filter(study_id=study_id).values_list('participants')

    @staticmethod
    def get_participant_in_study(id,study_id):
        for participant in Study.objects.filter(study_id=study_id).values_list('participants'):
            if participant["_id"] == id:
                print(participant)
                return participant
            else :
                return None
    

    @staticmethod
    def delete_participant(id,study_id):
        """
        Delete the study
        """
        Study.objects(study_id=study_id,participants__id=id).update(pull__participants__id=id)