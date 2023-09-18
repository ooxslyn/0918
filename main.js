

const canvas = document.querySelector('.webgl')
const tab1 = document.getElementById('tab1')
const tab2 = document.getElementById('tab2')
const tab3 = document.getElementById('tab3')




let scene, renderer, camera
let cube
let material, material2

let cubeRotateSpeed = 0.01

let tab1Count = 0
let colorSwitch = false


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
  camera.position.set(10, 20, 10)
  camera.lookAt(scene.position)

  // 建立光源
  let pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10, 10, -10)
  scene.add(pointLight)

  // 建立物體
  const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
  material = new THREE.MeshPhongMaterial({
    color: 0x00ffff
  }) // 材質
  material2 = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) // 材質

  cube = new THREE.Mesh(geometry, material) // 建立網格物件
  cube.position.set(0, 0, 0)
  scene.add(cube)
}

function animate() {
  cube.rotation.x += cubeRotateSpeed
  cube.rotation.y += cubeRotateSpeed
}

function render() {
  animate()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

function inputHandle() {
  tab1.addEventListener('click',()=>{
    console.log('tab1 clicked',colorSwitch)
    if(colorSwitch){
      cube.material= material2
      colorSwitch = false
    }else{
      cube.material= material
      colorSwitch = true
    }
  })

  tab3.addEventListener('click',()=>tab3Func())

  canvas.addEventListener('click',()=>{
    console.log('canvas clicked')
    tab1Func()
  })
}

function tab1Func(){
  tab1Count++
  console.log('run tab1Func',tab1Count,)
  if(tab1Count < 9){
    cubeRotateSpeed +=0.01
  }else{
    cube.scale.set
    tab1Count = 0
    cubeRotateSpeed =0
  }

}
function tab3Func(){
  console.log('tab3 clicked')
  objectClone(cube,2,4)
}

let cloneList=[]
function objectClone(obj,distance,cloneNum) {
  for(var i=1; i<=cloneNum; i++){
    const obj1 = obj.clone()
    obj1.position.x = obj.position.x + distance*i
    cloneList.push(obj1)
    console.log(i,obj1.position)

  }
  cloneList.forEach(e => {
    scene.add(e)
  });


}

// RWD
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})





init()
inputHandle()
render()