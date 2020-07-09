from google.protobuf.json_format import MessageToJson
from hamutils.adif import ADIReader

import adif_pb2

f = open('test.adi', 'r')
adi = ADIReader(f)

pbAdi = adif_pb2.Adif()
pbAdi.header.created_timestamp.GetCurrentTime()
pbAdi.header.program_id = 'PbAdifDemo'
pbAdi.header.program_version = '0.0.1'

for qso in adi:
    pbqso = pbAdi.qsos.add()
    pbqso.band = qso['band']
    pbqso.contacted_station.op_call = qso['call']
    # pbqso.contacted_station.county = qso['cnty']
    # pbqso.comment = qso['comment']
    pbqso.contacted_station.continent = qso['cont']
    # pbqso.contest.contest_id = qso['contest_id']
    pbqso.contacted_station.country = qso['country']
    # pbqso.contacted_station.cq_zone = qso['cqz']
    pbqso.distance_km = int(qso['distance'])
    pbqso.logging_station.op_call = qso['station_callsign']
    pbqso.time_on.FromJsonString(qso['datetime_on'].isoformat(timespec='seconds') + 'Z')
    pbqso.time_off.FromJsonString(qso['datetime_off'].isoformat(timespec='seconds') + 'Z')

print(MessageToJson(pbAdi))
