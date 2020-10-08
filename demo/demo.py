import gzip
import re
from pathlib import Path

import adif_pb2
import sys
from google.protobuf.json_format import MessageToJson
from hamutils.adif import ADIReader
from tabulate import tabulate

lat_lon_re = re.compile('([NESW])(\d+) ([\d.]+)')


def safe_bytes(d, key):
    if key in d:
        return d[key]
    return b''


def safe_int(d, key):
    if key in d:
        return int(d[key])
    return 0


def safe_float(d, key):
    if key in d:
        return float(d[key])
    return 0


def safe_lat_long(d, key):
    if key in d:
        raw = d[key]
        m = lat_lon_re.search(raw)
        cardinal = m.group(1)
        degs = int(m.group(2))
        mins = float(m.group(3))
        retval = degs + (mins / 60)
        if cardinal == 'S' or cardinal == 'W':
            retval *= -1
        return retval
    return 0


def safe_upload_status(d, key):
    if key in d:
        v = d[key]
        ret = adif_pb2.UploadStatus.UNKNOWN
        if v == "Y":
            ret = adif_pb2.UploadStatus.UPLOAD_COMPLETE
        if v == "N":
            ret = adif_pb2.UploadStatus.DO_NOT_UPLOAD
        if v == "M":
            ret = adif_pb2.UploadStatus.MODIFIED_AFTER_UPLOAD
        return ret
    return 0


filename = sys.argv[1]
adif_size = Path(filename).stat().st_size
gzip_adif_size = len(gzip.compress(open(filename, "rb").read()))
f = open(filename, 'r')
adi = ADIReader(f)

pb_adi = adif_pb2.Adif()
pb_adi.header.created_timestamp.GetCurrentTime()
pb_adi.header.program_id = 'PbAdifDemo'
pb_adi.header.program_version = '0.0.1'

