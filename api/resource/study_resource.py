import falcon
import json
from api.services.study_service import StudyService
from api.model.study import Study


class StudyResource(object):
    def __init__(self):
        self.study_service = StudyService()

    def on_get(self, req, resp):
        try:
            studies = self.study_service.list_studies()
            resp.status = falcon.HTTP_200
            resp.body = studies.to_json()
        except Exception as e:
            raise falcon.HTTPConflict("Study list conflict", str(e))

    def on_post(self, req, resp):
        # study_data["study_coordinators"] = [req.context.userid]
        try:
            study_data = req.media
            study_obj = self.study_service.create_study(**study_data)
            resp.status = falcon.HTTP_201
            resp.body = json.dumps({
                'message': 'Study successfully created!',
                'status': 201,
                'data': str(study_obj.study_id)
            })
        except Exception as e:
            raise falcon.HTTPConflict("Study creation conflict", str(e))

    def on_get_id(self, req, resp, study_id):
        try:
            study_obj = self.study_service.get_study(study_id)

            if "participant" in req.context.roles:
                if self.study_service.check_participant_in_study(study_id, req.context.userid):
                    resp.body = study_obj.to_json()
                else:
                    raise falcon.HTTPUnauthorized(
                        "Unauthorized", "Study can't be accessed")
            else:
                resp.body = study_obj.to_json()

            resp.status = falcon.HTTP_200

        except falcon.HTTPUnauthorized as e:
            raise e
        except Study.DoesNotExist as e:
            raise falcon.HTTPNotFound("Study ID does not exist", str(e))

    def on_put_id(self, req, resp, study_id):

        try:
            study_data = req.media
            updated_study = self.study_service.update_study_by_study_id(
                study_id, **study_data)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({
                'message': 'Study successfully updated!',
                'status': 200,
                'data': str(updated_study.study_id)
            })
        except Study.DoesNotExist as e:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Study id does not exist.',
                'status': 404,
                'data': {}
            })
        except Exception as e:
            raise falcon.HTTPConflict("Study update conflict", str(e))

    def on_delete_id(self, req, resp, study_id):
        try:
            self.study_service.delete_study(study_id)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({
                'message': 'Study successfully deleted!',
                'status': 200,
                'body': {}
            })
        except Study.DoesNotExist as e:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Study id does not exist.',
                'status': 404,
                'data': {}
            })

    def on_get_user_id(self, req, resp, user_id):
        try:
            studies = self.study_service.list_studies_by_user_id(user_id)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps([study.to_dict() for study in studies])
        except Exception as e:
            raise falcon.HTTPConflict("Study dict conflict", str(e))
