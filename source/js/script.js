var container, camera, controls, scene, renderer, intersected, state;

//Used for raycasting procedure
var raycaster = new THREE.Raycaster();

//Used for mouse coordinates
var mouse = new THREE.Vector2();

//Brain model object
var brain = new THREE.Object3D();

//Global array containing all object names
var objects = [];


init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    // Scene
    scene = new THREE.Scene();

    //Camera
    viewSize = 1000;
    aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2, -viewSize / 2, -10000, 1000000);

    camera.position.set(0, 0, 1);
    scene.add(camera);

    //Place the Directional lighting inside the camera so that it moves along the camera view
    //Position the lighting 1000 along +Z axis for object to be illuminated
    var directionalLight = new THREE.DirectionalLight(0xE8B84D, 1);
    directionalLight.position.set(0, 0, 1000);

    camera.add(directionalLight);


    function load_right_cortex() {
        var R_variableName = {},
            files = [ /*"R_calcarine_sulcus","R_central_sulcus","R_cingulate_anterior","R_cingulate_midanterior","R_cingulate_posteriordorsal","R_cingulate_posteriorventral","R_cingulate_sulcus_marginalis","R_circular_sulcus_insula_anterior","R_circular_sulcus_insula_inferior","R_circular_sulcus_insula_superior","R_collateral_transverse_sulcus_anterior","R_collateral_transverse_sulcus_posterior","R_cuneus","R_frontal_inferior_operculum","R_frontal_inferior_orbital","R_frontal_inferior_sulcus","R_frontal_inferior_triangularis","R_frontal_middle_sulcus","R_frontal_superior_sulcus","R_fusiform","R_insular_short","R_intraparietal_and_transverse_parietal_sulci","R_lateral_fissure_anterior_horizontal","R_lateral_fissure_anterior_vertical","R_lateral_fissure_posterior","R_lateral_occipito-temporal_sulcus","R_lateral_orbital_sulcus","R_lingual","R_medial_occipitotemporal_and_lingual_sulci","R_medial_orbital_sulcus-olfact","R_middle_frontal","R_middle_occipital_and_lunatus_sulci","R_occipital_inferior","R_occipital_middle","R_occipital_pole","R_occipital_superior","R_orbital","R_orbital_sulci","R_paracentral","R_parahippocampal","R_parietal_angular","R_parietal_superior","R_parietal_supramarginal","R_parieto-occipital_sulcus","R_pericallosal_sulcus","R_postcentral","R_postcentral_sulcus","R_precentral","R_precentral_sulcus-inf-part","R_precentral_sulcus-sup-part","R_precuneus","R_rectus_gyrus","R_subcallosal_gyrus","R_subcentral","R_suborbital_sulcus","R_subparietal_sulcus","R_sulcus_intermedius_primus","R_superior__frontal","R_superior_occipital_and_transverse_occipital_sulci","R_temporal_inferior","R_temporal_inferior_sulcus","R_temporal_middle","R_temporal_pole","R_temporal_superior.obj","R_temporal_superior_lateral","R_temporal_superior_polar","R_temporal_superior_sulcus","R_temporal_transverse_sulcus","R_transverse_frontopolar",*/ "R_Temporal_Lobe", "R_Parietal_Lobe", "R_Occipital_Lobe", "R_Frontal_Lobe"];
        files.forEach(function(currentVal, i) {
            R_variableName[files[i]] = new THREE.OBJLoader();
            R_variableName[files[i]].load('../obj/Right cortex sulci and gyri/' + currentVal + '.obj', function(object, materials) {

                object.name = currentVal;

                objects.push(object);

                object.traverse(function(child) {

                    if (child instanceof THREE.Mesh) {
                        child.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 250));
                        child.geometry.verticesNeedUpdate = true;
                        child.geometry.computeFaceNormals();
                        child.geometry.computeVertexNormals();
                        child.material = new THREE.MeshLambertMaterial({ color: 0xE8BC58, side: THREE.DoubleSide });
                    }

                });

                scene.add(object);

            });
        });
    }

    function load_left_cortex() {
        var L_variableName = {},
            files = [ /*"L_anterior_occipital_sulcus_preoccipital_notch","L_calcarine_sulcus","L_central_sulcus","L_cingulate_anterior","L_cingulate_midanterior","L_cingulate_midposterior- Wernicke's","L_cingulate_posteriordorsal","L_cingulate_posteriorventral","L_cingulate_sulcus_marginalis","L_circular_sulcus_insula_anterior","L_circular_sulcus_insula_inferior","L_circular_sulcus_insula_superior","L_cuneus","L_frontal_inferior_operculum","L_frontal_inferior_orbital","L_frontal_inferior_sulcus","L_frontal_inferior_triangularis-Brocas","L_frontal_middle_sulcus","L_frontal_superior_sulcus","L_fusiform","L_insular_short","L_intraparietal_and_transverse_parietal_sulci","L_lateral_fissure_anterior_horizontal","L_lateral_fissure_anterior_vertical","L_lateral_fissure_posterior","L_lateral_occipito-temporal_sulcus","L_lateral_orbital_sulcus","L_lingual","L_long_insular_gyrus_and_central_sulcus","L_medial_occipitotemporal_and_lingual_sulci","L_medial_orbital_sulcus-olfact","L_middle_frontal","L_middle_occipital_and_lunatus_sulci","L_occipital_inferior","L_occipital_middle","L_occipital_pole","L_occipital_superior","L_orbital","L_orbital_sulci","L_paracentral","L_parahippocampal","L_parietal_angular","L_parietal_superior","L_parietal_supramarginal","L_parieto-occipital_sulcus","L_pericallosal_sulcus","L_postcentral","L_postcentral_sulcus","L_precentral","L_precentral_sulcus-inf-part","L_precentral_sulcus-sup-part","L_precuneus","L_rectus_gyrus","L_subcallosal_gyrus","L_subcentral","L_suborbital_sulcus","L_subparietal_sulcus","L_sulcus_intermedius_primus","L_frontal_superior","L_superior_occipital_and_transverse_occipital_sulci","L_temporal_anterior_transverse-Heschl","L_temporal_inferior","L_temporal_inferior_sulcus","L_temporal_middle","L_temporal_pole","L_temporal_superior.obj","L_temporal_superior_lateral","L_temporal_superior_polar","L_temporal_superior_sulcus","L_temporal_transverse_sulcus","L_transverse_frontopolar",*/ "L_Temporal_Lobe", "L_Parietal_Lobe", "L_Occipital_Lobe", "L_Frontal_Lobe", "L_frontal_inferior_triangularis-Brocas", "L_cingulate_midposterior-Wernickes"];
        files.forEach(function(currentVal, i) {
            L_variableName[files[i]] = new THREE.OBJLoader();
            L_variableName[files[i]].load('../obj/Left cortex sulci and gyri/' + currentVal + '.obj', function(object) {

                object.name = currentVal;

                objects.push(object);

                object.traverse(function(child) {

                    if (child instanceof THREE.Mesh) {
                        child.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 250));
                        child.geometry.verticesNeedUpdate = true;
                        child.geometry.computeFaceNormals();
                        child.geometry.computeVertexNormals();
                        child.material = new THREE.MeshLambertMaterial({ color: 0xE8BC58, side: THREE.DoubleSide });
                        child.material.transparency = true;
                    }

                });

                scene.add(object);

            });

            if (i == (files.length - 1)) {
                load_right_cortex();
            }

        });
    }


    //Contains file names of objects located in primary obj directory
    var variableName = {},
        files = ["white_matter", "L-Cerebellum-Cortex", "R-Cerebellum-Cortex", "Cerebellum-White-Matter", "Cerebellum-Vermis", "Caudate_nucleus", "corpus_callosum", "fornix", "globus_pallidus", "hippocampus", "hypothalamus", "third_Ventricle", "fourth_Ventricle", "lateral_ventricles_FH", "lateral_ventricles_OH", "lateral_ventricles_SE", "lateral_ventricles_TH", "putamen", "thalamus"];

    files.forEach(function(currentVal, i) {

        variableName[files[i]] = new THREE.OBJLoader();
        variableName[files[i]].load('../obj/' + currentVal + '.obj', function(object) {
            object.name = currentVal;

            objects.push(object);

            object.traverse(function(child) {

                if (child instanceof THREE.Mesh) {
                    child.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 250));
                    child.geometry.verticesNeedUpdate = true;
                    child.geometry.computeFaceNormals();
                    child.geometry.computeVertexNormals();
                    child.material = new THREE.MeshLambertMaterial({ color: 0xD6A63A, side: THREE.DoubleSide });

                    child.material.transparent = true;
                }

            });

            scene.add(object);
        });

        if (i == (files.length - 1)) {
            load_left_cortex();
        }

    });


    // Controls
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 0.5;
    controls.panSpeed = 0.8;
    controls.addEventListener('change', render);


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);


    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    container.addEventListener('mousewheel', onDocumentMouseWheel, false);
    container.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
    container.addEventListener('mousedown', onDocumentMouseDown, false);
    container.addEventListener('mouseup', onDocumentMouseUp, false);
    window.addEventListener('resize', onWindowResize, false);
}

