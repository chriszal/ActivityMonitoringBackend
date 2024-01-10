from model.participant import Participant
from model.study import Study
import json
#modify participant register field by participant id
#modify user study id when creating new study

class RegisterParticipantService(object):
    def __init__(self,logging):
        self.logging = logging
        
    @staticmethod
    def modify_participant(id,study_id):
        return Study.objects(study_id=study_id,participants__id=id).update(set__participants__S__register_status="registered")

    @staticmethod
    def list_participants_in_study(study_id):

        return Study.objects.filter(study_id=study_id).values_list('participants')

    @staticmethod
    def get_participant(participant_id):
        return Participant.objects.get(participant_id=participant_id)

    def register_participant(self, reg_code):
        self.logging.info(f"Attempting to register participant with reg_code: {reg_code}")
        try:
            participant = Participant.objects.get(reg_code=reg_code)
            if participant.register_status != "NONE" or participant.register_status != "PENDING":
                self.logging.warning(f"Participant with reg_code {reg_code} already registered.")
                return 0
            else:     
                study_obj = Study.objects.get(id=participant.study)
                participant.update(set__register_status="REGISTERED")
                self.logging.info(f"Participant with reg_code {reg_code} successfully registered to study {study_obj.study_id}.")
                return {
                        'study_id': str(study_obj.study_id), 
                        'title': study_obj.title, 
                        'description': study_obj.description, 
                        'participant_id': participant.participant_id
                        } 
        except Participant.DoesNotExist:
            self.logging.error(f"Participant with reg_code {reg_code} does not exist.")
            return -1


        
        

