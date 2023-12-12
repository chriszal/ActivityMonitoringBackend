from model.participant import Participant
from datetime import datetime
# modify participant register field by participant id
# modify user study id when creating new study


class ParticipantService(object):
    
    def __init__(self,logging):
        self.logging = logging
        
    @staticmethod
    def list_all_participants():
        return Participant.objects()

    @staticmethod
    def list_participants_in_study(study_id):
        return Participant.objects.filter(study=str(study_id))

    @staticmethod
    def list_registered_participants_in_study(study_id):
        return Participant.objects.filter(study=study_id, register_status='REGISTERED')

    @staticmethod
    def get_participant(participant_id):
        return Participant.objects.get(participant_id=participant_id)

    @staticmethod
    def delete_participant(participant_id):
        """
        Delete the study
        """
        Participant.objects.get(participant_id=participant_id).delete()
        
    def list_participants_with_priority(self,study_id, limit):
        try:
            registered = Participant.objects.filter(study=study_id, register_status='REGISTERED')
            pending = Participant.objects.filter(study=study_id, register_status='PENDING')
            none = Participant.objects.filter(study=study_id, register_status='NONE')

            self.logging.info(f"Registered: {registered.count()}, Pending: {pending.count()}, None: {none.count()}")  # Debug print

            participants = list(registered) + list(pending) + list(none)
            return participants[:limit]
        except Exception as e:
            self.logging.error(f"Error in list_participants_with_priority: {str(e)}")
            raise

    @staticmethod
    def update_participant(participant_id, date_of_birth, gender, weight, height, **kwargs):


        participant = Participant.objects.get(participant_id=participant_id)
        participant.update(set__gender=gender, set__date_of_birth=datetime.strptime(
            date_of_birth, '%Y-%m-%d'), set__weight=weight, set__height=height)
        return participant

    # @staticmethod
    # def create_participants(study, num_participants):
    #     """
    #     Creates the specified number of new participants for the given study_id with the given data.
    #     """
    #     participants = Participant.objects.filter(study=study)
    #     largest_id = 0
    #     for participant in participants:
    #         participant_id = participant.participant_id
    #         if participant_id.startswith(study_id):
    #             number = int(participant_id[len(study_id):])
    #             largest_id = max(largest_id, number)

    #     created_participants = []
    #     for i in range(data_copy["num_participants"]):
    #         new_participant_id = f"{study_id}_{largest_id + i + 1}"

    #         data_copy["participant_id"] = new_participant_id
    #         data_copy["study_id"] = study_id
    #         data_copy["register_status"] = "NULL"

    #         participant = Participant(**data_copy)
    #         participant.save()
    #         created_participants.append(participant)

    #     return created_participants
