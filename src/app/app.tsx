import {useState} from 'react'
import { getRecordingDevices, recordFromDevice } from './utils/recording'

export default function App() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined)
  getRecordingDevices().then(devices => {
    setDevices(devices)
    setSelectedDeviceId(devices[0].deviceId)
  })

  const [recorder, setRecorder] = useState<MediaRecorder>(null)
  const handleRecord = async () => {
    console.log(recorder)
    if (recorder) {
      const tracks = recorder.stream.getTracks();
      tracks.forEach((track) => track.stop());
      setRecorder(null)
      console.log('stopped')
      return 
    }
    if (!selectedDeviceId) {
      return
    }
    setRecorder(await recordFromDevice(selectedDeviceId))
  }

  return (
    <div>
      <select
        defaultValue={selectedDeviceId}
        onChange={(e) => {
        setSelectedDeviceId(e.target.value)
      }}>
      {
        devices.map(device => (
        <option
          key={device.deviceId}
          value={device.deviceId}>
          {device.label}
        </option>))
      }
      </select>
      <button
        onClick={handleRecord}>
        Record
      </button>
    </div>
  )
}
