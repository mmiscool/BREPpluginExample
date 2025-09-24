let BREP;

export default (app) => {
    BREP = app.BREP;
    console.log("This is the context passed in to the plugin.", app)
    app.addToolbarButton('🧩', 'Hello', () => {
        console.log('Hello from plugin')
        console.log("This is the context passed in to the plugin.", app)
        alert("Yay");
    });
    app.addSidePanel('Plugin Panel', () => {
        const div = document.createElement('div');
        div.textContent = 'This was added by a plugin.';
        return div;
    });
     app.registerFeature(PrimitiveSphereFeaturePlugin); // optional
};







const inputParamsSchema = {
    featureID: {
        type: 'string',
        default_value: null,
        hint: 'Unique identifier for the feature'
    },
    radius: {
        type: 'number',
        default_value: 5,
        hint: 'Radius of the sphere'
    },
    resolution: {
        type: 'number',
        default_value: 32,
        hint: 'Base segment count (longitude). Latitude segments are derived from this.'
    },
    transform: {
        type: 'transform',
        default_value: { position: [0, 0, 0], rotationEuler: [0, 0, 0], scale: [1, 1, 1] },
        hint: 'Position, rotation, and scale'
    },
    boolean: {
        type: 'boolean_operation',
        default_value: { targets: [], operation: 'NONE' },
        hint: 'Optional boolean operation with selected solids'
    }
};

export class PrimitiveSphereFeaturePlugin {
    static featureShortName = "S.p";
    static featureName = "Primitive Sphere";
    static inputParamsSchema = inputParamsSchema;

    constructor() {
        this.inputParams ={};

        this.persistentData = {};
    }

    async run(partHistory) {
        const { radius, resolution, featureID } = this.inputParams;

        const sphere = await new BREP.Sphere({
            r: radius,
            resolution,
            name: featureID,
        });
        try {
            if (this.inputParams.transform) {
                sphere.bakeTRS(this.inputParams.transform);
            }
        } catch (_) { }
        sphere.visualize();

        return await BREP.applyBooleanOperation(partHistory || {}, sphere, this.inputParams.boolean, featureID);
    }
}













