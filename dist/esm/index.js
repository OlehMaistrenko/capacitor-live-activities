import { registerPlugin } from '@capacitor/core';
const LiveActivities = registerPlugin('LiveActivities', {
    web: () => import('./web').then((m) => new m.LiveActivitiesWeb()),
});
export * from './definitions';
export { LiveActivities };
//# sourceMappingURL=index.js.map