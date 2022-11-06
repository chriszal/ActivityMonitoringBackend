from src.model.participant import Participant
from src.model.study import Study
#modify participant register field by participant id
#modify user study id when creating new study

class ParticipantService(object):
    
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