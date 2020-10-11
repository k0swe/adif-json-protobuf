// package: adif
// file: adif.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Adif extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Header | undefined;
  setHeader(value?: Header): void;

  clearQsosList(): void;
  getQsosList(): Array<Qso>;
  setQsosList(value: Array<Qso>): void;
  addQsos(value?: Qso, index?: number): Qso;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Adif.AsObject;
  static toObject(includeInstance: boolean, msg: Adif): Adif.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Adif, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Adif;
  static deserializeBinaryFromReader(message: Adif, reader: jspb.BinaryReader): Adif;
}

export namespace Adif {
  export type AsObject = {
    header?: Header.AsObject,
    qsosList: Array<Qso.AsObject>,
  }
}

export class Header extends jspb.Message {
  getAdifVersion(): string;
  setAdifVersion(value: string): void;

  hasCreatedTimestamp(): boolean;
  clearCreatedTimestamp(): void;
  getCreatedTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getProgramId(): string;
  setProgramId(value: string): void;

  getProgramVersion(): string;
  setProgramVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Header.AsObject;
  static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Header, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Header;
  static deserializeBinaryFromReader(message: Header, reader: jspb.BinaryReader): Header;
}

export namespace Header {
  export type AsObject = {
    adifVersion: string,
    createdTimestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    programId: string,
    programVersion: string,
  }
}

export class Qso extends jspb.Message {
  hasLoggingStation(): boolean;
  clearLoggingStation(): void;
  getLoggingStation(): Station | undefined;
  setLoggingStation(value?: Station): void;

  hasContactedStation(): boolean;
  clearContactedStation(): void;
  getContactedStation(): Station | undefined;
  setContactedStation(value?: Station): void;

  hasPropagation(): boolean;
  clearPropagation(): void;
  getPropagation(): Propagation | undefined;
  setPropagation(value?: Propagation): void;

  getBand(): string;
  setBand(value: string): void;

  getBandRx(): string;
  setBandRx(value: string): void;

  getFreq(): number;
  setFreq(value: number): void;

  getFreqRx(): number;
  setFreqRx(value: number): void;

  getMode(): string;
  setMode(value: string): void;

  getSubmode(): string;
  setSubmode(value: string): void;

  getDistanceKm(): number;
  setDistanceKm(value: number): void;

