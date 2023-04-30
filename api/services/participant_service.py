from api.model.participant import Participant
from datetime import datetime
#modify participant register field by participant id
#modify user study id when creating new study

class ParticipantService(object):
    @staticmethod
    def list_all_participants():
        return Participant.objects()
    
    @staticmethod
    def list_participants_in_study(study_id):
        return Participant.objects.filter(study_id=study_id)

    @staticmethod
    def get_participant(participant_id):
        return Participant.objects.get(participant_id=participant_id)

    @staticmethod
    def delete_participant(participant_id):
        """
        Delete the study
        """
        Participant.objects.get(participant_id=participant_id).delete()
    
    @staticmethod
    def update_participant(participant_id,date_of_birth,gender,weight,height):
      

            participant = Participant.objects.get(participant_id=participant_id)
            participant.update(set__gender=gender,set__date_of_birth=datetime.strptime(date_of_birth,'%Y-%m-%d'),set__weight=weight,set__height=height)
            return participant
    