/*
	Calls storemovements function after every 1000ms or 1s on mouse click
	Change interval to set the frequency of saved data
	======================================================================== */
function onDocumentMouseDown(event) {
    storeData = setInterval(storeMovements, 1000);
}

/*
	Clears the set interval on mouse release
	==================================================================== */
function onDocumentMouseUp(event) {
    clearInterval(storeData);
}

/*
	Stores the data to the text file
	==================================================================== */
function storeMovements() {
    $.ajax({
        type: "POST",
        url: 'handler.php',
        data: { event_data: camera.matrix.elements, event_type: "rotation" },
        error: function() {
            console.log('Request timeout');
        },
        timeout: 1000,
    });
}

/*
	Select brain sections on mouse clicking using ray tracing
	==================================================================== */

/*function onDocumentMouseDown(event) {
	
	// Collect current mouse coordinates and change in homogeneous coordinates
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


	// Cast ray from the found mouse coordinates
	raycaster.setFromCamera( mouse, camera );

	//Returned intersects
	var intersects = raycaster.intersectObjects(objects,true);

	//Check if the ray intersected any object and if the click was a left click
	if ( intersects.length > 0 && event.which == 1 ) {
		
		//If intersected change section color
		if ( intersected != intersects[ 0 ].object ) {

			if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );

			intersected = intersects[ 0 ].object;
			intersected.currentHex = intersected.material.emissive.getHex();
			intersected.material.emissive.setHex( 0xff0000 );

		}

	//Deselect the brain section on right click
	} else if(event.which == 3) {

		if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );
		intersected = null;

	}

	container.addEventListener( 'mousemove',onDocumentMouseMove , false );
}
*/


