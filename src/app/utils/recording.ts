
export const getRecordingDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  
  return devices.filter(device => device.kind === 'audioinput');
}

export const recordFromDevice = async (deviceId: string): Promise<MediaRecorder> => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: deviceId } } })
  const recorder = new MediaRecorder(stream);

  return recorder
}