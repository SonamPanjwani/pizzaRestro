export type positionType = {
  latitude: number;
  longitude: number;
};

export async function getAddress({ latitude, longitude }: positionType) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("failed getting address");
  const data = await res.json();
  return data;
}
