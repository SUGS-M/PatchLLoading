// import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

//全局变量
const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()

//scene
const scene = new THREE.Scene()

//物体
const axes = new THREE.AxesHelper()
scene.add(axes)

const urls = [
  {
      key:'park1',
      url:'./public/new/output0.gltf'
  },
  {
      key:'park2',
      url:'./public/new/output1.gltf'
  },
  {
      key:'park3',
      url:'./public/new/output2.gltf'
  },
  {
      key:'park4',
      url:'./public/new/output3.gltf'
  },
  {
      key:'park5',
      url:'./public/new/output4.gltf'
  },
  {
      key:'park6',
      url:'./public/new/output5.gltf'
  },
]

const  loadModel = (data) => {
  const { url} = data;
  const gltfloader = new GLTFLoader();
  gltfloader.load(url, function (gltf) {
      //scene.add(gltf.scene)
      gltf.scene.traverse(o=>{
        if(o instanceof THREE.Mesh){
          var mesh=new THREE.Mesh(o.geometry,new THREE.MeshPhysicalMaterial({
            emissive:0xffffff
          })  )
          console.log(mesh)
          scene.add(mesh)
        }
      })
      //console.log(gltf.scene)
      //gltf.scene.position.set(-5, 0, 0);
    //   gltf.scene.position.set(-5, 0, 0);
  });
}

urls.map((d) => {
  loadModel(d);
})

//light
const light = new THREE.AmbientLight()
light.position.set(-10,-10,-10)
scene.add(light)


//camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(-5,-5,-5)
camera.lookAt(0,0,0)

//render
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.append(renderer.domElement)
document.body.append(stat.dom)

//control
const orbitControl = new OrbitControls(camera, renderer.domElement)

//渲染钩子
function tick(){
    requestAnimationFrame(tick)
    renderer.render(scene,camera)
    stat.update()
    orbitControl.update()
}
tick()