for qso in adi:
    pb_qso = pb_adi.qsos.add()
    pb_qso.band = safe_bytes(qso, 'band')
    pb_qso.band_rx = safe_bytes(qso, 'band_rx')
    pb_qso.contacted_station.station_call = safe_bytes(qso, 'call')
    pb_qso.contacted_station.county = safe_bytes(qso, 'cnty')
    pb_qso.comment = safe_bytes(qso, 'comment')
    pb_qso.contacted_station.continent = safe_bytes(qso, 'cont')
    pb_qso.contacted_station.country = safe_bytes(qso, 'country')
    pb_qso.contacted_station.cq_zone = safe_int(qso, 'cqz')
    pb_qso.distance_km = safe_int(qso, 'distance')
    pb_qso.contacted_station.dxcc = safe_int(qso, 'dxcc')
    pb_qso.contacted_station.email = safe_bytes(qso, 'email')
    pb_qso.eqsl.sent_status = safe_bytes(qso, 'eqsl_qsl_sent')
    pb_qso.eqsl.received_status = safe_bytes(qso, 'eqsl_qsl_rcvd')
    pb_qso.freq = safe_float(qso, 'freq')
    pb_qso.freq_rx = safe_float(qso, 'freq_rx')
    pb_qso.contacted_station.grid_square = safe_bytes(qso, 'gridsquare')
    pb_qso.contacted_station.itu_zone = safe_int(qso, 'ituz')
    pb_qso.contacted_station.iota = safe_bytes(qso, 'iota')
    pb_qso.contacted_station.latitude = safe_lat_long(qso, 'lat')
    pb_qso.contacted_station.longitude = safe_lat_long(qso, 'lon')
    pb_qso.lotw.sent_status = safe_bytes(qso, 'lotw_qsl_sent')
    pb_qso.lotw.received_status = safe_bytes(qso, 'lotw_qsl_rcvd')
    pb_qso.mode = safe_bytes(qso, 'mode')
    pb_qso.logging_station.city = safe_bytes(qso, 'my_city')
    pb_qso.logging_station.county = safe_bytes(qso, 'my_cnty')
    pb_qso.logging_station.country = safe_bytes(qso, 'my_country')
    pb_qso.logging_station.cq_zone = safe_int(qso, 'my_cq_zone')
    pb_qso.logging_station.grid_square = safe_bytes(qso, 'my_gridsquare')
    pb_qso.logging_station.itu_zone = safe_int(qso, 'my_itu_zone')
    pb_qso.logging_station.latitude = safe_lat_long(qso, 'my_lat')
    pb_qso.logging_station.longitude = safe_lat_long(qso, 'my_lon')
    pb_qso.logging_station.op_name = safe_bytes(qso, 'my_name')
    pb_qso.logging_station.state = safe_bytes(qso, 'my_state')
    pb_qso.contacted_station.op_name = safe_bytes(qso, 'name')
    pb_qso.logging_station.op_call = safe_bytes(qso, 'operator')
    pb_qso.qrzcom.upload_status = safe_upload_status(qso, 'qrzcom_qso_upload_status')
    pb_qso.card.received_message = safe_bytes(qso, 'qslmsg')
    pb_qso.card.sent_status = safe_bytes(qso, 'qsl_sent')
    pb_qso.card.sent_via = safe_bytes(qso, 'qsl_sent_via')
    pb_qso.card.received_status = safe_bytes(qso, 'qsl_rcvd')
    pb_qso.contacted_station.qsl_via = safe_bytes(qso, 'qsl_via')
    pb_qso.contacted_station.city = safe_bytes(qso, 'qth')
    pb_qso.rst_received = safe_bytes(qso, 'rst_rcvd')
    pb_qso.rst_sent = safe_bytes(qso, 'rst_sent')
    pb_qso.contacted_station.state = safe_bytes(qso, 'state')
    pb_qso.logging_station.power = safe_float(qso, 'tx_pwr')
    pb_qso.logging_station.station_call = safe_bytes(qso, 'station_callsign')

    pb_qso.time_on.FromJsonString(qso['datetime_on'].isoformat(timespec='seconds') + 'Z')
    pb_qso.time_off.FromJsonString(qso['datetime_off'].isoformat(timespec='seconds') + 'Z')
    if 'lotw_qslsdate' in qso:
        pb_qso.lotw.sent_date.FromJsonString(qso['lotw_qslsdate'].isoformat() + 'T00:00:00Z')
    if 'lotw_qslrdate' in qso:
        pb_qso.lotw.received_date.FromJsonString(qso['lotw_qslrdate'].isoformat() + 'T00:00:00Z')
    if 'qrzcom_qso_upload_date' in qso:
        pb_qso.qrzcom.upload_date.FromJsonString(qso['qrzcom_qso_upload_date'].isoformat() + 'T00:00:00Z')

    # avoid having an empty contest stanza
    contest_id = safe_bytes(qso, 'contest_id')
    if contest_id != b'':
        pb_qso.contest.contest_id = contest_id
        pb_qso.contest.serial_received = safe_bytes(qso, 'srx_string')
        if pb_qso.contest.serial_received == '':
            srx = safe_int(qso, 'srx')
            if srx != 0:
                pb_qso.contest.serial_received = str(srx)
        pb_qso.contest.serial_sent = safe_bytes(qso, 'stx_string')
        if pb_qso.contest.serial_sent == '':
            stx = safe_int(qso, 'stx')
            if stx != 0:
                pb_qso.contest.serial_sent = str(stx)
        pb_qso.contest.arrl_section = safe_bytes(qso, 'arrl_sect')
        pb_qso.contest.station_class = safe_bytes(qso, 'class')

json = MessageToJson(pb_adi)
print(json)

num_fmt = "{:,}"
json_size = len(json)
gzip_json_size = len(gzip.compress(json.encode('utf-8')))
pb_size = len(pb_adi.SerializeToString())
gzip_pb_size = len(gzip.compress(pb_adi.SerializeToString()))
print(
    tabulate(
        [['Input ADIF', num_fmt.format(adif_size), num_fmt.format(gzip_adif_size)],
         ['JSON', num_fmt.format(json_size), num_fmt.format(gzip_json_size)],
         ['Binary protobuf', num_fmt.format(pb_size), num_fmt.format(gzip_pb_size)]],
        headers=['Encoding', 'bytes', 'gzip']),
    file=sys.stderr)
