import falcon, json
import datetime

from model.user import User
from services.participant_service import ParticipantService
from model.participant import Participant
from model.study import Study
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from common.constants import GMAIL_PASS
from common.constants import GMAIL_USER

class ParticipantResource(object):


    def __init__(self,logging):
        self.participant_service = ParticipantService()
        self.gmail = GMAIL_USER
        self.gmail_pass = GMAIL_PASS
        self.logging = logging

    def on_get(self, req, resp):
        try:
            participant_objs = self.participant_service.list_all_participants()
            resp.body = participant_objs.to_json()
            resp.status = falcon.HTTP_200
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.body = json.dumps({
                'message': 'Failed to fetch participants.',
                'status': 500,
                'data': {}
            })
            
    def on_get_id(self, req, resp, participant_id):
        try:
            participant_obj = self.participant_service.get_participant(participant_id)
            resp.body = participant_obj.to_json()
            resp.status = falcon.HTTP_200
        except Participant.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Participant does not exist.',
                'status': 404,
                'data': {}
            })

    def on_get_study(self, req, resp, study_id):
        try:
            study = Study.objects.get(study_id=study_id)
            participant_objs = self.participant_service.list_participants_in_study(study.id)            
            participants_list = [participant.to_dict() for participant in participant_objs]
            resp.body = json.dumps(participants_list)

            resp.status = falcon.HTTP_200
        except Study.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Study does not exist.',
                'status': 404,
                'data': {}
            })
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.body = json.dumps({
                'message': str(e),
                'status': 500,
                'data': {}
            })

    def on_get_registered(self, req, resp, study_id):
        try:
            study = Study.objects.get(id=study_id)
            participant_objs = self.participant_service.list_registered_participants_in_study(study_id)
            resp.body = participant_objs.to_json()
            resp.status = falcon.HTTP_200
        except Study.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Study does not exist.',
                'status': 404,
                'data': {}
            })
        except Participant.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Participant does not exist.',
                'status': 404,
                'data': {}
            })
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.body = json.dumps({
                'message': str(e),
                'status': 500,
                'data': {}
            })
        
    def on_delete_id(self, req, resp, participant_id):
        try:
            self.participant_service.delete_participant(participant_id)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({
                'message': 'Participant successfully deleted!',
                'status': 200,
                'body': {}
            })
        except Participant.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Participant ID does not exist.',
                'status': 404,
                'data': {}
            })

    def on_put_id(self, req, resp, participant_id):
        if req.context.userid == participant_id:
            try:
                participant_data = req.media
                participant_data["participant_id"] = participant_id
                participant_obj = self.participant_service.update_participant(**participant_data)
                resp.status = falcon.HTTP_200
                resp.body = json.dumps({
                    'message': 'Participant successfully updated!',
                    'status': 200,
                    'body': participant_obj
                })
            except Participant.DoesNotExist:
                resp.status = falcon.HTTP_404
                resp.body = json.dumps({
                    'message': 'Participant ID does not exist.',
                    'status': 404,
                    'data': {}
                })
        else:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({
                'message': 'Authentication Failure',
                'status': 409,
                'data': {}
            })


    def on_post_participant_invitation(self, req, resp):
        try:
            current_year = datetime.datetime.now().year

            # 1. Extracting the required data
            participant_data = req.media
            email = participant_data['email']
            reg_code = participant_data['reg_code']
            participant_id = participant_data['participant_id']
            study = participant_data['study']

            # 2. Fetching study information using the study field
            study_info = Study.objects.get(id=study)
            study_id = study_info.study_id
            study_title = study_info.title

            # 3. Construct and send the personalized email invitation
            body_html = f"""
               <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                        <title>Beam Platform Invitation</title>
                    </head>
                    <body style="width: 100%; margin: 0; -webkit-text-size-adjust: none; font-family: Helvetica, Arial, sans-serif; background-color: #EAEAEA;">
                        <span style="display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">You've been invited!</span>
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td align="center">
                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td width="100%">
                                                <table align="center" width="500" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #FFFFFF; border-radius: 8px; padding: 20px; margin-top: 50px;">
                                                    <tr>
                                                        <td style="padding: 35px;">
                                                            <h1>Hi, {email}!</h1>
                                                            <p>You are assigned with participant {participant_id}. We would like to invite you to register on the mobile application for activity analysis on the Beam platform. You have been invited to join the study with ID: {study_id} and title: {study_title}.</p>
                                                            <p>Your registration code is: {reg_code}</p>
                                                            <p>Please use the above code to register on the mobile application.</p>
                                                            <p>If you have any questions, you can reply to this email. </p>
                                                            <p>Welcome aboard,<br>The Beam Team</p>
                                                            <hr style="border-top: 1px solid #ccc;">
                                                            <p style="font-size: 14px;"><strong>P.S.</strong> Need help getting started? Check out our <a href="https://github.com/chriszal/ActivityMonitoringBackend/blob/main/README.md">help documentation</a>.</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;">
                                                <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                                                    <tr>
                                                        <td align="center">
                                                            <p style="font-size: 14px;">&copy; {current_year} Beam. All rights reserved.</p>
                                                            <p style="font-size: 14px;">Harokopio University</p>
                                                            <p style="font-size: 14px;">9 Omirou Street,</p>
                                                            <p style="font-size: 14px;">Tavros Attica 177 78</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
                """


            msg = MIMEMultipart()
            msg['From'] = GMAIL_USER
            msg['To'] = email
            msg['Subject'] = 'Beam Platform Invitation'

            msg.attach(MIMEText(body_html, 'html'))

            smtp = smtplib.SMTP('smtp.gmail.com', 587)
            smtp.starttls()
            smtp.login(self.gmail, self.gmail_pass)
            smtp.sendmail(GMAIL_USER, email, msg.as_string())
            smtp.quit()

            # 4. Update the registration_status of the participant
            participant = Participant.objects.get(participant_id=participant_id)
            participant.update(set__register_status="PENDING")

            resp.status = falcon.HTTP_201
            resp.body = json.dumps({
                'message': 'Email successfully sent and participant status updated!',
                'status': 201,
                'data': {}
            })

        except Exception as e:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({
                'message': str(e),
                'status': 409,
                'data': {}
            })
            return
