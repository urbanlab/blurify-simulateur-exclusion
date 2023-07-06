<script setup>
import { ref, onMounted } from 'vue'
import mpFaceMesh from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'
import { useDistanceStore } from '@/stores/distance'

const videoElement = ref(null)
const distanceResult = ref(null)
const store = useDistanceStore()

onMounted(() => {
  activateWebcam()
})

const config = {
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` + `${mpFaceMesh.VERSION}/${file}`
  }
}

/**
 * Solution options.
 */
const solutionOptions = {
  selfieMode: true,
  enableFaceGeometry: false,
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
}

const constraints = {
  video: true
}

const activateWebcam = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints)

  if (stream) {
    videoElement.value.srcObject = stream
    activateFaceDetection()
  }
}

// Activate the webcam stream.

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const activateFaceDetection = () => {
  function onResults(results) {
    var width = results.image.width
    var height = results.image.height

    var irisLeftMinX = -1
    var irisLeftMaxX = -1

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        for (const point of mpFaceMesh.FACEMESH_LEFT_IRIS) {
          var point0 = landmarks[point[0]]
          if (irisLeftMinX == -1 || point0.x * width < irisLeftMinX) {
            irisLeftMinX = point0.x * width
          }
          if (irisLeftMaxX == -1 || point0.x * width > irisLeftMaxX) {
            irisLeftMaxX = point0.x * width
          }
        }
      }
    }

    var dx = irisLeftMaxX - irisLeftMinX
    var dX = 11.7

    // Logitech HD Pro C922	Norm focal
    var normalizedFocaleX = 1.40625
    var fx = Math.min(width, height) * normalizedFocaleX
    var dZ = (fx * (dX / dx)) / 10.0
    dZ = dZ.toFixed(2)

    store.$patch({ distance: Number(dZ) })
    distanceResult.value = dZ
  }

  const faceMesh = new mpFaceMesh.FaceMesh(config)
  faceMesh.setOptions(solutionOptions)
  faceMesh.onResults(onResults)

  // Present a control panel through which the user can manipulate the solution
  // options.

  const cameraMp = new Camera(videoElement.value, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement.value })
    }
  })
  cameraMp.start()
}
</script>

<template>
  <video id="webcam" autoplay playsinline ref="videoElement"></video>
</template>

<style>
#webcam {
  display: none;
}
</style>
