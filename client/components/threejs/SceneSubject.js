import * as THREE from 'three';
import alphaTexture from '../../../assets/textures/stripes_gradient.jpg';
import {posts, ideas} from '../../fixtures/data';
import { getOperationAST } from 'graphql';

export default scene => {    
    // const group = new THREE.Group();

    // const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(10, 2));
    
    // const subjectMaterial = new THREE.MeshStandardMaterial({ color: "#000", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });
    // subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
    // subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
    // subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
    // subjectMaterial.alphaMap.repeat.y = 1;

    // const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);
        
    // const subjectWireframe = new THREE.LineSegments(
    //     new THREE.EdgesGeometry(subjectGeometry),
    //     new THREE.LineBasicMaterial()
    // );

    // group.add(subjectMesh);
    // group.add(subjectWireframe);
    // scene.add(group);

    // group.rotation.z = Math.PI/4;

    // const speed = 0.02;
    // const textureOffsetSpeed = 0.02;

    // function deformGeometry(geometry) {
    //     for (let i=0; i<geometry.vertices.length; i+=2) {
    //         const scalar = 1 + Math.random()*0.8;
    //         geometry.vertices[i].multiplyScalar(scalar)
    //     }

    //     return geometry;
    // }

    // function update(time) {
    //     const angle = time*speed;

    //     group.rotation.y = angle;

    //     subjectMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;

    //     subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );
        
    //     const scale = (Math.sin(angle*8)+6.4)/5;
    //     subjectWireframe.scale.set(scale, scale, scale)
    // }

    function update() {
       
        const Ideas = scene.getObjectByName('Ideas');

        if (Ideas) {
            Ideas.children
                .forEach(child => child.children
                    .forEach(child => child.translateOnAxis(new THREE.Vector3(), Math.PI/6 )));
        }

    }

    function createBox(w, h, d) {
        var geometry = new THREE.BoxGeometry(w, h, d);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
       return new THREE.Mesh(geometry, material);
    }

    function createPlane(w, d) {
        var geometry = new THREE.PlaneGeometry(w, d);
        var material = new THREE.MeshBasicMaterial({
            color: 'red',
            side: THREE.DoubleSide
        });
       return new THREE.Mesh(geometry, material);
    }


    function getIdeas() {
        const group = new THREE.Group();
        group.name = 'Ideas';
        console.log(ideas);
        ideas.forEach((idea, index) => {
            const ideaSolar = getIdea(idea);
            ideaSolar.position.set( 
                10 * getRandomIntType() * getRandomInt(10),
                getRandomIntType() * getRandomInt(50), 
                -getRandomInt(50) 
            );

            ideaSolar.name = idea.title;
            
            return group.add(ideaSolar);
        });
        return scene.add(group);
    }

    function getIdea(idea) {
        const solar = new THREE.Group();
        //remove this or fix data
        idea.posts = posts;
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00
        });
        const sun = new THREE.Mesh(geometry, material);
        idea.posts.forEach(post => solar.add(getPost(post)));
        solar.children.forEach(planet => planet.position.set(
            10 * getRandomIntType() * getRandomInt(10),
            getRandomIntType() * getRandomInt(50), 
            -getRandomInt(50) 
        ));

        solar.add(sun);
        
        return solar;
    }

    function getPost(post) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 'red'
        });
        return new THREE.Mesh(geometry, material)
    }
    

    function getRandomIntType() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    return {
        update,
        getIdeas
    }
}