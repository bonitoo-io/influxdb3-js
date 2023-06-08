// automatically generated by the FlatBuffers compiler, do not modify

import { DictionaryBatch } from '../../../../org/apache/arrow/flatbuf/dictionary-batch';
import { RecordBatch } from '../../../../org/apache/arrow/flatbuf/record-batch';
import { Schema } from '../../../../org/apache/arrow/flatbuf/schema';
import { SparseTensor } from '../../../../org/apache/arrow/flatbuf/sparse-tensor';
import { Tensor } from '../../../../org/apache/arrow/flatbuf/tensor';


/**
 * ----------------------------------------------------------------------
 * The root Message type
 * This union enables us to easily send different message types without
 * redundant storage, and in the future we can easily add new message types.
 *
 * Arrow implementations do not need to implement all of the message types,
 * which may include experimental metadata types. For maximum compatibility,
 * it is best to send data using RecordBatch
 */
export enum MessageHeader {
  NONE = 0,
  Schema = 1,
  DictionaryBatch = 2,
  RecordBatch = 3,
  Tensor = 4,
  SparseTensor = 5
}

export function unionToMessageHeader(
  type: MessageHeader,
  accessor: (obj:DictionaryBatch|RecordBatch|Schema|SparseTensor|Tensor) => DictionaryBatch|RecordBatch|Schema|SparseTensor|Tensor|null
): DictionaryBatch|RecordBatch|Schema|SparseTensor|Tensor|null {
  switch(MessageHeader[type]) {
    case 'NONE': return null; 
    case 'Schema': return accessor(new Schema())! as Schema;
    case 'DictionaryBatch': return accessor(new DictionaryBatch())! as DictionaryBatch;
    case 'RecordBatch': return accessor(new RecordBatch())! as RecordBatch;
    case 'Tensor': return accessor(new Tensor())! as Tensor;
    case 'SparseTensor': return accessor(new SparseTensor())! as SparseTensor;
    default: return null;
  }
}

export function unionListToMessageHeader(
  type: MessageHeader, 
  accessor: (index: number, obj:DictionaryBatch|RecordBatch|Schema|SparseTensor|Tensor) => DictionaryBatch|RecordBatch|Schema|SparseTensor|Tensor|null, 
  index: number
): DictionaryBatch|RecordBatch|Schema|SparseTensor|Tensor|null {
  switch(MessageHeader[type]) {
    case 'NONE': return null; 
    case 'Schema': return accessor(index, new Schema())! as Schema;
    case 'DictionaryBatch': return accessor(index, new DictionaryBatch())! as DictionaryBatch;
    case 'RecordBatch': return accessor(index, new RecordBatch())! as RecordBatch;
    case 'Tensor': return accessor(index, new Tensor())! as Tensor;
    case 'SparseTensor': return accessor(index, new SparseTensor())! as SparseTensor;
    default: return null;
  }
}
