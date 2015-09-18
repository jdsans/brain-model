var container;
var camera,controls, scene, renderer,INTERSECTED,data_matrix,object;

var current_value = 0;


//These variables contain groups of menu items present in sidebar mode
var cortex = new Array("L_Frontal_Lobe","L_Temporal_Lobe","L_Parietal_Lobe","L_Occipital_Lobe","L_frontal_inferior_triangularis-Brocas","L_cingulate_midposterior-Wernickes","R_Frontal_Lobe","R_Temporal_Lobe","R_Parietal_Lobe","R_Occipital_Lobe");
var left_cortex = new Array("L_Frontal_Lobe","L_Temporal_Lobe","L_Parietal_Lobe","L_Occipital_Lobe","L_frontal_inferior_triangularis-Brocas","L_cingulate_midposterior-Wernickes");
var right_cortex = new Array("R_Frontal_Lobe","R_Temporal_Lobe","R_Parietal_Lobe","R_Occipital_Lobe");
var Cerebellum = new Array("L-Cerebellum-Cortex","R-Cerebellum-Cortex","Cerebellum-White-Matter","Cerebellum-Vermis");
var Deep_Neural_Structures = new Array("white_matter","putamen","Caudate_nucleus","globus_pallidus","thalamus","fornix","hippocampus","hypothalamus","corpus_callosum");
var Ventricular_System = new Array("lateral_ventricles_FH","lateral_ventricles_OH","lateral_ventricles_TH","lateral_ventricles_SE","third_Ventricle","fourth_Ventricle");
var lateral_verticles = new Array("lateral_ventricles_FH","lateral_ventricles_OH","lateral_ventricles_TH","lateral_ventricles_SE");


//Global array containing all object names
var objects = [];


init();
animate();


