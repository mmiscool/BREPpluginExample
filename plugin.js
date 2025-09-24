

export default (app) => {
    console.log("This is the context passed in to the plugin.", app)
    app.addToolbarButton('🧩', 'Hello', () => {
        console.log('Hello from plugin')
        console.log("This is the context passed in to the plugin.", app)
    });
    app.addSidePanel('Plugin Panel', () => {
        const div = document.createElement('div');
        div.textContent = 'This was added by a plugin.';
        return div;
    });
    // app.registerFeature(MyFeatureClass); // optional
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

export class PrimitiveSphereFeature {
    static featureShortName = "P.S";
    static featureName = "Primitive Sphere";
    static inputParamsSchema = inputParamsSchema;

    constructor() {
        this.inputParams = extractDefaultValues(inputParamsSchema);

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













