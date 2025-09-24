import { PrimitiveSphereFeaturePlugin } from './exampleFeature.js';

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