/*
	Update brain size on window resize
	====================================================================
*/
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}

/*
	Zoom 
	==================================================================== */

function onDocumentMouseWheel(event) {
    var zoom = 0.02;

    event.preventDefault();
    event.stopPropagation();

    var delta = 0;

    if (event.wheelDelta) { // WebKit / Opera / Explorer 9
        delta = event.wheelDelta / 40;
    } else if (event.detail) { // Firefox
        delta = -event.detail / 3;
    }

    var width = camera.right / zoom;
    var height = camera.top / zoom;

    zoom -= delta * 0.001;

    camera.left = -zoom * width;
    camera.right = zoom * width;
    camera.top = zoom * height;
    camera.bottom = -zoom * height;

    camera.updateProjectionMatrix();

    renderer.render(scene, camera);

}

/*
	Basic animation loop 
	==================================================================== */

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

/*
	Renderer function
	====================================================================  */

function render() {
    renderer.render(scene, camera);
}


/*
	1st and 2nd level controls (does not include title toggle buttons)
	==================================================================== */

// Contains names of all the toggle buttons to be used in the HTML page to display and hide brain sections
var controlName = {},
    sideControls = ["fourth_Ventricle", "third_Ventricle", "lateral_ventricles_FH", "lateral_ventricles_OH", "lateral_ventricles_SE", "lateral_ventricles_TH", "corpus_callosum", "hypothalamus", "hippocampus", "fornix", "thalamus", "globus_pallidus", "Caudate_nucleus", "putamen", "white_matter", "L_Temporal_Lobe", "L_Parietal_Lobe", "L_Occipital_Lobe", "L_Frontal_Lobe", "L_frontal_inferior_triangularis-Brocas", "L_cingulate_midposterior-Wernickes", "R_Temporal_Lobe", "R_Parietal_Lobe", "R_Occipital_Lobe", "R_Frontal_Lobe", "L-Cerebellum-Cortex", "R-Cerebellum-Cortex", "Cerebellum-White-Matter", "Cerebellum-Vermis"];

//Call Switching controls library functions on each control name and setup its controls on the HTML page
sideControls.forEach(function(currentVal, i) {

    controlName[sideControls[i]] = document.querySelector('.' + currentVal);
    var switchery = new Switchery(controlName[sideControls[i]], { size: 'small' });

    // Bind onchange function to the created controls
    controlName[sideControls[i]].onchange = function() {
        var object = scene.getObjectByName(currentVal, true);

        if (controlName[sideControls[i]].checked) {
            state = "enabled";
        } else {
            state = "disabled";
        }

        //Store event in database
        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: { event_data: currentVal, event_type: state },
            error: function() {
                console.log('Request timeout');
            },
            timeout: 1000,
        });

        object.traverse(function(child) {

            if (child instanceof THREE.Mesh) {
                if (controlName[sideControls[i]].checked) {
                    child.visible = true;

                    //Add object back to the objects array
                    objects.push(object);
                } else {
                    child.visible = false;

                    //Get index of the object to be hidden and remove the Object from the objects array
                    // to help searching of inner brain sections during click event
                    //This also gets fired when primary button gets enabled/disabled
                    objects.splice(objects.indexOf(object), 1);
                }
            }

        });

    };

});