function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// Scene
	scene = new THREE.Scene();

	//Camera
	viewSize = 1000;
	aspectRatio = window.innerWidth/window.innerHeight;
	camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2 , aspectRatio*viewSize/2 , viewSize/2 , -viewSize/2, -10000,1000000 );

	camera.position.set(0,0,1);
	scene.add( camera );
	
	//Place the Directional lighting inside the camera so that it moves along the camera view
	//Position the lighting 1000 along +Z axis for object to be illuminated
	var directionalLight = new THREE.DirectionalLight(0xE8B84D, 1);
	directionalLight.position.set(0,0,1000);

	camera.add( directionalLight );


	function load_right_cortex(){
		var R_variableName = {}
		   ,files = [/*"R_calcarine_sulcus","R_central_sulcus","R_cingulate_anterior","R_cingulate_midanterior","R_cingulate_posteriordorsal","R_cingulate_posteriorventral","R_cingulate_sulcus_marginalis","R_circular_sulcus_insula_anterior","R_circular_sulcus_insula_inferior","R_circular_sulcus_insula_superior","R_collateral_transverse_sulcus_anterior","R_collateral_transverse_sulcus_posterior","R_cuneus","R_frontal_inferior_operculum","R_frontal_inferior_orbital","R_frontal_inferior_sulcus","R_frontal_inferior_triangularis","R_frontal_middle_sulcus","R_frontal_superior_sulcus","R_fusiform","R_insular_short","R_intraparietal_and_transverse_parietal_sulci","R_lateral_fissure_anterior_horizontal","R_lateral_fissure_anterior_vertical","R_lateral_fissure_posterior","R_lateral_occipito-temporal_sulcus","R_lateral_orbital_sulcus","R_lingual","R_medial_occipitotemporal_and_lingual_sulci","R_medial_orbital_sulcus-olfact","R_middle_frontal","R_middle_occipital_and_lunatus_sulci","R_occipital_inferior","R_occipital_middle","R_occipital_pole","R_occipital_superior","R_orbital","R_orbital_sulci","R_paracentral","R_parahippocampal","R_parietal_angular","R_parietal_superior","R_parietal_supramarginal","R_parieto-occipital_sulcus","R_pericallosal_sulcus","R_postcentral","R_postcentral_sulcus","R_precentral","R_precentral_sulcus-inf-part","R_precentral_sulcus-sup-part","R_precuneus","R_rectus_gyrus","R_subcallosal_gyrus","R_subcentral","R_suborbital_sulcus","R_subparietal_sulcus","R_sulcus_intermedius_primus","R_superior__frontal","R_superior_occipital_and_transverse_occipital_sulci","R_temporal_inferior","R_temporal_inferior_sulcus","R_temporal_middle","R_temporal_pole","R_temporal_superior.obj","R_temporal_superior_lateral","R_temporal_superior_polar","R_temporal_superior_sulcus","R_temporal_transverse_sulcus","R_transverse_frontopolar",*/"R_Temporal_Lobe","R_Parietal_Lobe","R_Occipital_Lobe","R_Frontal_Lobe"];
		files.forEach(function(currentVal,i){
			R_variableName[files[i]] =  new THREE.OBJLoader();
			R_variableName[files[i]].load( '../obj/Right cortex sulci and gyri/'+currentVal+'.obj', function ( object,materials ) {

				object.name = currentVal;

				objects.push(object);

				object.traverse(function(child){
				  
					if ( child instanceof THREE.Mesh ){
						child.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0,0,250) );
						child.geometry.verticesNeedUpdate = true;
						child.geometry.computeFaceNormals();
						child.geometry.computeVertexNormals();
						child.material = new THREE.MeshLambertMaterial({ color: 0xE8BC58,side:THREE.DoubleSide});
					}
				  
				});

				scene.add(object);

			});	
		});
	}

	function load_left_cortex(){
		var L_variableName = {}
		   ,files = [/*"L_anterior_occipital_sulcus_preoccipital_notch","L_calcarine_sulcus","L_central_sulcus","L_cingulate_anterior","L_cingulate_midanterior","L_cingulate_midposterior- Wernicke's","L_cingulate_posteriordorsal","L_cingulate_posteriorventral","L_cingulate_sulcus_marginalis","L_circular_sulcus_insula_anterior","L_circular_sulcus_insula_inferior","L_circular_sulcus_insula_superior","L_cuneus","L_frontal_inferior_operculum","L_frontal_inferior_orbital","L_frontal_inferior_sulcus","L_frontal_inferior_triangularis-Brocas","L_frontal_middle_sulcus","L_frontal_superior_sulcus","L_fusiform","L_insular_short","L_intraparietal_and_transverse_parietal_sulci","L_lateral_fissure_anterior_horizontal","L_lateral_fissure_anterior_vertical","L_lateral_fissure_posterior","L_lateral_occipito-temporal_sulcus","L_lateral_orbital_sulcus","L_lingual","L_long_insular_gyrus_and_central_sulcus","L_medial_occipitotemporal_and_lingual_sulci","L_medial_orbital_sulcus-olfact","L_middle_frontal","L_middle_occipital_and_lunatus_sulci","L_occipital_inferior","L_occipital_middle","L_occipital_pole","L_occipital_superior","L_orbital","L_orbital_sulci","L_paracentral","L_parahippocampal","L_parietal_angular","L_parietal_superior","L_parietal_supramarginal","L_parieto-occipital_sulcus","L_pericallosal_sulcus","L_postcentral","L_postcentral_sulcus","L_precentral","L_precentral_sulcus-inf-part","L_precentral_sulcus-sup-part","L_precuneus","L_rectus_gyrus","L_subcallosal_gyrus","L_subcentral","L_suborbital_sulcus","L_subparietal_sulcus","L_sulcus_intermedius_primus","L_frontal_superior","L_superior_occipital_and_transverse_occipital_sulci","L_temporal_anterior_transverse-Heschl","L_temporal_inferior","L_temporal_inferior_sulcus","L_temporal_middle","L_temporal_pole","L_temporal_superior.obj","L_temporal_superior_lateral","L_temporal_superior_polar","L_temporal_superior_sulcus","L_temporal_transverse_sulcus","L_transverse_frontopolar",*/"L_Temporal_Lobe","L_Parietal_Lobe","L_Occipital_Lobe","L_Frontal_Lobe","L_frontal_inferior_triangularis-Brocas","L_cingulate_midposterior-Wernickes"];
		files.forEach(function(currentVal,i){
			L_variableName[files[i]] =  new THREE.OBJLoader();
			L_variableName[files[i]].load('../obj/Left cortex sulci and gyri/'+currentVal+'.obj', function ( object ) {

				object.name = currentVal;

				objects.push(object);

				object.traverse(function(child){
				  
					if ( child instanceof THREE.Mesh ){
						child.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 250) );
						child.geometry.verticesNeedUpdate = true;
						child.geometry.computeFaceNormals();
						child.geometry.computeVertexNormals();
						child.material = new THREE.MeshLambertMaterial({ color: 0xE8BC58,side:THREE.DoubleSide});
						child.material.transparency = true;
				  	}
				  
				});

				scene.add(object);

			});
		  
			if(i == (files.length - 1) ){
				load_right_cortex();
			}

		});
	}


	//Contains file names of objects located in primary obj directory
	var variableName = {}
	   ,files = ["white_matter","L-Cerebellum-Cortex","R-Cerebellum-Cortex","Cerebellum-White-Matter","Cerebellum-Vermis","Caudate_nucleus","corpus_callosum","fornix","globus_pallidus","hippocampus","hypothalamus","third_Ventricle","fourth_Ventricle","lateral_ventricles_FH","lateral_ventricles_OH","lateral_ventricles_SE","lateral_ventricles_TH","putamen","thalamus"];
	   
	files.forEach(function(currentVal,i){

		variableName[files[i]] =  new THREE.OBJLoader();
		variableName[files[i]].load( '../obj/'+currentVal+'.obj', function(object){
			object.name = currentVal;

			objects.push(object);
			
			object.traverse(function(child){			  
				
				if ( child instanceof THREE.Mesh ){
					child.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,0, 250) );
					child.geometry.verticesNeedUpdate = true;
					child.geometry.computeFaceNormals();
					child.geometry.computeVertexNormals();
					child.material = new THREE.MeshLambertMaterial({ color: 0xD6A63A,side:THREE.DoubleSide});

					child.material.transparent = true;
				}
				
			});

			scene.add(object);
		});

		if(i == (files.length - 1) ){
		   load_left_cortex();
		}

	});


	// Controls
	//controls = new THREE.TrackballControls( camera );
	//controls.rotateSpeed = 1.0;
	//controls.zoomSpeed = 0.5;
	//controls.panSpeed = 0.8;
	//controls.addEventListener( 'change', render );
					

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}



