'use strict';

var core = require('@capacitor/core');

const LiveActivities = core.registerPlugin('LiveActivities', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.LiveActivitiesWeb()),
});

class LiveActivitiesWeb extends core.WebPlugin {
    startActivity(_) {
        throw new Error('Method not implemented.');
    }
    updateActivity(_) {
        throw new Error('Method not implemented.');
    }
    endActivity(_) {
        throw new Error('Method not implemented.');
    }
    getAllActivities() {
        throw new Error('Method not implemented.');
    }
    debugActivities() {
        throw new Error('Method not implemented.');
    }
    saveImage(_) {
        throw new Error('Method not implemented.');
    }
    removeImage(_) {
        throw new Error('Method not implemented.');
    }
    listImages() {
        throw new Error('Method not implemented.');
    }
    cleanupImages() {
        throw new Error('Method not implemented.');
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LiveActivitiesWeb: LiveActivitiesWeb
});

exports.LiveActivities = LiveActivities;
//# sourceMappingURL=plugin.cjs.js.map
