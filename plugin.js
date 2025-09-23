export default (app) => {
    app.addToolbarButton('🧩', 'Hello', () => console.log('Hello from plugin'));
    app.addSidePanel('Plugin Panel', () => {
        const div = document.createElement('div');
        div.textContent = 'This was added by a plugin.';
        return div;
    });
    // app.registerFeature(MyFeatureClass); // optional
};