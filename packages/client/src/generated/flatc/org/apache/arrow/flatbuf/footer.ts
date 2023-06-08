// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Block } from '../../../../org/apache/arrow/flatbuf/block';
import { KeyValue } from '../../../../org/apache/arrow/flatbuf/key-value';
import { MetadataVersion } from '../../../../org/apache/arrow/flatbuf/metadata-version';
import { Schema } from '../../../../org/apache/arrow/flatbuf/schema';


/**
 * ----------------------------------------------------------------------
 * Arrow File metadata
 *
 */
export class Footer {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Footer {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsFooter(bb:flatbuffers.ByteBuffer, obj?:Footer):Footer {
  return (obj || new Footer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsFooter(bb:flatbuffers.ByteBuffer, obj?:Footer):Footer {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Footer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

version():MetadataVersion {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt16(this.bb_pos + offset) : MetadataVersion.V1;
}

schema(obj?:Schema):Schema|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new Schema()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

dictionaries(index: number, obj?:Block):Block|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? (obj || new Block()).__init(this.bb!.__vector(this.bb_pos + offset) + index * 24, this.bb!) : null;
}

dictionariesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

recordBatches(index: number, obj?:Block):Block|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new Block()).__init(this.bb!.__vector(this.bb_pos + offset) + index * 24, this.bb!) : null;
}

recordBatchesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

/**
 * User-defined metadata
 */
customMetadata(index: number, obj?:KeyValue):KeyValue|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new KeyValue()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

customMetadataLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startFooter(builder:flatbuffers.Builder) {
  builder.startObject(5);
}

static addVersion(builder:flatbuffers.Builder, version:MetadataVersion) {
  builder.addFieldInt16(0, version, MetadataVersion.V1);
}

static addSchema(builder:flatbuffers.Builder, schemaOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, schemaOffset, 0);
}

static addDictionaries(builder:flatbuffers.Builder, dictionariesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, dictionariesOffset, 0);
}

static startDictionariesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(24, numElems, 8);
}

static addRecordBatches(builder:flatbuffers.Builder, recordBatchesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, recordBatchesOffset, 0);
}

static startRecordBatchesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(24, numElems, 8);
}

static addCustomMetadata(builder:flatbuffers.Builder, customMetadataOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, customMetadataOffset, 0);
}

static createCustomMetadataVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startCustomMetadataVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endFooter(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishFooterBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedFooterBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

}
