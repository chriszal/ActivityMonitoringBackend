from src.model.participant import Participant
from src.model.study import Study
import json
#modify participant register field by participant id
#modify user study id when creating new study

class RegisterService(object):
    @staticmethod
    def modify_participant(id,study_id):
        return Study.objects(study_id=study_id,participants__id=id).update(set__participants__S__register_status="registered")

    @staticmethod
    def list_participants_in_study(study_id):

        return Study.objects.filter(study_id=study_id).values_list('participants')

    @staticmethod
    def get_participant(participant_id):
        return Participant.objects.get(participant_id=participant_id)

    @staticmethod
    def register_participant(reg_code):
        try:
            participant = Participant.objects.get(reg_code=reg_code)
            if participant.register_status != "NULL":
                return 0
            else:     
                study_obj = Study.objects.get(study_id=participant.study_id)
                participant.update(set__register_status="REGISTERED")

                return {
                        'study_id': study_obj.study_id,
                        'title': study_obj.title,
                        'description': study_obj.description,
                        'participant_id': participant.participant_id
                        } 
        except Participant.DoesNotExist:
            return -1

        
        