// Read data file
function read_file(evt) {
    var file = document.getElementById('file_upload').files[0];
    if (file) {
        var reader = new FileReader();
	    reader.readAsText(file, "UTF-8");

	    //call loaded function on loading the contents of file
	    reader.onload = loaded;
    }
}

/*
	Load the uploaded file data HTML page and do neccessary actios
	=====================================================
*/
function loaded(evt) {

	//Get uploaded file data
    var fileString = evt.target.result;

    //Split the data into array based on newline characters
    var data = fileString.split("\r");


    //Assign the split array as data attibute to #file_upload element to access the data later
    //This provides way to store data in the HTML page
    jQuery('#file_upload').data("file",data);

    //Get the assigned data into a variable
    data = jQuery('#file_upload').data("file");

    console.log(data);

    //Change the brain state on pressing left and right arrow keys
    //Current_data stores the the current brain state. It gets increment on right key and decrements on left key
    //No increment action for last array index and same no decrement for first arry inxed
    document.onkeydown = function(event) {
	    switch (event.keyCode) {
	        case 37: //Left key
	            if(current_value !== 1) {
	            	current_value--;
	            	show_record(data[current_value],current_value);
	            }
	            break;
	        case 39: //Right key
	            //array keys start from 0 whereas length of array starts from 1, so decrement array length to match the keys
	            if(current_value < data.length - 1) {
	            	current_value++;
	            	show_record(data[current_value],current_value);
	            }
	            break;
	    }
	};

	/*
		@param current data value, current array index
		Reset camera to identity for each array press and apply the current data value
		=====================================================
	*/

    function show_record(current,index){
    	//Split the data into rotations and timestamp based on newline characters
    	current = current.split("|");

    	var event_type = current[0];
    	var event_data = current[1];
    	var timestamp = current[2];
    	timestamp = timestamp.split(" ");

    	jQuery("#info_box .timestamp").html("Date - " + timestamp[0] + "<br/>" + "Time - " + timestamp[1] + "<br/>" + "Event Data - " + event_data + "<br/>" + "Event Type - " + jQuery.parseJSON(event_type));

    	if(jQuery.parseJSON(event_type) == "rotation"){
	    	data_matrix = jQuery.parseJSON('[' + event_data + ']');

			camera.matrix.identity();

	    	var rotation_matrix = new THREE.Matrix4().set(data_matrix[0][0],data_matrix[0][4],data_matrix[0][8],data_matrix[0][12],data_matrix[0][1],data_matrix[0][5],data_matrix[0][9],data_matrix[0][13],data_matrix[0][2],data_matrix[0][6],data_matrix[0][10],data_matrix[0][14],data_matrix[0][3],data_matrix[0][7],data_matrix[0][11],data_matrix[0][15]);

	    	camera.applyMatrix(rotation_matrix);
    	}else if(jQuery.parseJSON(event_type) == "disabled"){

    		object = scene.getObjectByName(jQuery.parseJSON(event_data), true );

			object.traverse(function(child){
				
				if ( child instanceof THREE.Mesh ){
					child.visible = false;

					//Get index of the object to be hidden and remove the Object from the objects array
					// to help searching of inner brain sections during click event
					//This also gets fired when primary button gets enabled/disabled
					objects.splice(objects.indexOf(object),1); 
					
				}
				
			});    			

    	}else if(jQuery.parseJSON(event_type) == "enabled"){
    		object = scene.getObjectByName(jQuery.parseJSON(event_data), true );

			object.traverse(function(child){
				
				if ( child instanceof THREE.Mesh ){
					child.visible = true;

					//Add object back to the objects array
					objects.push(object); 
					
				}
				
			});  
		}else if(jQuery.parseJSON(event_type) == "Section Select/Left Click"){

			brain_opacity(0.1);

			object = scene.getObjectByName(jQuery.parseJSON(event_data), true );

			object.traverse(function(child){
				
				if ( child instanceof THREE.Mesh ){
					
					child.material.opacity = 1;
					child.currentHex = child.material.emissive.getHex();
					child.material.emissive.setHex( 0xff0000 );
				}

				child.updateMatrixWorld();			
				
			});

		}else if(jQuery.parseJSON(event_type) == "Section Deselect/Right Click"){
			brain_children = scene.children;

			brain_children.forEach(function(object) {
				object.traverse(function(child){

					if ( child instanceof THREE.Mesh ){	
						child.material.transparent = true;					
						child.material.opacity = 1;
						child.material.emissive.setHex( child.currentHex );
					}

					child.updateMatrixWorld();			
					
				});

			});
		}
	}
}

/*
	Update brain size on window resize
	====================================================================
*/
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	//controls.handleResize();
	render();
}

/*
	Basic animation loop 
	==================================================================== */

function animate() {
	requestAnimationFrame( animate );
	//controls.update();
	render();
}

/*
	Renderer function
	====================================================================  */
function render() {
	renderer.render( scene, camera );
}

/*
	@param opacity value from 0 to 1
	==================================================================== */

function brain_opacity(opacity){
	brain_children = scene.children;

	brain_children.forEach(function(object) {
		object.traverse(function(child){

			if ( child instanceof THREE.Mesh ){	
				child.material.transparent = true;					
				child.material.opacity = opacity;
			}

			child.updateMatrixWorld();			
			
		});

	});
}


jQuery(document).ready(function($) {

	/*
	Fire up the tabs on HTML page
	==================================================================== */

	jQuery("#control_sidebar,#control_sidebar ul li.secondary").accordion({
		heightStyle: "content",
		collapsible: true,
		active:false,
	});

});