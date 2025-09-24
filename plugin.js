import { PrimitiveSphereFeaturePlugin, BREP } from './exampleFeature.js';


export default (app) => {
    Object.assign(BREP, app.BREP);
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
    console.log("This is the BREP thing", PrimitiveSphereFeaturePlugin.BREP);
    app.registerFeature(PrimitiveSphereFeaturePlugin); // optional
};

