from api.model.participant import Participant
from datetime import datetime
# modify participant register field by participant id
# modify user study id when creating new study


class ParticipantService(object):
    @staticmethod
    def list_all_participants():
        return Participant.objects()

    @staticmethod
    def list_participants_in_study(study_id):
        return Participant.objects.filter(study=study_id)

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
    def update_participant(participant_id, date_of_birth, gender, weight, height):

        participant = Participant.objects.get(participant_id=participant_id)
        participant.update(set__gender=gender, set__date_of_birth=datetime.strptime(
            date_of_birth, '%Y-%m-%d'), set__weight=weight, set__height=height)
        return participant

    # @staticmethod
    # def create_participants(study, data):
    #     """
    #     Creates the specified number of new participants for the given study_id with the given data.
    #     """
    #     data_copy = data.copy()
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
