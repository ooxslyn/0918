const canvas = document.querySelector('.webgl')



let scene, renderer, camera
let cube

function init() {
  // 建立場景
  scene = new THREE.Scene()

  // 建立渲染器
  renderer = new THREE.WebGLRenderer({canvas:canvas})
  renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
  renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
  renderer.shadowMap.enable = true // 陰影效果

  // 將渲染器的 DOM 綁到網頁上
  document.body.appendChild(renderer.domElement)

  // 建立相機
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(10, 10, 10)
  camera.lookAt(scene.position)

  // 建立光源
  let pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10, 10, -10)
  scene.add(pointLight)

  // 建立物體
  const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff
  }) // 材質
  cube = new THREE.Mesh(geometry, material) // 建立網格物件
  cube.position.set(0, 0, 0)
  scene.add(cube)
}

function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}

function render() {
  animate()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

// RWD
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})





init()
render()