# ADIF protocol buffer and JSON schema

This repository is an unofficial extension to the [ADIF](https://www.adif.org/) amateur radio data
interchange specification.

## Background

ADIF is popular among the amateur radio community for transmitting and exchanging information about
on-air contacts, a.k.a. QSOs. It was conceived in 1996 and has evolved over the years in mostly
backward-compatible ways.

The wire format of the protocol is a bespoke ASCII format based on tags with field width indicators.
While simple to parse, the unique encoding prevents the use of many modern protocol handling tools,
which slows development effort on more modern amateur radio contact logging software. An extension 
called ADX attempted to encode ADIF data in XML, but ADX has not been widely adopted. I speculate 
this is because ADIF was considered good enough and ADX didn't add value, but another complaint 
among developers is that ADX failed to follow XML best practices. Notably, 
[it does not respect XML namespaces][1], breaking extensibility. Without wide adoption from 
developers, users have had no motivation to entrust their data to ADX. Even if they cared about an 
arguably superior wire format, the fear of incompatibility would have discouraged end users from
using it.

[1]: http://tlfabian.blogspot.com/2016/07/musings-on-adif-file-format.html

## Why update ADIF?

ADIF has served the amateur radio community well for several decades. It's the *lingua franca* of 
ham logging software and will continue to be for a long time. Even software written against newer
interchange formats will need to speak ADIF for the forseeable future. However, the format is
showing its age and does not mesh well with modern software development practices and toolchains.
Most programming languages now have mature libraries for handling JSON data transparently without
having to write any custom parsing logic. XML libraries are similarly widely available, but as
noted, most people have already abandoned ADX, and XML's heyday has passed.

Beyond just tooling improvements, I assert that semantic improvements can be made to ADIF. Rather
than representing a QSO as a flat set of 153 key/value pairs (some of which have further internal 
structure), this is an opportunity to improve the intelligibility of the format for both humans and
computers through nested data types.

## Why JSON? Why protobuf?

Selecting [JSON](https://www.json.org/) as a wire format is an easy choice in today's web-centric
technology space. As RESTful APIs have become the norm for exchanging information between
internet-connected services and their clients, JSON has become the *de facto* standard for these
APIs. [JSON Schema](https://json-schema.org/) is less widely adopted, but it's a convenient way to
formalize the document structure and provide a bootstrap for basic validation in many programming
languages. In this repository, the JSON Schema is derived from the protocol buffer schema.

I've chosen [protocol buffers](https://developers.google.com/protocol-buffers) as the primary schema
representation because:
 
1. Protobuf is a relatively simple and intuitive schema to read even for the unfamiliar.
1. Protobuf is programming language neutral and can generate data structures and parsers in many
   languages.
1. Protobuf has a well-defined JSON transformation which eases using JSON as a public wire format.
1. Protobuf is specifically designed to have a compact and efficient binary wire format, which makes
   it simple and fast to share information between components of the same service in e.g.
   remote procedure calls (RPCs).
1. Protobuf messages are extensible which will allow for the inclusion of ADIF's user-defined 
   fields.

There are other good data serialization formats with IDLs out there that could do the job like 
Apache Thrift or Amazon Ion, but I happen to know protobuf.

## Which ADIF fields are included?

Most of the fields from the ADIF 3.1.0 specification are present in this schema. I did not include
the `INTL` fields because both protobuf and JSON explicitly support UTF-8 strings, making the `INTL`
fields redundant. I did not include deprecated fields. Finally, I omitted `SRX` and `TRX` with the
assertion that all contest serial numbers be stored as strings. You weren't going to do arithmetic 
with those serial numbers, and this is simpler for everyone, if marginally less storage efficient. 

Date/times are represented by specialized data types, which means ADIF's `QSO_DATE` is combined with
`TIME_ON`, and similarly `QSO_DATE_OFF` with `TIME_OFF`.

I have not included most of ADIF's enumerations. Programs using this schema should still respect
those enumerations, but putting those into a codified schema makes it prohibitively difficult to 
accommodate e.g. new political boundaries and new operating modes.  

## Should I use it?

This is an unofficial extension of ADIF and does not yet have any community support, which is
critical to an interchange format. This is a proposal meant to stimulate a discussion, and I'll use
it internally in my own logging application. 

I don't really expect that protocol buffers will become a popular way for end users to store their
data on disk or even for developers of software to support importing or exporting binary protobufs.

Perhaps desktop logging software might start using JSON as a disk file format; JSON is both highly 
human-readable and highly machine-parsable. However, I think that's questionable for the same reason
that ADX failed; ADIF is good enough and already ubiquitous.

What I do hope is that amateur radio internet logging services exposing RESTful APIs will consider
using this schema for JSON structure rather than classic ADIF, and that developers find this schema
useful as an internal data representation.

## Field mapping

ADIF QSO field | Protobuf Qso field
------- | ------
`A_INDEX` | `propagation.a_index`
`ADDRESS` | `contacted_station.address`
`ADDRESS_INTL` | (obsolete)
`AGE` | `contacted_station.age`
`ANT_AZ` | `logging_station.antenna_azimuth`
`ANT_EL` | `logging_station.antenna_elevation`
`ANT_PATH` | `propagation.ant_path`
`ARRL_SECT` | `contest.arrl_section`
`AWARD_GRANTED` | `award_granted[]`
`AWARD_SUBMITTED` | `award_submitted[]`
`BAND` | `band`
`BAND_RX` | `band_rx`
`CALL` | `contacted_station.station_call`
`CHECK` | `contest.check`
`CLASS` | `contest.class`
`CLUBLOG_QSO_UPLOAD_DATE` | `clublog.upload_date`
`CLUBLOG_QSO_UPLOAD_STATUS` | `clublog.upload_status`
`CNTY` | `contacted_station.county`
`COMMENT` | `comment`
`COMMENT_INTL` | (obsolete)
`CONT` | `contacted_station.continent`
`CONTACTED_OP` | `contacted_station.op_call`
`CONTEST_ID` | `contest.contest_id`
`COUNTRY` | `contacted_station.country`
`COUNTRY_INTL` | (obsolete)
`CQZ` | `contacted_station.cq_zone`
`CREDIT_GRANTED` | `credit_granted[]`
`CREDIT_SUBMITTED` | `credit_submitted[]`
`DARC_DOK` | `contacted_station.darc_dok`
`DISTANCE` | `distance`
`DXCC` | `contacted_station.dxcc`
`EMAIL` | `contacted_station.email`
`EQ_CALL` | `contacted_station.owner_callsign`
`EQSL_QSL_RCVD` | `eqsl.received_status`
`EQSL_QSL_SENT` | `eqsl.sent_status`
`EQSL_QSLRDATE` | `eqsl.received_date`
`EQSL_QSLSDATE` | `eqsl.sent_date`
`FISTS` | `contacted_station.fists`
`FISTS_CC` | `contacted_station.fists_cc`
`FORCE_INIT` | `propagation.force_init`
`FREQ` | `freq`
`FREQ_RX` | `freq_rx`
`GRIDSQUARE` | `contacted_station.grid_square`
`GUEST_OP` | (obsolete)
`HRDLOG_QSO_UPLOAD_DATE` | `hdrlog.upload_date`
`HRDLOG_QSO_UPLOAD_STATUS` | `hdrlog.upload_status`
`IOTA` | `contacted_station.iota`
`IOTA_ISLAND_ID` | `contacted_station.iota_island_id`
`ITUZ` | `contacted_station.itu_zone`
`K_INDEX` | `propagation.k_index`
`LAT` | `contacted_station.latitude`
`LON` | `contacted_station.longitude`
`LOTW_QSL_RCVD` | `lotw.received_status`
`LOTW_QSL_SENT` | `lotw.sent_status`
`LOTW_QSLRDATE` | `lotw.received_date`
`LOTW_QSLSDATE` | `lotw.sent_date`
`MAX_BURSTS` | `propagation.max_bursts`
`MODE` | `mode`
`MS_SHOWER` | `propagation.ms_shower`
`MY_ANTENNA` | `logging_station.antenna`
`MY_ANTENNA_INTL` | (obsolete)
`MY_CITY` | `logging_station.city`
`MY_CITY_INTL` | (obsolete)
`MY_CNTY` | `logging_station.county`
`MY_COUNTRY` | `logging_station.country`
`MY_COUNTRY_INTL` | (obsolete)
`MY_CQ_ZONE` | `logging_station.cq_zone`
`MY_DXCC` | `logging_station.dxcc`
`MY_FISTS` | `logging_station.fists`
`MY_GRIDSQUARE` | `logging_station.grid_square`
`MY_IOTA` | `logging_station.iota`
`MY_IOTA_ISLAND_ID` | `logging_station.iota_island_id`
`MY_ITU_ZONE` | `logging_station.itu_zone`
`MY_LAT` | `logging_station.latitude`
`MY_LON` | `logging_station.longitude`
`MY_NAME` | `logging_station.op_name`
`MY_NAME_INTL` | (obsolete)
`MY_POSTAL_CODE` | `logging_station.postal_code`
`MY_POSTAL_CODE_INTL` | (obsolete)
`MY_RIG` | `logging_station.rig`
`MY_RIG_INTL` | (obsolete)
`MY_SIG` | `logging_station.sig`
`MY_SIG_INFO` | `logging_station.sig_info`
`MY_SIG_INFO_INTL` | (obsolete)
`MY_SIG_INTL` | (obsolete)
`MY_SOTA_REF` | `logging_station.sota_ref`
`MY_STATE` | `logging_station.state`
`MY_STREET` | `logging_station.street`
`MY_STREET_INTL` | (obsolete)
`MY_USACA_COUNTIES` | `logging_station.usaca_counties`
`MY_VUCC_GRIDS` | `logging_station.vucc_grids`
`NAME` | `contacted_station.op_name`
`NAME_INTL` | (obsolete)
`NOTES` | `notes`
`NOTES_INTL` | (obsolete)
`NR_BURSTS` | `propagation.nr_bursts`
`NR_PINGS` | `propagation.nr_pings`
`OPERATOR` | `logging_station.op_call`
`OWNER_CALLSIGN` | `logging_station.owner_call`
`PFX` | `contacted_station.pfx`
`PRECEDENCE` | `contest.precedence`
`PROP_MODE` | `propagation.propagation_mode`
`PUBLIC_KEY` | `public_key`
`QRZCOM_QSO_UPLOAD_DATE` | `qrzcom.upload_date`
`QRZCOM_QSO_UPLOAD_STATUS` | `qrzcom.upload_status`
`QSL_RCVD` | `card.received_status`
`QSL_RCVD_VIA` | `card.received_via`
`QSL_SENT` | `card.sent_status`
`QSL_SENT_VIA` | `card.sent_via`
`QSL_VIA` | `contacted_station.qsl_via`
`QSLMSG` | `card.received_message`
`QSLMSG_INTL` | (obsolete)
`QSLRDATE` | `card.received_date`
`QSLSDATE` | `card.sent_date`
`QSO_COMPLETE` | `complete`
`QSO_DATE` | `time_on`
`QSO_DATE_OFF` | `time_off`
`QSO_RANDOM` | `random`
`QTH` | `contacted_station.city`
`QTH_INTL` | (obsolete)
`REGION` | `contacted_station.region`
`RIG` | `contacted_station.rig`
`RIG_INTL` | (obsolete)
`RST_RCVD` | `rst_received`
`RST_SENT` | `rst_sent`
`RX_PWR` | `contacted_station.power`
`SAT_MODE` | `propagation.sat_mode`
`SAT_NAME` | `propagation.sat_name`
`SFI` | `propagation.solar_flux_index`
`SIG` | `contacted_station.sig`
`SIG_INFO` | `contacted_station.sig_info`
`SIG_INFO_INTL` | (obsolete)
`SIG_INTL` | (obsolete)
`SILENT_KEY` | `contacted_station.silent_key`
`SKCC` | `contacted_station.skcc`
`SOTA_REF` | `contacted_station.sota_ref`
`SRX` | `contest.serial_received`
`SRX_STRING` | `contest.serial_received`
`STATE` | `contacted_station.state`
`STATION_CALLSIGN` | `logging_station.station_call`
`STX` | `contest.serial_sent`
`STX_STRING` | `contest.serial_sent`
`SUBMODE` | `submode`
`SWL` | `swl`
`TEN_TEN` | `contacted_station.ten_ten`
`TIME_OFF` | `time_off`
`TIME_ON` | `time_on`
`TX_PWR` | `logging_station.power`
`UKSMG` | `contacted_station.uksmg`
`USACA_COUNTIES` | `contacted_station.usaca_counties`
`VE_PROV` | (obsolete)
`VUCC_GRIDS` | `contacted_station.vucc_grids`
`WEB` | `contacted_station.web`
