
export type MappedType<T extends string | number | symbol, K> = Record<T, K>
export default MappedType