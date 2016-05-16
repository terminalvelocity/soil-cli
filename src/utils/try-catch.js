export default async function(fn, rescue) {
  try {
    return await fn();
  } catch (err) {
    await rescue(err);
  }
}