/*
	Title toggle buttons (hides all its child brain sections on single go)
	======================================================================== */

//Call Switching controls library functions on each control name and setup its controls on the HTML page
var primary_controls = Array.prototype.slice.call(document.querySelectorAll('.primary'));

primary_controls.forEach(function(button) {

    var switchery = new Switchery(button, { size: 'small' });

    // Bind onchange function to the created controls
    button.onchange = function(e) {

        var container_ID = jQuery(button).parent().next().attr('id');

        //Get all the control names under primary toggle 
        var secondary_controls = Array.prototype.slice.call(document.querySelectorAll('#' + container_ID + ' input'));

        //Update all secondary controls and disable them on update of primary control
        secondary_controls.forEach(function(current, index) {
            var objectName = jQuery(current).attr("class");
            var object = scene.getObjectByName(objectName, true);

            if (button.checked) {
                current.checked = true;

                if (objectName != "primary") {
                    object.traverse(function(child) {

                        if (child instanceof THREE.Mesh) {
                            child.visible = true;
                        }

                    });
                }
                //Manually fire the onchange event
                onChange(current);
            } else {
                current.checked = false;
                if (objectName != "primary") {
                    object.traverse(function(child) {

                        if (child instanceof THREE.Mesh) {
                            child.visible = false;
                        }

                    });
                }
                //Manually fire the onchange event
                onChange(current);
            }
        });

    };

});

/*
	Manually fire the onchange event
	====================================================================*/

function onChange(el) {
    if (typeof Event === 'function' || !document.fireEvent) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, true);
        el.dispatchEvent(event);
    } else {
        el.fireEvent('onchange');
    }
}


/*
	@param opacity value from 0 to 1
	==================================================================== */

function brain_opacity(opacity) {
    brain_children = scene.children;

    brain_children.forEach(function(object) {
        object.traverse(function(child) {

            if (child instanceof THREE.Mesh) {
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
        active: false,
    });

    /*
    Brain section highlight on item Left click 
    ==================================================================== */

    jQuery('#control_sidebar li span:first-child').mousedown(function(event) {

        jQuery("#control_sidebar li span.title").attr("style", "");
        var input = Array.prototype.slice.call(document.querySelectorAll('#control_sidebar input'));

        input.forEach(function(current, index) {
            var input_class = jQuery(current).attr("class");
            if (input_class != "primary") {

                brain_opacity(1);

                var object = scene.getObjectByName(input_class, true);

                object.traverse(function(child) {

                    if (child instanceof THREE.Mesh) {
                        child.material.emissive.setHex(child.currentHex);
                    }

                });
            }
        });

        if (event.which == 1) {

            jQuery(this).css('color', 'red');

            var input_class = jQuery(this).parent().find("input").attr("class");


            //Store event in database
            $.ajax({
                type: "POST",
                url: 'handler.php',
                data: { event_data: input_class, event_type: "Section Select/Left Click" },
                error: function() {
                    console.log('Request timeout');
                },
                timeout: 1000,
            });


            //Collect section descriptions on left click and display on screen
            $.ajax({
                type: "POST",
                url: 'descriptions.php',
                data: { file_name: input_class },
                success: function(text) {
                    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    document.querySelector('#info_box').innerHTML = text;
                },
            });

            if (input_class != "primary") {

                brain_opacity(0.1);

                var object = scene.getObjectByName(input_class, true);

                object.traverse(function(child) {

                    if (child instanceof THREE.Mesh) {

                        child.material.opacity = 1;
                        child.currentHex = child.material.emissive.getHex();
                        child.material.emissive.setHex(0xff0000);
                    }

                    child.updateMatrixWorld();

                });

            }
        }
    });

    jQuery(document).mouseup(function(event) {

        /*
        Revert brain sections back on mouse right click
        ==================================================================== */

        if (event.which == 3) {


            //Store event in database
            $.ajax({
                type: "POST",
                url: 'handler.php',
                data: { event_data: null, event_type: "Section Deselect/Right Click" },
                error: function() {
                    console.log('Request timeout');
                },
                timeout: 1000,
            });


            jQuery("#control_sidebar li span.title").attr("style", "");

            document.querySelector('#info_box').innerHTML = "";

            var input = Array.prototype.slice.call(document.querySelectorAll('#control_sidebar input'));

            input.forEach(function(current, index) {
                var input_class = jQuery(current).attr("class");

                if (input_class != "primary") {

                    brain_opacity(1);

                    var object = scene.getObjectByName(input_class, true);

                    object.traverse(function(child) {

                        if (child instanceof THREE.Mesh) {
                            child.material.emissive.setHex(child.currentHex);
                        }

                    });
                }
            });
        }

    });

});