  hasTimeOn(): boolean;
  clearTimeOn(): void;
  getTimeOn(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimeOn(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasTimeOff(): boolean;
  clearTimeOff(): void;
  getTimeOff(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimeOff(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getRandom(): boolean;
  setRandom(value: boolean): void;

  getRstReceived(): string;
  setRstReceived(value: string): void;

  getRstSent(): string;
  setRstSent(value: string): void;

  getSwl(): boolean;
  setSwl(value: boolean): void;

  getComplete(): string;
  setComplete(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  getNotes(): string;
  setNotes(value: string): void;

  hasContest(): boolean;
  clearContest(): void;
  getContest(): ContestData | undefined;
  setContest(value?: ContestData): void;

  clearAwardSubmittedList(): void;
  getAwardSubmittedList(): Array<string>;
  setAwardSubmittedList(value: Array<string>): void;
  addAwardSubmitted(value: string, index?: number): string;

  clearAwardGrantedList(): void;
  getAwardGrantedList(): Array<string>;
  setAwardGrantedList(value: Array<string>): void;
  addAwardGranted(value: string, index?: number): string;

  clearCreditSubmittedList(): void;
  getCreditSubmittedList(): Array<Credit>;
  setCreditSubmittedList(value: Array<Credit>): void;
  addCreditSubmitted(value?: Credit, index?: number): Credit;

  clearCreditGrantedList(): void;
  getCreditGrantedList(): Array<Credit>;
  setCreditGrantedList(value: Array<Credit>): void;
  addCreditGranted(value?: Credit, index?: number): Credit;

  getPublicKey(): string;
  setPublicKey(value: string): void;

  hasClublog(): boolean;
  clearClublog(): void;
  getClublog(): Upload | undefined;
  setClublog(value?: Upload): void;

  hasHrdlog(): boolean;
  clearHrdlog(): void;
  getHrdlog(): Upload | undefined;
  setHrdlog(value?: Upload): void;

  hasQrzcom(): boolean;
  clearQrzcom(): void;
  getQrzcom(): Upload | undefined;
  setQrzcom(value?: Upload): void;

  hasEqsl(): boolean;
  clearEqsl(): void;
  getEqsl(): Qsl | undefined;
  setEqsl(value?: Qsl): void;

  hasLotw(): boolean;
  clearLotw(): void;
  getLotw(): Qsl | undefined;
  setLotw(value?: Qsl): void;

  hasCard(): boolean;
  clearCard(): void;
  getCard(): Qsl | undefined;
  setCard(value?: Qsl): void;

  getAppDefinedMap(): jspb.Map<string, string>;
  clearAppDefinedMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Qso.AsObject;
  static toObject(includeInstance: boolean, msg: Qso): Qso.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Qso, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Qso;
  static deserializeBinaryFromReader(message: Qso, reader: jspb.BinaryReader): Qso;
}

export namespace Qso {
  export type AsObject = {
    loggingStation?: Station.AsObject,
    contactedStation?: Station.AsObject,
    propagation?: Propagation.AsObject,
    band: string,
    bandRx: string,
    freq: number,
    freqRx: number,
    mode: string,
    submode: string,
    distanceKm: number,
    timeOn?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    timeOff?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    random: boolean,
    rstReceived: string,
    rstSent: string,
    swl: boolean,
    complete: string,
    comment: string,
    notes: string,
    contest?: ContestData.AsObject,
    awardSubmittedList: Array<string>,
    awardGrantedList: Array<string>,
    creditSubmittedList: Array<Credit.AsObject>,
    creditGrantedList: Array<Credit.AsObject>,
    publicKey: string,
    clublog?: Upload.AsObject,
    hrdlog?: Upload.AsObject,
    qrzcom?: Upload.AsObject,
    eqsl?: Qsl.AsObject,
    lotw?: Qsl.AsObject,
    card?: Qsl.AsObject,
    appDefinedMap: Array<[string, string]>,
  }
}

export class Station extends jspb.Message {
  getOpCall(): string;
  setOpCall(value: string): void;

  getOpName(): string;
  setOpName(value: string): void;

  getGridSquare(): string;
  setGridSquare(value: string): void;

  getLatitude(): number;
  setLatitude(value: number): void;

  getLongitude(): number;
  setLongitude(value: number): void;

  getPower(): number;
  setPower(value: number): void;

  getRig(): string;
  setRig(value: string): void;

  getAntenna(): string;
  setAntenna(value: string): void;

  getAntennaAzimuth(): number;
  setAntennaAzimuth(value: number): void;

  getAntennaElevation(): number;
  setAntennaElevation(value: number): void;

  getOwnerCall(): string;
  setOwnerCall(value: string): void;

  getStationCall(): string;
  setStationCall(value: string): void;

  getAge(): number;
  setAge(value: number): void;

  getSilentKey(): boolean;
  setSilentKey(value: boolean): void;

  getQslVia(): string;
  setQslVia(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getStreet(): string;
  setStreet(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getPostalCode(): string;
  setPostalCode(value: string): void;

  getCounty(): string;
  setCounty(value: string): void;

  getState(): string;
  setState(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getDxcc(): number;
  setDxcc(value: number): void;

  getContinent(): string;
  setContinent(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getWeb(): string;
  setWeb(value: string): void;

  getCqZone(): number;
  setCqZone(value: number): void;

  getItuZone(): number;
  setItuZone(value: number): void;

  getDarcDok(): string;
  setDarcDok(value: string): void;

  getFists(): number;
  setFists(value: number): void;

  getFistsCc(): number;
  setFistsCc(value: number): void;

  getIota(): string;
  setIota(value: string): void;

  getIotaIslandId(): number;
  setIotaIslandId(value: number): void;

  getPfx(): string;
  setPfx(value: string): void;

  getRegion(): string;
  setRegion(value: string): void;

  getSkcc(): string;
  setSkcc(value: string): void;

  getSig(): string;
  setSig(value: string): void;

  getSigInfo(): string;
  setSigInfo(value: string): void;

  getSotaRef(): string;
  setSotaRef(value: string): void;

  getTenTen(): number;
  setTenTen(value: number): void;

  getUsacaCounties(): string;
  setUsacaCounties(value: string): void;

  getUksmg(): number;
  setUksmg(value: number): void;

  getVuccGrids(): string;
  setVuccGrids(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Station.AsObject;
  static toObject(includeInstance: boolean, msg: Station): Station.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Station, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Station;
  static deserializeBinaryFromReader(message: Station, reader: jspb.BinaryReader): Station;
}

export namespace Station {
  export type AsObject = {
    opCall: string,
    opName: string,
    gridSquare: string,
    latitude: number,
    longitude: number,
    power: number,
    rig: string,
    antenna: string,
    antennaAzimuth: number,
    antennaElevation: number,
    ownerCall: string,
    stationCall: string,
    age: number,
    silentKey: boolean,
    qslVia: string,
    address: string,
    street: string,
    city: string,
    postalCode: string,
    county: string,
    state: string,
    country: string,
    dxcc: number,
    continent: string,
    email: string,
    web: string,
    cqZone: number,
    ituZone: number,
    darcDok: string,
    fists: number,
    fistsCc: number,
    iota: string,
    iotaIslandId: number,
    pfx: string,
    region: string,
    skcc: string,
    sig: string,
    sigInfo: string,
    sotaRef: string,
    tenTen: number,
    usacaCounties: string,
    uksmg: number,
    vuccGrids: string,
  }
}

export class Propagation extends jspb.Message {
  getPropagationMode(): string;
  setPropagationMode(value: string): void;

  getAIndex(): number;
  setAIndex(value: number): void;

  getKIndex(): number;
  setKIndex(value: number): void;

  getSolarFluxIndex(): number;
  setSolarFluxIndex(value: number): void;

  getAntPath(): string;
  setAntPath(value: string): void;

  getForceInit(): boolean;
  setForceInit(value: boolean): void;

  getMaxBursts(): number;
  setMaxBursts(value: number): void;

  getMeteorShowerName(): string;
  setMeteorShowerName(value: string): void;

  getNrBursts(): number;
  setNrBursts(value: number): void;

  getNrPings(): number;
  setNrPings(value: number): void;

  getSatMode(): string;
  setSatMode(value: string): void;

  getSatName(): string;
  setSatName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Propagation.AsObject;
  static toObject(includeInstance: boolean, msg: Propagation): Propagation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Propagation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Propagation;
  static deserializeBinaryFromReader(message: Propagation, reader: jspb.BinaryReader): Propagation;
}

export namespace Propagation {
  export type AsObject = {
    propagationMode: string,
    aIndex: number,
    kIndex: number,
    solarFluxIndex: number,
    antPath: string,
    forceInit: boolean,
    maxBursts: number,
    meteorShowerName: string,
    nrBursts: number,
    nrPings: number,
    satMode: string,
    satName: string,
  }
}

export class ContestData extends jspb.Message {
  getContestId(): string;
  setContestId(value: string): void;

  getSerialSent(): string;
  setSerialSent(value: string): void;

  getSerialReceived(): string;
  setSerialReceived(value: string): void;

  getArrlSection(): string;
  setArrlSection(value: string): void;

  getStationClass(): string;
  setStationClass(value: string): void;

  getCheck(): string;
  setCheck(value: string): void;

  getPrecedence(): string;
  setPrecedence(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContestData.AsObject;
  static toObject(includeInstance: boolean, msg: ContestData): ContestData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContestData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContestData;
  static deserializeBinaryFromReader(message: ContestData, reader: jspb.BinaryReader): ContestData;
}

export namespace ContestData {
  export type AsObject = {
    contestId: string,
    serialSent: string,
    serialReceived: string,
    arrlSection: string,
    stationClass: string,
    check: string,
    precedence: string,
  }
}

export class Credit extends jspb.Message {
  getCredit(): string;
  setCredit(value: string): void;

  getQslMedium(): string;
  setQslMedium(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Credit.AsObject;
  static toObject(includeInstance: boolean, msg: Credit): Credit.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Credit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Credit;
  static deserializeBinaryFromReader(message: Credit, reader: jspb.BinaryReader): Credit;
}

export namespace Credit {
  export type AsObject = {
    credit: string,
    qslMedium: string,
  }
}

export class Upload extends jspb.Message {
  hasUploadDate(): boolean;
  clearUploadDate(): void;
  getUploadDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUploadDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getUploadStatus(): UploadStatusMap[keyof UploadStatusMap];
  setUploadStatus(value: UploadStatusMap[keyof UploadStatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Upload.AsObject;
  static toObject(includeInstance: boolean, msg: Upload): Upload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Upload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Upload;
  static deserializeBinaryFromReader(message: Upload, reader: jspb.BinaryReader): Upload;
}

export namespace Upload {
  export type AsObject = {
    uploadDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    uploadStatus: UploadStatusMap[keyof UploadStatusMap],
  }
}

export class Qsl extends jspb.Message {
  hasSentDate(): boolean;
  clearSentDate(): void;
  getSentDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setSentDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getSentStatus(): string;
  setSentStatus(value: string): void;

  getSentVia(): string;
  setSentVia(value: string): void;

  hasReceivedDate(): boolean;
  clearReceivedDate(): void;
  getReceivedDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setReceivedDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getReceivedStatus(): string;
  setReceivedStatus(value: string): void;

  getReceivedVia(): string;
  setReceivedVia(value: string): void;

  getReceivedMessage(): string;
  setReceivedMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Qsl.AsObject;
  static toObject(includeInstance: boolean, msg: Qsl): Qsl.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Qsl, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Qsl;
  static deserializeBinaryFromReader(message: Qsl, reader: jspb.BinaryReader): Qsl;
}

export namespace Qsl {
  export type AsObject = {
    sentDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    sentStatus: string,
    sentVia: string,
    receivedDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    receivedStatus: string,
    receivedVia: string,
    receivedMessage: string,
  }
}

export interface UploadStatusMap {
  UNKNOWN: 0;
  UPLOAD_COMPLETE: 1;
  DO_NOT_UPLOAD: 2;
  MODIFIED_AFTER_UPLOAD: 3;
}

export const UploadStatus: UploadStatusMap;

