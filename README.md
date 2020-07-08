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
data on disk or even for developers of different software to support importing or exporting
protobufs.

Perhaps desktop logging software might use JSON as a disk file format; JSON is both highly 
human-readable and highly machine-parsable. However, I think that's questionable for the same reason
that ADX failed; ADIF is good enough and already ubiquitous.

What I do hope is that amateur radio internet logging services exposing RESTful APIs will consider
using this schema for JSON structure rather than classic ADIF, and that developers find this schema
useful as an internal data representation.
