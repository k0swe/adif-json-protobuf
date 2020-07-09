import adif_pb2
from google.protobuf.json_format import MessageToJson
from hamutils.adif import ADIReader


def safe_bytes(d, key):
    if key in d:
        return d[key]
    return b''


def safe_int(d, key):
    if key in d:
        return int(d[key])
    return 0


f = open('test.adi', 'r')
adi = ADIReader(f)

pb_adi = adif_pb2.Adif()
pb_adi.header.created_timestamp.GetCurrentTime()
pb_adi.header.program_id = 'PbAdifDemo'
pb_adi.header.program_version = '0.0.1'

for qso in adi:
    pb_qso = pb_adi.qsos.add()
    pb_qso.band = safe_bytes(qso, 'band')
    pb_qso.contacted_station.op_call = safe_bytes(qso, 'call')
    pb_qso.contacted_station.county = safe_bytes(qso, 'cnty')
    pb_qso.comment = safe_bytes(qso, 'comment')
    pb_qso.contacted_station.continent = safe_bytes(qso, 'cont')
    pb_qso.contest.contest_id = safe_bytes(qso, 'contest_id')
    pb_qso.contacted_station.country = safe_bytes(qso, 'country')
    pb_qso.contacted_station.cq_zone = safe_int(qso, 'cqz')
    pb_qso.distance_km = safe_int(qso, 'distance')
    pb_qso.logging_station.op_call = safe_bytes(qso, 'station_callsign')
    pb_qso.time_on.FromJsonString(qso['datetime_on'].isoformat(timespec='seconds') + 'Z')
    pb_qso.time_off.FromJsonString(qso['datetime_off'].isoformat(timespec='seconds') + 'Z')

print(MessageToJson(pb_adi))
