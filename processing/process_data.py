from influxdb_client import InfluxDBClient
import pandas as pd

# Connect to InfluxDB
client = InfluxDBClient(url="http://influxdb:8086", token="my-token")

# Set up the query
query = '''
SELECT * FROM accelerometer_data
WHERE user = 'chris' AND time > now() - 24h
'''

# Execute the query and store the results in a Pandas DataFrame
result = client.query(query)
df = pd.DataFrame.from_records(result["series"][0]["values"])
df.columns = result["series"][0]["columns"]

# Convert the timestamp column to a datetime
df["time"] = pd.to_datetime(df["time"])

# Calculate the number of steps taken
steps = df[["x", "y", "z"]].apply(lambda x: x.abs().sum(), axis=1)
print(steps.sum())
