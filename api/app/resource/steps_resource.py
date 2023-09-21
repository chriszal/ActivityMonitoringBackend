import falcon
from datetime import datetime
from model.processed_steps import ProcessedSteps

class StepsResource:
    def __init__(self, logging):
        self.logging = logging

    def on_get(self, req, resp):
        # self.logging.info(req.params)
        date = req.get_param('day')  # Format: YYYY-MM-DD
        week = req.get_param('week')  # Format: YYYY-WW
        year = req.get_param('year')  # Just the YYYY
        participant_id = req.get_param('participant_id')  # Get the participant_id
        
        if not participant_id:
            raise falcon.HTTPBadRequest("Invalid Request", "Please provide a valid participant_id.")
        
        if date:
            resp.media = get_data_by_date(date, participant_id)
        elif week:
            year, week_num = map(int, week.split('-'))
            resp.media = get_data_by_week(year, week_num, participant_id)
        elif year:
            resp.media = get_data_by_year(year, participant_id)
        else:
            raise falcon.HTTPBadRequest("Invalid Request", "Please provide a valid date, week, or year.")

def get_data_by_date(target_date, participant_id):
    year, month, day = map(int, target_date.split('-'))

    steps_data = ProcessedSteps.objects(participant_id=participant_id, year=year, month=month, day=day)
    hourly_steps = {hourly_data.hour: hourly_data.steps_count for hourly_data in steps_data}

    # Fill in missing hours with "NaN"
    for hour in range(24):
        hourly_steps.setdefault(hour, "NaN")

    return hourly_steps


def get_data_by_week(target_year, target_week, participant_id):
    steps_data = ProcessedSteps.objects(participant_id=participant_id, year=target_year, week=target_week)

    # Getting weekday-based aggregation
    weekday_steps = {}
    for data in steps_data:
        weekday = datetime(data.year, data.month, data.day).weekday()  # 0 for Monday, 6 for Sunday
        weekday_steps[weekday] = weekday_steps.get(weekday, 0) + data.steps_count

    # Fill in missing weekdays with "NaN"
    for weekday in range(7):
        weekday_steps.setdefault(weekday, "NaN")

    return weekday_steps

def get_data_by_year(target_year, participant_id):
    steps_data = ProcessedSteps.objects(participant_id=participant_id, year=target_year)

    # Getting month-based aggregation
    month_steps = {}
    for data in steps_data:
        month_steps[data.month] = month_steps.get(data.month, 0) + data.steps_count

    # Fill in missing months with "NaN"
    for month in range(1, 13):
        month_steps.setdefault(month, "NaN")

    return month_steps
