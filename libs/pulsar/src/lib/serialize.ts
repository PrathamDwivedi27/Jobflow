export const serialize = <T>(data: T): Buffer => {
  return Buffer.from(JSON.stringify(data));
};

export const deserialize = <T>(data: Buffer) => {
  return JSON.parse(data.toString());
};
