export default async function isWebGPUSupported(): Promise<boolean> {
  if (!('gpu' in navigator)) {
    return false
  }

  try {
    const adapter = await (navigator as any).gpu.requestAdapter()
    return adapter !== null
  } catch {
    return false
  }
}
